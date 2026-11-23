import Database from "better-sqlite3";
import { resolve, dirname } from "node:path";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";

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

export function initDb(): void {
  const database = getDb();

  database.exec(`
    UPDATE employees SET is_demo = 0 WHERE is_demo != 0;
    UPDATE employees SET email = 'syedmurtaza.sd@adroitoneconsult.in' WHERE employee_id = 'AD-0176';
    UPDATE employees SET email = 'mujtabaahmed.sd@adroitoneconsult.in' WHERE employee_id = 'AD-0178';
  `);

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
