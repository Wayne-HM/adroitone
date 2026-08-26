"use client";

import { Reveal } from "@/components/ui/Reveal";
import { TECHNOLOGIES } from "@/data/technologies";

/**
 * Technology ecosystem — typographic columns, no logo wall.
 */
export function TechEcosystem() {
  return (
    <section className="section border-t border-white/[0.07]">
      <div className="container-x">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                Technology
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-md mt-6 max-w-[16ch]">
                The stack we work in, daily.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">
              Chosen per workload, not per fashion. No certifications or
              partnerships implied — this is simply the technology we know
              deeply.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
            {TECHNOLOGIES.map((cat) => (
              <div key={cat.key} className="border-t border-white/10 pt-6">
                <h3 className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/40">
                  {cat.label.toUpperCase()}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-[0.95rem] text-white/60 transition-colors duration-300 hover:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
