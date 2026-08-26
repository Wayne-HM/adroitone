"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRINCIPLES } from "@/data/principles";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Light interactive section — click/hover a principle to expand it.
 */
export function PrinciplesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section on-light bg-paper-dim text-ink-950">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow mb-5">
                  <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                  Why AdroitOne
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display-lg max-w-[14ch] text-[#0b0d13]">
                  Why work with us
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="lede mt-6 max-w-md">
                  Five principles that shape every engagement, from the first
                  conversation to long after launch.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1}>
            <ul className="flex flex-col">
              {PRINCIPLES.map((p, i) => {
                const isOpen = open === i;
                return (
                  <li key={p.index} className="border-b border-black/[0.08] first:border-t">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      onMouseEnter={() => setOpen(i)}
                      aria-expanded={isOpen}
                      aria-controls={`principle-${p.index}`}
                      className="group flex w-full items-center gap-6 py-6 text-left sm:py-7"
                    >
                      <span
                        className={cn(
                          "text-sm font-medium tracking-widest transition-colors duration-300",
                          isOpen ? "text-accent" : "text-black/30"
                        )}
                      >
                        {p.index}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl",
                          isOpen ? "text-[#0b0d13]" : "text-black/45 group-hover:text-black/70"
                        )}
                      >
                        {p.name}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full border text-lg leading-none",
                          isOpen ? "border-accent text-accent" : "border-black/15 text-black/40"
                        )}
                        aria-hidden
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`principle-${p.index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-7 pl-[3.4rem] pr-4 leading-relaxed text-black/60">
                            {p.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
