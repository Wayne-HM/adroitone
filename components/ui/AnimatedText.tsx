"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Animate on mount (hero) vs. on scroll into view (default). */
  immediate?: boolean;
  /** Word to render with the brand gradient. */
  accentWord?: string;
};

export function AnimatedText({
  text,
  className,
  delay = 0,
  immediate = false,
  accentWord,
}: AnimatedTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const wordAnim = {
    hidden: { y: reduce ? 0 : "112%", opacity: reduce ? 0 : 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: EASE_OUT },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } })}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
        >
          <motion.span
            variants={wordAnim}
            className={`inline-block will-change-transform ${
              accentWord && word.replace(/[.,—×]/g, "") === accentWord
                ? "text-gradient"
                : ""
            }`}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
