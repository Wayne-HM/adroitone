import Database from "better-sqlite3";
import { resolve, dirname } from "node:path";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { hashSync } from "bcryptjs";

/**
 * SQLite connection for the AdroitOne employee portal.
 *
 * In local dev, reads/writes to data/adroitone.db.
 * On Vercel / serverless (where /var/task is read-only), copies data/adroitone.db
 * to /tmp/adroitone.db on first load so SQLite WAL mode can write freely.
 */

const BUNDLED_DB_PATH = resolve(process.cwd(), "data", "adroitone.db");
const DB_PATH = process.env.VERCEL
  ? "/tmp/adroitone.db"
  : resolve(process.cwd(), "data", "adroitone.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  const targetDir = dirname(DB_PATH);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // On Vercel, copy the pre-seeded database from the read-only build dir to /tmp
  if (process.env.VERCEL && existsSync(BUNDLED_DB_PATH)) {
    try {
      copyFileSync(BUNDLED_DB_PATH, DB_PATH);
    } catch {
      // Fallback: initDb will create tables
    }
  }

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

function generateAttendanceRecords(employeeId: string) {
  const ranges = [
    ["2026-09-08", "2026-09-12"],
    ["2026-09-15", "2026-10-10"],
    ["2026-10-21", "2026-11-07"],
    ["2026-11-10", "2026-11-23"],
  ];

  const absentDays = new Set([
    "2026-09-25", "2026-09-26", "2026-09-27",
    "2026-10-25", "2026-10-26", "2026-10-27",
  ]);

  const records: Array<{
    id: string;
    employee_id: string;
    date: string;
    check_in: string | null;
    check_out: string | null;
    total_hours: number;
    status: string;
    created_at: string;
  }> = [];

  for (const [start, end] of ranges) {
    const curr = new Date(start);
    const endDate = new Date(end);

    while (curr <= endDate) {
      const dateStr = curr.toISOString().slice(0, 10);
      const dayOfWeek = curr.getDay(); // 0 is Sunday

      if (absentDays.has(dateStr)) {
        records.push({
          id: `att-${employeeId}-${dateStr}`,
          employee_id: employeeId,
          date: dateStr,
          check_in: null,
          check_out: null,
          total_hours: 0,
          status: "absent",
          created_at: `${dateStr}T18:00:00+05:30`,
        });
      } else if (dayOfWeek === 0) {
        // Sundays are holidays
      } else {
        const dayNum = parseInt(dateStr.slice(-2), 10);
        const inMinuteOffset = (dayNum * 7) % 26;
        let inHour = 9;
        let inMin = 45 + inMinuteOffset;
        if (inMin >= 60) {
          inHour = 10;
          inMin = inMin - 60;
        }

        const outMinuteOffset = (dayNum * 11) % 21;
        let outHour = 16;
        let outMin = 50 + outMinuteOffset;
        if (outMin >= 60) {
          outHour = 17;
          outMin = outMin - 60;
        }

        const inSec = (dayNum * 13) % 60;
        const outSec = (dayNum * 17) % 60;

        const checkInIso = `${dateStr}T${String(inHour).padStart(2, "0")}:${String(inMin).padStart(2, "0")}:${String(inSec).padStart(2, "0")}+05:30`;
        const checkOutIso = `${dateStr}T${String(outHour).padStart(2, "0")}:${String(outMin).padStart(2, "0")}:${String(outSec).padStart(2, "0")}+05:30`;

        const totalHours =
          Math.round(
            ((new Date(checkOutIso).getTime() - new Date(checkInIso).getTime()) /
              (1000 * 60 * 60)) *
              100
          ) / 100;

        records.push({
          id: `att-${employeeId}-${dateStr}`,
          employee_id: employeeId,
          date: dateStr,
          check_in: checkInIso,
          check_out: checkOutIso,
          total_hours: totalHours,
          status: "present",
          created_at: checkOutIso,
        });
      }

      curr.setDate(curr.getDate() + 1);
    }
  }

  return records;
}

export function initDb(): void {
  const database = getDb();

  // 1. Create tables first
  database.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      employee_id TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      designation TEXT,
      department TEXT,
      joining_date TEXT,
      contact_phone TEXT,
      reporting_manager_id TEXT,
      status TEXT DEFAULT 'active',
      is_demo INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL,
      date TEXT NOT NULL,
      check_in TEXT,
      check_out TEXT,
      total_hours REAL DEFAULT 0,
      status TEXT DEFAULT 'present',
      created_at TEXT NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
      UNIQUE(employee_id, date)
    );

    CREATE INDEX IF NOT EXISTS idx_attendance_employee_date
      ON attendance(employee_id, date);
    CREATE INDEX IF NOT EXISTS idx_attendance_date
      ON attendance(date);
  `);

  // 2. Ensure schema & records are up to date
  database.exec(`
    UPDATE employees SET is_demo = 0 WHERE is_demo != 0;
    UPDATE employees SET id = 'emp-' || lower(employee_id);
    UPDATE employees SET email = 'syedmurtaza.sd@adroitoneconsult.in' WHERE employee_id = 'AD-0176';
    UPDATE employees SET email = 'mujtabaahmed.sd@adroitoneconsult.in' WHERE employee_id = 'AD-0178';
    UPDATE attendance SET
      check_in = '2026-11-23T09:50:59+05:30',
      check_out = '2026-11-23T16:51:31+05:30',
      total_hours = 7.01,
      status = 'present'
    WHERE date = '2026-11-23';
    DELETE FROM attendance WHERE date >= '2026-11-24';
  `);

  // 3. Seed accounts if missing
  const countRow = database
    .prepare("SELECT count(*) as count FROM employees WHERE employee_id IN ('AD-0176', 'AD-0178')")
    .get() as { count: number } | undefined;

  if (!countRow || countRow.count < 2) {
    const passwordHash = hashSync("DemoPassword123!", 10);
    const now = new Date().toISOString();

    const insertEmp = database.prepare(`
      INSERT INTO employees
        (id, employee_id, email, name, password_hash, designation, department,
         joining_date, contact_phone, reporting_manager_id, status, is_demo, created_at)
      VALUES
        (@id, @employee_id, @email, @name, @password_hash, @designation, @department,
         @joining_date, @contact_phone, @reporting_manager_id, @status, 0, @created_at)
      ON CONFLICT(employee_id) DO UPDATE SET
        name = excluded.name,
        email = excluded.email,
        designation = excluded.designation,
        department = excluded.department,
        joining_date = excluded.joining_date,
        contact_phone = excluded.contact_phone,
        reporting_manager_id = excluded.reporting_manager_id,
        is_demo = 0
    `);

    insertEmp.run({
      id: "emp-ad-0102",
      employee_id: "AD-0102",
      email: "pm.ad0102@adroitoneconsult.in",
      name: "Project Manager",
      password_hash: passwordHash,
      designation: "Project Manager",
      department: "SOFTWARE DEVELOPMENT",
      joining_date: "2024-01-15",
      contact_phone: "+91 90000 00102",
      reporting_manager_id: null,
      status: "active",
      created_at: now,
    });

    insertEmp.run({
      id: "emp-ad-0176",
      employee_id: "AD-0176",
      email: "syedmurtaza.sd@adroitoneconsult.in",
      name: "SYED MURTAZA",
      password_hash: passwordHash,
      designation: "WEB DEVELOPER INTERN",
      department: "SOFTWARE DEVELOPMENT",
      joining_date: "2026-09-07",
      contact_phone: "7207512376",
      reporting_manager_id: "AD-0102",
      status: "active",
      created_at: now,
    });

    insertEmp.run({
      id: "emp-ad-0178",
      employee_id: "AD-0178",
      email: "mujtabaahmed.sd@adroitoneconsult.in",
      name: "MUJTABA AHMED",
      password_hash: passwordHash,
      designation: "WEB DEVELOPER INTERN",
      department: "SOFTWARE DEVELOPMENT",
      joining_date: "2026-09-07",
      contact_phone: "7207512378",
      reporting_manager_id: "AD-0102",
      status: "active",
      created_at: now,
    });

    const insertAtt = database.prepare(`
      INSERT INTO attendance
        (id, employee_id, date, check_in, check_out, total_hours, status, created_at)
      VALUES
        (@id, @employee_id, @date, @check_in, @check_out, @total_hours, @status, @created_at)
      ON CONFLICT(employee_id, date) DO UPDATE SET
        check_in = excluded.check_in,
        check_out = excluded.check_out,
        total_hours = excluded.total_hours,
        status = excluded.status
    `);

    for (const empId of ["AD-0176", "AD-0178"]) {
      const records = generateAttendanceRecords(empId);
      for (const r of records) {
        insertAtt.run(r);
      }
    }
  }
}

/** Close the database connection (useful in tests / graceful shutdown). */
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

export type EmployeeRow = {
  id: string;
  employee_id: string;
  email: string;
  name: string;
  password_hash: string;
  designation: string | null;
  department: string | null;
  joining_date: string | null;
  contact_phone: string | null;
  reporting_manager_id: string | null;
  status: string;
  is_demo: number;
  created_at: string;
};

export type AttendanceRow = {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  total_hours: number;
  status: string;
  created_at: string;
};
