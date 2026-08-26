"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ARTICLES, INSIGHT_CATEGORIES } from "@/data/insights";
import { cn } from "@/lib/utils";

export function InsightsGrid() {
  const [category, setCategory] = useState<(typeof INSIGHT_CATEGORIES)[number]>("All");

  const filtered =
    category === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === category);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {INSIGHT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
              category === cat
                ? "border-accent/60 bg-accent/[0.12] text-white"
                : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((article) => (
            <motion.article
              layout
              key={article.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href={`/insights/${article.slug}`}
                className="glass glass-hover group flex h-full flex-col rounded-3xl p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-violet/30 bg-violet/[0.08] px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-violet">
                    {article.category.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/30">
                    {article.readMinutes} min read
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-cyan sm:text-[1.35rem]">
                  {article.title}
                </h2>
                <p className="mt-3 line-clamp-3 leading-relaxed text-white/50">
                  {article.excerpt}
                </p>
                <p className="mt-auto pt-6 text-xs tracking-widest text-white/30">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  <span aria-hidden className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </p>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
