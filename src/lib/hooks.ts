import { useEffect, useState } from 'react';
import { clamp } from './math';

const QUERY = '(prefers-reduced-motion: reduce)';
const KEY = 'taught:reduced-motion';

/**
 * Reduced-motion signal that also honours an explicit user override stored in
 * localStorage. Returns true when motion should be suppressed.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem(KEY);
    if (stored === '1') return true;
    if (stored === '0') return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => {
      if (window.localStorage.getItem(KEY)) return;
      setReduced(mq.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function setMotionOverride(value: 'auto' | 'on' | 'off') {
  if (typeof window === 'undefined') return;
  if (value === 'auto') window.localStorage.removeItem(KEY);
  else window.localStorage.setItem(KEY, value === 'off' ? '1' : '0');
}

export function getMotionOverride(): 'auto' | 'on' | 'off' {
  if (typeof window === 'undefined') return 'auto';
  const v = window.localStorage.getItem(KEY);
  return v === '1' ? 'off' : v === '0' ? 'on' : 'auto';
}

/** True when the viewport is at least `px` CSS pixels wide. */
export function useMinWidth(px: number) {
  const [ok, setOk] = useState(() => (typeof window === 'undefined' ? true : window.innerWidth >= px));
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [px]);
  return ok;
}

/** Simple in-view flag that stays true for a margin, used to gate 3D frameloops. */
export function useNearViewport<T extends HTMLElement>(rootMargin = '300px') {
  const [ref, setRef] = useState<T | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const io = new IntersectionObserver((entries) => setNear(entries[0].isIntersecting), { rootMargin });
    io.observe(ref);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return [setRef, near] as const;
}

let cachedWebGL: boolean | null = null;
/** Whether a WebGL context can actually be created in this browser. */
export function supportsWebGL(): boolean {
  if (cachedWebGL !== null) return cachedWebGL;
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('experimental-webgl');
    cachedWebGL = !!gl;
    const lose = gl && 'getExtension' in gl ? (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context') : null;
    lose?.loseContext();
  } catch {
    cachedWebGL = false;
  }
  return cachedWebGL;
}

export function useWebGL(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(supportsWebGL()), []);
  return ok;
}

/** Save/restore the reading position so a refresh does not dump the reader at the top. */
export function useScrollRestoration(key = 'taught:pos') {
  useEffect(() => {
    const KEY = `${key}:y`;
    let y = 0;
    try {
      y = Number(sessionStorage.getItem(KEY) ?? 0);
    } catch {
      /* private mode */
    }
    if (y > 400) {
      // Two frames: one for layout, one for image/font-free layout to settle.
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        try {
          sessionStorage.setItem(KEY, String(Math.round(window.scrollY)));
        } catch {
          /* ignore */
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [key]);
}

export { clamp };
