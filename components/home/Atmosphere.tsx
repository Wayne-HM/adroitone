"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Background-only atmospheric light.
 *
 * The cursor is an invisible input: the native pointer is never replaced,
 * no circle/dot/trail is ever rendered. A single very large, very soft
 * radial light drifts through the page BACKGROUND with spring inertia and
 * a slow breathing cycle. It sits behind all content (z-0; page content
 * wraps itself in z-10) and is disabled on touch devices and for
 * reduced-motion users (a static gradient remains).
 */
export function Atmosphere() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-1400);
  const my = useMotionValue(-1400);
  const x = useSpring(mx, { stiffness: 40, damping: 17, mass: 0.9 });
  const y = useSpring(my, { stiffness: 40, damping: 17, mass: 0.9 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    function onMove(e: PointerEvent) {
      mx.set(e.clientX);
      my.set(e.clientY);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Static ambient base — present on every device */}
      <div className="absolute -top-48 left-[6%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(70,96,255,0.06),transparent_65%)]" />
      <div className="absolute bottom-[-12%] right-[2%] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(118,106,255,0.045),transparent_65%)]" />

      {/* Mouse-driven atmosphere — large, soft, slow */}
      {!reduce && (
        <motion.div style={{ x, y }} className="absolute left-0 top-0">
          <div className="atmosphere-light h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(72,99,255,0.10)_0%,rgba(104,96,255,0.055)_36%,rgba(118,106,255,0.02)_55%,transparent_70%)]" />
        </motion.div>
      )}
    </div>
  );
}
