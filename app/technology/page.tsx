import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TechnologyCloud } from "@/components/technology/TechnologyCloud";
import { FinalCTA } from "@/components/home/FinalCTA";
import { TECHNOLOGIES } from "@/data/technologies";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Technology — Modern stacks, built to last",
  description:
    "React, Angular, Node.js, Python, AWS, Azure, Google Cloud, LLM integrations and modern design tooling — the technologies AdroitOne builds with across New York and Hyderabad.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="A modern stack, chosen for longevity."
        lede="We build on technologies with strong futures — selected per workload, not per fashion. No certifications are implied; this is the stack we work in daily."
      />

      <section className="section pt-4">
        <div className="container-x">
          <TechnologyCloud />
        </div>
      </section>

      {/* Category detail */}
      <section className="section border-t border-white/[0.06] pt-20">
        <div className="container-x grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TECHNOLOGIES.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 0.06} className="h-full">
              <article className="glass glass-hover flex h-full flex-col rounded-3xl p-8">
                <h2 className="text-xs font-semibold tracking-[0.24em] text-cyan">
                  {cat.label.toUpperCase()}
                </h2>
                <p className="mt-4 leading-relaxed text-white/55">{cat.blurb}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.82rem] text-white/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
