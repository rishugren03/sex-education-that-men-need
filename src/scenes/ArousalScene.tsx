import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { LabRings, LightGrid } from '../three/Backdrop';
import { curveFrom, disposeObject, loftTube } from '../three/geo';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, smoothstep } from '../lib/math';

const ACCENT = '#5b8ad6';

const CAMS: { p: [number, number, number]; t: [number, number, number]; ry: number }[] = [
  { p: [0, 1.0, 6.5], t: [0, 0.8, 0], ry: 0.0 },
  { p: [1.2, 0.8, 4.5], t: [0, 0.5, 0], ry: -0.15 },
  { p: [0.8, 1.4, 4.0], t: [0, 0.9, 0], ry: 0.05 },
  { p: [0, 0.6, 7.0], t: [0, 0.8, 0], ry: 0.0 },
];

function sampleCams(c: number) {
  const i = clamp(Math.floor(c), 0, CAMS.length - 1);
  const j = Math.min(i + 1, CAMS.length - 1);
  const t = smoothstep(0, 1, clamp(c - i));
  const a = CAMS[i];
  const b = CAMS[j];
  return {
    p: [lerp(a.p[0], b.p[0], t), lerp(a.p[1], b.p[1], t), lerp(a.p[2], b.p[2], t)] as [number, number, number],
    t: [lerp(a.t[0], b.t[0], t), lerp(a.t[1], b.t[1], t), lerp(a.t[2], b.t[2], t)] as [number, number, number],
    ry: lerp(a.ry, b.ry, t),
  };
}

export function ArousalScene({ progress, reduced, loader }: StageSignal) {
  return (
    <Stage3D fov={35} camera={[0, 0.8, 6.5]} loader={loader}>
      <Lights rim={ACCENT} warm="#e0a05f" />
      <LabRings radius={3.5} y={-1.8} opacity={0.08} />
      <LightGrid y={-1.83} opacity={0.04} />
      <ArousalModel progress={progress} reduced={reduced} />
    </Stage3D>
  );
}

const ArousalModel = memo(function ArousalModel({
  progress,
  reduced,
}: {
  progress: StageSignal['progress'];
  reduced: boolean;
}) {
  const { camera } = useThree();
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Points | null>(null);
  const brainGroup = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const wavePhase = useRef(0);

  const g = useMemo(() => {
    const brain = new THREE.SphereGeometry(0.8, 24, 16);
    {
      const p = brain.attributes.position as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        if (v.z < -0.1) v.z *= 0.7;
        if (v.x > 0.3) v.x *= 1.15;
        p.setXYZ(i, v.x, v.y, v.z);
      }
      brain.computeVertexNormals();
    }
    const spine = loftTube(
      curveFrom([
        [0, 0.5, 0],
        [0, 0.1, -0.05],
        [0, -0.3, -0.1],
        [0, -0.7, -0.1],
      ]),
      (t) => 0.06 + 0.05 * Math.sin(t * Math.PI),
      24,
      8,
    );
    const particles = new THREE.BufferGeometry();
    const COUNT = 2400;
    const pos = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 0.6;
      const h = -0.5 + Math.random() * 1.8;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = h;
      pos[i * 3 + 2] = Math.sin(a) * r;
      size[i] = 0.012 + Math.random() * 0.018;
      phase[i] = Math.random() * Math.PI * 2;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(size, 1));
    particles.setAttribute('phase', new THREE.BufferAttribute(phase, 1));
    return { brain, spine, particles };
  }, []);

  useEffect(() => () => disposeObject(group.current), []);

  const mats = useMemo(() => {
    const brainMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a2838'),
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const spineMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a3f5a'),
      roughness: 0.4,
      metalness: 0.1,
    });
    const partMat = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: false,
      transparent: true,
      opacity: 0.7,
      color: new THREE.Color(ACCENT),
      sizeAttenuation: true,
    });
    return { brainMat, spineMat, partMat };
  }, []);

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useFrame((state, dt) => {
    const c = clamp(progress.get(), 0, 1) * (CAMS.length - 1);
    const k = 1 - Math.exp(-6 * Math.min(dt, 0.1));

    const cam = sampleCams(c);
    camera.position.lerp(new THREE.Vector3(...cam.p), k);
    camera.lookAt(new THREE.Vector3(...cam.t));

    if (!reduced) {
      spin.current += Math.min(dt, 0.05) * 0.12;
      wavePhase.current += Math.min(dt, 0.05) * 1.2;
    }
    if (group.current) group.current.rotation.y = lerp(group.current.rotation.y, cam.ry + (reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.18) * 0.12), k);

    const p = clamp(progress.get());
    
    const waveHeight = smoothstep(0, 0.3, p) * (1 - smoothstep(0.7, 1, p));
    const pulse = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 2.5);

    if (particles.current) {
      const pos = particles.current.geometry.attributes.position.array as Float32Array;
      const phases = particles.current.geometry.attributes.phase.array as Float32Array;
      for (let i = 0; i < pos.length / 3; i++) {
        const ph = phases[i];
        pos[i * 3 + 1] = -0.5 + 1.8 * (0.5 + 0.5 * Math.sin(wavePhase.current * 0.8 + ph)) * waveHeight;
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
      mats.partMat.opacity = lerp(mats.partMat.opacity, 0.3 + 0.5 * waveHeight, k);
    }

    if (brainGroup.current) {
      brainGroup.current.rotation.y = lerp(brainGroup.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.25) * 0.18, k);
    }

    const brainMat = mats.brainMat;
    brainMat.color.lerp(new THREE.Color(waveHeight > 0.3 ? '#2a5a8a' : '#1a2838'), k);
    brainMat.emissiveIntensity = lerp(brainMat.emissiveIntensity, 0.05 + 0.25 * waveHeight * pulse, k);
  });

  return (
    <group ref={group}>
      <points ref={particles} geometry={g.particles} material={mats.partMat} />
      <group ref={brainGroup} position={[0, 0.8, 0]}>
        <mesh geometry={g.brain} material={mats.brainMat} />
      </group>
      <mesh geometry={g.spine} material={mats.spineMat} />
    </group>
  );
});