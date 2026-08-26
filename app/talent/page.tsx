import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MatchingFlow } from "@/components/talent/MatchingFlow";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Technology Talent — Technology staffing that understands the work",
  description:
    "Direct hire, contract staffing, contract-to-hire and C2C technology recruitment — strategically screened talent between New York and Hyderabad.",
  path: "/talent",
});

const CAPABILITIES = [
  {
    title: "Search & placement",
    items: ["Direct hire", "Niche & leadership search", "Market mapping", "Offer management"],
  },
  {
    title: "Flexible capacity",
    items: ["Contract staffing", "Contract-to-hire", "C2C partnerships", "Team augmentation"],
  },
  {
    title: "Quality control",
    items: ["Technical screening", "Structured shortlists", "Reference validation", "Interview calibration"],
  },
  {
    title: "Partnership",
    items: ["Recruitment management", "Workforce planning", "Onboarding support", "Long-term relationships"],
  },
];

export default function TalentPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology Talent"
        title="The right people change the speed of a company."
        lede="We operate as a strategic talent partner — not a résumé forwarder. Every search is run by people who understand the technology they're hiring for."
      >
        <MagneticButton href="/contact">Start a search</MagneticButton>
      </PageHero>

      <section className="section pt-4">
        <div className="container-x grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal staggerChildren={0.06}>
              <ul className="grid gap-6 sm:grid-cols-2">
                {CAPABILITIES.map((group) => (
                  <li key={group.title} className="glass glass-hover rounded-3xl p-7">
                    <h2 className="font-semibold tracking-tight text-white">
                      {group.title}
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-sm text-white/60"
                        >
                          <span aria-hidden className="h-1 w-1 rounded-full bg-cyan" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <MatchingFlow />
            <Reveal delay={0.15}>
              <div className="glass mt-6 rounded-3xl p-7">
                <h2 className="font-medium tracking-tight text-white">
                  Engagement models
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["Direct Hire", "Contract", "Contract-to-Hire", "C2C"].map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 text-sm text-white/70"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  Mix models as your roadmap shifts — anchor roles permanent,
                  specialist gaps covered, conversions de-risked.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* For candidates */}
      <section className="section on-light bg-paper-dim text-ink-950">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                For candidates
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md text-[#0b0d13]">
                Exceptional engineers, designers, and recruiters.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-xl">
                We&apos;re always meeting specialists for opportunities across
                New York and Hyderabad. Reach out through our contact form —
                select <strong className="font-semibold">Technology Talent</strong> — and tell us what you&apos;re looking to do next.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:justify-self-end">
            <MagneticButton href="/contact" variant="dark">
              Introduce yourself
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
