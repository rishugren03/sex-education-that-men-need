import { motion, useReducedMotion as useFramerReduced } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../lib/hooks';

export const ACCENTS: Record<string, string> = {
  cyan: 'var(--cyan)',
  blue: 'var(--blue)',
  rose: 'var(--rose)',
  amber: 'var(--amber)',
  green: 'var(--green)',
  violet: 'var(--violet)',
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'header' | 'p';
  className?: string;
  once?: boolean;
};

/** Scroll-triggered entrance. Collapses to a plain fade under reduced motion. */
export function Reveal({ children, delay = 0, y = 26, as = 'div', className, once = true }: RevealProps) {
  const reduced = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px -12% 0px' }}
      transition={{ duration: reduced ? 0.25 : 0.85, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Cmp>
  );
}

export function Eyebrow({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <p className="eyebrow" style={accent ? { color: ACCENTS[accent] } : undefined}>
      {children}
    </p>
  );
}

/** The oversized serif statement. One idea, one screen. */
export function Statement({
  children,
  size = 'h1',
  className = '',
  delay = 0,
  accentWord,
}: {
  children: ReactNode;
  size?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
  accentWord?: string;
}) {
  const reduced = useReducedMotion();
  const Cmp = motion[size] as typeof motion.h1;
  const sizeClass = size === 'h1' ? 'var(--t-h1)' : size === 'h2' ? 'var(--t-h2)' : 'var(--t-h3)';
  const parts = accentWord ? splitAccent(children, accentWord) : null;
  return (
    <Cmp
      className={`serif ${className}`}
      style={{ fontSize: sizeClass, lineHeight: 1.02 }}
      initial={{ opacity: 0, y: reduced ? 0 : 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: reduced ? 0.25 : 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {parts ? (
        <>
          {parts.before}
          <em style={{ color: ACCENTS.cyan, fontStyle: 'italic' }}>{parts.word}</em>
          {parts.after}
        </>
      ) : (
        children
      )}
    </Cmp>
  );
}

function splitAccent(text: ReactNode, word: string) {
  const s = typeof text === 'string' ? text : null;
  if (!s) return null;
  const i = s.indexOf(word);
  if (i === -1) return null;
  return { before: s.slice(0, i), word: s.slice(i, i + word.length), after: s.slice(i + word.length) };
}

export function Lede({ children, delay = 0.1 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <p className="lede serif" style={{ fontFamily: 'var(--serif)', letterSpacing: '-0.012em' }}>
        {children}
      </p>
    </Reveal>
  );
}

export function Body({ children, delay = 0.15, wide }: { children: ReactNode; delay?: number; wide?: boolean }) {
  return (
    <Reveal delay={delay}>
      <div className="body" style={wide ? { maxWidth: 'var(--measure-wide)' } : undefined}>
        {children}
      </div>
    </Reveal>
  );
}

/** Quiet side-note used for caveats, sources, and "ask a doctor" notes. */
export function Note({
  children,
  kind = 'note',
  label,
}: {
  children: ReactNode;
  kind?: 'note' | 'didyouknow' | 'care' | 'source';
  label?: string;
}) {
  const palette: Record<string, { border: string; text: string; tag: string }> = {
    note: { border: 'var(--line)', text: 'var(--bone-3)', tag: 'var(--bone-4)' },
    didyouknow: { border: 'rgba(95,211,232,0.24)', text: 'var(--bone-2)', tag: 'var(--cyan)' },
    care: { border: 'rgba(224,160,95,0.26)', text: 'var(--bone-2)', tag: 'var(--amber)' },
    source: { border: 'var(--line-soft)', text: 'var(--bone-4)', tag: 'var(--bone-4)' },
  };
  const p = palette[kind];
  return (
    <Reveal delay={0.05}>
      <aside
        style={{
          borderLeft: `1px solid ${p.border}`,
          paddingLeft: '1.05rem',
          color: p.text,
          fontSize: 'var(--t-small)',
          lineHeight: 1.6,
          maxWidth: 'var(--measure)',
        }}
      >
        {label ? (
          <span
            className="eyebrow"
            style={{ display: 'block', color: p.tag, marginBottom: '0.5rem', fontSize: '0.66rem' }}
          >
            {label}
          </span>
        ) : null}
        {children}
      </aside>
    </Reveal>
  );
}

/** A small list of labelled facts. Grid on desktop, stack on mobile. */
export function Facts({ items, accent = 'cyan' }: { items: { k: string; v: ReactNode }[]; accent?: string }) {
  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 13rem), 1fr))',
        gap: '1px',
        background: 'var(--line-soft)',
        border: '1px solid var(--line-soft)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        margin: 0,
      }}
    >
      {items.map((it) => (
        <div key={it.k} style={{ background: 'var(--ink-1)', padding: '1.15rem 1.2rem' }}>
          <dt
            className="micro"
            style={{ color: ACCENTS[accent], fontSize: '0.66rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}
          >
            {it.k}
          </dt>
          <dd style={{ margin: '0.5rem 0 0', fontSize: 'var(--t-small)', color: 'var(--bone-2)', lineHeight: 1.55 }}>
            {it.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Rule({ style }: { style?: React.CSSProperties }) {
  return <hr className="rule" style={style} />;
}

/** Scroll cue used at the very top. */
export function ScrollCue({ label = 'Scroll' }: { label?: string }) {
  const reduced = useFramerReduced();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }} aria-hidden="true">
      <span className="micro" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span
        style={{
          display: 'block',
          width: 1,
          height: 34,
          background: 'linear-gradient(180deg, var(--line-strong), transparent)',
          animation: reduced ? undefined : 'cue 2.4s ease-in-out infinite',
        }}
      />
      <style>{`@keyframes cue{0%,100%{transform:scaleY(.4);transform-origin:top;opacity:.5}50%{transform:scaleY(1);transform-origin:top;opacity:1}}`}</style>
    </div>
  );
}
