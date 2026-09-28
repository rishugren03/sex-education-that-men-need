import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Figure } from '../components/ui/Figure';
import { ScrollCue } from '../components/ui/primitives';
import { clamp } from '../lib/math';
import { TutorAvatar } from '../scenes/TutorAvatar';
import { useWebGL } from '../lib/hooks';

const SOURCES = [
  'a friend who was guessing',
  'porn',
  'jokes',
  'a WhatsApp forward',
  'a Reel you cannot unsee',
  'an uncle who changed the subject',
  'the internet, at 1 am',
  'nowhere at all',
];

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 });
  const webgl = useWebGL();

  const op1 = useTransform(p, [0, 0.15], [1, 0]);
  const y1 = useTransform(p, [0, 0.15], [0, -60]);
  const op2 = useTransform(p, [0.12, 0.3, 0.48], [0, 1, 0]);
  const y2 = useTransform(p, [0.12, 0.48], [40, -40]);
  const op3 = useTransform(p, [0.45, 0.6, 0.8], [0, 1, 0]);
  const y3 = useTransform(p, [0.45, 0.8], [40, -40]);
  const opCta = useTransform(p, [0.7, 0.85], [0, 1]);
  const figOpacity = useTransform(p, [0, 0.15, 0.85, 1], [0.55, 1, 1, 0.15]);
  const railY = useTransform(p, [0, 0.5], ['0%', '-6%']);

  return (
    <section ref={ref} data-chapter id="intro" style={{ position: 'relative', minHeight: '520svh' }}>
      {/* ── Fixed background figure ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0 auto 0 50%',
            width: 'min(120vw, 44rem)',
            transform: 'translateX(-50%)',
            opacity: figOpacity,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div style={{ width: '100%', height: '86svh', position: 'relative' }}>
            <motion.div style={{ position: 'absolute', inset: 0, y: railY }}>
              <FigureProgress progress={p} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Flowing text content ── */}
      <div className="shell" style={{ position: 'relative', width: '100%', paddingTop: 'var(--topbar-h)', zIndex: 1 }}>
        {/* Statement 1 */}
        <motion.div style={{ opacity: op1, y: y1, maxWidth: '30rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1.2rem' }}>
            A lesson, in seventeen parts
          </p>
          <h1
            className="serif"
            style={{ fontSize: 'var(--t-display)', lineHeight: 0.92, letterSpacing: '-0.035em' }}
          >
            Nobody properly taught you{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--cyan)' }}>this.</em>
          </h1>
          <div style={{ marginTop: 'clamp(1.6rem, 5vw, 2.6rem)' }}>
            <ScrollCue label="Scroll to begin" />
          </div>
        </motion.div>

        {/* Statement 2 */}
        <motion.div style={{ opacity: op2, y: y2, maxWidth: '34rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1.2rem' }}>
            Where it usually comes from
          </p>
          <p
            className="serif"
            style={{ fontSize: 'clamp(1.4rem, 5.4vw, 2.9rem)', lineHeight: 1.18, color: 'var(--bone-2)' }}
          >
            You learned about sex from{' '}
            <span className="cycle" aria-hidden="true">
              {SOURCES.map((s, i) => (
                <motion.span
                  key={s}
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 4.2, repeat: Infinity, delay: i * 0.52, ease: 'easeInOut' }}
                  style={{ display: 'block' }}
                >
                  {s}.
                </motion.span>
              ))}
            </span>
          </p>
        </motion.div>

        {/* Statement 3 */}
        <motion.div style={{ opacity: op3, y: y3, maxWidth: '32rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1.2rem' }}>
            The problem
          </p>
          <p
            className="serif"
            style={{ fontSize: 'clamp(1.7rem, 7vw, 4rem)', lineHeight: 1.05 }}
          >
            Some of what you learned was{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>probably wrong.</em>
          </p>
          <p className="body" style={{ marginTop: '1.4rem' }}>
            Not because you are slow. Because almost nobody who told you had been taught either. That chain ends here.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div style={{ opacity: opCta, maxWidth: '30rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>
            Fifteen to twenty minutes
          </p>
          <h2 className="serif" style={{ fontSize: 'clamp(1.9rem, 8vw, 4.4rem)', lineHeight: 1.02, marginBottom: '1.4rem' }}>
            Let&apos;s fix that.
          </h2>
          <div className="cta-row">
            <a className="cta" href="#your-body">
              Start
              <span aria-hidden="true">↓</span>
            </a>
            <span className="micro" style={{ maxWidth: '16rem' }}>
              No account, no sign-up, nothing to buy.
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── 3D Tutor avatar ── */}
      {webgl && (
        <TutorAvatar progress={p} reduced={false} />
      )}
    </section>
  );
}

function FigureProgress({ progress }: { progress: MotionValue<number> }) {
  const [v, setV] = useState(() => clamp(progress.get()));
  useEffect(() => progress.on('change', setV), [progress]);
  return <Figure progress={v} />;
}

export { FigureProgress };