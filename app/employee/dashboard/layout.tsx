import { DashboardLayout } from "@/components/employee/DashboardLayout";

export default function EmployeeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
