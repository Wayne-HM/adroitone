"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/navigation/Preloader";

/**
 * Conditionally renders the marketing site chrome (Navbar, Footer,
 * ScrollProgress, Preloader) for non-employee routes.
 *
 * Employee dashboard routes use their own DashboardLayout shell, so the
 * marketing chrome is hidden when the pathname starts with /employee.
 */
export function MarketingShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEmployee = pathname.startsWith("/employee");

  if (isEmployee) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-white px-5 py-3 font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
