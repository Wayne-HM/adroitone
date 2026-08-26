"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 select-none";

const variants = {
  primary:
    "bg-white text-ink-950 px-7 py-3.5 hover:bg-[#e9edff] shadow-[0_10px_40px_-12px_rgba(61,99,255,0.45)]",
  ghost:
    "border border-white/15 text-white px-7 py-3.5 hover:border-white/35 hover:bg-white/[0.05]",
  dark: "bg-ink-950 text-white px-7 py-3.5 hover:bg-ink-700",
} as const;

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  arrow = true,
  type = "button",
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 180, damping: 16, mass: 0.4 });

  function handleMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mx.set(relX * 0.18);
    my.set(relY * 0.28);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <Icon
          name="arrow-right"
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { x, y }}
      className="inline-block"
    >
      {href ? (
        <Link
          href={href}
          aria-label={ariaLabel}
          className={cn(base, variants[variant], className)}
        >
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={cn(
            base,
            variants[variant],
            disabled && "opacity-60 pointer-events-none",
            className
          )}
        >
          {inner}
        </button>
      )}
    </motion.span>
  );
}
