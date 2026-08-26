"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { IMAGES } from "@/data/images";
import { OFFICES } from "@/data/site";

/**
 * International presence — deliberately smaller than the Hyderabad
 * section. The U.S. entity is context, not the identity of this site.
 */
export function InternationalPresence() {
  return (
    <section className="section border-t border-white/[0.07]">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                International
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-md mt-6 max-w-[14ch]">
                Connected to the U.S. market.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-xl">
                AdroitOne&apos;s related U.S. presence in New York extends the
                company&apos;s international reach — while Hyderabad remains
                the core India operation behind this website.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid gap-6 sm:grid-cols-[0.9fr_1.1fr] sm:items-stretch">
              <ImageReveal
                image={IMAGES.nyc}
                aspect="aspect-[4/3] sm:aspect-auto sm:h-full sm:min-h-[240px]"
                sizes="(max-width: 640px) 100vw, 220px"
                className="rounded-2xl"
                alt="Lower Manhattan at dusk, New York City"
              />
              <div className="glass rounded-2xl p-7">
                <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/40">
                  UNITED STATES
                </p>
                <p className="mt-4 text-lg font-semibold tracking-tight text-white">
                  {OFFICES.newYork.entity}
                </p>
                <address className="mt-2 not-italic leading-relaxed text-white/50">
                  {OFFICES.newYork.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
