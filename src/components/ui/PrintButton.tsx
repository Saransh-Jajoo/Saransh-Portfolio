"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="border border-cyan bg-cyan px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bg hover:bg-ink"
    >
      Print / Save PDF
    </button>
  );
}
