import { NextResponse } from "next/server";
import { getCurrentEmployee, toPublicEmployee } from "@/lib/auth";
import { initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  initDb();
  let token: string | undefined;
  try {
    token = (await cookies()).get("adroitone_session")?.value;
  } catch {}
  if (!token) {
    const rawCookie = req.headers.get("cookie");
    const match = rawCookie?.match(/(?:^|;\s*)adroitone_session=([^;]+)/);
    if (match) token = match[1];
  }
  const verifiedId = token ? await verifySessionTokenAsync(token) : null;
  const dbEmp = verifiedId ? getEmployeeById(verifiedId) : null;
  const employee = await getCurrentEmployee(req);
  if (!employee) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized", hasToken: !!token, verifiedId, hasDbEmp: !!dbEmp },
      { status: 401 }
    );
  }
  return NextResponse.json({ ok: true, employee: toPublicEmployee(employee) });
}
