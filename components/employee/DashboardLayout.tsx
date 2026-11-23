"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";

/**
 * Shell for the AdroitOne employee dashboard.
 *
 * - Fetches the authenticated employee from /api/auth/me.
 * - Renders a desktop sidebar + collapsible mobile nav.
 * - Handles logout (POST /api/auth/logout) and redirects to /employee/login.
 * - Preserves the existing marketing site's design tokens (ink background,
 *   accent brand colour, Inter type, restrained transitions).
 */
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [employee, setEmployee] = useState<{
    id: string;
    employee_id: string;
    email: string;
    name: string;
    designation: string | null;
    department: string | null;
    joining_date: string | null;
    contact_phone: string | null;
    reporting_manager_id: string | null;
    status: string;
    is_demo: boolean;
    created_at: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fetchEmployee = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setEmployee(data.employee ?? null);
      } else {
        setEmployee(null);
      }
    } catch {
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors — always clear client state and redirect.
    }
    setEmployee(null);
    setMobileOpen(false);
    router.replace("/employee/login");
  };

  const MobileHeader = () => (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-ink-900/60 backdrop-blur px-6 z-30 lg:hidden">
      <Link href="/employee/dashboard" className="inline-flex items-center gap-2">
        <span className="text-accent font-semibold tracking-tight">
          ADROITONE
        </span>
        <span className="text-xs text-white/50">· Employee</span>
      </Link>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white hover:bg-white/5 transition-colors"
          aria-label="Open menu"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-white/[0.08]">
          <div className="text-left">
            <p className="text-sm font-medium text-white">{employee?.name}</p>
            <p className="text-xs text-white/50">{employee?.employee_id}</p>
          </div>
        </div>
      </div>
    </header>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-24 animate-pulse rounded-full bg-ink-700" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-ink-700" />
        </div>
      </div>
    );
  }

  if (!employee) {
    return null; // middleware redirects unauthenticated to /employee/login
  }

  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      {/* Mobile top bar */}
      <MobileHeader />

      {/* Desktop sidebar + content */}
      <main className="flex-1 lg:pl-64 relative">
        <Sidebar onLogout={handleLogout} />

        <div className="relative z-10 min-h-[calc(100vh-4rem)] px-6 py-8 lg:py-10 lg:px-10">
          {children}
        </div>
      </main>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex flex-col lg:hidden bg-ink-950/95 backdrop-blur-2xl"
          >
            <div className="flex h-16 items-center justify-between px-6 border-b border-white/[0.06]">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="text-accent font-semibold tracking-tight">
                  ADROITONE
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className="px-6 py-6 space-y-1">
              <Link
                href="/employee/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                Overview
              </Link>
              <Link
                href="/employee/dashboard/attendance"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                My Attendance
              </Link>
              <Link
                href="/employee/dashboard/profile"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </nav>
            <div className="mt-auto px-6 pb-10">
              <p className="text-xs text-center text-white/35">
                Adroitone Consulting · DEMO portal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
