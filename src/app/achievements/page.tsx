import type { Metadata } from "next";
import { Award, Trophy } from "lucide-react";
import { achievements } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Verified national and institutional achievements: Samsung Solve for Tomorrow 2025 Top 100, SIH 2025 Grand Finalist, Anveshan 2026 National Finalist, ADCET Hackathon 2025 Winner.",
};

export default function AchievementsPage() {
  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              // 05 • VERIFIED HACKATHONS &amp; HONORS
            </p>
            <h1 className="pixel-title mt-2 text-2xl font-bold text-ink sm:text-4xl">
              RECOGNITION &amp; MILESTONES
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
              Verified competition results from national innovation programs,
              hardware hackathons, and student research conventions.
            </p>
          </div>
          <div className="glass-pill inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs text-yellow">
            <Trophy size={15} />
            <span>{achievements.length} VERIFIED HONORS</span>
          </div>
        </div>
      </section>

      {/* Pixel/ASCII Trophy Monument Scene */}
      <section>
        <AsciiScenePanel
          sceneId="trophy"
          showSourceToggle
          subtitle="ILLUMINATED RECOGNITION MONUMENT"
        />
      </section>

      {/* Achievement Cards Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item) => (
          <article
            key={item.id}
            className="glass-panel flex flex-col justify-between rounded-2xl p-6 transition hover:border-yellow/50"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-muted">{item.id}</span>
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    borderColor: `${item.accent}66`,
                    color: item.accent,
                    backgroundColor: `${item.accent}18`,
                  }}
                >
                  {item.rank}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: `${item.accent}55`,
                    backgroundColor: `${item.accent}15`,
                    color: item.accent,
                  }}
                >
                  <Award size={20} />
                </div>
                <h2 className="text-lg font-semibold leading-snug text-ink">
                  {item.title}
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
              <span className="text-muted">YEAR</span>
              <span className="font-bold text-yellow">{item.year}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
