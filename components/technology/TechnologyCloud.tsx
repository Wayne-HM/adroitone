"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TECHNOLOGIES } from "@/data/technologies";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function TechnologyCloud({ compact = false }: { compact?: boolean }) {
  const [activeKey, setActiveKey] = useState(TECHNOLOGIES[0].key);
  const active =
    TECHNOLOGIES.find((t) => t.key === activeKey) ?? TECHNOLOGIES[0];

  return (
    <div>
      {/* Category tabs */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Technology categories"
          className="flex flex-wrap gap-2"
        >
          {TECHNOLOGIES.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={activeKey === cat.key}
              onClick={() => setActiveKey(cat.key)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
                activeKey === cat.key
                  ? "border-accent/60 bg-accent/[0.12] text-white"
                  : "border-white/10 bg-transparent text-white/50 hover:border-white/25 hover:text-white/80"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Panel */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {!compact && (
              <p className="mb-6 max-w-lg leading-relaxed text-white/55">
                {active.blurb}
              </p>
            )}
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {active.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="glass glass-hover flex items-center justify-center rounded-2xl px-4 py-6 text-center"
                >
                  <span className="text-[0.95rem] font-medium tracking-tight text-white/85">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
