"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { StatusBadge, DemoLabel } from "../../../../components/employee/StatusBadge";

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

export default function ProfilePage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  // Editable fields (authorized for the employee to update).
  const [contactPhone, setContactPhone] = useState("");
  const [designation, setDesignation] = useState("");

  const fetchProfile = useCallback(async () => {
    const res = await fetch("/api/employee/profile", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setEmployee(data.employee ?? null);
      setContactPhone(data.employee?.contact_phone ?? "");
      setDesignation(data.employee?.designation ?? "");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await fetchProfile();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchProfile]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch("/api/employee/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_phone: contactPhone.trim() || undefined,
          designation: designation.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ kind: "error", text: data.error || "Update failed." });
        return;
      }
      setEmployee(data.employee ?? null);
      setMessage({ kind: "success", text: "Profile updated." });
    } catch {
      setMessage({ kind: "error", text: "Unable to reach the server." });
    } finally {
      setSaving(false);
    }
  };

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
        <p className="text-white/50">Unable to load your profile. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DemoLabel className="w-fit mb-2" />

      <div className="glass rounded-3xl p-8 md:p-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1">
            <p className="eyebrow mb-2">My profile</p>
            <h2 className="display-md tracking-tight mb-6">
              {employee.name}
            </h2>
            <p className="text-accent font-medium text-sm tracking-wide mb-6">
              {employee.designation} · {employee.department}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <ProfileRow label="Employee ID" value={employee.employee_id} mono />
              <ProfileRow label="Official email" value={employee.email} />
              <ProfileRow label="Designation" value={employee.designation || "—"} />
              <ProfileRow label="Department" value={employee.department || "—"} />
              <ProfileRow
                label="Joining date"
                value={
                  employee.joining_date
                    ? new Date(employee.joining_date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not on record"
                }
              />
              <ProfileRow
                label="Employment status"
                value={employee.status}
                status={employee.status}
              />
              <ProfileRow
                label="Reporting manager"
                value={
                  employee.reporting_manager_id === "AD-0102"
                    ? "Project Manager (AD-0102)"
                    : employee.reporting_manager_id
                    ? `Employee ID ${employee.reporting_manager_id}`
                    : "Not assigned"
                }
              />
              <ProfileRow
                label="Member since"
                value={new Date(employee.created_at).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                })}
              />
            </div>

            {employee.is_demo && (
              <p className="mt-6 flex items-center gap-2 text-xs text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
                DEMO account — fictional data
              </p>
            )}
          </div>

          <div className="w-full lg:w-96">
            <form onSubmit={handleUpdate} className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/4 p-6">
              <p className="eyebrow mb-3">Edit profile</p>
              <p className="text-xs text-white/50 mb-4">
                You may update your contact phone and designation. Other fields
                are managed by HR and cannot be changed here.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Contact phone
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="field w-full"
                    placeholder="+91 90000 00000"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="field w-full"
                    placeholder="e.g. Senior Software Engineer"
                    disabled={saving}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-ink-950 font-medium px-6 py-4 transition-colors disabled:opacity-60 disabled:pointer-events-none hover:bg-[#e9edff]"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      </div>

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
          <p className="text-sm text-white/90 leading-relaxed">{message.text}</p>
        </div>
      )}

      <Link
        href="/employee/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-cyan transition-colors link-underline"
      >
        ← Back to overview
      </Link>
    </div>
  );
}

function ProfileRow({
  label,
  value,
  status,
  mono,
}: {
  label: string;
  value: string;
  status?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
        {label}
      </span>
      <span className={cn("text-sm text-white", mono ? "font-mono" : "")}>
        {value}
      </span>
      {status && <StatusBadge status={status} className="mt-1 h-6 min-w-[70px] text-center" />}
    </div>
  );
}
