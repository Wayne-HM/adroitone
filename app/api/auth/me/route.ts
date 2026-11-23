import { NextResponse } from "next/server";
import { getCurrentEmployee, toPublicEmployee } from "@/lib/auth";
import { initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  initDb();
  const employee = await getCurrentEmployee();
  if (!employee) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, employee: toPublicEmployee(employee) });
}
