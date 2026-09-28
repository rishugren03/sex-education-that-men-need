import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { projectCallouts, useCallouts, useScratch } from '../three/callouts';
import { GroundGlow, LabRings, LightGrid } from '../three/Backdrop';
import { disposeObject } from '../three/geo';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, smoothstep } from '../lib/math';

const ACCENT = '#e8557b';
const GREEN = '#6ecf97';
const CYAN = '#5fd3e8';

const CAMS: { p: [number, number, number]; t: [number, number, number]; ry: number }[] = [
  { p: [0, 0.6, 6.5], t: [0, 0.5, 0], ry: 0.0 },
  { p: [1.8, 0.3, 4.5], t: [0, 0.5, 0], ry: -0.25 },
  { p: [-1.8, 0.3, 4.5], t: [0, 0.5, 0], ry: 0.25 },
  { p: [0, 0.2, 4.0], t: [0, 0.5, 0], ry: 0.0 },
  { p: [0, 0.6, 6.7], t: [0, 0.5, 0], ry: 0.0 },
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

export function TransmissionScene({ progress, reduced, loader }: StageSignal) {
  const { overlay, refs } = useCallouts([
    { key: 'transmission', label: 'Transmission path', side: 'left', lead: 70 },
    { key: 'barrier', label: 'Condom barrier', side: 'right', lead: 64 },
  ]);

  return (
    <>
      <Stage3D fov={35} camera={[0, 0.5, 6.5]} loader={loader}>
        <Lights rim={ACCENT} warm={CYAN} />
        <LabRings radius={3.5} y={-1.8} opacity={0.08} />
        <LightGrid y={-1.83} opacity={0.04} />
        <GroundGlow y={-1.81} scale={8} color={ACCENT} opacity={0.22} />
        <TransmissionModel
          progress={progress}
          reduced={reduced}
          callouts={{ refs, v: useScratch() }}
        />
      </Stage3D>
      {overlay}
    </>
  );
}

const TransmissionModel = memo(function TransmissionModel({
  progress,
  reduced,
  callouts,
}: {
  progress: StageSignal['progress'];
  reduced: boolean;
  callouts: { refs: React.RefObject<Record<string, HTMLElement | null>>; v: THREE.Vector3 };
}) {
  const { camera, gl } = useThree();
  const group = useRef<THREE.Group>(null);
  const anchors = useMemo(() => new Map<string, THREE.Object3D>(), []);
  const activeSet = useRef(new Set<string>());
  const particles = useRef<THREE.Points | null>(null);
  const barrierMesh = useRef<THREE.Mesh | null>(null);
  const spin = useRef(0);
  const wavePhase = useRef(0);

  const g = useMemo(() => {
    const silhouette = new THREE.SphereGeometry(0.9, 24, 16);
    {
      const p = silhouette.attributes.position as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        if (v.y > 0.2) v.y *= 1.15;
        if (v.y < -0.5) v.y *= 0.9;
        v.z *= 0.7;
        p.setXYZ(i, v.x, v.y, v.z);
      }
      silhouette.computeVertexNormals();
    }
    const condom = new THREE.TorusGeometry(0.38, 0.06, 16, 48);
    condom.translate(0, 0.5, 0);
    condom.rotateX(Math.PI / 2);
    const particles = new THREE.BufferGeometry();
    const COUNT = 1800;
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const life = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
      life[i] = -1;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(vel, 3));
    particles.setAttribute('life', new THREE.BufferAttribute(life, 1));
    return { silhouette, condom, particles };
  }, []);

  useEffect(() => () => disposeObject(group.current), []);

  const mats = useMemo(() => {
    const silMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2c3a47'),
      roughness: 0.5,
      metalness: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const condomMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(GREEN),
      roughness: 0.15,
      metalness: 0.05,
      transparent: true,
      opacity: 0.85,
      emissive: new THREE.Color(GREEN),
      emissiveIntensity: 0.08,
    });
    const partMat = new THREE.PointsMaterial({
      size: 0.018,
      color: new THREE.Color(ACCENT),
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const blockedMat = new THREE.PointsMaterial({
      size: 0.018,
      color: new THREE.Color(GREEN),
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    return { silMat, condomMat, partMat, blockedMat };
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
      wavePhase.current += Math.min(dt, 0.05) * 0.8;
    }
    if (group.current) group.current.rotation.y = lerp(group.current.rotation.y, cam.ry + (reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.18) * 0.12), k);

    const p = clamp(progress.get());
    const transmissionActive = p > 0.2 && p < 0.65;
    const barrierActive = p > 0.5;

    if (particles.current && transmissionActive) {
      const pos = particles.current.geometry.attributes.position.array as Float32Array;
      const vel = particles.current.geometry.attributes.velocity.array as Float32Array;
      const life = particles.current.geometry.attributes.life.array as Float32Array;
      const d = Math.min(dt, 0.05);
      for (let i = 0; i < life.length; i++) {
        life[i] -= d;
        if (life[i] <= 0 && Math.random() < 0.12 * d * 60) {
          const side = Math.random() < 0.5 ? -1 : 1;
          pos[i * 3] = side * (2.2 + Math.random() * 0.3);
          pos[i * 3 + 1] = 0.3 + Math.random() * 0.4;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
          vel[i * 3] = -side * (0.6 + Math.random() * 0.4);
          vel[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
          vel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
          life[i] = 2.0 + Math.random() * 1.0;
        }
        if (life[i] > 0) {
          pos[i * 3] += vel[i * 3] * d;
          pos[i * 3 + 1] += vel[i * 3 + 1] * d;
          pos[i * 3 + 2] += vel[i * 3 + 2] * d;
          // Barrier at x=0 when active
          if (barrierActive && Math.sign(pos[i * 3]) !== Math.sign(pos[i * 3] - vel[i * 3] * d) && Math.abs(pos[i * 3]) < 0.45 && Math.abs(pos[i * 3 + 1] - 0.5) < 0.38) {
            // Bounce / deflect
            vel[i * 3] *= -0.8;
            life[i] = 0.05;
          }
        }
      }
      particles.current.geometry.attributes.position.needsUpdate = true;
      particles.current.geometry.attributes.velocity.needsUpdate = true;
      particles.current.geometry.attributes.life.needsUpdate = true;
    }

    if (barrierMesh.current) {
      mats.condomMat.opacity = lerp(mats.condomMat.opacity, barrierActive ? 0.85 : 0.0, k);
      mats.condomMat.emissiveIntensity = lerp(mats.condomMat.emissiveIntensity, barrierActive ? 0.15 : 0.0, k);
    }

    activeSet.current.clear();
    if (transmissionActive && !barrierActive) activeSet.current.add('transmission');
    if (barrierActive) activeSet.current.add('barrier');
    projectCallouts(callouts.refs, activeSet.current, camera, gl.domElement, anchors, callouts.v);
  });

  const reg = (key: string) => (o: THREE.Object3D | null) => {
    if (o) anchors.set(key, o);
  };
  const anchorAt = (key: string, pos: [number, number, number]) => (
    <object3D ref={(o) => o && anchors.set(key, o)} position={pos} />
  );

  return (
    <group ref={group}>
      <group position={[-2.2, 0.5, 0]}>
        <mesh ref={reg('left')} geometry={g.silhouette} material={mats.silMat} />
      </group>
      <group position={[2.2, 0.5, 0]}>
        <mesh ref={reg('right')} geometry={g.silhouette} material={mats.silMat} />
      </group>
      <mesh
        ref={(r) => {
          barrierMesh.current = r;
        }}
        geometry={g.condom}
        material={mats.condomMat}
      />
      <points ref={particles} geometry={g.particles} material={mats.partMat} />
      {anchorAt('transmission', [0, 0.5, 0])}
      {anchorAt('barrier', [0, 0.5, 0])}
    </group>
  );
});