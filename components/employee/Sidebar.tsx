"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/navigation/Logo";
import { Icon } from "@/components/ui/Icon";
import { DemoLabel } from "./StatusBadge";

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "sparkles"
  | "code"
  | "cloud"
  | "users"
  | "layers"
  | "target"
  | "globe"
  | "cpu"
  | "route"
  | "check"
  | "shield";

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/employee/dashboard", icon: "layers" },
  { label: "My Attendance", href: "/employee/dashboard/attendance", icon: "route" },
  { label: "My Profile", href: "/employee/dashboard/profile", icon: "users" },
];

export interface SidebarProps {
  onLogout: () => void;
  className?: string;
}

export function Sidebar({ onLogout, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Employee dashboard"
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/[0.06] bg-ink-900/60 backdrop-blur-xl lg:flex",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/employee/dashboard" className="inline-flex shrink-0 items-center">
          <Logo size={30} />
        </Link>
      </div>

      <ul className="flex-1 px-4 py-6 space-y-1 list-none">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <motion.li
              key={item.href}
              whileHover={{ background: "rgba(255,255,255,0.04)" }}
              className={cn(
                "rounded-2xl p-3 transition-colors duration-200",
                active
                  ? "bg-white/5 border border-accent/20 shadow-[0_0_0_1px_rgba(61,99,255,0.12)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Link
                href={item.href}
                className="flex w-full items-center gap-3 text-left"
              >
                <Icon name={item.icon} className="text-white/40" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </motion.li>
          );
        })}

        <motion.li
          whileHover={{ background: "rgba(255,255,255,0.04)" }}
          className={cn(
            "rounded-2xl p-3 transition-colors duration-200 text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 text-left"
          >
            <Icon name="arrow-up-right" className="text-white/40" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </motion.li>
      </ul>

      <div className="p-6 border-t border-white/[0.06]">
        <DemoLabel className="w-full text-center" />
      </div>
    </nav>
  );
}
