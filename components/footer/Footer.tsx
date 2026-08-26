"use client";

import Link from "next/link";
import { OFFICES, GLOBAL_WEBSITE_URL } from "@/data/site";
import { Logo } from "@/components/navigation/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          {/* Brand block */}
          <div>
            <Logo size={44} />
            <p className="mt-6 text-lg font-medium tracking-tight text-white/70">
              Technology · Talent · AI
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/40">
              The India technology company helping businesses build stronger
              teams, modern software and practical AI — from Hyderabad.
            </p>
          </div>

          {/* Link + info columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Services"
              links={[
                ["Technology Talent", "/services/talent-search"],
                ["AI & Automation", "/services/ai-automation"],
                ["Software Development", "/services/software-development"],
                ["IT Services", "/services/it-services"],
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                ["About", "/company"],
                ["Careers", "/company#careers"],
                ["Insights", "/insights"],
                ["Contact", "/contact"],
              ]}
            />
            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-5 text-[0.7rem] font-semibold tracking-[0.22em] text-white/35">
                HYDERABAD
              </h3>
              <p className="font-medium leading-snug text-white/80">
                {OFFICES.hyderabad.entity}
              </p>
              <address className="mt-2 text-sm not-italic leading-relaxed text-white/45">
                {OFFICES.hyderabad.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>

              <h3 className="mb-3 mt-8 text-[0.7rem] font-semibold tracking-[0.22em] text-white/35">
                INTERNATIONAL
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                <span className="block font-medium text-white/80">
                  {OFFICES.newYork.entity}
                </span>
                New York, USA
              </p>

              <a
                href={GLOBAL_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-cyan"
              >
                AdroitOne.com
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-white/30 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {OFFICES.hyderabad.entity}. All
            rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white/60">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white/60">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="mb-5 text-[0.7rem] font-semibold tracking-[0.22em] text-white/35">
        {title.toUpperCase()}
      </h3>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={`${title}-${href}`}>
            <Link
              href={href}
              className="link-underline text-sm text-white/55 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
