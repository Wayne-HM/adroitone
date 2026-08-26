import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Minimal in-memory rate limit: 5 submissions per IP per 10 minutes. */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Authoritative server-side validation
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        error: "Please correct the highlighted fields.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped → accept quietly, never send.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Basic rate limiting
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many inquiries from this network. Please try again later." },
      { status: 429 }
    );
  }

  const subject = `New inquiry — ${data.service} — ${data.company}`;
  const text = [
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Company:  ${data.company}`,
    `Phone:    ${data.phone || "—"}`,
    `Service:  ${data.service}`,
    `Budget:   ${data.budget}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (resendApiKey && contactEmail) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from:
          process.env.CONTACT_FROM ??
          "AdroitOne Website <onboarding@resend.dev>",
        to: contactEmail,
        replyTo: data.email,
        subject,
        text,
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact] Resend delivery failed:", err);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't send your inquiry right now. Please email us directly or try again shortly.",
        },
        { status: 502 }
      );
    }
  }

  // Development fallback — no provider configured.
  console.info(
    "[contact] RESEND_API_KEY/CONTACT_EMAIL not configured; logging inquiry:\n" +
      text
  );
  return NextResponse.json({ ok: true, devFallback: true });
}
