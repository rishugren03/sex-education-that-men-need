import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { projectCallouts, useCallouts, useScratch } from '../three/callouts';
import { useI18n } from '../i18n';
import { GroundGlow, LabRings, LightGrid } from '../three/Backdrop';
import { curveFrom, disposeObject, loftTube } from '../three/geo';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, smoothstep } from '../lib/math';

const ACCENT = '#5fd3e8';

type PartKey =
  | 'ovaries'
  | 'tubes'
  | 'uterus'
  | 'cervix'
  | 'vagina'
  | 'vulva'
  | 'clitoris'
  | 'external';

const STEP_PARTS: Partial<Record<number, PartKey[]>> = {
  1: ['external'],
  2: ['vulva', 'clitoris'],
  3: ['ovaries'],
  4: ['tubes'],
  5: ['uterus'],
  6: ['cervix'],
  7: ['vagina'],
};

const XRAY = new Set([3, 4, 5, 6]);

const CAMS: { p: [number, number, number]; t: [number, number, number]; ry: number }[] = [
  { p: [0.1, 0.7, 6.2], t: [0, 0.4, 0], ry: 0.0 },
  { p: [0.5, 0.0, 3.5], t: [0, -0.05, 0.1], ry: -0.2 },
  { p: [0.6, 1.3, 3.2], t: [0, 1.55, -0.3], ry: -0.1 },
  { p: [0.15, 1.6, 3.4], t: [0, 1.5, -0.35], ry: 0.1 },
  { p: [-0.1, 0.9, 3.6], t: [0, 0.95, 0.02], ry: 0.12 },
  { p: [0.55, -0.05, 3.5], t: [0, -0.05, 0.1], ry: 0.05 },
  { p: [0, 0.55, 6.4], t: [0, 0.4, 0], ry: 0.0 },
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

const EXPLODE: Record<PartKey, [number, number, number]> = {
  external: [0, -0.5, 0.6],
  vulva: [0, -0.55, 0.7],
  clitoris: [0, -0.15, 0.9],
  ovaries: [0.7, 0.4, -0.5],
  tubes: [0.8, 0.7, -0.7],
  uterus: [-0.6, 0.2, 0.3],
  cervix: [0, -0.3, 0.7],
  vagina: [0, -0.55, 0.7],
};

export function FemaleScene({ progress, reduced, loader }: StageSignal) {
  const { term } = useI18n();
  const { overlay, refs } = useCallouts([
    { key: 'ovaries', label: term('term.ovaries'), side: 'right', lead: 56 },
    { key: 'tubes', label: term('term.tubes'), side: 'right', lead: 72, offsetY: 24 },
    { key: 'uterus', label: term('term.uterus'), side: 'left', lead: 62 },
    { key: 'cervix', label: term('term.cervix'), side: 'left', lead: 58, offsetY: -20 },
    { key: 'vagina', label: term('term.vagina'), side: 'right', lead: 60 },
    { key: 'vulva', label: term('term.vulva'), side: 'right', lead: 70 },
    { key: 'clitoris', label: term('term.clitoris'), side: 'left', lead: 66 },
  ]);

  return (
    <>
      <Stage3D fov={32} camera={[0, 0.55, 6.2]} loader={loader}>
        <Lights rim={ACCENT} />
        <LabRings radius={3.2} y={-1.7} opacity={0.1} />
        <LightGrid y={-1.73} opacity={0.05} />
        <GroundGlow y={-1.71} scale={8} color={ACCENT} opacity={0.24} />
        <FemaleModel progress={progress} reduced={reduced} callouts={{ refs, v: useScratch() }} />
      </Stage3D>
      {overlay}
    </>
  );
}

const FemaleModel = memo(function FemaleModel({
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
    const cervix = new THREE.CylinderGeometry(0.32, 0.26, 0.52, 20);
    cervix.translate(0, -1.15, 0);
    const vagina = new THREE.CylinderGeometry(0.26, 0.22, 0.72, 20);
    vagina.translate(0, -1.72, 0);
    const clitoris = new THREE.SphereGeometry(0.12, 16, 12);
    clitoris.translate(0, 0.12, 0.42);
    const ovary = new THREE.SphereGeometry(0.28, 20, 16);
    const tube = loftTube(
      curveFrom([
        [0.58, 1.7, -0.3],
        [0.52, 1.5, -0.3],
        [0.38, 1.0, -0.35],
        [0.26, 0.5, -0.2],
        [0.12, 0.05, -0.05],
      ]),
      (t) => 0.14 * (1 - 0.3 * t),
      40,
      10,
    );
    return { uterus, cervix, vagina, clitoris, ovary, tube };
  }, []);

  useEffect(() => () => disposeObject(group.current), []);

  const mats = useMemo(() => {
    const make = (opts: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2c3a47'),
        roughness: 0.55,
        metalness: 0.08,
        emissive: new THREE.Color(ACCENT),
        emissiveIntensity: 0.04,
        transparent: true,
        opacity: 1,
        ...opts,
      });
    return {
      external: make({ roughness: 0.45, opacity: 0.28, depthWrite: false }),
      vulva: make({ roughness: 0.45, opacity: 0.62 }),
      clitoris: make({ color: new THREE.Color('#e8557b'), roughness: 0.45, emissive: new THREE.Color('#e8557b') }),
      ovaries: make({ roughness: 0.48 }),
      tubes: make({ roughness: 0.48 }),
      uterus: make({ roughness: 0.3, metalness: 0.12 }),
      cervix: make({ roughness: 0.48 }),
      vagina: make({ roughness: 0.48, opacity: 0.72, depthWrite: false }),
    } as Record<PartKey, THREE.MeshStandardMaterial>;
  }, []);

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  useFrame((state, dt) => {
    const c = clamp(progress.get(), 0, 1) * (CAMS.length - 1);
    const s = Math.round(c);
    const lit = STEP_PARTS[s] ?? [];
    const xray = XRAY.has(s) ? 1 : 0;

    if (!reduced) spin.current += Math.min(dt, 0.05) * 0.18;
    const cam = sampleCams(c);
    const k = 1 - Math.exp(-6 * Math.min(dt, 0.1));

    camera.position.lerp(new THREE.Vector3(...cam.p), k);
    camera.lookAt(new THREE.Vector3(...cam.t));

    if (group.current) {
      const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.16;
      group.current.rotation.y = lerp(group.current.rotation.y, cam.ry + idle, k);
    }

    const explode = smoothstep(1.4, 3.0, c) * (1 - smoothstep(3.8, 5.0, c));

    activeSet.current.clear();
    for (const key of Object.keys(EXPLODE) as PartKey[]) {
      const obj = parts.current[key];
      if (!obj) continue;
      const off = EXPLODE[key];
      obj.position.x = lerp(obj.position.x, off[0] * explode, k);
      obj.position.y = lerp(obj.position.y, off[1] * explode, k);
      obj.position.z = lerp(obj.position.z, off[2] * explode, k);

      const isLit = lit.includes(key);
      if (isLit) activeSet.current.add(key);
      const m = mats[key];
      const targetOp = isLit ? 1 : lit.length ? 1 - xray * 0.68 : 0.9;
      m.opacity = lerp(m.opacity, targetOp, k);
      if (key !== 'external' && key !== 'vagina') {
        m.color.lerp(new THREE.Color(isLit ? '#cfe9f4' : lit.length ? '#22303c' : '#2c3a47'), k * 1.2);
        m.emissiveIntensity = lerp(m.emissiveIntensity, isLit ? 0.5 : 0.035, k);
      } else if (key === 'external') {
        m.opacity = lerp(m.opacity, isLit ? 0.42 : 0.18, k);
      }
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
      <group ref={reg('external')}>
        <mesh material={mats.external}>
          <sphereGeometry args={[1.3, 24, 18]} />
        </mesh>
      </group>

      <group ref={reg('vulva')}>
        <mesh material={mats.vulva} position={[0, -0.1, 0.4]} scale={[0.65, 0.55, 0.25]}>
          <sphereGeometry args={[1, 24, 16]} />
        </mesh>
      </group>

      <mesh ref={reg('clitoris')} geometry={g.clitoris} material={mats.clitoris} />

      <group ref={reg('ovaries')}>
        <mesh geometry={g.ovary} material={mats.ovaries} position={[-0.58, 1.65, -0.3]} />
        <mesh geometry={g.ovary} material={mats.ovaries} position={[0.58, 1.65, -0.3]} />
      </group>

      <group ref={reg('tubes')}>
        <mesh geometry={g.tube} material={mats.tubes} />
        <mesh geometry={g.tube} material={mats.tubes} scale={[-1, 1, 1]} />
      </group>

      <mesh ref={reg('uterus')} geometry={g.uterus} material={mats.uterus} position={[0, 0.55, -0.02]} />
      <mesh ref={reg('cervix')} geometry={g.cervix} material={mats.cervix} position={[0, -0.05, 0.0]} />
      <mesh ref={reg('vagina')} geometry={g.vagina} material={mats.vagina} position={[0, -0.05, 0.0]} />

      {anchorAt('ovaries', [-0.58, 1.7, -0.3])}
      {anchorAt('tubes', [0.38, 1.2, -0.35])}
      {anchorAt('uterus', [0, 0.8, -0.02])}
      {anchorAt('cervix', [0, -0.75, 0.02])}
      {anchorAt('vagina', [0, -1.75, 0.0])}
      {anchorAt('vulva', [0, -0.15, 0.5])}
      {anchorAt('clitoris', [0, 0.12, 0.45])}
    </group>
  );
});