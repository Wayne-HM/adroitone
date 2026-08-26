import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="orb left-[20%] top-[20%] h-[360px] w-[360px] bg-accent/12" />
        <div className="orb right-[15%] bottom-[10%] h-[300px] w-[300px] bg-violet/8" />
      </div>
      <div className="container-x text-center">
        <p className="eyebrow mb-6 justify-center">Error 404</p>
        <h1 className="display-xl mx-auto max-w-[12ch]">
          This page took a different route.
        </h1>
        <p className="lede mx-auto mt-7 max-w-md">
          The link may be outdated — but the way home is short.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-3.5 font-medium text-ink-950 transition-colors hover:bg-[#e9edff]"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="link-underline inline-flex items-center gap-2 px-2 py-3.5 font-medium text-white"
          >
            Contact us
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
