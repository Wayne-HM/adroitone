import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ServiceDiagram } from "@/components/services/ServiceDiagram";
import { SERVICES } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Talent, AI, Software & IT",
  description:
    "Four integrated capabilities from one partner: Technology Talent, AI & Automation, Software Development and IT Services — delivered from Hyderabad for clients in India and abroad.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="One partner. Multiple ways to move forward."
        lede="Start with a single hire or a full transformation program — every engagement draws on the same integrated engine of talent, AI, software, and cloud."
      >
        <MagneticButton href="/contact">Start a Conversation</MagneticButton>
      </PageHero>

      <section className="section pt-0">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.07} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="glass glass-hover reflect group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-9 select-none text-[8rem] font-bold leading-none tracking-tighter text-white/[0.04]"
                >
                  {service.index}
                </span>
                <div className="mb-8 h-[150px] w-full max-w-[240px] self-end opacity-80 transition-transform duration-500 group-hover:scale-[1.03]">
                  <ServiceDiagram
                    diagram={service.diagram}
                    accent={service.accent}
                  />
                </div>
                <p
                  className="mb-3 text-xs font-semibold tracking-[0.22em]"
                  style={{ color: service.accent }}
                >
                  {service.index} — {service.shortTitle.toUpperCase()}
                </p>
                <h2 className="display-md">{service.title}</h2>
                <p className="mt-3 font-medium tracking-tight text-white/70">
                  {service.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-white/55">
                  {service.description}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {service.capabilities.slice(0, 5).map((cap) => (
                    <li
                      key={cap}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.78rem] text-white/55"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 font-medium text-white">
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Engagement note */}
        <Reveal delay={0.1}>
          <div className="glass-deep mt-14 flex flex-col items-start justify-between gap-6 rounded-[2rem] p-8 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Not sure which engagement fits?
              </h2>
              <p className="mt-2 max-w-xl text-white/50">
                Tell us the outcome you need — we&apos;ll propose the model,
                whether that&apos;s one specialist or an entire program.
              </p>
            </div>
            <MagneticButton href="/contact">Talk to us</MagneticButton>
          </div>
        </Reveal>
      </section>

      <FinalCTA />
    </>
  );
}
