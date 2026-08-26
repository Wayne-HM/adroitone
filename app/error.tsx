"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="orb left-[30%] top-[25%] h-[320px] w-[320px] bg-accent/10" />
      </div>
      <div className="container-x text-center">
        <p className="eyebrow mb-6 justify-center">Something went wrong</p>
        <h1 className="display-lg mx-auto max-w-[16ch]">
          An unexpected error occurred.
        </h1>
        <p className="lede mx-auto mt-6 max-w-md">
          It&apos;s not you. Try again, and if it persists we&apos;d like to
          hear about it.
        </p>
        <div className="mt-11 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-white px-7 py-3.5 font-medium text-ink-950 transition-colors hover:bg-[#e9edff]"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
