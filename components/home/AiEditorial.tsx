"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { IMAGES } from "@/data/images";

const FLOW = [
  { label: "Business problem", note: "Where work actually slows down" },
  { label: "Process", note: "Mapped end to end, honestly" },
  { label: "AI", note: "Applied where it genuinely helps" },
  { label: "Automation", note: "The repetition, removed" },
  { label: "Human oversight", note: "People review the exceptions" },
  { label: "Outcome", note: "Speed and quality you can measure" },
];

/**
 * AI & Automation — a light editorial act. No glowing brains, no orbs.
 * A dark workflow panel against paper, one photograph, plain language.
 */
export function AiEditorial() {
  const reduce = useReducedMotion();

  return (
    <section className="section on-light bg-paper text-ink-950">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Copy + image */}
          <div>
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                AI &amp; Automation
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-md mt-6 text-[#0b0d13]">
                AI that works in the real world.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="lede mt-6 max-w-xl">
                We help businesses identify repetitive work, connect systems
                and introduce AI where it can improve speed, efficiency and
                decision-making.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/services/ai-automation"
                className="link-underline mt-8 inline-flex items-center gap-2 font-medium text-[#0b0d13]"
              >
                Explore AI &amp; Automation
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            <Reveal delay={0.24}>
              <ImageReveal
                image={IMAGES.engineering}
                aspect="aspect-[16/10]"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="mt-12 rounded-2xl"
              />
            </Reveal>
          </div>

          {/* Workflow panel — dark against paper */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-ink-950 p-8 text-white sm:p-10">
              <p className="eyebrow mb-9">
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                How an engagement flows
              </p>
              <ol className="flex flex-col">
                {FLOW.map((step, i) => (
                  <li key={step.label} className="relative">
                    {i < FLOW.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute bottom-[-14px] left-[5px] top-[22px] w-px overflow-hidden bg-white/10"
                      >
                        {!reduce && (
                          <motion.span
                            className="absolute left-0 top-0 h-4 w-px bg-gradient-to-b from-transparent via-cyan to-transparent"
                            animate={{ y: ["-16px", "52px"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: i * 0.4,
                            }}
                          />
                        )}
                      </span>
                    )}
                    <motion.div
                      initial={reduce ? undefined : { opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                      className="flex items-start gap-5"
                    >
                      <span
                        className={`mt-1 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${
                          i === FLOW.length - 1
                            ? "border-cyan bg-cyan/30"
                            : "border-white/40 bg-ink-950"
                        }`}
                        aria-hidden
                      />
                      <div className="pb-7">
                        <p className="font-medium tracking-tight text-white">
                          {step.label}
                        </p>
                        <p className="mt-1 text-sm text-white/45">
                          {step.note}
                        </p>
                      </div>
                    </motion.div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
