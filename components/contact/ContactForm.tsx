"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  contactSchema,
  type ContactInput,
} from "@/lib/validation";
import { SERVICE_OPTIONS } from "@/data/services";
import { BUDGET_OPTIONS } from "@/data/contact-options";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type FieldName = keyof ContactInput;
type Errors = Partial<Record<FieldName, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  website: "", // honeypot
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  function setField(name: FieldName, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: undefined }));
    }
  }

  function validateLive(): Errors {
    const result = contactSchema.safeParse(form);
    if (result.success) return {};
    const fieldErrors: Errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as FieldName;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return fieldErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const validation = validateLive();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      const first = Object.keys(validation)[0];
      document
        .querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMessage(
          data.error ??
            "Something went wrong sending your inquiry. Please try again."
        );
        return;
      }

      track("contact_form_success", { service: form.service });
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage(
        "Network error — please check your connection and try again."
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-deep reflect flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] p-10 text-center"
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan">
          <Icon name="check" className="h-7 w-7" strokeWidth={2} />
        </span>
        <h3 className="display-md mt-8">Inquiry sent.</h3>
        <p className="lede mt-4 max-w-sm">
          Thank you — your message is with our team. We&apos;ll review what
          you&apos;ve shared and respond thoughtfully.
        </p>
        <button
          onClick={() => {
            setForm(initialForm);
            setStatus("idle");
          }}
          className="link-underline mt-10 text-sm font-medium text-white/70 hover:text-white"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass-deep reflect relative rounded-[2rem] p-7 sm:p-9 lg:p-10"
      aria-label="Contact form"
    >
      {/* Honeypot — invisible to humans */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name} htmlFor="cf-name">
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jordan Smith"
            className={cn("field", errors.name && "field-error")}
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => {
              if (form.name) setErrors((p) => ({ ...p, name: validateLive().name }));
            }}
            aria-invalid={!!errors.name}
          />
        </Field>

        <Field label="Work Email" error={errors.email} htmlFor="cf-email">
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="jordan@company.com"
            className={cn("field", errors.email && "field-error")}
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => {
              if (form.email) setErrors((p) => ({ ...p, email: validateLive().email }));
            }}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field label="Company" error={errors.company} htmlFor="cf-company">
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="Company Inc."
            className={cn("field", errors.company && "field-error")}
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            aria-invalid={!!errors.company}
          />
        </Field>

        <Field label="Phone" optional error={errors.phone} htmlFor="cf-phone">
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 …"
            className={cn("field", errors.phone && "field-error")}
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            aria-invalid={!!errors.phone}
          />
        </Field>

        <Field label="Service" error={errors.service} htmlFor="cf-service">
          <select
            id="cf-service"
            name="service"
            required
            className={cn(
              "field",
              errors.service && "field-error",
              !form.service && "text-white/40"
            )}
            value={form.service}
            onChange={(e) => setField("service", e.target.value)}
            aria-invalid={!!errors.service}
          >
            <option value="" disabled>
              Select a service…
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Budget / Engagement Range"
          error={errors.budget}
          htmlFor="cf-budget"
        >
          <select
            id="cf-budget"
            name="budget"
            required
            className={cn(
              "field",
              errors.budget && "field-error",
              !form.budget && "text-white/40"
            )}
            value={form.budget}
            onChange={(e) => setField("budget", e.target.value)}
            aria-invalid={!!errors.budget}
          >
            <option value="" disabled>
              Select a range…
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={errors.message} htmlFor="cf-message">
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            placeholder="Tell us what you're building, hiring for, or automating…"
            className={cn("field resize-none", errors.message && "field-error")}
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-400/30 bg-red-500/[0.08] px-4 py-3 text-sm text-red-200"
        >
          {serverMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 font-medium text-ink-950 transition-all duration-300 hover:bg-[#e9edff] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send Inquiry
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-white/35">
          Your details are used only to respond to this inquiry.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  error,
  htmlFor,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  htmlFor: string;
  optional?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label
          htmlFor={htmlFor}
          className="text-[0.82rem] font-medium tracking-wide text-white/70"
        >
          {label}
          {optional && (
            <span className="ml-1.5 text-xs font-normal text-white/30">
              (optional)
            </span>
          )}
        </label>
        {error && (
          <span role="alert" className="text-xs text-red-300">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
