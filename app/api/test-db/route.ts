import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const Database = (await import("better-sqlite3")).default;
    const db = new Database(":memory:");
    db.exec("CREATE TABLE test (id INT); INSERT INTO test VALUES (1);");
    const row = db.prepare("SELECT * FROM test").get();
    return NextResponse.json({ ok: true, row });
  } catch (err: unknown) {
    const error = err instanceof Error ? { message: err.message, stack: err.stack, name: err.name } : String(err);
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
