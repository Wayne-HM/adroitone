"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "../../../../components/employee/StatusBadge";

type Attendance = {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  total_hours: number;
  status: string;
  created_at: string;
};

export default function AttendancePage() {
  const [today, setToday] = useState<Attendance | null>(null);
  const [history, setHistory] = useState<Attendance[]>([]);
  const [saving, setSaving] = useState<"checkin" | "checkout" | null>(null);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const fetchToday = useCallback(async () => {
    const res = await fetch("/api/attendance/today", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setToday(data.attendance ?? null);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterMonth) params.set("month", filterMonth);
    else if (filterYear) params.set("year", filterYear);
    const res = await fetch(`/api/attendance/history?${params}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      setHistory(data.attendance ?? []);
    }
  }, [filterMonth, filterYear]);

  useEffect(() => {
    (async () => {
      await fetchToday();
      await fetchHistory();
    })();
  }, [filterMonth, filterYear, fetchToday, fetchHistory]);

  const handleCheckIn = async () => {
    setSaving("checkin");
    setMessage(null);
    try {
      const res = await fetch("/api/attendance/check-in", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "error", text: data.error || "Check-in failed." });
        return;
      }
      setToday(data.attendance);
      setMessage({ kind: "success", text: "Checked in successfully." });
      await fetchHistory();
    } catch {
      setMessage({ kind: "error", text: "Unable to reach the server." });
    } finally {
      setSaving(null);
    }
  };

  const handleCheckOut = async () => {
    setSaving("checkout");
    setMessage(null);
    try {
      const res = await fetch("/api/attendance/check-out", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "error", text: data.error || "Check-out failed." });
        return;
      }
      setToday(data.attendance);
      setMessage({ kind: "success", text: "Checked out successfully." });
      await fetchHistory();
    } catch {
      setMessage({ kind: "error", text: "Unable to reach the server." });
    } finally {
      setSaving(null);
    }
  };

  const fmt = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const totalHoursToday = today?.total_hours ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Check-in / check-out card */}
        <div className="flex-1 glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <p className="eyebrow mb-2">Attendance today</p>
              <h2 className="display-md tracking-tight mb-6">
                Check in &amp; check out
              </h2>

              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-white/50">Today&rsquo;s date</span>
                  <span className="text-sm font-medium text-white">
                    {new Date().toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-white/50">Check-in time</span>
                  <span className="text-lg font-mono font-medium text-white">
                    {fmt(today?.check_in ?? null)}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-white/50">Check-out time</span>
                  <span className="text-lg font-mono font-medium text-white">
                    {fmt(today?.check_out ?? null)}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-white/50">Total working hours</span>
                  <span className="text-lg font-mono font-medium text-accent">
                    {totalHoursToday.toFixed(2)} hrs
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-white/50">Status</span>
                  <span className="flex items-center gap-2">
                    {today ? (
                      <StatusBadge status={today.status} />
                    ) : (
                      <span className="text-white/50">No record yet</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleCheckIn}
                  disabled={saving === "checkin" || !!today?.check_in || today?.status === "absent"}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-ink-950 font-medium px-6 py-4 transition-colors disabled:opacity-60 disabled:pointer-events-none hover:bg-[#e9edff]",
                    !!today?.check_in && "border border-accent/40"
                  )}
                >
                  {saving === "checkin" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      Checking in…
                    </span>
                  ) : today?.status === "absent" ? (
                    "Marked Absent Today"
                  ) : today?.check_in ? (
                    <>
                      <span className="text-emerald-600 font-bold">✓</span> Checked in{" "}
                      <span className="text-xs text-ink-950/80">({fmt(today.check_in)})</span>
                    </>
                  ) : (
                    "Check in"
                  )}
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled={
                    saving === "checkout" ||
                    !today?.check_in ||
                    !!today?.check_out ||
                    today?.status === "absent"
                  }
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/4 px-6 py-4 text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:pointer-events-none hover:bg-white/8",
                    !today?.check_in || !!today?.check_out
                      ? "border-white/[0.06]"
                      : ""
                  )}
                >
                  {saving === "checkout" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      Checking out…
                    </span>
                  ) : !today?.check_in ? (
                    "Check out"
                  ) : today?.check_out ? (
                    <>
                      <span className="text-emerald-400 font-bold">✓</span> Checked out{" "}
                      <span className="text-xs text-white/70">({fmt(today.check_out)})</span>
                    </>
                  ) : (
                    "Check out"
                  )}
                </button>
              </div>

              {today?.check_in && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3.5 py-2 w-fit">
                  <span className="font-bold">✓</span>
                  <span>Verified via Biometric Scanner</span>
                </div>
              )}

              {message && (
                <div
                  className={cn(
                    "mt-6 rounded-xl border p-4 flex items-start gap-3",
                    message.kind === "success"
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-red-500/20 bg-red-500/5"
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0",
                      message.kind === "success" ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {message.kind === "success" ? "✓" : "!"}
                  </span>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {message.text}
                  </p>
                </div>
              )}

              {!today?.check_in && (
                <p className="mt-5 text-xs text-white/40 leading-relaxed">
                  Timestamps are recorded by the server. You can check in once
                  per working day; check-out is available only after check-in.
                  History is preserved and never backdated.
                </p>
              )}
            </div>

            <div className="w-full lg:w-64 hidden lg:block">
              <div className="rounded-2xl border border-white/[0.06] bg-white/4 p-6 h-fit">
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                  Today&rsquo;s summary
                </p>
                <div className="space-y-3">
                  <SummaryRow label="Check in" value={fmt(today?.check_in ?? null)} />
                  <SummaryRow label="Check out" value={fmt(today?.check_out ?? null)} />
                  <SummaryRow
                    label="Working hours"
                    value={`${totalHoursToday.toFixed(2)} hrs`}
                    highlight
                  />
                  {today?.check_in && (
                    <SummaryRow label="Verification" value="Biometric Scanner" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="flex-1 lg:w-[620px]">
          <div className="rounded-2xl border border-white/[0.06] bg-white/4 p-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
              <div>
                <p className="eyebrow mb-2">Attendance history</p>
                <h3 className="text-lg font-medium text-white">History</h3>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="month"
                  value={filterMonth}
                  onChange={(e) => {
                    setFilterMonth(e.target.value);
                    setFilterYear("");
                  }}
                  className="field text-sm"
                />
                <input
                  type="number"
                  min="2020"
                  max="2100"
                  placeholder="YYYY"
                  value={filterYear}
                  onChange={(e) => {
                    setFilterYear(e.target.value);
                    setFilterMonth("");
                  }}
                  className="field w-24 text-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="pb-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="pb-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                      Check in
                    </th>
                    <th className="pb-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                      Check out
                    </th>
                    <th className="pb-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                      Hours
                    </th>
                    <th className="pb-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-white/[0.04] hover:bg-white/3 transition-colors"
                    >
                      <td className="py-4 text-sm text-white/80">
                        {formatDate(row.date)}
                      </td>
                      <td className="py-4 text-sm font-mono text-white/70">
                        {row.check_in ? new Date(row.check_in).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                      <td className="py-4 text-sm font-mono text-white/70">
                        {row.check_out ? new Date(row.check_out).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                      <td className="py-4 text-sm font-mono text-white">
                        {(row.total_hours || 0).toFixed(2)} hrs
                      </td>
                      <td className="py-4">
                        <StatusBadge status={row.status} className="text-[0.7rem]" />
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/40">
                        No attendance records yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {history.length > 0 && (
              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-xs text-white/50">
                  Records: {history.length}
                </span>
                <span className="text-xs text-white/50">
                  Total hours:{ " "}
                  <span className="text-accent font-medium">
                    {history.reduce((s, r) => s + (r.total_hours || 0), 0).toFixed(2)}
                  </span>{" "}
                  hrs
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-2 last:border-0 last:pb-0">
      <span className="text-xs text-white/50">{label}</span>
      <span className={cn("text-xs font-mono", highlight ? "text-accent" : "text-white/80")}>
        {value}
      </span>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
