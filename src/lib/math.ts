export const clamp = (v: number, min = 0, max = 1) => (v < min ? min : v > max ? max : v);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const invLerp = (a: number, b: number, v: number) => (b === a ? 0 : (v - a) / (b - a));

/** Map v from [a,b] into [c,d], clamped. */
export const mapRange = (v: number, a: number, b: number, c: number, d: number) =>
  lerp(c, d, clamp(invLerp(a, b, v)));

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp(invLerp(edge0, edge1, x));
  return t * t * (3 - 2 * t);
};

/** Ease helpers used for scroll-driven 3D. */
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Deterministic pseudo-random in [0,1) — stable across renders. */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Pick the largest useful DPR for a given screen without hurting fill-rate. */
export const pickDPR = () => {
  if (typeof window === 'undefined') return 1;
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  let cap = 2;
  if (w < 700) cap = 1.5;
  if (cores <= 4 || mem <= 3) cap = Math.min(cap, 1.25);
  if (cores <= 2 || mem <= 2) cap = 1;
  return Math.min(window.devicePixelRatio || 1, cap);
};

/** Cheap capability tier used to simplify 3D on weak devices. */
export type Tier = 'high' | 'medium' | 'low';
export const getTier = (): Tier => {
  if (typeof window === 'undefined') return 'medium';
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const small = window.innerWidth < 700;
  if (cores <= 4 || mem <= 3) return small ? 'low' : 'medium';
  return small ? 'medium' : 'high';
};
