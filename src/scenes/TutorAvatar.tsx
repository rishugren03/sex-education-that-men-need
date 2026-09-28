import { useFrame } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { StageSignal } from '../components/ui/PinnedStage';
import { Lights, Stage3D } from '../three/Stage3D';
import { clamp, lerp, smoothstep } from '../lib/math';

type Pose = {
  head: [number, number, number];
  spine: number;
  lArm: [number, number, number];
  rArm: [number, number, number];
  lLeg: [number, number, number];
  rLeg: [number, number, number];
};

const TUTOR_POSES: Record<number, Pose> = {
  0.00: { head: [0, 0, 0], spine: 0, lArm: [-0.3, 0, -0.2], rArm: [0.3, 0, -0.2], lLeg: [0, 0, 0], rLeg: [0, 0, 0] },
  0.12: { head: [0, 0.1, -0.1], spine: 0.05, lArm: [-0.5, 0.2, -0.3], rArm: [0.4, 0.1, -0.1], lLeg: [0, 0, 0], rLeg: [0, 0, 0] },
  0.25: { head: [-0.15, 0, 0], spine: -0.05, lArm: [-0.6, 0.3, -0.4], rArm: [0.2, 0.2, -0.2], lLeg: [0.1, 0, 0], rLeg: [-0.1, 0, 0] },
  0.40: { head: [0.1, 0.05, 0], spine: 0.08, lArm: [-0.4, 0.1, -0.2], rArm: [0.5, 0.2, -0.3], lLeg: [-0.1, 0, 0], rLeg: [0.1, 0, 0] },
  0.55: { head: [0, 0, 0.1], spine: -0.03, lArm: [-0.3, 0, -0.1], rArm: [0.6, 0.3, -0.4], lLeg: [0, 0, 0], rLeg: [0, 0, 0] },
  0.70: { head: [-0.1, 0.1, 0], spine: 0.05, lArm: [-0.5, 0.2, -0.3], rArm: [0.3, 0.1, -0.2], lLeg: [0.1, 0, 0], rLeg: [-0.1, 0, 0] },
  0.85: { head: [0.1, 0, 0], spine: 0, lArm: [-0.3, 0, -0.2], rArm: [0.4, 0.1, -0.1], lLeg: [0, 0, 0], rLeg: [0, 0, 0] },
  1.00: { head: [0, 0, 0], spine: 0, lArm: [-0.3, 0, -0.2], rArm: [0.3, 0, -0.2], lLeg: [0, 0, 0], rLeg: [0, 0, 0] },
};

const KEYS = Object.keys(TUTOR_POSES).map(Number).sort((a,b)=>a-b);

function lerpPose(a: Pose, b: Pose, t: number): Pose {
  const l = (k: keyof Pose, i: number) => lerp((a[k] as number[])[i], (b[k] as number[])[i], t);
  return {
    head: [l('head',0), l('head',1), l('head',2)] as [number,number,number],
    spine: lerp(a.spine, b.spine, t),
    lArm: [l('lArm',0), l('lArm',1), l('lArm',2)] as [number,number,number],
    rArm: [l('rArm',0), l('rArm',1), l('rArm',2)] as [number,number,number],
    lLeg: [l('lLeg',0), l('lLeg',1), l('lLeg',2)] as [number,number,number],
    rLeg: [l('rLeg',0), l('rLeg',1), l('rLeg',2)] as [number,number,number],
  };
}

function getPose(p: number): Pose {
  const c = clamp(p);
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (c >= KEYS[i] && c <= KEYS[i + 1]) {
      const t = smoothstep(0, 1, (c - KEYS[i]) / (KEYS[i + 1] - KEYS[i]));
      return lerpPose(TUTOR_POSES[KEYS[i]], TUTOR_POSES[KEYS[i + 1]], t);
    }
  }
  return TUTOR_POSES[1];
}

export function TutorAvatar({ progress, reduced }: { progress: StageSignal['progress']; reduced: boolean }) {
  return (
    <Stage3D fov={45} camera={[0, 1.3, 3.2]} rig={false}>
      <Lights rim="#5fd3e8" warm="#e0a05f" />
      <TutorModel progress={progress} reduced={reduced} />
    </Stage3D>
  );
}

type Refs = {
  root: THREE.Group | null;
  head: THREE.Group | null;
  spine: THREE.Group | null;
  lShoulder: THREE.Group | null;
  rShoulder: THREE.Group | null;
  lElbow: THREE.Group | null;
  rElbow: THREE.Group | null;
  lHip: THREE.Group | null;
  rHip: THREE.Group | null;
  lKnee: THREE.Group | null;
  rKnee: THREE.Group | null;
};

const TutorModel = memo(function TutorModel({
  progress,
  reduced,
}: {
  progress: StageSignal['progress'];
  reduced: boolean;
}) {
  const refs = useMemo<Refs>(() => ({
    root: null,
    head: null,
    spine: null,
    lShoulder: null,
    rShoulder: null,
    lElbow: null,
    rElbow: null,
    lHip: null,
    rHip: null,
    lKnee: null,
    rKnee: null,
  }), []);

  const idleTime = useRef(0);

  const geo = useMemo(() => {
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a574,
      roughness: 0.45,
      metalness: 0.05,
    });
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0x1a2a3a,
      roughness: 0.6,
      metalness: 0.02,
    });
    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x0d151e,
      roughness: 0.5,
      metalness: 0.02,
    });
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x2c3a47,
      roughness: 0.55,
      metalness: 0.08,
    });
    
    return {
      head: new THREE.SphereGeometry(0.22, 24, 16),
      neck: new THREE.CylinderGeometry(0.08, 0.09, 0.12, 12),
      torso: new THREE.CapsuleGeometry(0.18, 0.35, 8, 16),
      lUpperArm: new THREE.CapsuleGeometry(0.065, 0.22, 6, 12),
      rUpperArm: new THREE.CapsuleGeometry(0.065, 0.22, 6, 12),
      lForearm: new THREE.CapsuleGeometry(0.055, 0.2, 6, 12),
      rForearm: new THREE.CapsuleGeometry(0.055, 0.2, 6, 12),
      hand: new THREE.SphereGeometry(0.065, 12, 8),
      lThigh: new THREE.CapsuleGeometry(0.09, 0.3, 8, 16),
      rThigh: new THREE.CapsuleGeometry(0.09, 0.3, 8, 16),
      lShin: new THREE.CapsuleGeometry(0.07, 0.28, 8, 16),
      rShin: new THREE.CapsuleGeometry(0.07, 0.28, 8, 16),
      foot: new THREE.CapsuleGeometry(0.05, 0.12, 6, 8),
      mats: { skin: skinMat, shirt: shirtMat, pants: pantsMat, base: baseMat },
    };
  }, []);

  useEffect(() => () => {
    Object.values(geo.mats).forEach(m => m.dispose());
    Object.values(geo).forEach(g => g instanceof THREE.BufferGeometry && g.dispose());
  }, [geo]);

  const bind = (key: keyof Refs) => (obj: THREE.Group | null) => {
    refs[key] = obj;
  };

  useFrame((_, dt) => {
    const p = clamp(progress.get());
    const pose = getPose(p);
    
    if (!reduced) idleTime.current += dt;
    const breathe = !reduced ? Math.sin(idleTime.current * 1.8) * 0.02 : 0;
    const sway = !reduced ? Math.sin(idleTime.current * 0.7) * 0.03 : 0;

    if (refs.root) {
      refs.root.rotation.y = lerp(refs.root.rotation.y, sway, 0.1);
      refs.root.position.y = breathe * 0.5;
    }

    if (refs.spine) {
      refs.spine.rotation.x = lerp(refs.spine.rotation.x, pose.spine + breathe * 0.03, 0.15);
    }

    if (refs.head) {
      refs.head.rotation.x = lerp(refs.head.rotation.x, pose.head[0] + breathe * 0.02, 0.15);
      refs.head.rotation.y = lerp(refs.head.rotation.y, pose.head[1], 0.15);
      refs.head.rotation.z = lerp(refs.head.rotation.z, pose.head[2], 0.15);
    }

    if (refs.lShoulder) {
      refs.lShoulder.rotation.x = lerp(refs.lShoulder.rotation.x, pose.lArm[0], 0.15);
      refs.lShoulder.rotation.y = lerp(refs.lShoulder.rotation.y, pose.lArm[1], 0.15);
      refs.lShoulder.rotation.z = lerp(refs.lShoulder.rotation.z, pose.lArm[2], 0.15);
    }
    if (refs.rShoulder) {
      refs.rShoulder.rotation.x = lerp(refs.rShoulder.rotation.x, pose.rArm[0], 0.15);
      refs.rShoulder.rotation.y = lerp(refs.rShoulder.rotation.y, pose.rArm[1], 0.15);
      refs.rShoulder.rotation.z = lerp(refs.rShoulder.rotation.z, pose.rArm[2], 0.15);
    }

    if (refs.lHip) {
      refs.lHip.rotation.x = lerp(refs.lHip.rotation.x, pose.lLeg[0] + breathe * 0.01, 0.15);
      refs.lHip.rotation.z = lerp(refs.lHip.rotation.z, pose.lLeg[2], 0.15);
    }
    if (refs.rHip) {
      refs.rHip.rotation.x = lerp(refs.rHip.rotation.x, pose.rLeg[0] + breathe * 0.01, 0.15);
      refs.rHip.rotation.z = lerp(refs.rHip.rotation.z, pose.rLeg[2], 0.15);
    }
  });

  return (
    <group ref={bind('root')}>
      <group ref={bind('spine')} position={[0, 1.05, 0]}>
        <mesh geometry={geo.torso} material={geo.mats.shirt} position={[0, 0.15, 0]} />
        
        <group ref={bind('head')} position={[0, 0.55, 0]}>
          <mesh geometry={geo.head} material={geo.mats.skin} />
          <group position={[-0.06, 0.02, 0.16]}>
            <mesh geometry={new THREE.SphereGeometry(0.025, 8, 6)} material={geo.mats.base} />
          </group>
          <group position={[0.06, 0.02, 0.16]}>
            <mesh geometry={new THREE.SphereGeometry(0.025, 8, 6)} material={geo.mats.base} />
          </group>
        </group>

        <group ref={bind('lShoulder')} position={[-0.22, 0.4, 0]}>
          <group position={[0, -0.11, 0]}>
            <mesh geometry={geo.lUpperArm} material={geo.mats.shirt} rotation={[-Math.PI/2, 0, 0]} />
          </group>
          <group ref={bind('lElbow')} position={[0, -0.22, 0]}>
            <mesh geometry={geo.lForearm} material={geo.mats.skin} rotation={[-Math.PI/2, 0, 0]} />
            <group position={[0, -0.2, 0]}>
              <mesh geometry={geo.hand} material={geo.mats.skin} scale={[1, 1.2, 0.7]} />
            </group>
          </group>
        </group>

        <group ref={bind('rShoulder')} position={[0.22, 0.4, 0]}>
          <group position={[0, -0.11, 0]}>
            <mesh geometry={geo.rUpperArm} material={geo.mats.shirt} rotation={[-Math.PI/2, 0, 0]} />
          </group>
          <group ref={bind('rElbow')} position={[0, -0.22, 0]}>
            <mesh geometry={geo.rForearm} material={geo.mats.skin} rotation={[-Math.PI/2, 0, 0]} />
            <group position={[0, -0.2, 0]}>
              <mesh geometry={geo.hand} material={geo.mats.skin} scale={[1, 1.2, 0.7]} />
            </group>
          </group>
        </group>

        <group ref={bind('lHip')} position={[-0.1, -0.05, 0]}>
          <mesh geometry={geo.lThigh} material={geo.mats.pants} rotation={[-Math.PI/2, 0, 0]} />
          <group ref={bind('lKnee')} position={[0, -0.3, 0]}>
            <mesh geometry={geo.lShin} material={geo.mats.pants} rotation={[-Math.PI/2, 0, 0]} />
            <group position={[0, -0.28, 0]}>
              <mesh geometry={geo.foot} material={geo.mats.base} rotation={[-Math.PI/2, 0, 0]} />
            </group>
          </group>
        </group>

        <group ref={bind('rHip')} position={[0.1, -0.05, 0]}>
          <mesh geometry={geo.rThigh} material={geo.mats.pants} rotation={[-Math.PI/2, 0, 0]} />
          <group ref={bind('rKnee')} position={[0, -0.3, 0]}>
            <mesh geometry={geo.rShin} material={geo.mats.pants} rotation={[-Math.PI/2, 0, 0]} />
            <group position={[0, -0.28, 0]}>
              <mesh geometry={geo.foot} material={geo.mats.base} rotation={[-Math.PI/2, 0, 0]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});