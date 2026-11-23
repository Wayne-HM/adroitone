import { NextResponse } from "next/server";
import { z } from "zod";
import {
  authenticateEmployee,
  setSessionCookie,
} from "@/lib/auth";
import { createSessionToken } from "@/lib/session";
import { initDb } from "@/lib/db";
import { ensureDemoData } from "@/lib/seed";

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Employee ID or email is required."),
  password: z.string().min(1, "Password is required."),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Ensure DB schema exists on first request (dev convenience).
  initDb();
  if (process.env.EMPLOYEE_DEMO_MODE === "1") {
    await ensureDemoData();
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const { identifier, password } = parsed.data;

  const employee = await authenticateEmployee(identifier, password);
  if (!employee) {
    return NextResponse.json(
      { ok: false, error: "Invalid employee ID/email or password." },
      { status: 401 }
    );
  }

  const token = await createSessionToken(employee.id);
  await setSessionCookie(token);

  return NextResponse.json({
    ok: true,
    employee: {
      id: employee.id,
      employee_id: employee.employee_id,
      email: employee.email,
      name: employee.name,
      designation: employee.designation,
      department: employee.department,
      is_demo: employee.is_demo,
    },
  });
}
