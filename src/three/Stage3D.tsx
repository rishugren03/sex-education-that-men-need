import { Canvas, useFrame } from '@react-three/fiber';
import { memo, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { useNearViewport, useReducedMotion } from '../lib/hooks';
import { getTier, pickDPR, type Tier } from '../lib/math';

export type SceneQuality = {
  tier: Tier;
  grid: boolean;
  instances: number;
  antialias: boolean;
};

export const QUALITY: Record<Tier, SceneQuality> = {
  high: { tier: 'high', grid: true, instances: 820, antialias: true },
  medium: { tier: 'medium', grid: true, instances: 420, antialias: true },
  low: { tier: 'low', grid: false, instances: 150, antialias: false },
};

export const useSceneQuality = (): SceneQuality => {
  const [q, setQ] = useState<SceneQuality>(() => QUALITY[getTier()]);
  useEffect(() => {
    // deviceMemory is missing on some browsers at first paint, so re-check once.
    const id = setTimeout(() => setQ(QUALITY[getTier()]), 150);
    return () => clearTimeout(id);
  }, []);
  return q;
};

/** Fires once the first frame has actually been drawn, with a hard timeout. */
function Ready({ onReady }: { onReady: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current) return;
    fired.current = true;
    onReady();
  });
  useEffect(() => {
    const t = setTimeout(onReady, 2200);
    return () => clearTimeout(t);
  }, [onReady]);
  return null;
}

/** Very slow drift so a paused scene never looks like a broken image. */
export const SceneRig = memo(function SceneRig({
  children,
  spin = 0.04,
  reduced = false,
}: {
  children: ReactNode;
  spin?: number;
  reduced?: boolean;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current || reduced) return;
    g.current.rotation.y += Math.min(dt, 0.05) * spin;
  });
  return <group ref={g}>{children}</group>;
});

export const Lights = memo(function Lights({ rim = '#5fd3e8', warm = '#e0a05f' }: { rim?: string; warm?: string }) {
  return (
    <>
      <ambientLight intensity={0.6} color="#c2d0dd" />
      <directionalLight position={[3.4, 5, 4.2]} intensity={1.5} />
      <directionalLight position={[-4.2, 1.4, -3.6]} intensity={1.45} color={rim} />
      <directionalLight position={[-2.2, -3.2, 2.6]} intensity={0.38} color={warm} />
      <hemisphereLight args={['#9fb4c9', '#0a0c0f', 0.55]} />
    </>
  );
});

type Stage3DProps = {
  children: ReactNode;
  className?: string;
  fog?: boolean;
  camera?: [number, number, number];
  fov?: number;
  style?: React.CSSProperties;
  /** Wraps children in a slowly rotating group. */
  rig?: boolean;
  /** Optional instrument loader shown until the first frame is drawn. */
  loader?: ReactNode;
  accent?: string;
};

/**
 * Shared WebGL surface. Owns DPR clamping, the scroll-visibility gate,
 * transparent background, the loading veil, and full teardown on unmount.
 */
export function Stage3D({
  children,
  className,
  fog = true,
  camera = [0, 0, 6],
  fov = 34,
  style,
  rig = true,
  loader,
  accent = 'var(--cyan)',
}: Stage3DProps) {
  const [setRef, near] = useNearViewport<HTMLDivElement>('260px');
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const dpr = pickDPR();

  return (
    <div ref={setRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <Canvas
        frameloop={near ? 'always' : 'never'}
        dpr={dpr}
        gl={{
          antialias: dpr < 1.5,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: camera, fov, near: 0.1, far: 80 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
        }}
      >
        {fog && <fog attach="fog" args={['#08090b', 6.5, 19]} />}
        <Suspense fallback={null}>
          {rig ? <SceneRig reduced={reduced}>{children}</SceneRig> : children}
          <Ready onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>
      {ready ? null : (
        <>
          <div className="stage__veil" style={{ background: accent }} aria-hidden="true" />
          <div className="stage__loader" aria-live="polite">
            {loader ?? <DefaultLoader />}
          </div>
        </>
      )}
    </div>
  );
}

function DefaultLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="stage__ring">
        <circle cx="9" cy="9" r="7.2" fill="none" stroke="var(--bone-4)" strokeWidth="1" opacity="0.22" />
        <circle
          cx="9"
          cy="9"
          r="7.2"
          fill="none"
          stroke="var(--cyan)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="11 35"
        />
      </svg>
      <span className="micro" style={{ letterSpacing: '0.18em' }}>
        PREPARING MODEL
      </span>
      <style>{`@keyframes stage-spin{to{transform:rotate(360deg)}}
        .stage__ring{animation:stage-spin 2.6s linear infinite;transform-origin:9px 9px}`}</style>
    </div>
  );
}
