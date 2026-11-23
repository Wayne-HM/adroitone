"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "../../../components/employee/StatusBadge";

type Employee = {
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
};

type Attendance = {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  total_hours: number;
  status: string;
  created_at: string;
} | null;

export default function OverviewPage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [attendance, setAttendance] = useState<Attendance>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [empRes, attRes] = await Promise.all([
          fetch("/api/auth/me", { cache: "no-store" }),
          fetch("/api/attendance/today", { cache: "no-store" }),
        ]);
        if (cancelled) return;
        if (empRes.ok) {
          const empData = await empRes.json();
          setEmployee(empData.employee ?? null);
        }
        if (attRes.ok) {
          const attData = await attRes.json();
          setAttendance(attData.attendance ?? null);
        }
      } catch {
        // handled by empty states
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-ink-950">
        <div className="h-8 w-24 animate-pulse rounded-full bg-ink-700" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-ink-950 p-6 text-center">
        <p className="text-white/50">Unable to load your session. Please log in again.</p>
      </div>
    );
  }

  const now = new Date();
  const currentDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const checkIn = attendance?.check_in
    ? new Date(attendance.check_in).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const checkOut = attendance?.check_out
    ? new Date(attendance.check_out).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const managerName =
    employee.reporting_manager_id === "AD-0102"
      ? "Project Manager (AD-0102)"
      : employee.reporting_manager_id
      ? `Reporting to ID ${employee.reporting_manager_id}`
      : "—";

  return (
    <div className="space-y-8">
      {/* Welcome band */}
      <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden relative">
        <div aria-hidden className="absolute top-0 right-0 h-48 w-48 rounded-full bg-accent/10 blur-[100px]" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end gap-6">
          <div>
            <p className="eyebrow mb-2">Good {dayPart()},</p>
            <h1 className="display-md tracking-tight mb-1">
              {employee.name}
            </h1>
            <p className="text-accent font-medium text-sm tracking-wide">
              {employee.designation} · {employee.department}
            </p>
            {employee.is_demo && (
              <p className="mt-2 flex items-center gap-2 text-xs text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
                DEMO account — fictional data
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
              Employee ID
            </span>
            <p className="text-lg font-mono font-medium text-white">{employee.employee_id}</p>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Department" value={employee.department || "—"} />
        <StatCard
          label="Employment status"
          value={employee.status}
          status={employee.status}
        />
        <StatCard
          label="Joining date"
          value={employee.joining_date ? formatDate(employee.joining_date) : "—"}
        />
        <StatCard label="Reporting manager" value={managerName} />
      </div>

      {/* Today's attendance */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-8">
          <p className="eyebrow mb-4">Today&rsquo;s attendance &mdash; {currentDate}</p>
          <div className="space-y-4">
            <Row label="Check in" value={checkIn ?? "—"} />
            <Row label="Check out" value={checkOut ?? "—"} />
            <Row
              label="Total working hours"
              value={attendance?.total_hours ? `${attendance.total_hours} hrs` : "—"}
            />
            <Row
              label="Status"
              value={
                <span className="flex items-center gap-2">
                  {attendance ? (
                    <StatusBadge status={attendance.status} />
                  ) : (
                    <span className="text-white/50">Not checked in</span>
                  )}
                </span>
              }
            />
          </div>
          {attendance && attendance.check_in && !attendance.check_out && (
            <p className="mt-4 text-xs text-cyan">
              You are currently checked in. Use My Attendance to check out.
            </p>
          )}
        </div>

        <div className="glass rounded-3xl p-8">
          <p className="eyebrow mb-4">Quick actions</p>
          <div className="space-y-3">
            <Link
              href="/employee/dashboard/attendance"
              className="block w-full text-center rounded-xl border border-white/[0.08] bg-white/4 px-6 py-4 text-sm font-medium text-white hover:bg-white/8 transition-colors"
            >
              View full attendance history
            </Link>
            <Link
              href="/employee/dashboard/profile"
              className="block w-full text-center rounded-xl border border-white/[0.08] bg-white/4 px-6 py-4 text-sm font-medium text-white hover:bg-white/8 transition-colors"
            >
              View my profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function dayPart() {
  const h = new Date().getHours();
  if (h < 12) return "Morning";
  if (h < 17) return "Afternoon";
  return "Evening";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/4 p-6">
      <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-medium text-white">{value}</span>
      </div>
      {status && (
        <p className="mt-2 flex h-6 items-center gap-1.5">
          <StatusBadge status={status} className="h-6 min-w-[70px] text-center" />
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/[0.06] pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-white/50">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}
