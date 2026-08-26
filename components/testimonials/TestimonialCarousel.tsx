"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";

/**
 * Elegant testimonial carousel. Renders NOTHING while there are no
 * verified testimonials — never fabricates quotes.
 */
export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const hasData = TESTIMONIALS.length > 0;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!hasData) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [hasData, next]);

  if (!hasData) return null;

  const item: Testimonial = TESTIMONIALS[index]!;

  return (
    <section className="section relative">
      <div className="container-x max-w-4xl text-center">
        <p className="eyebrow mb-10 justify-center">
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
          Partner feedback
          <span aria-hidden className="h-px w-8 bg-current opacity-40" />
        </p>

        <div className="relative min-h-[220px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight text-white sm:text-[1.75rem]">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-medium text-white">{item.person}</p>
                <p className="mt-1 text-sm text-white/45">
                  {item.title} · {item.company}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                i === index ? "w-8 bg-accent" : "w-3 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
