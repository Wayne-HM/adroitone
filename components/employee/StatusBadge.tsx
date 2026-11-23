"use client";

import { cn } from "@/lib/utils";

type StatusVariant =
  | "present"
  | "absent"
  | "partial"
  | "active"
  | "inactive"
  | "demo"
  | "default";

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const variant = (status?.toLowerCase() ?? "default") as StatusVariant;

  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border";
  const variants: Record<StatusVariant, string> = {
    present:
      "bg-green-500/10 border-green-500/20 text-green-400",
    absent: "bg-red-500/10 border-red-500/20 text-red-400",
    partial: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    active: "bg-green-500/10 border-green-500/20 text-green-400",
    inactive: "bg-ink-700 border-ink-700/40 text-white/50",
    demo: "bg-accent/10 border-accent/20 text-accent",
    default: "bg-ink-700 border-ink-700/40 text-white/50",
  };

  const dotColors: Record<StatusVariant, string> = {
    present: "bg-green-500",
    absent: "bg-red-500",
    partial: "bg-amber-500",
    active: "bg-green-500",
    inactive: "bg-ink-600",
    demo: "bg-accent",
    default: "bg-ink-600",
  };

  return (
    <span
      className={cn(base, variants[variant], className)}
      data-status={variant}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dotColors[variant],
          variant === "demo" ? "animate-pulse" : ""
        )}
        aria-hidden
      />
      {status}
    </span>
  );
}

export function DemoLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wider text-accent",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      DEMO
    </span>
  );
}
