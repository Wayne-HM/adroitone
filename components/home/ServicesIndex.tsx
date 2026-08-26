"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/data/services";
import { IMAGES } from "@/data/images";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

/**
 * Editorial service index — large rows, hover reveals a preview panel
 * (desktop). Feels like a print contents page, not a card grid.
 */

const PREVIEW: Record<string, (typeof IMAGES)[keyof typeof IMAGES]> = {
  "talent-search": IMAGES.team,
  "ai-automation": IMAGES.code,
  "software-development": IMAGES.engineering,
  "it-services": IMAGES.server,
};

export function ServicesIndex() {
  const [active, setActive] = useState(0);

  return (
    <section className="section border-t border-white/[0.07]">
      <div className="container-x">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5">
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              What we do
            </p>
            <h2 className="display-md max-w-[16ch]">
              Four practices. One accountable partner.
            </h2>
          </div>
          <Link
            href="/services"
            className="link-underline inline-flex items-center gap-2 pb-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            All services
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-12 xl:grid-cols-[1fr_360px] xl:gap-16">
          {/* Rows */}
          <div>
            {SERVICES.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group grid grid-cols-[2.6rem_1fr_auto] items-baseline gap-x-4 border-t border-white/10 py-8 transition-colors duration-300 last:border-b sm:grid-cols-[3.5rem_1fr] sm:gap-x-6 sm:py-9 xl:grid-cols-[3.5rem_1fr_auto]",
                  active === i ? "bg-white/[0.015]" : ""
                )}
              >
                <span
                  className={cn(
                    "pt-1 text-xs tracking-widest transition-colors duration-300",
                    active === i ? "text-cyan" : "text-white/25"
                  )}
                >
                  {service.index}
                </span>

                <span className="min-w-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                  <span className="flex flex-wrap items-baseline gap-x-4">
                    <span className="text-[1.45rem] font-semibold tracking-[-0.025em] text-white sm:text-[1.7rem]">
                      {service.title}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-xl text-[0.95rem] leading-relaxed text-white/50">
                    {service.tagline}
                  </span>
                  <span className="mt-3 block max-w-xl text-[0.78rem] leading-relaxed tracking-wide text-white/30">
                    {service.capabilities.slice(0, 4).join("  ·  ")}
                  </span>
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "hidden h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 xl:flex",
                    active === i
                      ? "border-white bg-white text-ink-950"
                      : "border-white/15 text-white/50"
                  )}
                >
                  <Icon name="arrow-right" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Preview panel (desktop) */}
          <div className="relative hidden xl:block">
            <div className="sticky top-28">
              <div className="relative h-[430px] overflow-hidden rounded-xl bg-ink-800">
                {SERVICES.map((service, i) => (
                  <motion.div
                    key={service.slug}
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 1.04,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={PREVIEW[service.slug].src}
                      alt={PREVIEW[service.slug].alt}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-5 pt-16">
                  <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-white/90">
                    {SERVICES[active]?.title.toUpperCase()}
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    {SERVICES[active]?.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
