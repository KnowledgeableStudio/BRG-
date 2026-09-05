import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="glass-panel rounded-[2.5rem] p-10">
        <p className="font-display text-7xl font-black text-brg-blue">404</p>
        <p className="mt-4 font-display text-2xl font-black text-white">
          Page not found
        </p>
        <p className="mt-3 text-white/55">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brg-blue px-8 py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-black transition hover:shadow-glow-strong"
        >
          Back to BRG
        </Link>
      </div>
    </section>
  );
}
