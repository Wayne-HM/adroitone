import { NextResponse } from "next/server";
import { getCurrentEmployee, toPublicEmployee } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    initDb();
    const employee = await getCurrentEmployee(req);
    if (!employee) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const today = new Date().toISOString().slice(0, 10);

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
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error fetching today attendance" },
      { status: 500 }
    );
  }
}
