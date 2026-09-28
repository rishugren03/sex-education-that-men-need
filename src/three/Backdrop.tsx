import { useMemo } from 'react';
import * as THREE from 'three';

/** Soft radial glow texture, generated once and cached. */
let glowTex: THREE.Texture | null = null;
export function radialGlow(color = '#5fd3e8', softness = 0.55) {
  if (glowTex && (glowTex.userData.color as string) === color) return glowTex;
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  const rgb = new THREE.Color(color);
  const hex = `${Math.round(rgb.r * 255)},${Math.round(rgb.g * 255)},${Math.round(rgb.b * 255)}`;
  g.addColorStop(0, `rgba(${hex},${softness})`);
  g.addColorStop(0.45, `rgba(${hex},${softness * 0.28})`);
  g.addColorStop(1, `rgba(${hex},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData.color = color;
  glowTex = tex;
  return tex;
}

/** Horizontal glow beneath a floating anatomical model. */
export function GroundGlow({ y = -1.9, scale = 7, color = '#5fd3e8', opacity = 0.3 }: { y?: number; scale?: number; color?: string; opacity?: number }) {
  const tex = useMemo(() => radialGlow(color), [color]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} renderOrder={-1}>
      <planeGeometry args={[scale, scale * 0.72]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} opacity={opacity} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/**
 * Concentric measurement rings + tick marks. This is the single strongest
 * "scientific visualisation, not erotic image" signal in the whole project.
 */
export function LabRings({
  radius = 3.1,
  count = 4,
  color = '#5fd3e8',
  opacity = 0.12,
  y = 0,
  tilt = -Math.PI / 2,
}: {
  radius?: number;
  count?: number;
  color?: string;
  opacity?: number;
  y?: number;
  tilt?: number;
}) {
  const geo = useMemo(
    () => new THREE.RingGeometry(0.985, 1, 128, 1).toNonIndexed(),
    [],
  );
  return (
    <group position={[0, y, 0]} rotation={[tilt, 0, 0]}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} geometry={geo} scale={radius * (0.42 + i * 0.19)} renderOrder={-2}>
          <meshBasicMaterial color={color} transparent opacity={opacity * (1 - i * 0.16)} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
      {Array.from({ length: 48 }, (_, i) => {
        const a = (i / 48) * Math.PI * 2;
        const long = i % 4 === 0;
        const r0 = radius;
        const r1 = radius * (long ? 1.09 : 1.045);
        return (
          <line key={`t${i}`}>
            <bufferGeometry
              attach="geometry"
              onUpdate={(self) => {
                const g = self as THREE.BufferGeometry;
                g.setAttribute('position', new THREE.Float32BufferAttribute([Math.cos(a) * r0, Math.sin(a) * r0, 0, Math.cos(a) * r1, Math.sin(a) * r1, 0], 3));
              }}
            />
            <lineBasicMaterial color={color} transparent opacity={opacity * 0.8} />
          </line>
        );
      })}
    </group>
  );
}

/** A thin rectangular reference grid on a plane, like a light table. */
export function LightGrid({ size = 12, div = 24, color = '#5fd3e8', opacity = 0.055, y = -2.1 }: { size?: number; div?: number; color?: string; opacity?: number; y?: number }) {
  const geo = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i <= div; i++) {
      const p = -size / 2 + (size / div) * i;
      pts.push(p, 0, -size / 2, p, 0, size / 2);
      pts.push(-size / 2, 0, p, size / 2, 0, p);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [size, div]);
  return (
    <lineSegments position={[0, y, 0]} geometry={geo} renderOrder={-2}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}
