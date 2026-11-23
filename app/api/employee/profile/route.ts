import { NextResponse } from "next/server";
import { z } from "zod";
import { requireEmployee, toPublicEmployee } from "@/lib/auth";
import { getDb } from "@/lib/db";

const updateProfileSchema = z.object({
  contact_phone: z.string().trim().max(24, "Phone number is too long.").optional(),
  designation: z.string().trim().max(120, "Designation is too long.").optional(),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const employee = await requireEmployee();
  const db = getDb();
  const row = db
    .prepare(
      `SELECT id, employee_id, email, name, designation, department,
              joining_date, contact_phone, reporting_manager_id, status,
              is_demo, created_at
       FROM employees WHERE id = ?`
    )
    .get(employee.id) as
    | {
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
        is_demo: number;
        created_at: string;
      }
    | undefined;

  if (!row) {
    return NextResponse.json({ ok: false, error: "Employee not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, employee: toPublicEmployee(row) });
}

export async function PATCH(req: Request) {
  const employee = await requireEmployee();
  const db = getDb();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = updateProfileSchema.safeParse(body);
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

  const fields = Object.keys(parsed.data) as Array<keyof typeof parsed.data>;
  if (fields.length === 0) {
    return NextResponse.json({ ok: false, error: "No fields to update." }, { status: 400 });
  }

  const setClause = fields.map((f) => `${f} = ?`).join(", ");
  const values = [...fields.map((f) => parsed.data[f]), employee.id];
  db.prepare(`UPDATE employees SET ${setClause} WHERE id = ?`).run(...values);

  const row = db
    .prepare(
      `SELECT id, employee_id, email, name, designation, department,
              joining_date, contact_phone, reporting_manager_id, status,
              is_demo, created_at
       FROM employees WHERE id = ?`
    )
    .get(employee.id) as
    | {
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
        is_demo: number;
        created_at: string;
      }
    | undefined;

  return NextResponse.json({
    ok: true,
    message: "Profile updated.",
    employee: row ? toPublicEmployee(row) : null,
  });
}
