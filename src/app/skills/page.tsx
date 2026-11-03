"use client";

import { useEffect, useRef, useState } from "react";
import { skillCategories } from "@/lib/data";
import { AsciiScenePanel } from "@/graphics/components/AsciiScenePanel";

export default function SkillsPage() {
  const [activeId, setActiveId] = useState<string>(skillCategories[1].id);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeDomain =
    skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  // Interactive Pixel Constellation Canvas connecting all 6 technical domains
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 720;
    const H = 260;
    canvas.width = W;
    canvas.height = H;

    const hubs = skillCategories.map((cat, idx) => {
      const angle = (idx / skillCategories.length) * Math.PI * 2 - Math.PI / 2;
      return {
        id: cat.id,
        title: cat.title,
        color: cat.accent,
        x: W / 2 + Math.cos(angle) * 210,
        y: H / 2 + Math.sin(angle) * 86,
        items: cat.items,
      };
    });

    let raf = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const t = now * 0.001;

      ctx.fillStyle = "#060B19";
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = "rgba(86, 216, 255, 0.05)";
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Center core node ("SARANSH.EXE")
      ctx.strokeStyle = "rgba(86, 216, 255, 0.25)";
      hubs.forEach((h, i) => {
        const isCurrent = h.id === activeId;
        ctx.strokeStyle = isCurrent ? h.color : "rgba(86, 216, 255, 0.2)";
        ctx.lineWidth = isCurrent ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(W / 2, H / 2);
        ctx.lineTo(h.x, h.y);
        ctx.stroke();

        // Signal packet along spoke
        const u = (t * 0.65 + i * 0.18) % 1;
        const px = W / 2 + (h.x - W / 2) * u;
        const py = H / 2 + (h.y - H / 2) * u;
        ctx.fillStyle = h.color;
        ctx.fillRect(px - 2, py - 2, 4, 4);
      });

      // Draw hub nodes
      hubs.forEach((h) => {
        const isCurrent = h.id === activeId;
        ctx.fillStyle = isCurrent ? h.color : "#162447";
        ctx.fillRect(h.x - 9, h.y - 9, 18, 18);
        ctx.strokeStyle = h.color;
        ctx.strokeRect(h.x - 12, h.y - 12, 24, 24);

        ctx.fillStyle = isCurrent ? "#FECC1B" : "#F4F5FA";
        ctx.font = "bold 10px monospace";
        ctx.fillText(h.title.toUpperCase(), h.x - 48, h.y - 18);
      });

      // Center core badge
      ctx.fillStyle = "#0D1734";
      ctx.fillRect(W / 2 - 44, H / 2 - 14, 88, 28);
      ctx.strokeStyle = "#56D8FF";
      ctx.strokeRect(W / 2 - 44, H / 2 - 14, 88, 28);
      ctx.fillStyle = "#FECC1B";
      ctx.font = "bold 10px monospace";
      ctx.fillText("SARANSH.EXE", W / 2 - 34, H / 2 + 4);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [activeId]);

  return (
    <main className="mx-auto max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Header */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
          // 03 • CONNECTED TECHNICAL ECOSYSTEM
        </p>
        <h1 className="pixel-title mt-2 text-2xl font-bold text-ink sm:text-4xl">
          SKILLS &amp; ENGINEERING STACK
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Organized across six core engineering domains from low-level C/C++ and
          ESP32 hardware buses to YOLO computer vision and distributed FastAPI
          backends. Represented as an interconnected technical ecosystem rather
          than arbitrary percentage bars.
        </p>

        {/* Interactive Constellation Map */}
        <div className="mt-6 overflow-hidden rounded-xl border border-white/12 bg-[#060B19]">
          <canvas
            ref={canvasRef}
            className="pixelated mx-auto block h-auto w-full max-w-[900px]"
          />
        </div>

        {/* Domain Selector Pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {skillCategories.map((cat) => {
            const active = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveId(cat.id)}
                className={`rounded-lg border px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition ${
                  active
                    ? "border-yellow bg-yellow/15 text-yellow"
                    : "border-white/12 bg-white/5 text-muted hover:text-ink"
                }`}
              >
                {cat.code} · {cat.title}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Domain Spotlight + Neural Network / Software Scene */}
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="glass-panel flex flex-col justify-between rounded-2xl p-6">
          <div>
            <span
              className="font-mono text-xs uppercase tracking-[0.16em]"
              style={{ color: activeDomain.accent }}
            >
              {activeDomain.code} // ACTIVE DOMAIN
            </span>
            <h2 className="pixel-title mt-2 text-2xl font-bold text-ink">
              {activeDomain.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              {activeDomain.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {activeDomain.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-cyan/35 bg-cyan/10 px-3.5 py-2 font-mono text-xs font-medium text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-muted">
            Verified across academic, competition, and internship engineering
            work.
          </p>
        </section>

        <AsciiScenePanel
          sceneId="neural-network"
          showSourceToggle
          subtitle="NEURAL & HARDWARE SIGNAL PROPAGATION"
        />
      </div>

      {/* Complete 6-Domain Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => (
          <article
            key={cat.id}
            onClick={() => setActiveId(cat.id)}
            className="glass-panel cursor-pointer rounded-2xl p-6 transition hover:border-cyan/50"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span style={{ color: cat.accent }}>{cat.code}</span>
              <span className="text-muted">{cat.items.length} TOOLS</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-ink">{cat.title}</h3>
            <p className="mt-2 text-xs leading-6 text-muted">
              {cat.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-white/10 bg-[#070B18]/85 px-2.5 py-1 font-mono text-xs text-ink/90"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
