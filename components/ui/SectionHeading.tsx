import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
  /** Render title at display-md instead of display-lg */
  size?: "md" | "lg";
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-5">
            <span aria-hidden className="h-px w-8 bg-current opacity-40" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className={size === "lg" ? "display-lg" : "display-md"}>
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.12}>
          <p className="lede mt-6">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
