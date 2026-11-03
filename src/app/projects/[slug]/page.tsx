import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";
import { SourceViewer } from "@/graphics/components/SourceViewer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Case Study Header */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-cyan hover:underline"
          >
            <ArrowLeft size={14} />
            <span>Back to Projects Gallery</span>
          </Link>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-muted">
            {project.code} · {project.status}
          </span>
        </div>

        <div className="mt-5">
          <p
            className="font-mono text-xs uppercase tracking-[0.16em]"
            style={{ color: project.accent }}
          >
            {project.category}
          </p>
          <h1 className="pixel-title mt-2 text-3xl font-bold text-ink sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-yellow">
            {project.subtitle}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-ink/90">
            {project.summary}
          </p>
        </div>

        {/* Metrics / Targets Strip */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-white/12 bg-[#070B18]/85 p-4 font-mono"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                {m.kind === "target"
                  ? "Project Target (Design Goal)"
                  : m.kind === "measured"
                    ? "Verified Outcome"
                    : "System Specification"}
              </p>
              <p className="mt-1 text-xl font-bold text-yellow">{m.value}</p>
              <p className="mt-0.5 text-xs text-ink">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Procedural Scene */}
      <section>
        <AsciiScenePanel
          sceneId={project.scene}
          showSourceToggle
          subtitle={project.subtitle}
        />
      </section>

      {/* Problem, Approach, Architecture & Contributions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
            01 // Problem Being Solved
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink/90">
            {project.problem}
          </p>

          <h3 className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-yellow">
            02 // Technical Approach
          </h3>
          <ul className="mt-3 space-y-2.5 text-sm leading-6 text-muted">
            {project.approach.map((step) => (
              <li key={step} className="flex gap-2.5">
                <span className="text-cyan">▪</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
            03 // System Architecture
          </h2>
          <ol className="mt-3 space-y-2 font-mono text-xs">
            {project.architecture.map((layer, i) => (
              <li
                key={layer}
                className="rounded-lg border border-white/10 bg-[#070B18]/80 px-3.5 py-2.5 text-ink"
              >
                <span className="mr-2.5 text-yellow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {layer}
              </li>
            ))}
          </ol>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
            04 // Key Features &amp; My Contributions
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm leading-6 text-ink/90">
            {project.contributions.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={15}
                  className="mt-1 shrink-0 text-emerald-400"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel rounded-2xl p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
            05 // Technology Stack &amp; Outcome Context
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs text-ink"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-yellow/30 bg-yellow/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-yellow">
              Verification &amp; Scope Note
            </p>
            <p className="mt-1.5 text-xs leading-6 text-muted">
              {project.resultsNote}
            </p>
          </div>
        </section>
      </div>

      {/* Representative Code Excerpt */}
      <section className="glass-panel rounded-2xl p-6">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          06 // Representative Architecture Excerpt
        </h2>
        <SourceViewer
          title={`${project.slug}-pipeline.ts`}
          code={project.codeExcerpt}
          language="typescript"
          explain="Core control/orchestration logic for this system."
        />
      </section>

      {/* Prev / Next Project Navigation */}
      <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-xl px-6 py-4 font-mono text-xs uppercase tracking-[0.14em]">
        <Link
          href={`/projects/${prev.slug}`}
          className="inline-flex items-center gap-2 text-muted hover:text-cyan"
        >
          <ArrowLeft size={14} />
          <span>{prev.name}</span>
        </Link>
        <Link
          href="/contact"
          className="rounded-lg bg-yellow px-4 py-2 font-bold text-[#05060B] hover:bg-cyan"
        >
          Discuss This Project →
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="inline-flex items-center gap-2 text-muted hover:text-cyan"
        >
          <span>{next.name}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  );
}
