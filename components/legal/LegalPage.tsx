import { Reveal } from "@/components/ui/Reveal";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 lg:pt-48">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="orb left-[6%] top-[2%] h-[300px] w-[300px] bg-accent/10" />
      </div>
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="eyebrow mb-6">
            <span aria-hidden className="h-px w-8 bg-current opacity-40" />
            Legal
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display-md">{title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-sm text-white/35">Last updated: {updated}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lede mt-8">{intro}</p>
        </Reveal>

        <div className="mt-14 space-y-12">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={Math.min(i * 0.04, 0.2)}>
              <section aria-labelledby={`legal-${i}`}>
                <h2
                  id={`legal-${i}`}
                  className="text-xl font-semibold tracking-tight text-white"
                >
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-white/60">
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-sm leading-relaxed text-white/40">
            This document is provided as a working draft for AdroitOne. Have it
            reviewed by qualified counsel before relying on it as a binding
            policy.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
