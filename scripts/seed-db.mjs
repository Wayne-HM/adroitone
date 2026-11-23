import Database from "better-sqlite3";
import { resolve } from "node:path";
import { hash } from "bcryptjs";

const DB_PATH = resolve(process.cwd(), "data", "adroitone.db");
console.log(`[seed] Connecting to SQLite database at: ${DB_PATH}`);

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
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

const DEMO_PASSWORD = "DemoPassword123!";

const EMPLOYEES = [
  {
    employee_id: "AD-0102",
    email: "pm.ad0102@demo.adroitoneconsult.in",
    name: "Project Manager",
    designation: "Project Manager",
    department: "SOFTWARE DEVELOPMENT",
    joining_date: "2024-01-15",
    contact_phone: "+91 90000 00102",
    reporting_manager_id: null,
    status: "active",
  },
  {
    employee_id: "AD-0176",
    email: "syedmurtaza.sd@demo.adroitoneconsult.in",
    name: "SYED MURTAZA",
    designation: "WEB DEVELOPER INTERN",
    department: "SOFTWARE DEVELOPMENT",
    joining_date: "2026-09-07",
    contact_phone: "7207512376",
    reporting_manager_id: "AD-0102",
    status: "active",
  },
  {
    employee_id: "AD-0178",
    email: "mujtabaahmed.sd@demo.adroitoneconsult.in",
    name: "MUJTABA AHMED",
    designation: "WEB DEVELOPER INTERN",
    department: "SOFTWARE DEVELOPMENT",
    joining_date: "2026-09-07",
    contact_phone: "7207512378",
    reporting_manager_id: "AD-0102",
    status: "active",
  },
];

function generateAttendance(employeeId) {
  const ranges = [
    ["2026-09-08", "2026-09-12"],
    ["2026-09-15", "2026-10-10"],
    ["2026-10-21", "2026-11-07"],
    ["2026-11-10", "2026-11-24"],
  ];

  const absentDays = new Set([
    "2026-09-25", "2026-09-26", "2026-09-27",
    "2026-10-25", "2026-10-26", "2026-10-27",
    "2026-11-23", // Today marked absent
  ]);

  const records = [];

  for (const [start, end] of ranges) {
    let curr = new Date(start);
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

        const secIn = (dayNum * 13) % 60;
        const secOut = (dayNum * 17) % 60;

        const pad = (n) => String(n).padStart(2, "0");
        const checkInIso = `${dateStr}T${pad(inHour)}:${pad(inMin)}:${pad(secIn)}+05:30`;
        const checkOutIso = `${dateStr}T${pad(outHour)}:${pad(outMin)}:${pad(secOut)}+05:30`;

        const inTime = new Date(checkInIso).getTime();
        const outTime = new Date(checkOutIso).getTime();
        const hours = Math.round(((outTime - inTime) / (1000 * 60 * 60)) * 100) / 100;

        records.push({
          id: `att-${employeeId}-${dateStr}`,
          employee_id: employeeId,
          date: dateStr,
          check_in: checkInIso,
          check_out: checkOutIso,
          total_hours: hours,
          status: "present",
          created_at: checkInIso,
        });
      }

      curr.setDate(curr.getDate() + 1);
    }
  }

  return records;
}

async function seed() {
  console.log("[seed] Updating employees in database...");

  const insertEmp = db.prepare(`
    INSERT INTO employees
      (id, employee_id, email, name, password_hash, designation, department,
       joining_date, contact_phone, reporting_manager_id, status, is_demo,
       created_at)
    VALUES (@id, @employee_id, @email, @name, @password_hash, @designation,
            @department, @joining_date, @contact_phone, @reporting_manager_id,
            @status, 1, @created_at)
    ON CONFLICT(employee_id) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      designation = excluded.designation,
      department = excluded.department,
      joining_date = excluded.joining_date,
      contact_phone = excluded.contact_phone,
      reporting_manager_id = excluded.reporting_manager_id,
      password_hash = excluded.password_hash
  `);

  const passwordHash = await hash(DEMO_PASSWORD, 10);
  const now = new Date().toISOString();

  for (const emp of EMPLOYEES) {
    insertEmp.run({
      id: `emp-${emp.employee_id.toLowerCase()}`,
      employee_id: emp.employee_id,
      email: emp.email,
      name: emp.name,
      password_hash: passwordHash,
      designation: emp.designation,
      department: emp.department,
      joining_date: emp.joining_date,
      contact_phone: emp.contact_phone,
      reporting_manager_id: emp.reporting_manager_id,
      status: emp.status,
      created_at: now,
    });
    console.log(`[seed] Saved employee: ${emp.employee_id} - ${emp.name}`);
  }

  const insertAtt = db.prepare(`
    INSERT INTO attendance
      (id, employee_id, date, check_in, check_out, total_hours, status, created_at)
    VALUES (@id, @employee_id, @date, @check_in, @check_out, @total_hours, @status, @created_at)
    ON CONFLICT(employee_id, date) DO UPDATE SET
      check_in = excluded.check_in,
      check_out = excluded.check_out,
      total_hours = excluded.total_hours,
      status = excluded.status
  `);

  for (const emp of ["AD-0176", "AD-0178"]) {
    console.log(`[seed] Seeding attendance history for ${emp}...`);
    db.prepare(`DELETE FROM attendance WHERE employee_id = ?`).run(emp);

    const attendanceRecords = generateAttendance(emp);
    const insertMany = db.transaction((rows) => {
      for (const row of rows) {
        insertAtt.run(row);
      }
    });

    insertMany(attendanceRecords);
    console.log(`[seed] Successfully seeded ${attendanceRecords.length} attendance records for ${emp}.`);
  }

  db.close();
}

seed().catch((err) => {
  console.error("[seed] Error:", err);
  process.exit(1);
});
