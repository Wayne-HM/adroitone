import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ServiceDiagram } from "@/components/services/ServiceDiagram";
import { SERVICES, getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} — ${service.tagline}`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Services · ${service.index}`}
        title={service.title}
        lede={service.description}
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href={`/contact?service=${encodeURIComponent(service.title)}`}>
            Discuss {service.shortTitle}
          </MagneticButton>
          <MagneticButton href="/services" variant="ghost" arrow={false}>
            All services
          </MagneticButton>
        </div>
      </PageHero>

      {/* Capabilities */}
      <section className="section pt-4">
        <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-md">What we cover</h2>
            </Reveal>
            <Reveal delay={0.08} staggerChildren={0.05}>
              <ul className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="glass glass-hover rounded-2xl px-5 py-4 text-[0.95rem] text-white/75"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div
              className="glass-deep reflect flex h-full min-h-[320px] items-center justify-center rounded-[2rem] p-8"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 40%, ${service.accent}14, transparent 70%)`,
              }}
            >
              <div className="h-[240px] w-full max-w-[300px]">
                <ServiceDiagram
                  diagram={service.diagram}
                  accent={service.accent}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Engagement models + outcomes */}
      <section className="section border-t border-white/[0.06] pt-20">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="display-md">Ways to engage</h2>
            </Reveal>
            <Reveal delay={0.08} staggerChildren={0.07}>
              <ul className="mt-8 space-y-4">
                {service.engagements.map((e, i) => (
                  <li key={e.name} className="glass glass-hover rounded-2xl p-6">
                    <p className="flex items-center gap-3 font-medium tracking-tight text-white">
                      <span style={{ color: service.accent }}>
                        0{i + 1}
                      </span>
                      {e.name}
                    </p>
                    <p className="mt-1.5 pl-8 text-sm text-white/50">{e.note}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h2 className="display-md">What good looks like</h2>
            </Reveal>
            <Reveal delay={0.08} staggerChildren={0.07}>
              <ul className="mt-8 space-y-5">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-4 leading-relaxed text-white/70">
                    <span
                      aria-hidden
                      className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: service.accent }}
                    />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section border-t border-white/[0.06] pt-20">
        <div className="container-x">
          <Reveal>
            <h2 className="eyebrow mb-8">Continue exploring</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="glass glass-hover group rounded-2xl p-6"
              >
                <p className="text-xs tracking-widest" style={{ color: s.accent }}>
                  {s.index}
                </p>
                <p className="mt-2 font-medium tracking-tight text-white">
                  {s.title}
                </p>
                <span
                  aria-hidden
                  className="mt-3 inline-block text-white/40 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
