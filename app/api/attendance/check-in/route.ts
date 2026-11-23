import { NextResponse } from "next/server";
import { requireEmployee } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const employee = await requireEmployee();
  const db = getDb();

  const today = new Date().toISOString().slice(0, 10); // server date
  const now = new Date().toISOString(); // server timestamp

  // Prevent duplicate check-ins on the same day.
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
    .get(id) as {
      id: string;
      employee_id: string;
      date: string;
      check_in: string;
      check_out: string | null;
      total_hours: number;
      status: string;
      created_at: string;
    };

  return NextResponse.json(
    {
      ok: true,
      message: "Checked in successfully.",
      attendance: row,
    },
    { status: 201 }
  );
}
