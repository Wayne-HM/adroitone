"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { EASE_OUT } from "@/lib/motion";

const LINKS = [
  ["Services", "/services"],
  ["AI & Automation", "/services/ai-automation"],
  ["Technology", "/technology"],
  ["Talent", "/talent"],
  ["Company", "/company"],
  ["Insights", "/insights"],
] as const;

/**
 * Whisper Nav — nearly invisible at rest; on scroll it condenses into a
 * small floating capsule above the page. Generous spacing, quiet hovers,
 * a tiny brand-blue dot as the only indicator.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 sm:px-6"
      >
        <motion.header
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          className={cn(
            "flex w-full items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "mt-3 h-[58px] max-w-5xl rounded-full border border-white/[0.08] bg-ink-950/72 px-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:px-6"
              : "mt-0 h-[76px] max-w-[80rem] rounded-none border border-transparent bg-transparent px-[clamp(1.25rem,4vw,2.75rem)]"
          )}
        >
          {/* Left — logo */}
          <Logo size={scrolled ? 32 : 36} priority />

          {/* Center — links */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 xl:gap-10 lg:flex"
          >
            {LINKS.map(([label, href]) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className="group relative py-2 text-[0.88rem] tracking-[-0.005em] text-white/55 transition-colors duration-200 hover:text-white"
                >
                  {label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent transition-all duration-200",
                      active
                        ? "opacity-90 scale-100"
                        : "opacity-0 scale-50 group-hover:opacity-70 group-hover:scale-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right — CTA / menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "group hidden items-center gap-2 rounded-full border font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/[0.04] sm:inline-flex",
                scrolled
                  ? "border-white/[0.12] px-4 py-2 text-[0.82rem]"
                  : "border-white/15 px-5 py-2.5 text-sm"
              )}
            >
              Talk to us
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/[0.12] transition-colors duration-300 hover:border-white/30 lg:hidden"
            >
              <span className="h-px w-[15px] bg-white/90" />
              <span className="h-px w-[15px] bg-white/90" />
            </button>
          </div>
        </motion.header>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
