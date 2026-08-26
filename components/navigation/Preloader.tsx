"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { Logo } from "./Logo";

/**
 * First-visit loader. Shows once per session, exits in under a second.
 * Skipped entirely for reduced-motion users and repeat views.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("a1-loaded")) return;
    setShow(true);
    sessionStorage.setItem("a1-loaded", "1");
    const t = setTimeout(() => setShow(false), 1150);
    return () => clearTimeout(t);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden
        >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <Logo size={52} priority />
        </motion.div>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
          className="mt-6 h-px w-24 origin-left bg-gradient-to-r from-accent to-cyan"
        />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
