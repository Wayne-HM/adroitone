import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { CASE_STUDIES } from "@/data/case-studies";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies — Challenge, approach, technology, outcome",
  description:
    "How AdroitOne documents client work — every engagement structured as challenge, approach, technology, and outcome.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Work, structured honestly."
        lede="Every engagement is documented the same way: the challenge we walked into, the approach we took, the technology that carried it, and the outcome it produced."
      />

      <section className="section pt-4">
        <div className="container-x grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.07} className="h-full">
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="glass-deep mx-auto mt-14 max-w-3xl rounded-3xl p-8 text-center sm:p-10">
            <h2 className="text-lg font-semibold tracking-tight text-white">
              A note on these entries
            </h2>
            <p className="mt-3 leading-relaxed text-white/55">
              These are illustrative templates of our documentation format —
              not client claims. Real case studies are published here only with
              written client permission, exactly as delivered.
            </p>
          </div>
        </Reveal>
      </section>

      <TestimonialCarousel />
      <FinalCTA />
    </>
  );
}
