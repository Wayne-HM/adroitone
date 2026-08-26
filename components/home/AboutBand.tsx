"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Compact editorial About band.
 */
export function AboutBand() {
  return (
    <section className="section border-t border-white/[0.07]">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden className="h-px w-8 bg-current opacity-40" />
              About AdroitOne
            </p>
            <h2 className="display-md mt-6 max-w-[16ch]">
              Built around people. Powered by technology.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <p className="max-w-md text-lg leading-relaxed text-white/60">
                Adroitone Consulting combines people, software, AI and
                technology to help businesses solve real problems — with a
                team that stays invested long after launch.
              </p>
              <Link
                href="/company"
                className="link-underline mt-7 inline-flex items-center gap-2 font-medium text-white"
              >
                More about the company
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
