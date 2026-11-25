import { hashPassword } from "./auth";
import { getDb } from "./db";

/**
 * Seed data for the AdroitOne employee portal.
 *
 * Current configured employee accounts:
 * - AD-0176: SYED MURTAZA (WEB DEVELOPER INTERN, SOFTWARE DEVELOPMENT)
 * - AD-0178: MUJTABA AHMED (WEB DEVELOPER INTERN, SOFTWARE DEVELOPMENT)
 * - AD-0102: Project Manager
 */

const DEMO_PASSWORD = "DemoPassword123!";

const EMPLOYEES = [
  {
    employee_id: "AD-0102",
    email: "pm.ad0102@adroitoneconsult.in",
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
    email: "syedmurtaza.sd@adroitoneconsult.in",
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
    email: "mujtabaahmed.sd@adroitoneconsult.in",
    name: "MUJTABA AHMED",
    designation: "WEB DEVELOPER INTERN",
    department: "SOFTWARE DEVELOPMENT",
    joining_date: "2026-09-07",
    contact_phone: "7207512378",
    reporting_manager_id: "AD-0102",
    status: "active",
  },
] as const;

function generateAttendance(employeeId: string) {
  const ranges = [
    ["2026-09-08", "2026-09-12"],
    ["2026-09-15", "2026-10-10"],
    ["2026-10-21", "2026-11-07"],
    ["2026-11-10", "2026-11-25"],
  ];

  const absentDays = new Set([
    "2026-09-25", "2026-09-26", "2026-09-27",
    "2026-10-25", "2026-10-26", "2026-10-27",
  ]);

  const identicalDates = new Set(["2026-09-08", "2026-10-06", "2026-11-12"]);

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
        let inMinuteOffset = (dayNum * 7) % 26; // 0 to 25 mins after 09:45 -> 09:45 to 10:10
        let outMinuteOffset = (dayNum * 11) % 21; // 0 to 20 mins after 16:50 -> 16:50 to 17:10
        let secIn = (dayNum * 13) % 60;
        let secOut = (dayNum * 17) % 60;

        // If AD-0178 and not one of the identical days, vary by 1 to 8 minutes
        if (employeeId === "AD-0178" && !identicalDates.has(dateStr)) {
          const deltaInMins = ((dayNum * 3 + 5) % 7) + 2; // 2 to 8 mins
          const deltaInSign = (dayNum % 2 === 0) ? 1 : -1;
          inMinuteOffset += deltaInSign * deltaInMins;

          const deltaOutMins = ((dayNum * 5 + 3) % 7) + 2; // 2 to 8 mins
          const deltaOutSign = (dayNum % 3 === 0) ? -1 : 1;
          outMinuteOffset += deltaOutSign * deltaOutMins;

          secIn = (secIn + 23) % 60;
          secOut = (secOut + 37) % 60;
        }

        let inHour = 9;
        let inMin = 45 + inMinuteOffset;
        while (inMin >= 60) {
          inHour += 1;
          inMin -= 60;
        }
        while (inMin < 0) {
          inHour -= 1;
          inMin += 60;
        }

        let outHour = 16;
        let outMin = 50 + outMinuteOffset;
        while (outMin >= 60) {
          outHour += 1;
          outMin -= 60;
        }
        while (outMin < 0) {
          outHour -= 1;
          outMin += 60;
        }

        const pad = (n: number) => String(n).padStart(2, "0");
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

/** Seed employee data (cleans old demo records and saves current employees). */
export async function ensureDemoData(): Promise<{
  employeesInserted: number;
  employeesSkipped: number;
}> {
  const db = getDb();

  // Remove old demo employees if present
  db.prepare(`DELETE FROM attendance WHERE employee_id IN ('EMP-1001', 'EMP-1002', 'EMP-1003')`).run();
  db.prepare(`DELETE FROM employees WHERE employee_id IN ('EMP-1001', 'EMP-1002', 'EMP-1003')`).run();

  const insert = db.prepare(
    `INSERT INTO employees
       (id, employee_id, email, name, password_hash, designation, department,
        joining_date, contact_phone, reporting_manager_id, status, is_demo,
        created_at)
     VALUES (@id, @employee_id, @email, @name, @password_hash, @designation,
             @department, @joining_date, @contact_phone, @reporting_manager_id,
             @status, 0, @created_at)
     ON CONFLICT(employee_id) DO UPDATE SET
       name = excluded.name,
       email = excluded.email,
       designation = excluded.designation,
       department = excluded.department,
       joining_date = excluded.joining_date,
       contact_phone = excluded.contact_phone,
       reporting_manager_id = excluded.reporting_manager_id,
       is_demo = 0`
  );

  const now = new Date().toISOString();
  let inserted = 0;
  const skipped = 0;

  for (const emp of EMPLOYEES) {
    const passwordHash = await hashPassword(DEMO_PASSWORD);
    insert.run({
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
    inserted += 1;
  }

  // Seed attendance for AD-0176 and AD-0178 if not present
  const targetEmployees = ["AD-0176", "AD-0178"];
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

  for (const empId of targetEmployees) {
    const attCount = db
      .prepare(`SELECT count(*) as count FROM attendance WHERE employee_id = ?`)
      .get(empId) as { count: number };

    if (attCount.count === 0) {
      const records = generateAttendance(empId);
      for (const r of records) {
        insertAtt.run(r);
      }
    }
  }

  return { employeesInserted: inserted, employeesSkipped: skipped };
}

export { DEMO_PASSWORD, EMPLOYEES };
