import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionTokenAsync } from "./lib/session";

/**
 * Middleware protecting the AdroitOne employee portal.
 *
 * All routes under /employee require a valid session cookie
 * (adroitone_session). Unauthenticated requests are redirected to
 * /employee/login with the original destination in a ?callbackUrl param so
 * the login page can return the employee there after sign-in.
 *
 * /employee/login itself is public; authenticated users visiting it are
 * redirected to /employee/dashboard.
 *
 * This module imports only lib/session.ts (pure Web Crypto JWT), so it is safe to run on
 * the Edge Runtime. Database access happens only in the Node.js API routes.
 *
 * Public marketing routes (everything else) are intentionally untouched so the
 * existing website is not disrupted.
 */

const PUBLIC_EMPLOYEE_ROUTES = ["/employee/login"];
const EMPLOYEE_PREFIX = "/employee";
const SESSION_COOKIE = "adroitone_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(EMPLOYEE_PREFIX)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthenticated = !!token && !!(await verifySessionTokenAsync(token));
  const isLoginRoute = PUBLIC_EMPLOYEE_ROUTES.includes(pathname);

  if (isLoginRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/employee/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL("/employee/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employee/:path*"],
};
