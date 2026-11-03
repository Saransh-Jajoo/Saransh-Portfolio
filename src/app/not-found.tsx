import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[1360px] flex-1 items-center px-4 py-16 md:px-6">
      <div className="w-full border border-line bg-bg-2 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
          404 / ROUTE NOT FOUND
        </p>
        <h1 className="mt-3 font-mono text-3xl text-ink">
          SIGNAL LOST IN THE GRID.
        </h1>
        <p className="mt-3 text-sm text-muted">
          The requested path does not match an active SARANSH.EXE route.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block border border-cyan bg-cyan px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-bg hover:bg-ink"
        >
          Return to Home →
        </Link>
      </div>
    </main>
  );
}
