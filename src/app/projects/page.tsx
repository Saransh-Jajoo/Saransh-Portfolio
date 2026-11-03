import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { projects } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering project gallery: AURA-CX, Computer Vision & CCTV Analytics, PunarJAL, SensiCold, and P10 RGB Display System.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header Banner */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              // 02 • ENGINEERING WORKSHOP &amp; CASE STUDIES
            </p>
            <h1 className="pixel-title mt-2 text-2xl font-bold text-ink sm:text-4xl">
              FEATURED ENGINEERING SYSTEMS
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
              Each system below features its own dedicated procedural ASCII &amp;
              pixel-art visualization, problem definition, technical approach,
              and verified vs. target engineering outcomes.
            </p>
          </div>
          <div className="glass-pill inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs text-yellow">
            <Layers size={14} />
            <span>{projects.length} DISTINCT SYSTEMS</span>
          </div>
        </div>
      </section>

      {/* Project Cards Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, idx) => (
          <article
            key={project.slug}
            className={`glass-panel flex flex-col justify-between rounded-2xl p-6 transition hover:border-cyan/50 sm:p-7 ${
              idx === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="space-y-5">
              {/* Top Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span
                  className="font-semibold uppercase tracking-[0.14em]"
                  style={{ color: project.accent }}
                >
                  {project.code} · {project.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-[11px] text-muted">
                  {project.status}
                </span>
              </div>

              {/* Unique Procedural Scene Preview */}
              <AsciiScenePanel
                sceneId={project.scene}
                subtitle={project.subtitle}
              />

              {/* Title & Description */}
              <div>
                <h2 className="pixel-title text-xl font-bold text-ink sm:text-2xl">
                  {project.name}
                </h2>
                <p className="mt-1 font-mono text-xs text-yellow">
                  {project.subtitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/90">
                  {project.summary}
                </p>
              </div>

              {/* Problem & Contribution Split */}
              <div className="grid gap-4 rounded-xl border border-white/10 bg-[#060A18]/75 p-4 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
                    Problem Solved
                  </p>
                  <p className="mt-1.5 text-xs leading-6 text-muted">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-yellow">
                    Key Features
                  </p>
                  <ul className="mt-1.5 space-y-1 text-xs leading-5 text-muted">
                    {project.features.slice(0, 3).map((feat) => (
                      <li key={feat}>• {feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metrics / Targets */}
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-lg border border-white/12 bg-[#080E22]/90 px-3 py-1.5 font-mono text-xs"
                  >
                    <span className="text-[10px] uppercase text-muted">
                      {m.kind === "target"
                        ? "Target · "
                        : m.kind === "measured"
                          ? "Measured · "
                          : "Spec · "}
                    </span>
                    <span className="text-ink">{m.label}: </span>
                    <span className="font-semibold text-yellow">{m.value}</span>
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-ink/85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-yellow px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#05060B] transition hover:bg-cyan"
              >
                <span>Open Full Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
              <span className="font-mono text-[11px] text-muted">
                {project.resultsNote.slice(0, 72)}...
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
