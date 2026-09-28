import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { GroundGlow, LabRings, LightGrid } from '../three/Backdrop';
import { disposeObject } from '../three/geo';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, smoothstep } from '../lib/math';

const ACCENT = '#e8557b';
const CYAN = '#5fd3e8';

const CAMS: { p: [number, number, number]; t: [number, number, number]; ry: number }[] = [
  { p: [0.1, 0.7, 5.8], t: [0, 0.4, 0], ry: 0.0 },
  { p: [0.7, 0.3, 3.8], t: [0, 0.7, -0.15], ry: -0.15 },
  { p: [0.2, 1.1, 3.4], t: [0, 1.55, -0.3], ry: 0.05 },
  { p: [0.6, 0.8, 3.5], t: [0, 0.9, -0.05], ry: 0.1 },
  { p: [-0.1, 0.55, 6.0], t: [0, 0.4, 0], ry: 0.0 },
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

const PHASES = [
  { key: 'period', label: 'Menstruation', color: ACCENT, start: 0.0, end: 0.18 },
  { key: 'follicular', label: 'Follicular', color: CYAN, start: 0.18, end: 0.45 },
  { key: 'ovulation', label: 'Ovulation', color: '#e0a05f', start: 0.45, end: 0.55 },
  { key: 'luteal', label: 'Luteal', color: '#5b8ad6', start: 0.55, end: 1.0 },
];

export function CycleScene({ progress, reduced, loader }: StageSignal) {
  return (
    <Stage3D fov={30} camera={[0, 0.6, 5.8]} loader={loader}>
      <Lights rim={ACCENT} />
      <LabRings radius={3.0} y={-1.6} opacity={0.1} />
      <LightGrid y={-1.63} opacity={0.05} />
      <GroundGlow y={-1.61} scale={7} color={ACCENT} opacity={0.28} />
      <CycleModel progress={progress} reduced={reduced} />
    </Stage3D>
  );
}

const CycleModel = memo(function CycleModel({
  progress,
  reduced,
}: {
  progress: StageSignal['progress'];
  reduced: boolean;
}) {
  const { camera } = useThree();
  const group = useRef<THREE.Group>(null);
  const phaseIndex = useRef(0);
  const spin = useRef(0);
  const follicleScale = useRef(0.4);

  const g = useMemo(() => {
    const uterus = new THREE.SphereGeometry(1, 32, 24);
    {
      const p = uterus.attributes.position as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        const k = v.y > -0.2 ? 1 + 0.7 * v.y : 1 + 0.3 * v.y;
        v.x *= 0.55 * k;
        v.z *= 0.5 * k;
        v.y *= 1.15;
        p.setXYZ(i, v.x, v.y, v.z);
      }
      uterus.computeVertexNormals();
    }
    const ovaryL = new THREE.SphereGeometry(0.3, 20, 16);
    const ovaryR = new THREE.SphereGeometry(0.3, 20, 16);
    const follicle = new THREE.SphereGeometry(1, 16, 12);
    const lining = new THREE.SphereGeometry(1, 28, 20);
    return { uterus, ovaryL, ovaryR, follicle, lining };
  }, []);

  useEffect(() => () => disposeObject(group.current), []);

  const mats = useMemo(() => {
    const make = (c: string, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(c),
        roughness: 0.5,
        metalness: 0.08,
        emissive: new THREE.Color(c),
        emissiveIntensity: 0.03,
        transparent: true,
        opacity: 1,
        ...opts,
      });
    return {
      uterus: make('#2c3a47', { roughness: 0.3, metalness: 0.12, transparent: true, opacity: 0.9 }),
      ovary: make('#3d4f5a', { roughness: 0.5 }),
      follicle: make('#e0a05f', { roughness: 0.25, metalness: 0.15, emissive: new THREE.Color('#e0a05f'), emissiveIntensity: 0.12 }),
      lining: make(ACCENT, { roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.65, depthWrite: false, side: THREE.DoubleSide }),
    };
  }, []);

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useFrame((state, dt) => {
    const c = clamp(progress.get(), 0, 1) * (CAMS.length - 1);
    const k = 1 - Math.exp(-6 * Math.min(dt, 0.1));

    const cam = sampleCams(c);
    camera.position.lerp(new THREE.Vector3(...cam.p), k);
    camera.lookAt(new THREE.Vector3(...cam.t));

    if (!reduced) spin.current += Math.min(dt, 0.05) * 0.18;
    if (group.current) {
      group.current.rotation.y = lerp(group.current.rotation.y, cam.ry + (reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.2) * 0.14), k);
    }

    const p = clamp(progress.get());
    let idx = 0;
    for (let i = 0; i < PHASES.length; i++) {
      if (p >= PHASES[i].start && p < PHASES[i].end) idx = i;
    }
    if (p >= PHASES[PHASES.length - 1].end) idx = PHASES.length - 1;
    phaseIndex.current = idx;
    const phase = PHASES[idx];

    const targetFollicle = idx === 2 ? 1.0 : idx === 1 ? 0.4 + 0.55 * smoothstep(0, 0.27, p - 0.18) : 0.12;
    follicleScale.current = lerp(follicleScale.current, targetFollicle, k * 1.5);

    const liningTarget = idx === 3 ? 1.18 : idx === 0 ? 0.35 : idx === 1 ? 0.35 + 0.7 * smoothstep(0, 0.27, p - 0.18) : 0.95;
    if (group.current) {
      const lining = group.current.getObjectByName('lining') as THREE.Mesh;
      if (lining) lining.scale.setScalar(lerp(lining.scale.x, liningTarget, k * 1.2));
    }

    const uterusMat = mats.uterus;
    const ovaryMat = mats.ovary;
    const follicleMat = mats.follicle;
    const liningMat = mats.lining;
    const phaseColor = new THREE.Color(phase.color);

    uterusMat.color.lerp(phaseColor.clone().multiplyScalar(0.15).add(new THREE.Color(DIM)), k);
    uterusMat.emissiveIntensity = lerp(uterusMat.emissiveIntensity, 0.04 + 0.12 * (idx === 0 ? 0.3 : idx === 2 ? 0.6 : 0.2), k);
    ovaryMat.color.lerp(phaseColor.clone().multiplyScalar(0.2).add(new THREE.Color(DIM)), k);
    follicleMat.color.lerp(phaseColor, k);
    follicleMat.emissiveIntensity = lerp(follicleMat.emissiveIntensity, idx === 2 ? 0.4 : 0.08, k);
    liningMat.color.lerp(phaseColor, k);
    liningMat.opacity = lerp(liningMat.opacity, idx === 0 ? 0.3 : idx === 2 ? 0.7 : 0.55, k);
  });

  return (
    <group ref={group}>
      <mesh name="lining" geometry={g.lining} material={mats.lining} scale={1.02} position={[0, 0.55, -0.02]} />
      <mesh geometry={g.uterus} material={mats.uterus} position={[0, 0.55, -0.02]} />
      <group position={[-0.62, 1.65, -0.3]}>
        <mesh geometry={g.ovaryL} material={mats.ovary} name="ovaryL" />
        <mesh
          name="follicleL"
          geometry={g.follicle}
          material={mats.follicle}
          scale={[0.12, 0.12, 0.12]}
        >
          <object3D
            ref={(o) => {
              if (o) o.scale.set(follicleScale.current, follicleScale.current, follicleScale.current);
            }}
          />
        </mesh>
      </group>
      <group position={[0.62, 1.65, -0.3]}>
        <mesh geometry={g.ovaryR} material={mats.ovary} name="ovaryR" />
        <mesh
          name="follicleR"
          geometry={g.follicle}
          material={mats.follicle}
          scale={[0.12, 0.12, 0.12]}
        >
          <object3D
            ref={(o) => {
              if (o) o.scale.set(follicleScale.current, follicleScale.current, follicleScale.current);
            }}
          />
        </mesh>
      </group>
    </group>
  );
});

const DIM = '#2c3a47';