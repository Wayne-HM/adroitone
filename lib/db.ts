import Database from "better-sqlite3";
import { resolve } from "node:path";

/**
 * SQLite connection for the AdroitOne employee portal.
 *
 * This is a single-file, zero-config database intended for local development
 * and demo/staging use. It requires no database server.
 *
 * Production note: Vercel/serverless platforms do not allow persistent local
 * file writes. For production, replace this module with a PostgreSQL client
 * (e.g. @neondatabase/serverless or pg) and point DATABASE_URL at a managed
 * Postgres instance. The schema below is portable to Postgres with minor
 * type tweaks (TEXT -> TEXT, REAL -> REAL, INTEGER -> INTEGER).
 *
 * The database file lives outside the app bundle at data/adroitone.db and is
 * git-ignored so demo records never get committed to the repository.
 */

const DB_PATH = resolve(process.cwd(), "data", "adroitone.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

export function initDb(): void {
  const database = getDb();

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
