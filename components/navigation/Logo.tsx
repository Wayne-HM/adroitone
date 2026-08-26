import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Pixel height of the lockup (default 40px). */
  size?: number;
  priority?: boolean;
};

/**
 * The official AdroitOne lockup (symbol + wordmark).
 * Single source of truth — used in the navbar, mobile menu, footer and loader.
 */
export function Logo({ className, size = 40, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="AdroitOne — home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/images/adroitone-logo.png"
        alt="AdroitOne"
        width={1743}
        height={564}
        priority={priority}
        sizes={`${Math.round(size * 3.1)}px`}
        style={{ height: size, width: "auto" }}
        className="select-none"
      />
    </Link>
  );
}
