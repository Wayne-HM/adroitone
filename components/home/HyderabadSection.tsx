"use client";

import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { IMAGES } from "@/data/images";
import { OFFICES, HYDERABAD_MAPS_URL } from "@/data/site";

/**
 * Hyderabad — the home section. The India website's center of gravity.
 */
export function HyderabadSection() {
  return (
    <section className="section on-light bg-paper text-ink-950">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Image */}
          <Reveal delay={0.08}>
            <ImageReveal
              image={IMAGES.architecture}
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="rounded-2xl"
              alt="Modern office architecture"
            />
          </Reveal>

          {/* Copy + office */}
          <div>
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                Hyderabad · India
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-md mt-6 max-w-[16ch] text-[#0b0d13]">
                Built in Hyderabad. Connected to the world.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-xl">
                Our Hyderabad team brings together technology talent,
                engineering capability and digital expertise for businesses in
                India and beyond.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 rounded-2xl border border-black/[0.09] bg-white p-7 sm:p-8">
                <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-black/40">
                  OUR OFFICE
                </p>
                <p className="mt-4 text-lg font-semibold tracking-tight text-[#0b0d13]">
                  {OFFICES.hyderabad.entity}
                </p>
                <address className="mt-2 not-italic leading-relaxed text-black/55">
                  {OFFICES.hyderabad.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={HYDERABAD_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#0b0d13]"
                >
                  Find us
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
