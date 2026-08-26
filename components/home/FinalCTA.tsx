"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing CTA — restrained and editorial. One gradient rule as the only
 * brand flourish.
 */
export function FinalCTA() {
  return (
    <section className="section border-t border-white/[0.07]">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span
              aria-hidden
              className="mx-auto block h-px w-16 bg-gradient-to-r from-accent via-violet to-cyan"
            />
            <p className="eyebrow mt-7 justify-center">Start here</p>
          </Reveal>

          <h2 className="display-lg mt-6">
            <AnimatedText text="Let's build what's next." />
          </h2>

          <Reveal delay={0.15}>
            <p className="lede mx-auto mt-6 max-w-xl">
              Tell us what you&apos;re trying to solve, and we&apos;ll help you
              find the right people, technology and approach.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/contact">
                Start a Conversation
              </MagneticButton>
              <MagneticButton href="/services" variant="ghost" arrow={false}>
                Explore services
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
