import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { InsightsGrid } from "@/components/insights/InsightsGrid";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights — AI, automation, talent & technology",
  description:
    "Practical perspectives on AI adoption, intelligent automation, modern software delivery, and hiring exceptional technology talent.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Field notes from the delivery floor."
        lede="Practical perspectives on AI, automation, technology and talent — written by the people doing the work."
      />
      <section className="section pt-2">
        <div className="container-x">
          <InsightsGrid />
          <p className="mt-12 text-center text-xs tracking-wide text-white/30">
            Editorial previews — being replaced with published AdroitOne
            articles as they ship.
          </p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
