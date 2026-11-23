/**
 * Employee portal layout — suppresses the main marketing Navbar, Footer,
 * ScrollProgress and Preloader so the employee dashboard has its own chrome.
 *
 * This works because Next.js route segments can define their own layout that
 * wraps children *instead* of the parent segment's default page wrapper.
 * The root layout (html/body/font/metadata) still applies.
 */

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
