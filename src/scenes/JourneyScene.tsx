import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { projectCallouts, useCallouts, useScratch } from '../three/callouts';
import { useI18n } from '../i18n';
import { GroundGlow, LabRings, LightGrid } from '../three/Backdrop';
import { curveFrom, disposeObject, loftTube } from '../three/geo';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, rand, smoothstep } from '../lib/math';

const ACCENT = '#5fd3e8';
const AMBER = '#e0a05f';
const ROSE = '#e8557b';

const CAMS: { p: [number, number, number]; t: [number, number, number]; ry: number }[] = [
  { p: [0.1, 0.6, 6.2], t: [0, 0.8, 0], ry: 0.0 },
  { p: [1.5, 0.3, 4.0], t: [0.3, 0.9, -0.2], ry: -0.25 },
  { p: [0.8, 1.2, 3.8], t: [0, 1.5, -0.3], ry: 0.1 },
  { p: [0.2, 0.7, 4.2], t: [0, 0.2, 0.4], ry: 0.15 },
  { p: [-0.1, 0.6, 6.4], t: [0, 0.5, 0], ry: 0.0 },
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

const PARTS = ['sperm', 'egg', 'embryo', 'uterus', 'tube'] as const;
type PartKey = (typeof PARTS)[number];

const STEP_PARTS: Partial<Record<number, PartKey[]>> = {
  1: ['sperm'],
  2: ['egg'],
  3: ['sperm', 'egg'],
  4: ['embryo'],
  5: ['uterus', 'embryo'],
};

export function JourneyScene({ progress, reduced, loader }: StageSignal) {
  const { term } = useI18n();
  const { overlay, refs } = useCallouts([
    { key: 'sperm', label: term('term.sperm'), side: 'left', lead: 56 },
    { key: 'egg', label: term('term.egg'), side: 'right', lead: 62 },
    { key: 'embryo', label: term('term.embryo'), side: 'right', lead: 58, offsetY: 28 },
    { key: 'uterus', label: term('term.uterineWall'), side: 'left', lead: 64 },
  ]);

  return (
    <>
      <Stage3D fov={32} camera={[0, 0.6, 6.2]} loader={loader}>
        <Lights rim={ACCENT} warm={AMBER} />
        <LabRings radius={3.2} y={-1.7} opacity={0.1} />
        <LightGrid y={-1.73} opacity={0.05} />
        <GroundGlow y={-1.71} scale={8} color={ACCENT} opacity={0.24} />
        <JourneyModel
          progress={progress}
          reduced={reduced}
          callouts={{ refs, v: useScratch() }}
        />
      </Stage3D>
      {overlay}
    </>
  );
}

const JourneyModel = memo(function JourneyModel({
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
  const parts = useRef<Partial<Record<PartKey, THREE.Object3D>>>({});
  const anchors = useMemo(() => new Map<string, THREE.Object3D>(), []);
  const activeSet = useRef(new Set<string>());
  const spin = useRef(0);
  const spermPositions = useRef<Float32Array>();
  const spermPhases = useRef<Float32Array>();
  const spermMesh = useRef<THREE.Points | null>(null);
  const embryoScale = useRef(0.1);

  const g = useMemo(() => {
    const tube = loftTube(
      curveFrom([
        [0, 0.8, -0.4],
        [0, 0.9, -0.1],
        [0, 1.1, 0.15],
        [0, 1.3, 0.35],
        [0, 1.4, 0.5],
        [0, 1.45, 0.65],
      ]),
      (t) => 0.18 * (1 - 0.2 * t),
      60,
      12,
    );
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
    const egg = new THREE.SphereGeometry(0.16, 20, 16);
    const spermGeo = new THREE.CapsuleGeometry(0.018, 0.045, 4, 8);
    const embryo = new THREE.SphereGeometry(0.12, 16, 12);
    return { tube, uterus, egg, spermGeo, embryo };
  }, []);

  useEffect(() => {
    const COUNT = 300;
    const pos = new Float32Array(COUNT * 3);
    const phase = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random();
      const base = new THREE.Vector3();
      // Build a simple tube path point
      const curve = curveFrom([
        [0, 0.8, -0.4],
        [0, 0.9, -0.1],
        [0, 1.1, 0.15],
        [0, 1.3, 0.35],
        [0, 1.4, 0.5],
        [0, 1.45, 0.65],
      ]);
      curve.getPointAt(t, base);
      pos[i * 3] = base.x + (rand(i * 1.3) - 0.5) * 0.08;
      pos[i * 3 + 1] = base.y + (rand(i * 2.1) - 0.5) * 0.08;
      pos[i * 3 + 2] = base.z + (rand(i * 3.1) - 0.5) * 0.08;
      phase[i] = Math.random() * Math.PI * 2;
    }
    spermPositions.current = pos;
    spermPhases.current = phase;
    return () => {
      spermPositions.current = undefined;
      spermPhases.current = undefined;
    };
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
      tube: make('#1e2a3a', { roughness: 0.4, metalness: 0.08, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide }),
      uterus: make('#2c3a47', { roughness: 0.3, metalness: 0.12, transparent: true, opacity: 0.85 }),
      egg: make(ROSE, { roughness: 0.25, metalness: 0.15, emissive: new THREE.Color(ROSE), emissiveIntensity: 0.12 }),
      sperm: new THREE.PointsMaterial({
        size: 0.025,
        color: new THREE.Color(ACCENT),
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      }),
      embryo: make(AMBER, { roughness: 0.2, metalness: 0.15, emissive: new THREE.Color(AMBER), emissiveIntensity: 0.15 }),
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
    if (group.current) group.current.rotation.y = lerp(group.current.rotation.y, cam.ry + (reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.2) * 0.14), k);

    const p = clamp(progress.get());
    const s = Math.round(c);
    const lit = STEP_PARTS[s] ?? [];
    const xray = s >= 2 ? 1 : 0;

    activeSet.current.clear();
    for (const key of PARTS) {
      const obj = parts.current[key];
      if (!obj) continue;
      // explode handled via position lerp in reg
      const isLit = lit.includes(key);
      if (isLit) activeSet.current.add(key);
      const m = mats[key as keyof typeof mats];
      if (m) {
        const targetOp = isLit ? 1 : lit.length ? 1 - xray * 0.6 : 0.9;
        m.opacity = lerp(m.opacity, targetOp, k);
        if (key !== 'uterus') {
          const targetColor = isLit
            ? key === 'sperm' ? ACCENT : key === 'egg' ? ROSE : AMBER
            : '#2c3a47';
          if (m.color) m.color.lerp(new THREE.Color(targetColor), k * 1.2);
        }
      }
    }

    // Animate sperm swimming
    if (spermMesh.current && spermPositions.current && spermPhases.current) {
      const pos = spermPositions.current;
      const phases = spermPhases.current;
      const swimProgress = smoothstep(0.0, 0.45, p);
      for (let i = 0; i < pos.length / 3; i++) {
        const base = pos[i * 3 + 1];
        pos[i * 3 + 1] = base + swimProgress * 2.2 + Math.sin(state.clock.elapsedTime * 6 + phases[i]) * 0.02;
      }
      spermMesh.current.geometry.attributes.position.needsUpdate = true;
      mats.sperm.opacity = lerp(mats.sperm.opacity, swimProgress > 0.1 && swimProgress < 0.9 ? 0.85 : 0.0, k);
    }

    // Embryo growth
    if (p > 0.5) {
      const target = p > 0.7 ? 1.0 : 0.1 + 0.9 * smoothstep(0.5, 0.7, p);
      embryoScale.current = lerp(embryoScale.current, target, k * 1.5);
      const embryoObj = parts.current.embryo;
      if (embryoObj) embryoObj.scale.setScalar(embryoScale.current);
    }

    projectCallouts(callouts.refs, activeSet.current, camera, gl.domElement, anchors, callouts.v);
  });

  const reg = (key: PartKey) => (o: THREE.Object3D | null) => {
    parts.current[key] = o ?? undefined;
    if (o) anchors.set(key, o);
  };
  const anchorAt = (key: PartKey, pos: [number, number, number]) => (
    <object3D ref={(o) => o && anchors.set(key, o)} position={pos} />
  );

  return (
    <group ref={group}>
      <mesh ref={reg('tube')} geometry={g.tube} material={mats.tube} />
      <mesh ref={reg('uterus')} geometry={g.uterus} material={mats.uterus} position={[0, 0.55, -0.02]} />
      <mesh ref={reg('egg')} geometry={g.egg} material={mats.egg} position={[0, 1.6, 0.0]} />
      <points
        ref={(r) => {
          spermMesh.current = r;
        }}
        geometry={(() => {
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(spermPositions.current ?? new Float32Array(0), 3));
          return geo;
        })()}
        material={mats.sperm}
      />
      <mesh
        ref={reg('embryo')}
        geometry={g.embryo}
        material={mats.embryo}
        position={[0, 1.6, 0.0]}
        scale={0.1}
      />
      {anchorAt('sperm', [0, 0.9, -0.1])}
      {anchorAt('egg', [0, 1.6, 0.0])}
      {anchorAt('embryo', [0, 1.4, 0.15])}
      {anchorAt('uterus', [0, 0.55, 0.1])}
    </group>
  );
});