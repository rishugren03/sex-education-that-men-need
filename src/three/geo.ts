import * as THREE from 'three';

/**
 * Loft a circular cross-section of varying radius along an arbitrary curve.
 * Used for the penis, fallopian tubes, vas deferens and the uterus — anything
 * that is a tube rather than a primitive.
 */
export function loftTube(
  curve: THREE.Curve<THREE.Vector3>,
  radiusAt: (t: number) => number,
  tubularSegments = 72,
  radialSegments = 14,
  capStart = true,
  capEnd = true,
): THREE.BufferGeometry {
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const pos: number[] = [];
  const nor: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  const P = new THREE.Vector3();
  const N = new THREE.Vector3();
  const B = new THREE.Vector3();
  const v = new THREE.Vector3();

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    curve.getPointAt(t, P);
    N.copy(frames.normals[i]);
    B.copy(frames.binormals[i]);
    const r = radiusAt(t);
    for (let j = 0; j <= radialSegments; j++) {
      const a = (j / radialSegments) * Math.PI * 2;
      const sin = Math.sin(a);
      const cos = -Math.cos(a);
      v.set(N.x * cos + B.x * sin, N.y * cos + B.y * sin, N.z * cos + B.z * sin).normalize();
      pos.push(P.x + r * v.x, P.y + r * v.y, P.z + r * v.z);
      nor.push(v.x, v.y, v.z);
      uv.push(t, j / radialSegments);
    }
  }
  for (let i = 1; i <= tubularSegments; i++) {
    for (let j = 1; j <= radialSegments; j++) {
      const a = (radialSegments + 1) * (i - 1) + (j - 1);
      const b = (radialSegments + 1) * i + (j - 1);
      const c = (radialSegments + 1) * i + j;
      const d = (radialSegments + 1) * (i - 1) + j;
      idx.push(a, b, d, b, c, d);
    }
  }

  const cap = (t: number, flip: boolean) => {
    const centre = curve.getPointAt(t);
    const base = pos.length / 3;
    pos.push(centre.x, centre.y, centre.z);
    const tan = curve.getTangentAt(t).multiplyScalar(flip ? -1 : 1);
    nor.push(tan.x, tan.y, tan.z);
    uv.push(0.5, 0.5);
    const ringStart = (radialSegments + 1) * Math.round(t * tubularSegments);
    for (let j = 0; j < radialSegments; j++) {
      const a = ringStart + j;
      const b = ringStart + j + 1;
      if (flip) idx.push(base, b, a);
      else idx.push(base, a, b);
    }
  };
  if (capStart) cap(0, true);
  if (capEnd) cap(1, false);

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** Smooth catmull-rom curve through a list of [x,y,z] triples. */
export function curveFrom(points: [number, number, number][], tension = 0.5) {
  return new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(p[0], p[1], p[2])),
    false,
    'catmullrom',
    tension,
  );
}

export function tubeFrom(
  points: [number, number, number][],
  radius: number | ((t: number) => number),
  tubular = 64,
  radial = 12,
  tension = 0.5,
) {
  return loftTube(curveFrom(points, tension), typeof radius === 'function' ? radius : () => radius, tubular, radial);
}

/**
 * Take a sphere and push every vertex along an axis with a shaped profile.
 * Produces organic silhouettes (uterus, prostate, glans) from cheap primitives.
 */
export function shapedSphere(
  detail = 3,
  fn: (v: THREE.Vector3) => { scale: number; offset?: [number, number, number]; flatten?: number },
): THREE.BufferGeometry {
  const g = new THREE.SphereGeometry(1, 24 * detail > 24 ? 32 : 24, 20);
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const r = fn(v);
    v.multiplyScalar(r.scale);
    if (r.flatten) v.z *= r.flatten;
    if (r.offset) v.add(new THREE.Vector3(...r.offset));
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/** Mirror a geometry across the midline and merge the two halves. */
export function mirrorX(geo: THREE.BufferGeometry) {
  const clone = geo.clone();
  const p = clone.attributes.position as THREE.BufferAttribute;
  const n = clone.attributes.normal as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    p.setX(i, -p.getX(i));
    n.setX(i, -n.getX(i));
  }
  clone.index && clone.index.array && (clone.index.array = clone.index.array);
  p.needsUpdate = true;
  n.needsUpdate = true;
  clone.computeBoundingSphere();
  return clone;
}

/** Dispose a whole subtree of an Object3D (geometries, materials, textures). */
export function disposeObject(root: THREE.Object3D | null | undefined) {
  if (!root) return;
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    mesh.geometry?.dispose();
    const mat = mesh.material;
    if (mat) {
      const list = Array.isArray(mat) ? mat : [mat];
      for (const m of list) {
        const withTex = m as THREE.Material & { map?: THREE.Texture | null };
        withTex.map?.dispose();
        m.dispose();
      }
    }
  });
}
