import { NextResponse } from "next/server";
import { requireEmployee, toPublicEmployee } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const employee = await requireEmployee();
  const db = getDb();

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (server date)

  const row = db
    .prepare(
      `SELECT id, employee_id, date, check_in, check_out, total_hours, status, created_at
       FROM attendance
       WHERE employee_id = ? AND date = ?
       LIMIT 1`
    )
    .get(employee.employee_id, today) as
    | {
        id: string;
        employee_id: string;
        date: string;
        check_in: string | null;
        check_out: string | null;
        total_hours: number;
        status: string;
        created_at: string;
      }
    | undefined;

  return NextResponse.json({
    ok: true,
    date: today,
    attendance: row ?? null,
    employee: toPublicEmployee(employee),
  });
}
