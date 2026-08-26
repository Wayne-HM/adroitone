"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Icon } from "@/components/ui/Icon";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="h-full">
      <GlassCard
        className="flex h-full flex-col p-7 sm:p-9"
        spotlight={false}
      >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="rounded-full border border-amber-300/25 bg-amber-200/[0.06] px-3 py-1 text-[0.66rem] font-medium tracking-[0.16em] text-amber-200/80">
          {study.illustrative ? "ILLUSTRATIVE TEMPLATE" : "CLIENT STORY"}
        </span>
        <span className="text-xs tracking-widest text-white/30">
          {study.context.split("·")[0]?.trim()}
        </span>
      </div>

      <h3 className="text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
        {study.title}
      </h3>

      <div className="mt-6 space-y-4 text-sm leading-relaxed">
        <div>
          <p className="mb-1 text-[0.68rem] font-semibold tracking-[0.2em] text-cyan">
            CHALLENGE
          </p>
          <p className="line-clamp-3 text-white/55">{study.challenge}</p>
        </div>
        <div>
          <p className="mb-1 text-[0.68rem] font-semibold tracking-[0.2em] text-violet">
            APPROACH
          </p>
          <p className="line-clamp-3 text-white/55">{study.approach}</p>
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {study.technology.slice(0, 4).map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.75rem] text-white/55"
          >
            {tech}
          </li>
        ))}
      </ul>

      <ul className="mt-auto space-y-2 pt-8">
        {study.outcome.slice(0, 2).map((o) => (
          <li key={o} className="flex items-start gap-2.5 text-sm text-white/70">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
            {o}
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-70"
      />
      <Link href="/case-studies" className="absolute inset-0" aria-label={`Case study: ${study.title}`} />
      </GlassCard>
    </article>
  );
}
