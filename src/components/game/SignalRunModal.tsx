"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Gamepad2, Sparkles, X } from "lucide-react";
import { signalRunCheckpoints } from "@/lib/data";

export function SignalRunTrigger() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [activeNode, setActiveNode] = useState<
    (typeof signalRunCheckpoints)[number] | null
  >(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef({ x: 0.12, y: 0.5, tx: 0.12, ty: 0.5 });
  const keysRef = useRef<Record<string, boolean>>({});
  const unlockedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      keysRef.current[e.key.toLowerCase()] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 640;
    const H = 320;
    canvas.width = W;
    canvas.height = H;

    let raf = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const t = now * 0.001;
      const p = playerRef.current;
      const k = keysRef.current;
      const speed = 0.0065;

      let movedByKeys = false;
      if (k["arrowleft"] || k["a"]) {
        p.x -= speed;
        movedByKeys = true;
      }
      if (k["arrowright"] || k["d"]) {
        p.x += speed;
        movedByKeys = true;
      }
      if (k["arrowup"] || k["w"]) {
        p.y -= speed * 1.4;
        movedByKeys = true;
      }
      if (k["arrowdown"] || k["s"]) {
        p.y += speed * 1.4;
        movedByKeys = true;
      }

      if (movedByKeys) {
        p.tx = p.x;
        p.ty = p.y;
      } else {
        p.x += (p.tx - p.x) * 0.09;
        p.y += (p.ty - p.y) * 0.09;
      }

      p.x = Math.max(0.05, Math.min(0.95, p.x));
      p.y = Math.max(0.1, Math.min(0.9, p.y));

      // Background grid
      ctx.fillStyle = "#060A17";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(86, 216, 255, 0.07)";
      for (let gx = 0; gx < W; gx += 32) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 32) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      // Connect checkpoints with circuit bus lines
      ctx.strokeStyle = "rgba(254, 204, 27, 0.28)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      signalRunCheckpoints.forEach((cp, idx) => {
        const cx = cp.x * W;
        const cy = cp.y * H;
        if (idx === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      ctx.stroke();

      // Draw checkpoints & check collision
      for (const cp of signalRunCheckpoints) {
        const cx = cp.x * W;
        const cy = cp.y * H;
        const isDone = unlockedRef.current.has(cp.id);

        // Outer pulse ring
        const r = 18 + Math.sin(t * 3.5) * 4;
        ctx.strokeStyle = isDone ? "#34D399" : cp.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);

        // Core pixel node
        ctx.fillStyle = isDone ? "#34D399" : cp.color;
        ctx.fillRect(cx - 8, cy - 8, 16, 16);

        ctx.fillStyle = "#F4F5FA";
        ctx.font = "bold 10px monospace";
        ctx.fillText(`${cp.code}: ${cp.title.toUpperCase()}`, cx - 54, cy - 24);

        const dist = Math.hypot(p.x * W - cx, p.y * H - cy);
        if (dist < 26) {
          if (!unlockedRef.current.has(cp.id)) {
            unlockedRef.current.add(cp.id);
            setUnlocked(Array.from(unlockedRef.current));
          }
          setActiveNode(cp);
        }
      }

      // Draw glowing signal player sprite
      const px = Math.round(p.x * W);
      const py = Math.round(p.y * H);
      ctx.fillStyle = "rgba(86, 216, 255, 0.25)";
      ctx.fillRect(px - 12, py - 12, 24, 24);
      ctx.fillStyle = "#FECC1B";
      ctx.fillRect(px - 6, py - 6, 12, 12);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(px - 2, py - 2, 4, 4);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [open]);

  const nudge = (dx: number, dy: number) => {
    const p = playerRef.current;
    p.tx = Math.max(0.06, Math.min(0.94, p.x + dx));
    p.ty = Math.max(0.12, Math.min(0.88, p.y + dy));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-cyan/40 bg-[#0A1228]/80 px-3.5 py-2 font-mono text-xs uppercase tracking-[0.14em] text-cyan shadow-[0_0_20px_rgba(86,216,255,0.15)] transition hover:border-yellow hover:text-yellow"
      >
        <Gamepad2 size={15} />
        <span>Launch Signal Run</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Signal Run interactive engineering world"
        >
          <div className="glass-panel w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan/40 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#070B18]/90 px-5 py-3">
              <div className="flex items-center gap-2.5">
                <Sparkles size={15} className="text-yellow" />
                <span className="pixel-title text-xs text-yellow">
                  SIGNAL RUN // EXPLORE MY ENGINEERING WORLD
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-cyan">
                  NODES: {unlocked.length} / {signalRunCheckpoints.length}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1 rounded border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-muted hover:border-cyan hover:text-ink"
                >
                  <X size={13} /> Skip / Exit
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <p className="mb-3 font-mono text-xs text-muted">
                Use <span className="text-ink">WASD / Arrow Keys</span> or{" "}
                <span className="text-cyan">Click / Tap</span> anywhere on the
                circuit grid to navigate your signal packet to all 3 engineering
                checkpoints.
              </p>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  playerRef.current.tx =
                    (e.clientX - rect.left) / Math.max(1, rect.width);
                  playerRef.current.ty =
                    (e.clientY - rect.top) / Math.max(1, rect.height);
                }}
                className="relative cursor-crosshair overflow-hidden rounded-xl border border-white/15 bg-[#060A17]"
              >
                <canvas
                  ref={canvasRef}
                  className="pixelated block h-auto w-full"
                />
              </div>

              {/* Mobile / Touch directional controls */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => nudge(-0.12, 0)}
                    className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-ink hover:border-cyan"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(0, -0.15)}
                    className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-ink hover:border-cyan"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(0, 0.15)}
                    className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-ink hover:border-cyan"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(0.12, 0)}
                    className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-ink hover:border-cyan"
                  >
                    →
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {signalRunCheckpoints.map((cp) => {
                    const isDone = unlocked.includes(cp.id);
                    return (
                      <button
                        key={cp.id}
                        type="button"
                        onClick={() => {
                          playerRef.current.tx = cp.x;
                          playerRef.current.ty = cp.y;
                        }}
                        className={`rounded border px-2.5 py-1 font-mono text-[11px] uppercase ${
                          isDone
                            ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"
                            : "border-white/15 bg-white/5 text-muted hover:text-ink"
                        }`}
                      >
                        {isDone ? "✓ " : "○ "}
                        {cp.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Discovered Checkpoint Readout */}
              {activeNode ? (
                <div className="mt-4 rounded-xl border border-cyan/30 bg-[#0A1228]/90 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-yellow">
                      {activeNode.code} // {activeNode.title}
                    </span>
                    <Link
                      href={activeNode.route}
                      onClick={() => setOpen(false)}
                      className="font-mono text-xs uppercase tracking-[0.12em] text-cyan hover:underline"
                    >
                      Inspect System →
                    </Link>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-ink/90">
                    {activeNode.summary}
                  </p>
                </div>
              ) : null}

              {unlocked.length === signalRunCheckpoints.length ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-yellow/50 bg-yellow/10 px-4 py-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-yellow">
                    ALL 3 ENGINEERING CHECKPOINTS DISCOVERED!
                  </span>
                  <Link
                    href="/projects"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-yellow px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#05060B] hover:bg-cyan"
                  >
                    Explore My Projects →
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
