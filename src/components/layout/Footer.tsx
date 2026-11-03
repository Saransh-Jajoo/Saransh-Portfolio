import Link from "next/link";
import { brand, nav } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050812]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="pixel-title text-sm font-bold text-yellow">
                {brand.id}
              </span>
              <span className="font-mono text-xs text-cyan">
                // {brand.name.toUpperCase()}
              </span>
            </div>
            <p className="mt-1.5 font-mono text-xs text-muted">
              {brand.roleLine}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition hover:text-cyan"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
            <a
              href={`mailto:${brand.contact.email}`}
              className="hover:text-cyan"
            >
              {brand.contact.email}
            </a>
            <a
              href={brand.contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
