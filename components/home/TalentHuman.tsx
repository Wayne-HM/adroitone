"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { IMAGES } from "@/data/images";

const MODELS = ["Direct Hire", "Contract Staffing", "Contract-to-Hire", "C2C"];

/**
 * Talent — the human side of the business, led by photography.
 */
export function TalentHuman() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                Technology Talent
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-md mt-6 max-w-[16ch]">
                Great technology starts with great people.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-xl">
                We help organizations find, build and scale the technology
                teams they need — recruiters who understand the work, screening
                that respects everyone&apos;s time, and relationships measured
                in years.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {MODELS.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-white/12 px-4 py-1.5 text-sm text-white/65"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}>
              <Link
                href="/talent"
                className="link-underline mt-9 inline-flex items-center gap-2 font-medium text-white"
              >
                How we hire
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ImageReveal
              image={IMAGES.team}
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-2xl"
              caption={
                <span className="text-xs leading-relaxed text-white/75">
                  Specialist teams, assembled for the long term — not
                  transactional placements.
                </span>
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
