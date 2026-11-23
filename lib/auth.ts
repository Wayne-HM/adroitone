import { compare, hash } from "bcryptjs";
import { cookies } from "next/headers";
import {
  verifySessionTokenAsync,
  SESSION_COOKIE,
} from "./session";
import { getDb, initDb, type EmployeeRow } from "./db";

/**
 * Authentication helpers that require the employee database (Node.js runtime).
 *
 * Used by API routes under /api/auth and /api/attendance, all of which declare
 * `runtime = "nodejs"`. Middleware does NOT import this module — it uses
 * lib/session.ts directly so it can run on the Edge Runtime.
 */

const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24 hours

/** Hash a plaintext password with bcrypt (10 rounds). */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

/** Verify a plaintext password against a bcrypt hash. */
export async function verifyPassword(
  password: string,
  hashValue: string
): Promise<boolean> {
  return compare(password, hashValue);
}

/** Look up an employee by id without exposing the password hash. */
export function getEmployeeById(employeeId: string): EmployeeRow | null {
  const normalized = employeeId.replace(/^emp-/, "").toUpperCase();
  const row = getDb()
    .prepare(
      `SELECT id, employee_id, email, name, designation, department,
              joining_date, contact_phone, reporting_manager_id, status,
              is_demo, created_at
       FROM employees
       WHERE id = ? OR employee_id = ? OR employee_id = ? OR UPPER(id) = ?`
    )
    .get(employeeId, employeeId, normalized, employeeId.toUpperCase()) as EmployeeRow | undefined;
  return row ?? null;
}

/** Look up an employee by employee_id or email (login lookup). */
export function getEmployeeByLoginIdentifier(
  identifier: string
): Pick<
  EmployeeRow,
  "id" | "employee_id" | "email" | "name" | "password_hash" | "status"
> | null {
  const row = getDb()
    .prepare(
      `SELECT id, employee_id, email, name, password_hash, status
       FROM employees
       WHERE employee_id = ? OR email = ?
       LIMIT 1`
    )
    .get(identifier, identifier) as
    | Pick<
        EmployeeRow,
        | "id"
        | "employee_id"
        | "email"
        | "name"
        | "password_hash"
        | "status"
      >
    | undefined;
  return row ?? null;
}

/** Session cookie options. Secure only over HTTPS; relax in dev over HTTP. */
export function sessionCookieOptions(): Record<string, unknown> {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    ...(isProd ? { secure: true } : {}),
  };
}

/** Clear the session cookie. */
export async function clearSessionCookie(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Set the session cookie. */
export async function setSessionCookie(token: string): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions());
}

/** Authenticate an employee by identifier + password. Returns the employee
 *  record (minus the password hash) on success, null otherwise. */
export async function authenticateEmployee(
  identifier: string,
  password: string
): Promise<SessionEmployee | null> {
  const record = getEmployeeByLoginIdentifier(identifier);
  if (!record) return null;
  if (!(await verifyPassword(password, record.password_hash))) return null;
  if (record.status !== "active") return null;

  // Return the full public record (minus password hash).
  return getEmployeeById(record.id);
}

export type SessionEmployee = Omit<EmployeeRow, "password_hash">;

/** Current authenticated employee from the request cookies or headers, or null. */
export async function getCurrentEmployee(req?: Request): Promise<SessionEmployee | null> {
  let token: string | undefined;
  try {
    token = (await cookies()).get(SESSION_COOKIE)?.value;
  } catch {
    // cookies() might fail outside request context
  }

  if (!token && req) {
    const rawCookie = req.headers.get("cookie");
    if (rawCookie) {
      const match = rawCookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
      if (match) token = match[1];
    }
    if (!token) {
      const auth = req.headers.get("authorization");
      if (auth?.startsWith("Bearer ")) token = auth.slice(7).trim();
    }
  }

  if (!token) return null;
  const employeeId = await verifySessionTokenAsync(token);
  if (!employeeId) return null;
  initDb();
  return getEmployeeById(employeeId);
}

/** Require a current employee. Throws if there is no valid session. */
export async function requireEmployee(req?: Request): Promise<SessionEmployee> {
  const employee = await getCurrentEmployee(req);
  if (!employee) {
    const err = new Error("Unauthorized");
    (err as Error & { status?: number }).status = 401;
    throw err;
  }
  return employee;
}

export type PublicEmployee = {
  id: string;
  employee_id: string;
  email: string;
  name: string;
  designation: string | null;
  department: string | null;
  joining_date: string | null;
  contact_phone: string | null;
  reporting_manager_id: string | null;
  status: string;
  is_demo: boolean;
  created_at: string;
};

export function toPublicEmployee(row: SessionEmployee): PublicEmployee {
  return {
    id: row.id,
    employee_id: row.employee_id,
    email: row.email,
    name: row.name,
    designation: row.designation,
    department: row.department,
    joining_date: row.joining_date,
    contact_phone: row.contact_phone,
    reporting_manager_id: row.reporting_manager_id,
    status: row.status,
    is_demo: row.is_demo === 1,
    created_at: row.created_at,
  };
}
