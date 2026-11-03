import type { Metadata } from "next";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { brand, experience } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional engineering experience: Embedded Systems Intern at iThink Software Labs and Member at e-Yantra Robotics Club, ADCET.",
};

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          // 04 • PROFESSIONAL &amp; ENGINEERING TIMELINE
        </p>
        <h1 className="pixel-title mt-2 text-2xl font-bold text-ink sm:text-4xl">
          EXPERIENCE &amp; FIELD DEPLOYMENTS
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Hands-on industry internship work optimizing ESP8266/ESP32 P10 RGB LED
          display systems alongside embedded robotics and sensor-control
          engineering.
        </p>
      </section>

      {/* Experience Timeline Entries with Unique Scenes */}
      <div className="space-y-8">
        {experience.map((item) => (
          <article
            key={item.id}
            className="glass-panel rounded-2xl p-6 sm:p-8"
          >
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span
                    className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.14em]"
                    style={{ color: item.accent }}
                  >
                    <Briefcase size={14} />
                    {item.code} · {item.badge}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-ink">
                    <Calendar size={12} className="text-cyan" />
                    {item.period}
                  </span>
                </div>

                <div>
                  <h2 className="pixel-title text-xl font-bold text-ink sm:text-2xl">
                    {item.role}
                  </h2>
                  <p className="mt-1 font-mono text-sm text-yellow">
                    {item.org}
                  </p>
                </div>

                <p className="text-sm leading-7 text-muted">{item.summary}</p>

                <ul className="space-y-2.5 pt-1 text-sm leading-6 text-ink/90">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="mt-1 shrink-0 text-cyan"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/12 bg-[#070B18]/80 px-2.5 py-1 font-mono text-xs text-ink/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <AsciiScenePanel
                sceneId={item.scene}
                showSourceToggle
                subtitle={`${item.org.toUpperCase()} // LIVE SIMULATION`}
              />
            </div>
          </article>
        ))}
      </div>

      {/* Education Milestone Card */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">
              ACADEMIC FOUNDATION // {brand.education.years}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-ink">
              {brand.education.degree} — {brand.education.school}
            </h2>
          </div>
          <span className="rounded-lg border border-yellow/40 bg-yellow/10 px-4 py-2 font-mono text-sm font-bold text-yellow">
            CGPA: {brand.education.cgpa}
          </span>
        </div>
      </section>
    </main>
  );
}
