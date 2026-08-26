"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { NAV_LINKS } from "@/data/navigation";
import { OFFICES } from "@/data/site";
import { EASE_OUT } from "@/lib/motion";
import { Logo } from "./Logo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: reduce ? 0.01 : 0.4, ease: EASE_OUT },
          }}
          transition={{ duration: reduce ? 0.01 : 0.55, ease: EASE_OUT }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink-950/95 backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-x flex h-[72px] items-center justify-between">
            <Logo size={34} />
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white transition-colors hover:border-white/30"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-x mt-8 flex flex-1 flex-col overflow-y-auto pb-10"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduce ? 0 : 0.08 + i * 0.05,
                    duration: 0.6,
                    ease: EASE_OUT,
                  }}
                  className="border-b border-white/[0.07]"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-4 text-[1.7rem] font-medium tracking-[-0.03em] text-white/85 transition-colors hover:text-white"
                  >
                    <span className="w-8 text-xs font-normal tracking-widest text-white/30">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.45, duration: 0.6 }}
              className="mt-auto pt-10"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-ink-950"
              >
                Talk to us →
              </Link>
              <p className="mt-6 text-center text-xs leading-relaxed text-white/35">
                {OFFICES.newYork.city}, USA · {OFFICES.hyderabad.city}, India
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
