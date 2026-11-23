import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentEmployee, toPublicEmployee } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

const updateProfileSchema = z.object({
  contact_phone: z.string().trim().max(24, "Phone number is too long.").optional(),
  designation: z.string().trim().max(120, "Designation is too long.").optional(),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    initDb();
    const employee = await getCurrentEmployee();
    if (!employee) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const row = db
      .prepare(
        `SELECT id, employee_id, email, name, designation, department,
                joining_date, contact_phone, reporting_manager_id, status,
                is_demo, created_at
         FROM employees WHERE id = ?`
      )
      .get(employee.id) as Parameters<typeof toPublicEmployee>[0] | undefined;

    if (!row) {
      return NextResponse.json({ ok: false, error: "Employee not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, employee: toPublicEmployee(row) });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error loading profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    initDb();
    const employee = await getCurrentEmployee();
    if (!employee) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

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
      .get(employee.id) as Parameters<typeof toPublicEmployee>[0] | undefined;

    return NextResponse.json({
      ok: true,
      message: "Profile updated.",
      employee: row ? toPublicEmployee(row) : null,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error updating profile" },
      { status: 500 }
    );
  }
}
