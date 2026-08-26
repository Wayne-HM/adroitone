import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { FinalCTA } from "@/components/home/FinalCTA";
import { OFFICES, HYDERABAD_MAPS_URL } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Start a conversation",
  description:
    "Tell us what you're building, hiring for, or automating. AdroitOne operates between New York and Hyderabad — talent, AI automation, software development, and IT services.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Have a problem worth solving?"
        lede="Tell us what you're building. We'll help you figure out what's next."
      />

      <section className="section pt-4 pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Info column */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <p className="eyebrow mb-5">International · USA</p>
              <p className="font-medium text-white">{OFFICES.newYork.entity}</p>
              <address className="mt-1.5 text-sm not-italic leading-relaxed text-white/50">
                {OFFICES.newYork.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
            </div>

            <div className="glass rounded-3xl p-8">
              <p className="eyebrow mb-5">Hyderabad · India</p>
              <p className="font-medium text-white">{OFFICES.hyderabad.entity}</p>
              <address className="mt-1.5 text-sm not-italic leading-relaxed text-white/50">
                {OFFICES.hyderabad.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <a
                href={HYDERABAD_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan"
              >
                View on Google Maps
                <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="glass-deep rounded-3xl p-8">
              <p className="text-sm font-semibold tracking-wide text-white">
                What happens after you send
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/55">
                <li className="flex gap-3">
                  <span aria-hidden className="text-cyan">01</span>
                  Your inquiry is routed to the right practice lead.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-cyan">02</span>
                  We review context before we respond — no generic replies.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-cyan">03</span>
                  A short conversation to see if we&apos;re the right partner.
                </li>
              </ul>
            </div>
          </div>

          {/* Form column */}
          <ContactForm />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
