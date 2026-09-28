import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type CalloutItem = {
  key: string;
  label: string;
  /** Leader-line length in px. */
  lead?: number;
  /** Vertical stagger so labels never collide. */
  offsetY?: number;
  side?: 'left' | 'right';
};

export type CalloutRefs = Record<string, HTMLElement | null>;

/**
 * HTML labels projected from 3D. The scene writes transforms straight to the
 * DOM inside useFrame, so labels cost zero React renders per frame. Hidden
 * below 900px, where the type would be too small to be honest.
 */
export function useCallouts(items: CalloutItem[], accent = 'var(--cyan)') {
  const refs = useRef<CalloutRefs>({});

  const overlay = (
    <div className="callouts" aria-hidden="true">
      {items.map((it) => (
        <div
          key={it.key}
          ref={(el) => {
            refs.current[it.key] = el;
          }}
          className="callout"
          data-side={it.side ?? 'right'}
          style={{ opacity: 0, ['--lead' as string]: `${it.lead ?? 46}px`, ['--accent' as string]: accent }}
        >
          <span className="callout__dot" />
          <span className="callout__line" />
          <span className="callout__text" style={it.offsetY ? { marginTop: it.offsetY } : undefined}>
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );

  return { overlay, refs };
}

/** Call this inside useFrame to project each anchor onto its label. */
export function projectCallouts(
  refs: React.RefObject<CalloutRefs>,
  activeSet: Set<string>,
  camera: THREE.Camera,
  canvas: HTMLCanvasElement | null,
  anchors: Map<string, THREE.Object3D>,
  v: THREE.Vector3,
) {
  const map = refs.current;
  if (!canvas || !map) return;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;
  const tooSmall = w < 820;
  for (const key of Object.keys(map)) {
    const el = map[key];
    if (!el) continue;
    const obj = anchors.get(key);
    if (!obj || tooSmall || !activeSet.has(key)) {
      el.style.opacity = '0';
      continue;
    }
    obj.getWorldPosition(v);
    v.project(camera);
    el.style.opacity = v.z < 1 ? '1' : '0';
    el.style.transform = `translate3d(${Math.round((v.x * 0.5 + 0.5) * w)}px, ${Math.round((-v.y * 0.5 + 0.5) * h)}px, 0)`;
  }
}

/** Shared scratch vector so the per-frame path allocates nothing. */
export function useScratch() {
  return useMemo(() => new THREE.Vector3(), []);
}

export function useAnchors() {
  const ref = useRef(new Map<string, THREE.Object3D>());
  useEffect(() => {
    ref.current.clear();
  }, []);
  return ref;
}
