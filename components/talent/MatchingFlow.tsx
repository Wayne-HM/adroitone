"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/Icon";

const CHAIN: { label: string; sub: string; icon: IconName; accent?: boolean }[] = [
  { label: "CLIENT", sub: "Role, team & outcome defined", icon: "target" },
  { label: "ADROITONE", sub: "Sourcing · screening · shortlisting", icon: "sparkles", accent: true },
  { label: "TALENT", sub: "Technically vetted specialists", icon: "users" },
  { label: "OUTCOME", sub: "Teams that move faster", icon: "check" },
];

/**
 * Interactive matching flow — reads like a platform pipeline,
 * not a staffing brochure.
 */
export function MatchingFlow() {
  const reduce = useReducedMotion();

  return (
    <div className="glass-deep reflect relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
      <p className="eyebrow mb-8">
        <span aria-hidden className="h-px w-8 bg-current opacity-40" />
        Matching engine
      </p>

      <ol className="relative flex flex-col">
        {CHAIN.map((node, i) => (
          <li key={node.label} className="relative">
            {/* Connector */}
            {i < CHAIN.length - 1 && (
              <div aria-hidden className="absolute left-[25px] top-[56px] bottom-[-14px] w-px overflow-hidden bg-white/10">
                {!reduce && (
                  <motion.span
                    className="absolute left-0 top-0 h-6 w-px bg-gradient-to-b from-transparent via-cyan to-transparent"
                    animate={{ y: ["-24px", "90px"] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5,
                    }}
                  />
                )}
              </div>
            )}

            <div
              className={`flex items-center gap-5 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                node.accent
                  ? "border-accent/40 bg-accent/[0.08]"
                  : "border-white/[0.09] bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <span
                className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border ${
                  node.accent
                    ? "border-accent/50 text-cyan"
                    : "border-white/12 text-white/70"
                }`}
              >
                <Icon name={node.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.78rem] font-semibold tracking-[0.22em] text-white">
                  {node.label}
                </p>
                <p className="mt-1 truncate text-sm text-white/45">{node.sub}</p>
              </div>
            </div>

            {i < CHAIN.length - 1 && <div className="h-3.5" aria-hidden />}
          </li>
        ))}
      </ol>
    </div>
  );
}
