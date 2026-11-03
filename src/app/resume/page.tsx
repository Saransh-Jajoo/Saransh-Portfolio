import type { Metadata } from "next";
import { Download } from "lucide-react";
import {
  achievements,
  brand,
  experience,
  projects,
  skillCategories,
} from "@/lib/data";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: `Official Resume — ${brand.name}`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="glass-panel rounded-2xl p-6 sm:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 print:hidden">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
            OFFICIAL RESUME // {brand.name.toUpperCase()}
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={brand.contact.resumePdf}
              download="Saransh_Jajoo_Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg bg-yellow px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#05060B] hover:bg-cyan"
            >
              <Download size={13} />
              <span>Download Original PDF</span>
            </a>
            <PrintButton />
          </div>
        </div>

        <header className="border-b border-white/10 pb-6">
          <h1 className="pixel-title text-2xl font-bold text-ink sm:text-4xl">
            {brand.name}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-yellow">
            IoT | Embedded Systems | AI &amp; Computer Vision
          </p>
          <p className="mt-2 font-mono text-xs text-muted">
            {brand.contact.email} · {brand.contact.phone} ·{" "}
            {brand.contact.github.replace("https://", "")}
          </p>
          <p className="mt-4 text-sm leading-7 text-ink/90">
            {brand.resumeSummary}
          </p>
        </header>

        <section className="mt-6 border-b border-white/10 pb-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
            Education
          </h2>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm font-semibold text-ink">
            <span>{brand.education.school}</span>
            <span className="font-mono text-xs text-yellow">
              {brand.education.years}
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-muted">
            {brand.education.degree} · CGPA: {brand.education.cgpa}
          </p>
        </section>

        <section className="mt-6 border-b border-white/10 pb-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
            Experience
          </h2>
          <div className="mt-4 space-y-5">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-semibold text-ink">
                  <span>
                    {job.role} | {job.org}
                  </span>
                  <span className="font-mono text-xs text-yellow">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-xs leading-6 text-muted">
                  {job.highlights.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 border-b border-white/10 pb-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
            Projects
          </h2>
          <div className="mt-4 space-y-4">
            {projects.map((p) => (
              <div key={p.slug}>
                <p className="text-sm font-semibold text-ink">
                  {p.name}{" "}
                  <span className="font-mono text-xs font-normal text-yellow">
                    | {p.subtitle}
                  </span>
                </p>
                <p className="mt-1 text-xs leading-6 text-muted">
                  {p.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 border-b border-white/10 pb-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
            Technical Skills
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="text-xs leading-6">
                <span className="font-mono font-semibold text-ink">
                  {cat.title}:{" "}
                </span>
                <span className="text-muted">{cat.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
            Achievements
          </h2>
          <ul className="mt-3 grid gap-2 text-xs text-muted sm:grid-cols-2">
            {achievements.map((a) => (
              <li key={a.id}>
                • <span className="text-ink">{a.title}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
