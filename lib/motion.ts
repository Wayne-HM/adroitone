"use client";

import { useReducedMotion, type Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function fadeUp(distance = 28): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE_OUT },
    },
  };
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT },
  },
};

export function stagger(children = 0.09, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: children, delayChildren: delay },
    },
  };
}

/** Viewport config used by whileInView reveals across the site. */
export const viewportOnce = { once: true, margin: "-12% 0px" } as const;

export { useReducedMotion };
