"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/navigation/Logo";
import { Icon } from "@/components/ui/Icon";

/**
 * Employee login form.
 *
 * POSTs to /api/auth/login. On success the server sets an httpOnly session
 * cookie and the employee is redirected to /employee/dashboard (or the
 * callbackUrl supplied in the query string).
 */
export function LoginForm({ callbackUrl }: { callbackUrl?: string | null }) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [resetSent, setResetSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const clearMessages = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!identifier.trim() || !password) {
      setError("Please enter your employee ID/email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }
      const destination = callbackUrl || "/employee/dashboard";
      window.location.href = destination;
    } catch {
      setError("Unable to reach the server. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setResetSent(false);
    setMode("forgot");
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    if (!identifier.trim()) {
      setError("Please enter your registered employee email.");
      return;
    }
    setResetSent(true);
  };

  const handleBackToLogin = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setResetSent(false);
    setMode("login");
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink-950 pb-20">
      {/* Brand orb decoration */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet/6 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mx-auto glass-deep rounded-3xl border border-white/[0.08] p-10 md:p-14 shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-4">
              <Logo size={36} priority />
            </Link>
            <p className="eyebrow mb-3">Adroitone Consulting · Employee Portal</p>
            <h2 className="display-md tracking-tight">
              {mode === "login" ? "Welcome back" : "Reset your password"}
            </h2>
          </div>

          {/* Login form */}
          {mode === "login" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="lede text-center text-white/55">
                Sign in to your employee dashboard to view your attendance and
                profile.
              </p>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/70">
                  Employee ID or email
                </label>
                <div className="relative mt-1">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-white/30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="text"
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={cn(
                      "field pl-10 pr-4",
                      fieldErrors.identifier && "field-error"
                    )}
                    placeholder="EMP-1001 or name@demo.adroitoneconsult.in"
                    disabled={loading}
                  />
                </div>
                {fieldErrors.identifier && (
                  <p className="text-xs text-red-400">{fieldErrors.identifier}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-white/70">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs font-medium text-accent hover:text-cyan transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative mt-1">
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-white/30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M1 5v14h22V5" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      "field pl-10 pr-4",
                      fieldErrors.password && "field-error"
                    )}
                    disabled={loading}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="text-xs text-red-400">{fieldErrors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/30 bg-ink-850 text-accent focus:ring-accent"
                  />
                  Remember me
                </label>
                <Link
                  href="/employee/login"
                  onClick={handleForgot}
                  className="text-sm text-accent hover:text-cyan transition-colors link-underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs text-white/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white/80">Employee Access</span>
                  <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">DEMO</span>
                </div>
                <div className="space-y-1.5 font-mono text-[0.72rem] text-white/50">
                  <div className="flex items-center justify-between">
                    <span>ID: <button type="button" onClick={() => setIdentifier("AD-0176")} className="text-cyan hover:underline">AD-0176</button> <span className="text-white/40 font-sans">(Syed Murtaza)</span></span>
                    <button
                      type="button"
                      onClick={() => {
                        setIdentifier("AD-0176");
                        setPassword("DemoPassword123!");
                        clearMessages();
                      }}
                      className="text-accent hover:underline font-sans text-xs"
                    >
                      Quick fill
                    </button>
                  </div>
                  <div className="text-[0.7rem] text-white/40 truncate">
                    Email: <span className="text-white/70">syedmurtaza.sd@demo.adroitoneconsult.in</span>
                  </div>
                  <div className="pt-1 text-[0.7rem] text-white/40">
                    Password: <span className="text-cyan">DemoPassword123!</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-ink-950 font-medium tracking-[-0.01em] px-7 py-3.5 transition-colors hover:bg-[#e9edff] disabled:opacity-60 disabled:pointer-events-none shadow-[0_10px_40px_-12px_rgba(61,99,255,0.45)]"
              >
                {loading ? (
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
                    Signing in…
                  </span>
                ) : (
                  <>
                    Sign in <Icon name="arrow-right" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Forgot password flow */}
          {mode === "forgot" && (
            <form onSubmit={handleForgotSubmit} className="space-y-5">
              <p className="lede text-center text-white/55">
                Enter your registered employee email and we&apos;ll send reset
                instructions.
              </p>

              {resetSent ? (
                <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm text-green-300">
                  <p className="font-medium text-white mb-1">Check your inbox</p>
                  <p className="text-white/70 text-xs">
                    If an account matches <span className="text-cyan font-mono">{identifier}</span>, password reset instructions have been dispatched.
                  </p>
                  <p className="text-white/40 text-[0.7rem] mt-2">
                    In demo mode, please use the provided demo password: <span className="font-mono text-cyan">DemoPassword123!</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-white/70">
                    Registered email
                  </label>
                  <div className="relative mt-1">
                    <svg
                      className="absolute left-3 top-3 h-4 w-4 text-white/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      type="email"
                      autoComplete="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="field pl-10 pr-4"
                      placeholder="name@demo.adroitoneconsult.in"
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!resetSent && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 items-center justify-center rounded-full bg-white text-ink-950 font-medium px-7 py-3.5 transition-colors hover:bg-[#e9edff] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    Send instructions
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="flex-1 items-center justify-center rounded-full border border-white/[0.12] px-7 py-3.5 font-medium text-white transition-colors hover:bg-white/[0.05]"
                >
                  Back to sign in
                </button>
              </div>
            </form>
          )}

          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4"
            >
              <svg
                className="h-5 w-5 text-red-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <p className="mt-8 text-center text-xs text-white/35">
            Adroitone Consulting Pvt Ltd · Hyderabad, India · AdroitOne Inc.,
            New York
          </p>
        </div>
      </div>
    </section>
  );
}
