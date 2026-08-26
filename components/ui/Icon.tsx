import { cn } from "@/lib/utils";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "sparkles"
  | "code"
  | "cloud"
  | "users"
  | "layers"
  | "target"
  | "globe"
  | "cpu"
  | "route"
  | "check"
  | "shield";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4.5 13.8 10 19 12l-5.2 2L12 19.5 10.2 14 5 12l5.2-2Z" />
      <path d="M18.5 4v3.4M20.2 5.7h-3.4" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4.5 4L8 16" />
      <path d="m16 8 4.5 4L16 16" />
      <path d="M13.2 5 10.8 19" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4.5 4.5 0 1 1 .6-8.96A6 6 0 0 1 19.3 11 3.75 3.75 0 0 1 18 18Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c.7-3.1 2.9-4.8 5.5-4.8s4.8 1.7 5.5 4.8" />
      <path d="M15.5 5.7a3.2 3.2 0 0 1 0 5.6" />
      <path d="M17.6 14.9c1.6.7 2.6 2.2 3 4.6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.7L12 12.9 3.5 8.2Z" />
      <path d="m4.5 12.4 7.5 4.2 7.5-4.2" />
      <path d="m4.5 16.4 7.5 4.2 7.5-4.2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.6 2.3 3.9 5.2 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.2-3.9-8.5s1.3-6.2 3.9-8.5Z" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.8" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <path d="M8.4 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.6" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V6Z" />
      <path d="m9.2 11.8 2 2 3.6-4" />
    </>
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-5 w-5", className)}
    >
      {paths[name]}
    </svg>
  );
}
