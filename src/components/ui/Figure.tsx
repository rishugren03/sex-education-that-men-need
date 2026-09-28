import { useEffect, useMemo, useState } from 'react';
import { clamp, rand, smoothstep } from '../../lib/math';

const W = 300;
const H = 620;

type Prim =
  | { k: 'e'; x: number; y: number; rx: number; ry: number }
  | { k: 'c'; x1: number; y1: number; x2: number; y2: number; r: number };

/** Limbs and masses the silhouette is built from. Deliberately neutral pose. */
const PRIMS: Prim[] = [
  { k: 'e', x: 150, y: 62, rx: 30, ry: 37 }, // head
  { k: 'c', x1: 150, y1: 96, x2: 150, y2: 112, r: 13 }, // neck
  { k: 'c', x1: 150, y1: 108, x2: 150, y2: 118, r: 45 }, // upper chest
  { k: 'c', x1: 150, y1: 118, x2: 150, y2: 232, r: 41 }, // ribcage
  { k: 'c', x1: 150, y1: 232, x2: 150, y2: 258, r: 36 }, // waist
  { k: 'c', x1: 150, y1: 258, x2: 150, y2: 292, r: 39 }, // hips
  { k: 'c', x1: 118, y1: 116, x2: 96, y2: 200, r: 13 }, // L upper arm
  { k: 'c', x1: 96, y1: 200, x2: 88, y2: 268, r: 10 }, // L forearm
  { k: 'c', x1: 88, y1: 268, x2: 88, y2: 288, r: 9 }, // L hand
  { k: 'c', x1: 182, y1: 116, x2: 204, y2: 200, r: 13 }, // R upper arm
  { k: 'c', x1: 204, y1: 200, x2: 212, y2: 268, r: 10 }, // R forearm
  { k: 'c', x1: 212, y1: 268, x2: 212, y2: 288, r: 9 }, // R hand
  { k: 'c', x1: 130, y1: 292, x2: 122, y2: 420, r: 22 }, // L thigh
  { k: 'c', x1: 122, y1: 420, x2: 118, y2: 556, r: 15 }, // L shin
  { k: 'c', x1: 118, y1: 556, x2: 110, y2: 578, r: 9 }, // L foot
  { k: 'c', x1: 170, y1: 292, x2: 178, y2: 420, r: 22 }, // R thigh
  { k: 'c', x1: 178, y1: 420, x2: 182, y2: 556, r: 15 }, // R shin
  { k: 'c', x1: 182, y1: 556, x2: 190, y2: 578, r: 9 }, // R foot
];

function insidePrim(p: Prim, x: number, y: number) {
  if (p.k === 'e') {
    const dx = (x - p.x) / p.rx;
    const dy = (y - p.y) / p.ry;
    return dx * dx + dy * dy <= 1;
  }
  const vx = p.x2 - p.x1;
  const vy = p.y2 - p.y1;
  const len2 = vx * vx + vy * vy;
  let t = len2 ? ((x - p.x1) * vx + (y - p.y1) * vy) / len2 : 0;
  t = clamp(t);
  const cx = p.x1 + vx * t;
  const cy = p.y1 + vy * t;
  return (x - cx) ** 2 + (y - cy) ** 2 <= p.r * p.r;
}

/** Systems that light up as the reader scrolls through the opening. */
const SYSTEMS = [
  { key: 'nervous', label: 'Nerves', x: 150, y: 70, r: 46, color: 'var(--cyan)', from: 0.16 },
  { key: 'heart', label: 'Heart', x: 143, y: 150, r: 26, color: 'var(--rose)', from: 0.3 },
  { key: 'core', label: 'Organs', x: 150, y: 205, r: 44, color: 'var(--cyan)', from: 0.44 },
  { key: 'pelvic', label: 'Pelvis', x: 150, y: 272, r: 34, color: 'var(--amber)', from: 0.58 },
];

type Props = {
  /** 0→1 scroll progress across the hero block. */
  progress: number;
  className?: string;
};

export function Figure({ progress, className }: Props) {
  const reduced = usePrefersReduced();

  const pts = useMemo(() => {
    const out: { x: number; y: number; d: number; a: number; s: number }[] = [];
    const step = 8.5;
    for (let y = 20; y < H; y += step) {
      for (let x = 42; x < W - 42; x += step) {
        // Hex-ish offset for a denser, more organic lattice.
        const jx = x + (Math.round(y / step) % 2 ? step * 0.5 : 0);
        if (!PRIMS.some((p) => insidePrim(p, jx, y))) continue;
        const n = rand(x * 0.31 + y * 0.17);
        out.push({ x: jx, y, d: Math.hypot((jx - W / 2) / 150, (y - 300) / 310), a: n, s: 0.7 + n * 0.9 });
      }
    }
    return out;
  }, []);

  const p = clamp(progress);

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="fig-glow" cx="50%" cy="42%" r="52%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.13" />
            <stop offset="60%" stopColor="var(--cyan)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </radialGradient>
          <clipPath id="fig-clip">
            <rect x="0" y="0" width={W} height={H * (0.12 + 0.88 * p)} />
          </clipPath>
        </defs>

        <ellipse cx="150" cy="300" rx="150" ry="290" fill="url(#fig-glow)" />

        <g clipPath="url(#fig-clip)">
          {pts.map((q, i) => {
            const reveal = smoothstep(0, 0.55, p - q.d * 0.28);
            const base = 0.1 + q.a * 0.12;
            const lit = Math.max(0, reveal - 0.35) * 0.85;
            return (
              <circle
                key={i}
                cx={q.x}
                cy={q.y}
                r={q.s * (0.9 + lit * 0.5)}
                fill={lit > 0.12 ? 'var(--cyan)' : 'var(--bone)'}
                opacity={Math.min(0.9, base + lit * 0.7)}
              />
            );
          })}
        </g>

        {SYSTEMS.map((s) => {
          const on = smoothstep(s.from, s.from + 0.16, p);
          if (on <= 0.01) return null;
          return (
            <g key={s.key} opacity={on}>
              <circle cx={s.x} cy={s.y} r={s.r * (0.7 + on * 0.35)} fill="none" stroke={s.color} strokeWidth="0.9" opacity={0.55} />
              <circle cx={s.x} cy={s.y} r={s.r * 0.36} fill={s.color} opacity={0.14 + (reduced ? 0 : 0.1 * Math.sin(p * 40 + s.r))} />
            </g>
          );
        })}

        {/* Baseline measurement rule */}
        <line x1="0" y1={H * (0.12 + 0.88 * p)} x2={W} y2={H * (0.12 + 0.88 * p)} stroke="var(--cyan)" strokeWidth="0.7" opacity="0.4" />
      </svg>
    </div>
  );
}

/** Labels that appear beside the figure as each system lights up. */
export function SystemLegend({ progress }: { progress: number }) {
  const p = clamp(progress);
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.5rem' }}>
      {SYSTEMS.map((s) => {
        const on = smoothstep(s.from, s.from + 0.18, p);
        return (
          <li
            key={s.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              opacity: on,
              transform: `translateX(${(1 - on) * -8}px)`,
              transition: 'opacity .4s, transform .4s',
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: 999, background: s.color, flex: '0 0 auto' }} />
            <span className="micro" style={{ letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {s.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function usePrefersReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return r;
}

export { usePrefersReduced };
