import type { ReactNode } from 'react';
import { Reveal } from './primitives';

export function ChapterMark({ n, accent = 'cyan', label }: { n: number; accent?: string; label?: string }) {
  const color =
    accent === 'rose'
      ? 'var(--rose)'
      : accent === 'amber'
        ? 'var(--amber)'
        : accent === 'green'
          ? 'var(--green)'
          : accent === 'violet'
            ? 'var(--violet)'
            : accent === 'blue'
              ? 'var(--blue)'
              : 'var(--cyan)';
  return (
    <div className="chapmark">
      <span className="chapmark__n" style={{ color }}>
        {String(n).padStart(2, '0')}
      </span>
      {label ? (
        <span className="micro" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          {label}
        </span>
      ) : null}
      <span className="chapmark__line" />
    </div>
  );
}

export function MythGrid({ items }: { items: { claim: string; truth: ReactNode }[] }) {
  return (
    <div className="grid-3">
      {items.map((m, i) => (
        <Reveal key={m.claim} delay={i * 0.05}>
          <div className="myth">
            <p className="myth__claim">&ldquo;{m.claim}&rdquo;</p>
            <p className="myth__truth">{m.truth}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function DoDont({
  dont,
  do: doItems,
  accent = 'green',
}: {
  dont: ReactNode[];
  do: ReactNode[];
  accent?: 'green' | 'cyan' | 'amber';
}) {
  return (
    <div className="dodont">
      <Reveal>
        <div className="dodont__col">
          <h4 style={{ color: 'var(--rose)' }}>✕ Don&apos;t</h4>
          <ul>
            {dont.map((d, i) => (
              <li key={i}>
                <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--rose)' }}>✕</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="dodont__col">
          <h4 style={{ color: `var(--${accent})` }}>✓ Do</h4>
          <ul>
            {doItems.map((d, i) => (
              <li key={i}>
                <span style={{ position: 'absolute', left: 0, top: 0, color: `var(--${accent})` }}>✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

export function Ladder({
  rows,
}: {
  rows: { n: string; t: ReactNode; tone?: 'ok' | 'warn' | 'bad' }[];
}) {
  const color = { ok: 'var(--green)', warn: 'var(--amber)', bad: 'var(--rose)' };
  return (
    <div className="ladder">
      {rows.map((r) => (
        <Reveal key={r.n} delay={0.04}>
          <div className="ladder__row">
            <span className="ladder__n" style={{ color: color[r.tone ?? 'ok'] }}>
              {r.n}
            </span>
            <span className="ladder__t">{r.t}</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Compare({
  left,
  right,
  rows,
}: {
  left: { title: string; color: string };
  right: { title: string; color: string };
  rows: { l: ReactNode; r: ReactNode }[];
}) {
  return (
    <div className="compare">
      <div className="compare__cell" style={{ background: 'var(--ink-1)' }}>
        <h4 style={{ color: left.color }}>{left.title}</h4>
        {rows.map((r, i) => (
          <div className="compare__row" key={i}>
            <span className="micro" style={{ letterSpacing: '0.1em' }}>
              {r.l}
            </span>
          </div>
        ))}
      </div>
      <div className="compare__cell" style={{ background: 'var(--ink-1)' }}>
        <h4 style={{ color: right.color }}>{right.title}</h4>
        {rows.map((r, i) => (
          <div className="compare__row" key={i}>
            <span style={{ color: 'var(--bone-2)' }}>{r.r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sources({ items }: { items: string[] }) {
  return (
    <Reveal>
      <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.1rem', maxWidth: 'var(--measure)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.7rem', fontSize: '0.64rem' }}>
          Based on
        </p>
        <p className="micro" style={{ lineHeight: 1.7 }}>
          {items.join(' · ')}
        </p>
      </div>
    </Reveal>
  );
}
