"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, nav } from "@/lib/data";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060915]/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="pixel-title shrink-0 text-sm font-bold tracking-wider text-yellow drop-shadow-[0_0_10px_rgba(254,204,27,0.45)] sm:text-base"
          >
            {brand.id}
          </Link>
          <span className="hidden truncate border-l border-white/15 pl-3 font-mono text-[10px] tracking-[0.14em] text-ink/85 2xl:inline">
            {brand.subtitle}
          </span>
        </div>

        <nav className="hidden shrink-0 items-center gap-0.5 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-2 py-1 font-mono text-[10px] tracking-[0.1em] transition-all lg:px-3 lg:text-[11px] ${
                  active
                    ? "border border-cyan/70 bg-cyan/15 text-cyan shadow-[0_0_16px_rgba(86,216,255,0.28)]"
                    : "border border-transparent text-ink/80 hover:border-white/15 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={15} /> : <Menu size={15} />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-white/10 bg-[#070B18]/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg border px-3.5 py-2.5 font-mono text-xs tracking-[0.14em] ${
                    active
                      ? "border-cyan bg-cyan/15 text-cyan"
                      : "border-white/10 bg-white/5 text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
