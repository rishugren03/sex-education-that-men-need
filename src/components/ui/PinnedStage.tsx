import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../../lib/hooks';
import { clamp } from '../../lib/math';
import { ACCENTS } from './primitives';

export type StageStep = {
  tag?: string;
  title: ReactNode;
  body?: ReactNode;
  aside?: ReactNode;
};

/** What a scroll-driven scene receives. Values are live MotionValues. */
export type StageSignal = {
  /** Smoothed 0→1 scroll position across the whole pinned block. */
  progress: MotionValue<number>;
  /** Rounded step index, 0-based. */
  step: MotionValue<number>;
  /** 0→1 position inside the current step. */
  local: MotionValue<number>;
  reduced: boolean;
  /** Loader node for this stage. */
  loader?: ReactNode;
  /** Accent colour for the stage chrome. */
  accent: string;
};

type Props = {
  id: string;
  accent: 'cyan' | 'blue' | 'rose' | 'amber' | 'green' | 'violet';
  steps: StageStep[];
  scene: (s: StageSignal) => ReactNode;
  caption?: ReactNode;
  side?: 'left' | 'right';
  mobileHeight?: string;
  loader?: ReactNode;
  alt: string;
};

export function PinnedStage({
  id,
  accent,
  steps,
  scene,
  caption,
  side = 'left',
  mobileHeight = '46svh',
  loader,
  alt,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.55 });
  const n = Math.max(1, steps.length - 1);

  const stepMV = useTransform(smooth, (v) => clamp(Math.round(clamp(v) * n), 0, n));
  const localRaw = useTransform(smooth, (v) => {
    const f = clamp(v) * n;
    return f - Math.floor(f);
  });
  const local = useSpring(localRaw, { stiffness: 130, damping: 30, mass: 0.3 });

  const [step, setStep] = useState(0);
  stepMV.on('change', setStep);

  const color = ACCENTS[accent];

  return (
    <div ref={wrap} className="stage" id={id}>
      <div className={`stage__grid stage__grid--${side}`}>
        <div className="stage__sticky" style={{ ['--stage-h' as string]: mobileHeight }}>
          <div className="stage__canvas">
            <div className="stage__scene" role="img" aria-label={alt}>
              {scene({ progress: smooth, step: stepMV, local, reduced, loader, accent: color })}
            </div>
            <div className="stage__frame" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            {caption ? <div className="stage__caption">{caption}</div> : null}
          </div>
        </div>

        <div className="stage__steps">
          {steps.map((s, i) => (
            <div className="stage__step" key={i}>
              <div className="stage__stepInner">
                <motion.div
                  animate={{ opacity: step === i ? 1 : 0.22 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {s.tag ? (
                    <p className="eyebrow" style={{ color, marginBottom: '0.9rem' }}>
                      {s.tag}
                    </p>
                  ) : null}
                  <h3
                    className="serif"
                    style={{
                      fontSize: 'clamp(1.6rem, 6.2vw, 3.1rem)',
                      lineHeight: 1.05,
                      marginBottom: s.body ? '0.95rem' : 0,
                    }}
                  >
                    {s.title}
                  </h3>
                  {s.body ? (
                    <div className="body" style={{ fontSize: 'var(--t-small)', maxWidth: '30rem' }}>
                      {s.body}
                    </div>
                  ) : null}
                  {s.aside ? <div style={{ marginTop: '1.5rem' }}>{s.aside}</div> : null}
                </motion.div>
              </div>
            </div>
          ))}
          <div className="stage__tail" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
