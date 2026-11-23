import { NextResponse } from "next/server";
import { getCurrentEmployee } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    initDb();
    const employee = await getCurrentEmployee();
    if (!employee) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toISOString();

    const existing = db
      .prepare(
        `SELECT id, check_in FROM attendance
         WHERE employee_id = ? AND date = ? LIMIT 1`
      )
      .get(employee.employee_id, today) as
      | { id: string; check_in: string | null }
      | undefined;

    if (existing) {
      return NextResponse.json(
        {
          ok: false,
          error: "You have already checked in today.",
          checkIn: existing.check_in ?? null,
        },
        { status: 409 }
      );
    }

    const id = `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    db.prepare(
      `INSERT INTO attendance
         (id, employee_id, date, check_in, check_out, total_hours, status, created_at)
       VALUES (?, ?, ?, ?, NULL, 0, 'present', ?)`
    ).run(id, employee.employee_id, today, now, now);

    const row = db
      .prepare(
        `SELECT id, employee_id, date, check_in, check_out, total_hours, status, created_at
         FROM attendance WHERE id = ?`
      )
      .get(id);

    return NextResponse.json(
      {
        ok: true,
        message: "Checked in successfully.",
        attendance: row,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error checking in" },
      { status: 500 }
    );
  }
}
