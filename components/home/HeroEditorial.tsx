"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT } from "@/lib/motion";

const STRIP_ITEMS = [
  "Technology Talent",
  "AI & Automation",
  "Software Engineering",
  "Digital Delivery",
];

/** Sparse, deterministic ambient particles (no hydration randomness). */
const PARTICLES = [
  { x: 12, y: 22, s: 2, o: 0.35, d: 7 },
  { x: 22, y: 64, s: 3, o: 0.22, d: 9 },
  { x: 31, y: 38, s: 2, o: 0.3, d: 8 },
  { x: 44, y: 14, s: 2, o: 0.25, d: 10 },
  { x: 57, y: 70, s: 3, o: 0.2, d: 7.5 },
  { x: 66, y: 26, s: 2, o: 0.32, d: 9.5 },
  { x: 74, y: 56, s: 2, o: 0.24, d: 8.5 },
  { x: 83, y: 34, s: 3, o: 0.28, d: 10.5 },
  { x: 90, y: 62, s: 2, o: 0.22, d: 7 },
  { x: 8, y: 48, s: 2, o: 0.26, d: 9 },
  { x: 50, y: 84, s: 2, o: 0.2, d: 8 },
  { x: 70, y: 88, s: 2, o: 0.24, d: 10 },
];

/**
 * Maximalist editorial hero — typography IS the composition.
 * Centered, oversized, layered over orbital lines, ambient particles and
 * tiny technical annotations. The cursor stays a normal, invisible input;
 * the background atmosphere lives separately.
 */
export function HeroEditorial() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  const lineReveal = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { y: "115%" },
    animate: reduce ? { opacity: 1 } : { y: 0 },
    transition: { duration: 1.05, ease: EASE_OUT, delay },
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 lg:pt-32">
      {/* ——— Decorative background layers ——— */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Faint radial falloff */}
        <div className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(28,34,66,0.5)_0%,transparent_55%)]" />

        {/* Orbital lines — barely there, extremely slow */}
        <svg
          viewBox="0 0 1200 1200"
          className="absolute left-1/2 top-1/2 h-[135vmin] w-[135vmin] -translate-x-1/2 -translate-y-1/2"
          fill="none"
        >
          <motion.g
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx="600" cy="600" r="470" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle
              cx="600"
              cy="600"
              r="470"
              stroke="url(#orbit-accent)"
              strokeWidth="1.2"
              strokeDasharray="90 1400"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx="600" cy="600" r="560" stroke="rgba(255,255,255,0.035)" strokeWidth="1" strokeDasharray="2 10" />
            <circle cx="600" cy="40" r="3" fill="#5f8bff" opacity="0.5" />
          </motion.g>
          <defs>
            <linearGradient id="orbit-accent" x1="0" y1="0" x2="1200" y2="1200">
              <stop offset="0%" stopColor="#5f8bff" />
              <stop offset="100%" stopColor="#9d8fff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient particles */}
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#8ea6ff]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              opacity: p.o,
            }}
            animate={
              reduce
                ? undefined
                : { y: [0, -14, 0], opacity: [p.o, p.o * 0.4, p.o] }
            }
            transition={{
              duration: p.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        {/* Crosshair marks */}
        <span className="absolute left-[16%] top-[24%] text-sm text-white/15">+</span>
        <span className="absolute right-[18%] top-[30%] text-sm text-white/15">+</span>
        <span className="absolute bottom-[26%] left-[24%] text-sm text-white/10">+</span>
      </div>

      {/* ——— Editorial metadata row ——— */}
      <motion.div
        {...rise(0.05)}
        className="container-x relative z-10 flex items-center gap-5"
      >
        <span aria-hidden className="h-px w-10 bg-white/20" />
        <p className="text-[0.68rem] font-medium tracking-[0.3em] text-white/55">
          ADROITONE CONSULTING
        </p>
        <span aria-hidden className="hidden h-px flex-1 bg-white/[0.08] sm:block" />
        <p className="text-[0.68rem] font-medium tracking-[0.3em] text-white/40">
          HYDERABAD · INDIA
        </p>
        <span aria-hidden className="h-px w-10 bg-white/20" />
      </motion.div>

      {/* ——— The typographic composition ——— */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-14 text-center">
        {/* Side annotations (desktop) */}
        <div
          aria-hidden
          className="absolute left-[3.5%] top-1/2 hidden -translate-y-1/2 flex-col gap-7 text-left xl:flex"
        >
          {["01 / TECHNOLOGY", "02 / TALENT", "03 / INTELLIGENCE"].map((t, i) => (
            <motion.span
              key={t}
              {...rise(0.9 + i * 0.12)}
              className="flex items-center gap-3 text-[0.58rem] tracking-[0.26em] text-white/25"
            >
              <span className="h-px w-5 bg-white/20" />
              {t}
            </motion.span>
          ))}
        </div>
        <div
          aria-hidden
          className="absolute right-[3.5%] top-1/2 hidden -translate-y-1/2 flex-col items-end gap-7 text-right xl:flex"
        >
          {["EST. / ADROITONE", "BANJARA HILLS", "TELANGANA / INDIA"].map((t, i) => (
            <motion.span
              key={t}
              {...rise(0.95 + i * 0.12)}
              className="flex items-center gap-3 text-[0.58rem] tracking-[0.26em] text-white/25"
            >
              {t}
              <span className="h-px w-5 bg-white/20" />
            </motion.span>
          ))}
        </div>

        {/* TECHNOLOGY */}
        <h1
          aria-label="Technology and talent — AI."
          className="flex flex-col items-center font-extrabold uppercase leading-[0.9]"
        >
          <span aria-hidden className="flex flex-col items-center">
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              {...lineReveal(0.15)}
              className="block cursor-default text-[clamp(2.9rem,11vw,11.5rem)] tracking-[-0.045em] text-white transition-[letter-spacing] duration-700 hover:tracking-[-0.02em]"
            >
              Technology
            </motion.span>
          </span>

          {/* & TALENT */}
          <span className="block overflow-hidden pb-[0.06em] pr-[2vw] lg:translate-x-[6vw]">
            <motion.span
              {...lineReveal(0.3)}
              className="block whitespace-nowrap text-[clamp(2.9rem,11vw,11.5rem)] tracking-[-0.045em]"
            >
              <span
                className="inline-block bg-[linear-gradient(115deg,#5f8bff_10%,#8a7cff_50%,#b8c6ff_90%)] bg-clip-text text-transparent"
                style={{ fontSize: "1.08em", lineHeight: 0.85 }}
              >
                &
              </span>{" "}
              <span className="inline-block text-white transition-transform duration-500 hover:translate-x-2">
                Talent
              </span>
            </motion.span>
          </span>

          {/* AI — the anchor */}
          <span className="block overflow-hidden px-[6vw] pt-[0.04em] lg:translate-x-[10vw]">
            <motion.span
              {...lineReveal(0.45)}
              className="ai-gradient block cursor-default bg-[linear-gradient(110deg,#5f8bff_0%,#7d8cff_30%,#9d8fff_55%,#c3d0ff_85%)] bg-clip-text text-[clamp(3.6rem,15vw,15rem)] leading-[0.85] tracking-[-0.03em] text-transparent transition-[filter] duration-500 hover:brightness-110"
            >
              AI
            </motion.span>
          </span>
          </span>
        </h1>

        {/* Built for real business */}
        <motion.p
          {...rise(0.62)}
          className="mt-9 flex items-center gap-5 text-[0.78rem] font-medium tracking-[0.34em] text-white/60 sm:text-[0.9rem]"
        >
          <span aria-hidden className="h-px w-8 bg-white/25 sm:w-14" />
          Built for real business
          <span aria-hidden className="h-px w-8 bg-white/25 sm:w-14" />
        </motion.p>

        {/* Supporting copy */}
        <motion.p
          {...rise(0.72)}
          className="mt-6 max-w-[560px] px-6 text-[0.95rem] leading-relaxed text-white/50"
        >
          Stronger teams, modern software and practical AI — engineered from
          our technology base in Hyderabad, for clients in India and abroad.
        </motion.p>

        {/* CTAs */}
        <motion.div {...rise(0.82)} className="mt-9 flex flex-wrap justify-center gap-3">
          <MagneticButton href="/contact">Start a Conversation</MagneticButton>
          <MagneticButton href="/services" variant="ghost">
            Explore Services
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-10 mb-4 flex justify-center"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.56rem] font-medium tracking-[0.32em] text-white/25">
            SCROLL
          </span>
          {!reduce && (
            <motion.span
              className="block h-6 w-px origin-top bg-gradient-to-b from-white/40 to-transparent"
              animate={{ scaleY: [0.25, 1, 0.25], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>

      {/* Capability marquee */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.9 }}
        className="marquee relative z-10 overflow-hidden border-t border-white/[0.08] py-5"
        aria-label="Capabilities"
      >
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex items-center gap-10 pr-10"
            >
              {STRIP_ITEMS.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-10">
                  <span className="whitespace-nowrap text-[0.7rem] font-medium tracking-[0.28em] text-white/35">
                    {item.toUpperCase()}
                  </span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
