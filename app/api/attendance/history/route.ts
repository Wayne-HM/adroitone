import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentEmployee } from "@/lib/auth";
import { getDb, initDb } from "@/lib/db";

const historySchema = z
  .object({
    month: z
      .string()
      .regex(/^\d{4}-\d{2}$/, "Use YYYY-MM format.")
      .optional(),
    year: z
      .string()
      .regex(/^\d{4}$/, "Use YYYY format.")
      .optional(),
  })
  .refine(
    (data) => !(data.month && data.year),
    "Provide either month (YYYY-MM) or year (YYYY), not both."
  );

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    initDb();
    const employee = await getCurrentEmployee(req);
    if (!employee) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const parsed = historySchema.safeParse({
      month: searchParams.get("month") ?? undefined,
      year: searchParams.get("year") ?? undefined,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json(
        { ok: false, error: "Invalid filter.", fieldErrors },
        { status: 400 }
      );
    }

    const db = getDb();
    let where = "WHERE employee_id = ?";
    const params: (string | number)[] = [employee.employee_id];

    if (parsed.data.month) {
      const [year, month] = parsed.data.month.split("-").map(Number);
      const start = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-01`;
      const end = new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 10);
      where += ` AND date >= ? AND date < ?`;
      params.push(start, end);
    } else if (parsed.data.year) {
      const year = Number(parsed.data.year);
      where += ` AND date >= ? AND date < ?`;
      params.push(`${year}-01-01`, `${year + 1}-01-01`);
    }

    const rows = db
      .prepare(
        `SELECT id, employee_id, date, check_in, check_out, total_hours, status, created_at
         FROM attendance
         ${where}
         ORDER BY date DESC, check_in DESC`
      )
      .all(...params) as Array<{
        id: string;
        employee_id: string;
        date: string;
        check_in: string | null;
        check_out: string | null;
        total_hours: number;
        status: string;
        created_at: string;
      }>;

    const totals = rows.reduce(
      (acc, r) => ({ count: acc.count + 1, hours: acc.hours + (r.total_hours || 0) }),
      { count: 0, hours: 0 }
    );

    return NextResponse.json({
      ok: true,
      employee_id: employee.employee_id,
      filter: parsed.data,
      count: totals.count,
      total_hours: Math.round(totals.hours * 100) / 100,
      attendance: rows,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Error fetching history" },
      { status: 500 }
    );
  }
}
