import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';
import { useReducedMotion } from '../../lib/hooks';

/**
 * Smooth inertial scrolling. Disabled entirely for reduced-motion users, for
 * touch devices (where native momentum is better), and on low-core machines.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const weak = (navigator.hardwareConcurrency ?? 4) <= 4;
    if (coarse || weak) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      lerp: 0.09,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, [reduced]);

  return <>{children}</>;
}
