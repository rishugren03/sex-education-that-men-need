import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { CHAPTERS } from '../../content/chapters';
import { useReducedMotion, getMotionOverride, setMotionOverride } from '../../lib/hooks';
import { ACCENTS } from '../ui/primitives';

const ROMAN: Record<number, string> = {
  0: '00',
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
  10: '10',
  11: '11',
  12: '12',
  13: '13',
  14: '14',
  15: '15',
  16: '16',
};

/** Finds the chapter section currently occupying the reading line. */
function useActiveChapter() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
      if (!nodes.length) return;
      const line = window.innerHeight * 0.42;
      let best = 0;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].getBoundingClientRect().top <= line) best = i;
        else break;
      }
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return active;
}

function MotionToggle() {
  const reduced = useReducedMotion();
  const [, force] = useState(0);
  return (
    <button
      type="button"
      onClick={() => {
        setMotionOverride(reduced ? 'on' : 'off');
        force((n) => n + 1);
      }}
      aria-label={reduced ? 'Motion is reduced. Turn animation on.' : 'Animation is on. Turn motion off.'}
      title={reduced ? 'Motion off' : 'Motion on'}
      style={{
        font: 'inherit',
        cursor: 'pointer',
        background: 'transparent',
        border: '1px solid var(--line)',
        color: 'var(--bone-4)',
        borderRadius: 999,
        padding: '0.28rem 0.6rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: reduced ? 'var(--bone-4)' : 'var(--cyan)',
          boxShadow: reduced ? 'none' : '0 0 8px var(--cyan)',
        }}
      />
      <span className="micro" style={{ fontSize: '0.62rem', letterSpacing: '0.14em' }}>
        {reduced ? 'STILL' : 'MOTION'}
      </span>
    </button>
  );
}

export function Chrome() {
  const active = useActiveChapter();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const reduced = useReducedMotion();

  const current = CHAPTERS[active] ?? CHAPTERS[0];
  const jump = (i: number) => {
    const node = document.querySelectorAll<HTMLElement>('[data-chapter]')[i];
    if (node) {
      node.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const dots = useMemo(() => CHAPTERS, []);

  return (
    <>
      {/* Reading progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          transformOrigin: '0%',
          scaleX: bar,
          background: `linear-gradient(90deg, ${ACCENTS[current.accent]}, ${ACCENTS[current.accent]}44)`,
          zIndex: 90,
        }}
      />

      {/* ── Desktop rail ── */}
      <nav
        aria-label="Chapters"
        className="chrome-rail"
        style={{
          position: 'fixed',
          left: 'clamp(0.6rem, 1.6vw, 1.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 80,
          display: 'none',
        }}
      >
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.1rem' }}>
          {dots.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={on ? 'true' : undefined}
                  title={`${ROMAN[i]} — ${c.short}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: 'transparent',
                    border: 0,
                    padding: '0.32rem 0.4rem',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: on ? 'var(--bone)' : 'var(--bone-4)',
                    width: '100%',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'block',
                      width: on ? 22 : 10,
                      height: 1,
                      background: on ? ACCENTS[c.accent] : 'var(--line-strong)',
                      transition: 'width .5s cubic-bezier(.16,1,.3,1), background .4s',
                      flex: '0 0 auto',
                    }}
                  />
                  <span
                    className="micro"
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.14em',
                      whiteSpace: 'nowrap',
                      opacity: on ? 1 : 0,
                      transform: on ? 'translateX(0)' : 'translateX(-4px)',
                      transition: 'opacity .4s, transform .4s',
                    }}
                  >
                    {ROMAN[i]} {c.short.toUpperCase()}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Mobile top bar ── */}
      <div
        className="chrome-topbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.6rem var(--gutter)',
          background: 'linear-gradient(180deg, rgba(8,9,11,0.92), rgba(8,9,11,0.55) 70%, transparent)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', minWidth: 0 }}>
          <span
            className="micro"
            style={{ color: ACCENTS[current.accent], fontSize: '0.68rem', letterSpacing: '0.16em' }}
          >
            {ROMAN[active]}
          </span>
          <span
            className="micro"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.16em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {current.short.toUpperCase()}
          </span>
        </div>
        <span style={{ pointerEvents: 'auto' }}>
          <MotionToggle />
        </span>
      </div>

      <style>{`
        @media (min-width: 900px) { .chrome-rail { display: block !important; } .chrome-topbar { display: none !important; } }
      `}</style>
    </>
  );
}

export { ROMAN, useActiveChapter, MotionToggle, getMotionOverride };
