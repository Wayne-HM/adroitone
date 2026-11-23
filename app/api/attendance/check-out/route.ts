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

  const row = db
    .prepare(
      `SELECT id, check_in, check_out FROM attendance
       WHERE employee_id = ? AND date = ? LIMIT 1`
    )
    .get(employee.employee_id, today) as
    | { id: string; check_in: string | null; check_out: string | null }
    | undefined;

  if (!row) {
    return NextResponse.json(
      { ok: false, error: "You have not checked in today. Check in first." },
      { status: 409 }
    );
  }

  if (!row.check_in) {
    return NextResponse.json(
      { ok: false, error: "No check-in record found for today." },
      { status: 409 }
    );
  }

  if (row.check_out) {
    return NextResponse.json(
      {
        ok: false,
        error: "You have already checked out today.",
        checkOut: row.check_out,
      },
      { status: 409 }
    );
  }

  const checkInTime = new Date(row.check_in).getTime();
  const checkOutTime = new Date(now).getTime();
  if (checkOutTime < checkInTime) {
    return NextResponse.json(
      { ok: false, error: "Invalid check-out time." },
      { status: 400 }
    );
  }

  const totalHours = Math.round(((checkOutTime - checkInTime) / (1000 * 60 * 60)) * 100) / 100;

  db.prepare(
    `UPDATE attendance SET check_out = ?, total_hours = ?, status = 'present' WHERE id = ?`
  ).run(now, totalHours, row.id);

  const updated = db
    .prepare(
      `SELECT id, employee_id, date, check_in, check_out, total_hours, status, created_at
       FROM attendance WHERE id = ?`
    )
    .get(row.id) as {
      id: string;
      employee_id: string;
      date: string;
      check_in: string;
      check_out: string;
      total_hours: number;
      status: string;
      created_at: string;
    };

  return NextResponse.json({
    ok: true,
    message: "Checked out successfully.",
    attendance: updated,
  });
}
