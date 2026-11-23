import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentEmployee, toPublicEmployee } from "@/lib/auth";
import { initDb } from "@/lib/db";
import { verifySessionTokenAsync } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  initDb();
  const token = (await cookies()).get("adroitone_session")?.value;
  const verifiedId = token ? await verifySessionTokenAsync(token) : null;
  const employee = await getCurrentEmployee();
  if (!employee) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized", hasToken: !!token, tokenLen: token?.length, verifiedId },
      { status: 401 }
    );
  }
  return NextResponse.json({ ok: true, employee: toPublicEmployee(employee) });
}
