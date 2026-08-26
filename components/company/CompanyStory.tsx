"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { OFFICES } from "@/data/site";

const FACTS = [
  {
    k: "United States",
    v: OFFICES.newYork.entity,
    sub: "Business · Clients · Strategy",
  },
  {
    k: "India",
    v: OFFICES.hyderabad.entity,
    sub: "Banjara Hills, Hyderabad",
  },
  {
    k: "Focus",
    v: "Talent · AI · Software · IT",
    sub: "One integrated delivery engine",
  },
];

export function CompanyStory() {
  return (
    <section className="section relative overflow-hidden">
      <div
        aria-hidden
        className="orb right-[-8%] bottom-[0%] -z-10 h-[400px] w-[400px] bg-accent/10"
      />
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                The company
              </p>
            </Reveal>
            <h2 className="display-lg">
              <AnimatedText text="Built between New York and Hyderabad." accentWord="" />
            </h2>
            <Reveal delay={0.15}>
              <div className="mt-7 space-y-5 text-lg leading-relaxed text-white/60">
                <p>
                  AdroitOne exists because great delivery takes two things that
                  rarely live in the same room: proximity to the business and
                  depth of engineering.
                </p>
                <p>
                  From New York, we work directly with clients — strategy,
                  talent, and outcomes. From Hyderabad, we execute — software,
                  cloud, automation, and the specialists who build them. One
                  company, one standard, two time zones of momentum.
                </p>
                <p>
                  We are deliberately built around people first: the right
                  engineers, the right recruiters, the right architects —
                  amplified by modern tooling and applied AI.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10" id="careers">
                <p className="mb-4 text-sm text-white/45">
                  We&apos;re always meeting exceptional people. Reach out through
                  the contact form and select{" "}
                  <span className="text-white/70">Technology Talent</span>.
                </p>
                <MagneticButton href="/contact">Work with us</MagneticButton>
              </div>
            </Reveal>
          </div>

          {/* Facts */}
          <Reveal delay={0.1} className="flex flex-col justify-center gap-4">
            {FACTS.map((fact) => (
              <div
                key={fact.k}
                className="glass glass-hover rounded-3xl p-7"
              >
                <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-white/35">
                  {fact.k.toUpperCase()}
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-white">
                  {fact.v}
                </p>
                <p className="mt-1.5 text-sm text-white/45">{fact.sub}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
