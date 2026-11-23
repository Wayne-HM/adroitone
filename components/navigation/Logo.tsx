import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Pixel height of the lockup (default 40px). */
  size?: number;
  priority?: boolean;
  href?: string;
};

/**
 * The official AdroitOne lockup (symbol + wordmark).
 * Single source of truth — used in the navbar, mobile menu, footer and loader.
 */
export function Logo({ className, size = 40, priority = false, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="AdroitOne — home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/images/adroitone-logo.png"
        alt="AdroitOne"
        width={1024}
        height={408}
        priority={priority}
        sizes={`${Math.round(size * 2.5)}px`}
        style={{ height: size, width: "auto" }}
        className="select-none"
      />
    </Link>
  );
}
