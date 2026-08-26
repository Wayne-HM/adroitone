import type { ReactNode } from "react";
import { AnimatedText } from "./AnimatedText";
import { Reveal } from "./Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
};

/** Shared hero band for interior pages. */
export function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-14 pt-40 lg:pb-20 lg:pt-48">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="orb left-[8%] top-[0%] h-[360px] w-[360px] bg-accent/12" />
        <div className="orb right-[4%] top-[30%] h-[300px] w-[300px] bg-violet/8" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,155,255,0.13) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">
            <span aria-hidden className="h-px w-8 bg-current opacity-40" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="display-lg max-w-[16ch]">
          <AnimatedText text={title} immediate />
        </h1>
        {lede && (
          <Reveal delay={0.15}>
            <p className="lede mt-7 max-w-2xl">{lede}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.25}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
