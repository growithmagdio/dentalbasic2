import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center px-[var(--gutter)] pt-[var(--header-h)] text-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_30%,var(--mist),transparent_70%)]" />
      <div className="glass glass-strong max-w-lg rounded-[32px] p-10">
        <p className="t-label text-accent">404</p>
        <h1 className="t-h2 mt-3">This page has gone missing</h1>
        <p className="mt-4 text-muted">The link may be old. Everything you need is one tap away.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-outline">Home</Link>
          <Link href="/contact/" className="btn btn-primary">Book an appointment</Link>
        </div>
      </div>
    </section>
  );
}
