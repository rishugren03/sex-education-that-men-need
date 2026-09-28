import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import type { Scenario } from '../../content/scenarios';
import { useReducedMotion } from '../../lib/hooks';

const TONE: Record<string, { color: string; label: string }> = {
  good: { color: 'var(--green)', label: 'Respects her' },
  risky: { color: 'var(--amber)', label: 'Grey area' },
  harmful: { color: 'var(--rose)', label: 'Harmful' },
};

export function ScenarioCard({ scenario, index }: { scenario: Scenario; index: number }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const uid = useId();
  const reduced = useReducedMotion();
  const choice = scenario.choices.find((c) => c.id === picked) ?? null;
  const visible = open ?? picked;

  return (
    <article
      style={{
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.008))',
        padding: 'clamp(1.15rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 1,
          background: 'linear-gradient(90deg, var(--cyan), transparent 55%)',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '0.9rem',
        }}
      >
        <span className="micro" style={{ color: 'var(--cyan)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="micro" style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          {scenario.where}
        </span>
      </div>

      <p
        className="serif"
        style={{
          fontSize: 'clamp(1.15rem, 4.4vw, 1.6rem)',
          lineHeight: 1.25,
          color: 'var(--bone)',
          marginBottom: '1.35rem',
          maxWidth: '34ch',
        }}
      >
        {scenario.prompt}
      </p>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.5rem' }}>
        {scenario.choices.map((c) => {
          const isPicked = picked === c.id;
          const isOpen = visible === c.id;
          const tone = TONE[c.tone];
          return (
            <li key={c.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${c.id}`}
                onClick={() => {
                  setPicked(c.id);
                  setOpen(isOpen ? null : c.id);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  font: 'inherit',
                  color: 'inherit',
                  background: isPicked ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isPicked ? tone.color + '55' : 'var(--line)'}`,
                  borderRadius: 'var(--radius)',
                  padding: '0.9rem 1.05rem',
                  display: 'flex',
                  gap: '0.85rem',
                  alignItems: 'flex-start',
                  transition: 'background .3s, border-color .3s',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: '0 0 auto',
                    width: 20,
                    height: 20,
                    marginTop: 2,
                    borderRadius: 5,
                    border: `1px solid ${picked ? tone.color : 'var(--line-strong)'}`,
                    background: isPicked ? tone.color : 'transparent',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    color: '#08090b',
                    fontWeight: 700,
                    transition: 'background .25s, border-color .25s',
                  }}
                >
                  {isPicked ? '✓' : ''}
                </span>
                <span style={{ fontSize: 'var(--t-small)', lineHeight: 1.5, color: 'var(--bone-2)' }}>{c.label}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${uid}-${c.id}`}
                    initial={{ height: reduced ? 'auto' : 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: reduced ? 'auto' : 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        margin: '0.5rem 0 0.35rem',
                        padding: '1.05rem 1.15rem',
                        borderRadius: 'var(--radius)',
                        border: `1px solid ${tone.color}2e`,
                        background: `${tone.color}0d`,
                      }}
                    >
                      <p
                        className="eyebrow"
                        style={{ color: tone.color, fontSize: '0.64rem', marginBottom: '0.6rem' }}
                      >
                        {tone.label}
                      </p>
                      <p style={{ fontSize: 'var(--t-small)', lineHeight: 1.62, color: 'var(--bone-2)' }}>
                        {c.outcome}
                      </p>
                      {c.better ? (
                        <p
                          style={{
                            marginTop: '0.85rem',
                            marginBottom: 0,
                            paddingTop: '0.85rem',
                            borderTop: '1px solid var(--line-soft)',
                            fontSize: 'var(--t-small)',
                            lineHeight: 1.6,
                            color: 'var(--bone)',
                          }}
                        >
                          <span className="micro" style={{ color: 'var(--green)' }}>
                            Better move ·{' '}
                          </span>
                          {c.better}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {choice && (
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="serif"
            style={{
              marginTop: '1.35rem',
              paddingTop: '1.15rem',
              borderTop: '1px solid var(--line-soft)',
              fontSize: 'clamp(1.05rem, 3.9vw, 1.35rem)',
              lineHeight: 1.3,
              color: 'var(--bone)',
              maxWidth: '40ch',
            }}
          >
            {scenario.takeaway}
          </motion.p>
        )}
      </AnimatePresence>
    </article>
  );
}
