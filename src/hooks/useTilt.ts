import { useRef, useCallback } from "react";

interface TiltOptions {
  maxDeg?: number;
  scale?: number;
  perspective?: number;
}

/**
 * Lightweight 3D tilt hook — zero dependencies beyond React.
 * Drives transforms via direct style manipulation (no re-renders).
 * Gracefully does nothing on touch devices.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxDeg = 4,
  scale = 1.015,
  perspective = 900,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;  // –0.5 → +0.5
      const y = (e.clientY - top) / height - 0.5;
      el.style.transition = "transform 0.08s linear";
      el.style.transform = `perspective(${perspective}px) rotateX(${
        -y * maxDeg * 2
      }deg) rotateY(${x * maxDeg * 2}deg) scale3d(${scale},${scale},${scale})`;
    },
    [maxDeg, scale, perspective]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.23,1,0.32,1)";
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
