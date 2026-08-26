"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  /** Pointer-tracking spotlight highlight. Disable for static cards. */
  spotlight?: boolean;
};

export function GlassCard({
  children,
  className,
  spotlight = true,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={spotlight ? handleMove : undefined}
      className={cn(
        "glass reflect glass-hover group relative rounded-3xl",
        className
      )}
    >
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(340px_circle_at_var(--mx,50%)_var(--my,50%),rgba(96,124,255,0.13),transparent_65%)]"
        />
      )}
      {children}
    </div>
  );
}
