import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LoginForm } from "@/components/employee/LoginForm";

export const metadata: Metadata = pageMetadata({
  title: "Employee Login",
  description:
    "Sign in to the Adroitone Consulting employee portal to view your attendance and profile.",
  path: "/employee/login",
});

export default async function EmployeeLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;
  const callbackUrl =
    typeof resolved.callbackUrl === "string" ? resolved.callbackUrl : null;

  return (
    <>
      <LoginForm callbackUrl={callbackUrl} />
    </>
  );
}
