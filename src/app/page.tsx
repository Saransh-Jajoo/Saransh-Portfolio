import Link from "next/link";
import { Code2, Cpu, Crosshair, Download, Play, Radio } from "lucide-react";
import { brand } from "@/lib/data";
import { PixelWorkspaceHero } from "@/graphics/components/PixelWorkspaceHero";
import { SignalRunTrigger } from "@/components/game/SignalRunModal";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1400px] flex-col justify-between px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* MainSplit Hero Composition */}
      <div className="my-auto grid items-center gap-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
        {/* Left Editorial + Pixel Hero Column */}
        <div className="min-w-0 space-y-5">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan/30 bg-[#0A142C]/70 px-3.5 py-1.5 backdrop-blur-md">
            <span className="truncate font-mono text-[11px] font-medium tracking-[0.14em] text-cyan sm:text-xs">
              {brand.disciplinesTag}
            </span>
          </div>

          <div>
            <h1 className="pixel-title text-3xl font-bold leading-[1.08] tracking-tight text-ink drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-5xl xl:text-6xl">
              SARANSH
              <br />
              JAJOO
              <span className="animate-cursor text-cyan">_</span>
            </h1>

            <p className="mt-3 text-lg font-semibold tracking-tight text-yellow drop-shadow-[0_0_16px_rgba(254,204,27,0.25)] sm:text-2xl">
              {brand.headline}
            </p>
          </div>

          <p className="max-w-xl text-base leading-7 text-ink/90 sm:text-lg sm:leading-8">
            {brand.intro}
          </p>

          {/* Primary Disciplines Pills */}
          <div className="flex flex-wrap gap-2">
            {brand.disciplines.map((d) => (
              <span
                key={d}
                className="glass-pill rounded-md px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-ink/90"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 rounded-lg border border-yellow bg-yellow px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#05060B] shadow-[0_0_24px_rgba(254,204,27,0.35)] transition hover:bg-amber hover:shadow-[0_0_32px_rgba(254,204,27,0.55)]"
            >
              <Play size={14} fill="currentColor" />
              <span>Explore My Work</span>
            </Link>

            <a
              href={brand.contact.resumePdf}
              download="Saransh_Jajoo_Resume.pdf"
              className="glass-panel inline-flex items-center gap-2 rounded-lg border border-cyan/40 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-cyan hover:text-cyan"
            >
              <Download size={14} className="text-cyan" />
              <span>Download Resume</span>
            </a>

            <a
              href={brand.contact.github}
              target="_blank"
              rel="noreferrer"
              className="glass-panel inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-cyan hover:text-cyan"
            >
              <Code2 size={14} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Optional Interactive Mini-Experience Entry */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <SignalRunTrigger />
            <Link
              href="/resume"
              className="font-mono text-xs uppercase tracking-[0.14em] text-muted underline-offset-4 hover:text-cyan hover:underline"
            >
              View Structured Resume →
            </Link>
          </div>
        </div>

        {/* Right Personalized Pixel-Art Portrait & Interactive Engineering Workspace */}
        <div className="min-w-0">
          <PixelWorkspaceHero />
        </div>
      </div>

      {/* Bottom Glassmorphic Telemetry Status Footer */}
      <div className="glass-panel mt-8 grid gap-4 rounded-xl border border-white/15 px-5 py-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan">
            <Cpu size={17} />
          </div>
          <div className="font-mono">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              DISCIPLINES
            </p>
            <p className="text-xs font-semibold tracking-[0.1em] text-ink">
              {brand.statusFooter.disciplines}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-yellow/30 bg-yellow/10 text-yellow">
            <Crosshair size={17} />
          </div>
          <div className="font-mono">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              CURRENT FOCUS
            </p>
            <p className="text-xs font-semibold tracking-[0.1em] text-yellow">
              {brand.statusFooter.focus}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
            <Radio size={17} />
          </div>
          <div className="font-mono">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              SYSTEM STATE
            </p>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-ink">
              <span>{brand.statusFooter.status}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
