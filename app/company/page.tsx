import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PrinciplesSection } from "@/components/why/PrinciplesSection";
import { CompanyStory } from "@/components/company/CompanyStory";
import { OFFICES, HYDERABAD_MAPS_URL } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Company — Built between New York and Hyderabad",
  description:
    "AdroitOne combines U.S. business proximity with Hyderabad engineering depth — talent, AI, software and IT delivered as one integrated engine.",
  path: "/company",
});

const TIMELINE_NOTES = [
  {
    k: "Hyderabad",
    v: "Adroitone Consulting Pvt Ltd — the core India operation: engineering, technology and delivery from Banjara Hills.",
  },
  {
    k: "New York",
    v: "AdroitOne Inc. — the group's related U.S. presence, extending international reach to American clients.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Built between New York and Hyderabad."
        lede="One company with two centers of gravity: business proximity in the United States, engineering depth in India. People first — amplified by modern technology and applied AI."
      />

      <CompanyStory />

      <PrinciplesSection />

      <section className="section">
        <div className="container-x">
          <Reveal>
            <h2 className="display-md mb-12 max-w-[18ch]">
              Where we work.
            </h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="glass glass-hover flex h-full flex-col rounded-3xl p-9">
                <p className="eyebrow mb-6">United States</p>
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {OFFICES.newYork.entity}
                </h3>
                <address className="mt-2 not-italic leading-relaxed text-white/55">
                  {OFFICES.newYork.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <p className="mt-5 leading-relaxed text-white/50">
                  Our related U.S. presence — extending AdroitOne&apos;s
                  international reach while Hyderabad remains the core India
                  operation.
                </p>
                <div className="mt-auto flex items-center gap-2 pt-8 text-sm text-white/60">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {OFFICES.newYork.role}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="glass glass-hover flex h-full flex-col rounded-3xl p-9">
                <p className="eyebrow mb-6">India</p>
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {OFFICES.hyderabad.entity}
                </h3>
                <address className="mt-2 not-italic leading-relaxed text-white/55">
                  {OFFICES.hyderabad.lines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <a
                  href={HYDERABAD_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-auto inline-flex w-fit items-center gap-1.5 pt-8 text-sm font-medium text-cyan"
                >
                  View on Google Maps
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {TIMELINE_NOTES.map((n) => (
                <li key={n.k} className="glass-deep rounded-2xl p-6 text-sm leading-relaxed text-white/60">
                  <strong className="mr-2 font-semibold text-white">{n.k}:</strong>
                  {n.v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
