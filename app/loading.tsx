export default function Loading() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="text-sm font-semibold tracking-[0.34em] text-white/80">
          ADROITONE
        </span>
        <span className="h-px w-24 animate-pulse bg-gradient-to-r from-accent to-cyan" />
      </div>
    </div>
  );
}
