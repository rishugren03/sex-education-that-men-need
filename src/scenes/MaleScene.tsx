import { useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { projectCallouts, useCallouts, useScratch } from '../three/callouts';
import { GroundGlow, LabRings, LightGrid } from '../three/Backdrop';
import { curveFrom, disposeObject, loftTube } from '../three/geo';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, smoothstep } from '../lib/math';

type PartKey =
  | 'scrotum'
  | 'testes'
  | 'epididymis'
  | 'vas'
  | 'bladder'
  | 'vesicles'
  | 'prostate'
  | 'urethra'
  | 'penis';

const DIM = '#2c3a47';
const HOT = '#cfe9f4';
const ACCENT = '#5fd3e8';

/** Which structures are lit at each beat of the chapter. */
const STEP_PARTS: Partial<Record<number, PartKey[]>> = {
  1: ['testes', 'scrotum'],
  2: ['epididymis', 'vas'],
  3: ['bladder', 'vesicles', 'prostate'],
  4: ['urethra'],
  5: ['penis'],
};

/** Steps that require the surrounding tissue to go translucent. */
const XRAY = new Set([2, 4]);

const MODEL_BASE_Y = -0.35;

export function MaleScene({ progress, reduced, loader }: StageSignal) {
  const { overlay, refs } = useCallouts([
    { key: 'testes', label: 'Testes', side: 'left', lead: 54 },
    { key: 'epididymis', label: 'Epididymis', side: 'right', lead: 60 },
    { key: 'vas', label: 'Vas deferens', side: 'right', lead: 72, offsetY: 26 },
    { key: 'bladder', label: 'Bladder', side: 'left', lead: 62 },
    { key: 'vesicles', label: 'Seminal vesicles', side: 'right', lead: 80, offsetY: -22 },
    { key: 'prostate', label: 'Prostate', side: 'left', lead: 68, offsetY: 30 },
    { key: 'urethra', label: 'Urethra', side: 'right', lead: 66 },
    { key: 'penis', label: 'Penis', side: 'right', lead: 58 },
  ]);

  return (
    <>
      <Stage3D fov={32} camera={[0, 0.6, 6.4]} loader={loader}>
        <Lights rim={ACCENT} />
        <LabRings radius={3.2} y={-1.75} opacity={0.1} />
        <LightGrid y={-1.78} opacity={0.05} />
        <GroundGlow y={-1.76} scale={8} color={ACCENT} opacity={0.24} />
        <MaleModel
          progress={progress}
          reduced={reduced}
          callouts={{ refs, v: useScratch() }}
        />
      </Stage3D>
      {overlay}
    </>
  );
}

/* ── Camera keyframes ─────────────────────────────────────── */
const CAMS: { p: [number, number, number]; t: [number, number, number]; ry: number }[] = [
  { p: [0.1, 0.75, 6.5], t: [0, 0.55, 0], ry: 0.0 },
  { p: [0.55, -0.15, 3.5], t: [0.36, -0.5, 0.05], ry: -0.22 },
  { p: [0.9, 0.35, 3.3], t: [0.34, 0.35, -0.05], ry: -0.3 },
  { p: [0.15, 1.75, 4.0], t: [0, 1.4, -0.05], ry: 0.12 },
  { p: [1.5, 0.95, 3.0], t: [0.02, 0.75, 0.18], ry: 0.2 },
  { p: [0.5, -0.35, 3.4], t: [0, -0.05, 0.55], ry: 0.05 },
  { p: [-0.1, 0.7, 6.6], t: [0, 0.5, 0], ry: 0.0 },
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

/* ── Explode offsets per part ─────────────────────────────── */
const EXPLODE: Record<PartKey, [number, number, number]> = {
  scrotum: [-0.7, 0, 0],
  testes: [-0.85, -0.1, 0],
  epididymis: [0.75, 0, 0],
  vas: [0.95, 0.35, -0.3],
  bladder: [0, 0.85, -0.35],
  vesicles: [0.8, 0.55, -0.75],
  prostate: [-0.6, 0.15, 0.35],
  urethra: [0, -0.2, 0.85],
  penis: [0, -0.6, 0.75],
};

const MaleModel = memo(function MaleModel({
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
  const cont = useRef(0);
  const spin = useRef(0);

  /* ── Geometry ─────────────────────────────────────────── */
  const g = useMemo(() => {
    const penis = loftTube(
      curveFrom([
        [0, 0.62, -0.02],
        [0, 0.3, 0.14],
        [0, -0.02, 0.44],
        [0, -0.36, 0.73],
        [0, -0.6, 0.92],
      ]),
      (t) => {
        const shaft = 0.175 * (1 - 0.09 * t);
        const glans = t > 0.74 ? 0.085 * Math.sin(((t - 0.74) / 0.26) * Math.PI) : 0;
        return shaft + glans;
      },
      64,
      20,
    );
    const urethra = loftTube(
      curveFrom([
        [0, 1.72, -0.02],
        [0, 1.2, 0.05],
        [0, 0.6, 0.05],
        [0, 0.3, 0.1],
        [0, -0.02, 0.4],
        [0, -0.36, 0.69],
        [0, -0.55, 0.86],
      ]),
      () => 0.032,
      64,
      10,
    );
    const vasL = loftTube(
      curveFrom([
        [-0.4, -0.5, -0.22],
        [-0.58, -0.15, -0.3],
        [-0.6, 0.45, -0.34],
        [-0.52, 0.95, -0.36],
        [-0.36, 1.32, -0.34],
        [-0.3, 1.5, -0.3],
      ]),
      (t) => 0.05 - 0.012 * t,
      56,
      8,
    );
    const vasR = vasL.clone();
    // Mirror the left vas deferens across the midline.
    {
      const p = vasR.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < p.count; i++) p.setX(i, -p.getX(i));
      p.needsUpdate = true;
      vasR.computeVertexNormals();
      vasR.computeBoundingSphere();
    }
    const epididymis = loftTube(
      curveFrom([
        [0.4, -0.2, 0.06],
        [0.5, -0.32, -0.06],
        [0.47, -0.6, -0.2],
        [0.36, -0.82, -0.1],
        [0.3, -0.78, 0.08],
      ]),
      (t) => 0.055 * (1 - 0.3 * t),
      40,
      8,
    );
    const bladder = new THREE.SphereGeometry(0.56, 40, 28);
    {
      const p = bladder.attributes.position as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        const k = v.y > 0 ? 1 - 0.32 * v.y : 1 + 0.18 * v.y;
        v.x *= k * 0.94;
        v.z *= k * 0.86;
        v.y *= 1.18;
        p.setXYZ(i, v.x, v.y, v.z);
      }
      bladder.computeVertexNormals();
    }
    const prostate = new THREE.SphereGeometry(0.3, 30, 22);
    {
      const p = prostate.attributes.position as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        v.x *= 0.95;
        v.y *= 0.82;
        v.z *= 0.9;
        if (v.y < 0) v.z *= 1.12;
        p.setXYZ(i, v.x, v.y, v.z);
      }
      prostate.computeVertexNormals();
    }
    const testis = new THREE.SphereGeometry(1, 32, 24);
    testis.scale(0.3, 0.35, 0.28);
    return { penis, urethra, vasL, vasR, epididymis, bladder, prostate, testis };
  }, []);

  useEffect(() => () => disposeObject(group.current), []);

  /* ── Materials ────────────────────────────────────────── */
  const mats = useMemo(() => {
    const make = (opts: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(DIM),
        roughness: 0.55,
        metalness: 0.08,
        emissive: new THREE.Color(ACCENT),
        emissiveIntensity: 0.04,
        transparent: true,
        opacity: 1,
        ...opts,
      });
    return {
      penis: make({ roughness: 0.42, metalness: 0.05 }),
      urethra: make({ color: new THREE.Color('#1d5a68'), roughness: 0.3 }),
      vas: make({ roughness: 0.5 }),
      epididymis: make({ roughness: 0.5 }),
      bladder: make({ roughness: 0.3, metalness: 0.12, transparent: true, opacity: 0.82 }),
      vesicles: make({ roughness: 0.42 }),
      prostate: make({ roughness: 0.5 }),
      testes: make({ roughness: 0.6 }),
      scrotum: make({
        roughness: 0.1,
        metalness: 0,
        transparent: true,
        opacity: 0.13,
        side: THREE.DoubleSide,
        depthWrite: false,
        emissive: new THREE.Color('#7fa8bd'),
      }),
    } as Record<PartKey, THREE.MeshStandardMaterial>;
  }, []);

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  /* ── Per-frame ────────────────────────────────────────── */
  useFrame((state, dt) => {
    const c = clamp(progress.get(), 0, 1) * (CAMS.length - 1);
    cont.current = c;
    const s = Math.round(c);
    const lit = STEP_PARTS[s] ?? [];
    const xray = XRAY.has(s) ? 1 : 0;

    if (!reduced) spin.current += Math.min(dt, 0.05) * 0.18;
    const cam = sampleCams(c);
    const k = 1 - Math.exp(-6 * Math.min(dt, 0.1));

    // Camera
    camera.position.lerp(new THREE.Vector3(...cam.p), k);
    const lookTarget = new THREE.Vector3(...cam.t);
    (camera as THREE.PerspectiveCamera).lookAt(lookTarget);
    camera.position.y += Math.sin(spin.current) * 0.05;

    // Model yaw: gentle idle sway, plus a per-step angle.
    if (group.current) {
      const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.16;
      group.current.rotation.y = lerp(group.current.rotation.y, cam.ry + idle, k);
      group.current.position.y = MODEL_BASE_Y;
    }

    // Explode bump around the anatomy step.
    const explode = smoothstep(1.4, 2.6, c) * (1 - smoothstep(3.4, 4.6, c));

    activeSet.current.clear();
    for (const key of Object.keys(EXPLODE) as PartKey[]) {
      const obj = parts.current[key];
      if (!obj) continue;
      const off = EXPLODE[key];
      const tx = off[0] * explode;
      const ty = off[1] * explode;
      const tz = off[2] * explode;
      obj.position.x = lerp(obj.position.x, tx, k);
      obj.position.y = lerp(obj.position.y, ty, k);
      obj.position.z = lerp(obj.position.z, tz, k);

      const isLit = lit.includes(key);
      if (isLit) activeSet.current.add(key);
      const m = mats[key];
      const targetOp = isLit ? 1 : lit.length ? 1 - xray * 0.66 : 0.9;
      m.opacity = lerp(m.opacity, targetOp, k);
      if (key !== 'scrotum') {
        m.color.lerp(new THREE.Color(isLit ? HOT : lit.length ? '#22303c' : DIM), k * 1.2);
        m.emissiveIntensity = lerp(m.emissiveIntensity, isLit ? 0.5 : 0.035, k);
      } else {
        m.opacity = lerp(m.opacity, isLit ? 0.22 : 0.11, k);
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
      {/* Penis + glans */}
      <mesh ref={reg('penis') as never} geometry={g.penis} material={mats.penis} castShadow={false} />
      {/* Urethra — runs from bladder, through the prostate, down the shaft */}
      <mesh geometry={g.urethra} material={mats.urethra} ref={reg('urethra') as never} />
      {/* Scrotum as a translucent shell */}
      <mesh ref={reg('scrotum') as never} material={mats.scrotum} scale={[0.44, 0.5, 0.42]} position={[0, -0.55, 0.05]}>
        <sphereGeometry args={[1, 28, 20]} />
      </mesh>
      {/* Testes */}
      <group ref={reg('testes') as never}>
        <mesh geometry={g.testis} material={mats.testes} position={[-0.36, -0.55, 0.05]} />
        <mesh geometry={g.testis} material={mats.testes} position={[0.36, -0.55, 0.05]} />
      </group>
      {/* Epididymis (mirrored) */}
      <group ref={reg('epididymis') as never}>
        <mesh geometry={g.epididymis} material={mats.epididymis} />
        <mesh geometry={g.epididymis} material={mats.epididymis} scale={[-1, 1, 1]} />
      </group>
      {/* Vas deferens */}
      <group ref={reg('vas') as never}>
        <mesh geometry={g.vasL} material={mats.vas} />
        <mesh geometry={g.vasR} material={mats.vas} />
      </group>
      {/* Bladder */}
      <mesh ref={reg('bladder') as never} geometry={g.bladder} material={mats.bladder} position={[0, 1.95, -0.02]} />
      {/* Seminal vesicles */}
      <group ref={reg('vesicles') as never}>
        {[-0.31, 0.31].map((x) => (
          <group key={x} position={[x, 1.5, -0.3]}>
            <mesh material={mats.vesicles} position={[-0.06, 0.06, 0]} scale={[0.15, 0.2, 0.13]} rotation={[0, 0, 0.4]}>
              <sphereGeometry args={[1, 20, 16]} />
            </mesh>
            <mesh material={mats.vesicles} position={[0.06, 0.02, 0.02]} scale={[0.13, 0.17, 0.12]} rotation={[0, 0, -0.5]}>
              <sphereGeometry args={[1, 20, 16]} />
            </mesh>
            <mesh material={mats.vesicles} position={[0, -0.12, -0.02]} scale={[0.11, 0.13, 0.1]}>
              <sphereGeometry args={[1, 20, 16]} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Prostate */}
      <mesh ref={reg('prostate') as never} geometry={g.prostate} material={mats.prostate} position={[0, 1.12, 0.02]} />

      {anchorAt('testes', [-0.36, -0.55, 0.05])}
      {anchorAt('epididymis', [0.4, -0.55, -0.1])}
      {anchorAt('vas', [0.5, 0.7, -0.33])}
      {anchorAt('bladder', [0, 2.05, 0.1])}
      {anchorAt('vesicles', [0.31, 1.55, -0.3])}
      {anchorAt('prostate', [0, 1.05, 0.16])}
      {anchorAt('urethra', [0, 1.4, 0.14])}
      {anchorAt('penis', [0, -0.3, 0.7])}
    </group>
  );
});
