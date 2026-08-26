"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  /** Stagger direct motion children instead of animating this node alone. */
  staggerChildren?: number;
};

export function Reveal({
  children,
  delay = 0,
  distance = 28,
  className,
  staggerChildren,
}: RevealProps) {
  if (staggerChildren !== undefined) {
    return (
      <motion.div
        className={className}
        variants={stagger(staggerChildren, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      variants={fadeUp(distance)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
