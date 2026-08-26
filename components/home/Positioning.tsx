"use client";

import { Reveal } from "@/components/ui/Reveal";

/**
 * A quiet, typographic positioning statement.
 */
export function Positioning() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              Why we exist
            </p>
            <h2 className="display-md mt-6 max-w-[15ch]">
              Technology should solve real problems.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-end gap-6 text-lg leading-relaxed text-white/60 lg:pb-2">
              <p>
                AdroitOne brings together technology talent, software
                engineering and AI to help businesses build, improve and
                scale.
              </p>
              <p>
                That means practical expertise over buzzwords — people who
                have done the work, systems that hold up, and automation that
                pays for itself.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
