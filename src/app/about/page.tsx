import type { Metadata } from "next";
import Link from "next/link";
import { Download, GraduationCap, Layers, Sparkles } from "lucide-react";
import { brand } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";

export const metadata: Metadata = {
  title: "About",
  description: brand.resumeSummary,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Top Editorial Glass Hero */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              // 01 • ABOUT &amp; ENGINEERING PHILOSOPHY
            </p>
            <h1 className="pixel-title text-2xl font-bold leading-snug text-ink sm:text-4xl">
              BRIDGING INTELLIGENT ALGORITHMS &amp; PHYSICAL SYSTEMS
            </h1>
            <p className="font-mono text-sm text-yellow">{brand.roleLine}</p>

            <div className="space-y-4 text-base leading-7 text-ink/90">
              {brand.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/projects"
                className="rounded-lg bg-yellow px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#05060B] transition hover:bg-cyan"
              >
                Explore Projects →
              </Link>
              <a
                href={brand.contact.resumePdf}
                download="Saransh_Jajoo_Resume.pdf"
                className="glass-pill inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink hover:border-cyan hover:text-cyan"
              >
                <Download size={14} className="text-cyan" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <AsciiScenePanel
              sceneId="profile-art"
              showSourceToggle
              subtitle="HARDWARE <-> AI <-> SOFTWARE TOPOLOGY"
            />

            {/* Education Card */}
            <div className="rounded-xl border border-cyan/30 bg-[#070D1F]/80 p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan">
                  <GraduationCap size={15} />
                  Education
                </span>
                <span className="rounded border border-yellow/40 bg-yellow/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-yellow">
                  CGPA: {brand.education.cgpa}
                </span>
              </div>
              <h2 className="mt-2.5 text-lg font-semibold text-ink">
                {brand.education.degree}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {brand.education.school}
              </p>
              <p className="mt-2 font-mono text-xs text-cyan">
                {brand.education.years}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solving Approach & Development Philosophy */}
      <section className="grid gap-6 md:grid-cols-3">
        {brand.philosophy.map((pillar) => (
          <article
            key={pillar.code}
            className="glass-panel rounded-xl p-6 transition hover:border-cyan/45"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-yellow">PILLAR // {pillar.code}</span>
              <Sparkles size={14} className="text-cyan" />
            </div>
            <h2 className="mt-3 text-lg font-semibold text-ink">
              {pillar.title}
            </h2>
            <p className="mt-2.5 text-sm leading-6 text-muted">
              {pillar.detail}
            </p>
          </article>
        ))}
      </section>

      {/* Areas of Technical Focus & Procedural Skyline Showcase */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-cyan">
              <Layers size={15} />
              <span>Core Areas of Focus</span>
            </div>
            <h2 className="pixel-title text-xl font-bold text-ink sm:text-2xl">
              WHAT I ENGINEER
            </h2>
            <p className="text-sm leading-7 text-muted">
              {brand.resumeSummary}
            </p>
            <ul className="grid gap-2.5 pt-2 sm:grid-cols-2">
              {brand.disciplines.map((area) => (
                <li
                  key={area}
                  className="rounded-lg border border-white/10 bg-[#070B18]/75 px-3.5 py-2.5 font-mono text-xs text-ink"
                >
                  <span className="mr-2 text-cyan">▪</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <AsciiScenePanel
            sceneId="nyc-skyline-night"
            showSourceToggle
            subtitle="PROCEDURAL NIGHT CITYSCAPE ENGINE"
          />
        </div>
      </section>
    </main>
  );
}
