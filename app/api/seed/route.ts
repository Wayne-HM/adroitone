import { NextResponse } from "next/server";
import { ensureDemoData } from "@/lib/seed";
import { initDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = req.headers.get("x-admin-seed-secret");
  if (!secret || secret !== process.env.ADMIN_SEED_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Admin seed secret required or invalid." },
      { status: 401 }
    );
  }

  initDb();
  const result = await ensureDemoData();
  return NextResponse.json({ ok: true, ...result });
}
