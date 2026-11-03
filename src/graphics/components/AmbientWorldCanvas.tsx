"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { fbm, rng } from "@/graphics/engine/kit";

type RouteTheme = {
  topBg: string;
  midBg: string;
  bottomBg: string;
  primary: string;
  secondary: string;
  accent: string;
  mode:
    | "workspace-city"
    | "identity-matrix"
    | "workshop-grid"
    | "neural-constellation"
    | "timeline-bus"
    | "monument-beacons"
    | "signal-network";
};

function getThemeForPath(pathname: string): RouteTheme {
  if (pathname.startsWith("/about")) {
    return {
      topBg: "#050712",
      midBg: "#0c142c",
      bottomBg: "#070a14",
      primary: "#56D8FF",
      secondary: "#9B7CFF",
      accent: "#FFD477",
      mode: "identity-matrix",
    };
  }
  if (pathname.startsWith("/projects")) {
    return {
      topBg: "#05060f",
      midBg: "#0d1328",
      bottomBg: "#060811",
      primary: "#9B7CFF",
      secondary: "#56D8FF",
      accent: "#FECC1B",
      mode: "workshop-grid",
    };
  }
  if (pathname.startsWith("/skills")) {
    return {
      topBg: "#040814",
      midBg: "#0a1730",
      bottomBg: "#050912",
      primary: "#56D8FF",
      secondary: "#4285FF",
      accent: "#FECC1B",
      mode: "neural-constellation",
    };
  }
  if (pathname.startsWith("/experience")) {
    return {
      topBg: "#060812",
      midBg: "#11182e",
      bottomBg: "#070911",
      primary: "#FECC1B",
      secondary: "#56D8FF",
      accent: "#FF5E5E",
      mode: "timeline-bus",
    };
  }
  if (pathname.startsWith("/achievements")) {
    return {
      topBg: "#080710",
      midBg: "#17142b",
      bottomBg: "#07060d",
      primary: "#FECC1B",
      secondary: "#9B7CFF",
      accent: "#56D8FF",
      mode: "monument-beacons",
    };
  }
  if (pathname.startsWith("/contact")) {
    return {
      topBg: "#040912",
      midBg: "#0b192e",
      bottomBg: "#050811",
      primary: "#56D8FF",
      secondary: "#34D399",
      accent: "#FECC1B",
      mode: "signal-network",
    };
  }
  return {
    topBg: "#05060B",
    midBg: "#0A1022",
    bottomBg: "#070B16",
    primary: "#56D8FF",
    secondary: "#4285FF",
    accent: "#FECC1B",
    mode: "workspace-city",
  };
}

export function AmbientWorldCanvas() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const theme = getThemeForPath(pathname);
    const rand = rng(pathname.split("").reduce((a, c) => a + c.charCodeAt(0), 77));
    const glyphs = ["0", "1", "+", "·", "•", "░", "▒", ":", ";", "*", "▪"];

    const stars = Array.from({ length: 85 }, () => ({
      x: rand(),
      y: rand() * 0.65,
      size: rand() < 0.7 ? 2 : 3,
      phase: rand() * Math.PI * 2,
      glyph: glyphs[Math.floor(rand() * glyphs.length)],
      isGlyph: rand() < 0.32,
    }));

    const towers = Array.from({ length: 34 }, (_, i) => ({
      x: i / 34,
      w: 0.022 + rand() * 0.025,
      h: 0.14 + rand() * 0.28,
      layer: i % 3,
      seed: Math.floor(rand() * 1000),
    }));

    const nodes = Array.from({ length: 22 }, () => ({
      x: 0.08 + rand() * 0.84,
      y: 0.14 + rand() * 0.72,
      vx: (rand() - 0.5) * 0.012,
      vy: (rand() - 0.5) * 0.012,
      glyph: glyphs[Math.floor(rand() * glyphs.length)],
    }));

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();

    const onMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX / Math.max(1, width);
      pointerRef.current.y = e.clientY / Math.max(1, height);
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    let last = -1000;
    let paintedOnce = false;
    const fpsInterval = 1000 / 16;

    const drawFrame = (now: number) => {
      raf = requestAnimationFrame(drawFrame);
      if (paintedOnce && document.hidden) return;
      if (paintedOnce && now - last < fpsInterval) return;
      last = now;
      paintedOnce = true;

      const t = now * 0.001;
      const px = (pointerRef.current.x - 0.5) * 24;
      const py = (pointerRef.current.y - 0.5) * 16;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Deep atmospheric sky gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, theme.topBg);
      grad.addColorStop(0.58, theme.midBg);
      grad.addColorStop(1, theme.bottomBg);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle pixel/ASCII grid matrix
      ctx.strokeStyle = "rgba(86, 216, 255, 0.035)";
      ctx.lineWidth = 1;
      const gridStep = width < 640 ? 48 : 64;
      for (let x = ((px * 0.3) % gridStep); x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = ((py * 0.3) % gridStep); y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Stars & floating ASCII glyphs
      ctx.font = "11px monospace";
      for (const s of stars) {
        const sx = (s.x * width + px * 0.4 + width) % width;
        const sy = (s.y * height + py * 0.3 + height) % height;
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.6 + s.phase));
        if (s.isGlyph) {
          ctx.fillStyle = `rgba(86, 216, 255, ${alpha * 0.55})`;
          ctx.fillText(s.glyph, sx, sy);
        } else {
          ctx.fillStyle = `rgba(244, 245, 250, ${alpha})`;
          ctx.fillRect(Math.round(sx), Math.round(sy), s.size, s.size);
        }
      }

      // 4. Route-specific procedural background layer
      if (theme.mode === "workspace-city" || theme.mode === "workshop-grid") {
        const horizonY = Math.round(height * 0.78);
        for (const b of towers) {
          const par = (b.layer + 1) * 0.35;
          const bx = Math.round(((b.x * width - px * par) + width) % width);
          const bw = Math.max(18, Math.round(b.w * width));
          const bh = Math.round(b.h * height);
          const by = horizonY - bh;

          ctx.fillStyle =
            b.layer === 0
              ? "rgba(12, 18, 38, 0.72)"
              : b.layer === 1
                ? "rgba(17, 25, 52, 0.82)"
                : "rgba(22, 32, 66, 0.9)";
          ctx.fillRect(bx, by, bw, bh);

          // Red aviation beacon on tall towers
          if (b.h > 0.32 && Math.sin(t * 3 + b.seed) > 0) {
            ctx.fillStyle = "#FF3B3B";
            ctx.fillRect(bx + Math.floor(bw / 2) - 1, by - 4, 3, 3);
          }

          // Pixel windows
          const stepX = 6;
          const stepY = 8;
          for (let wy = by + 6; wy < horizonY - 6; wy += stepY) {
            for (let wx = bx + 4; wx < bx + bw - 5; wx += stepX) {
              const n = fbm(wx * 0.08, wy * 0.08 + Math.floor(t * 0.8), 2, b.seed);
              if (n > 0.56) {
                ctx.fillStyle =
                  n > 0.72
                    ? "rgba(254, 204, 27, 0.42)"
                    : "rgba(86, 216, 255, 0.32)";
                ctx.fillRect(wx, wy, 3, 4);
              }
            }
          }
        }

        // River reflection scanlines beneath horizon
        for (let y = horizonY; y < height; y += 4) {
          const d = (y - horizonY) / Math.max(1, height - horizonY);
          const wave = Math.sin(y * 0.15 + t * 2.2) * 14;
          ctx.fillStyle = `rgba(66, 133, 255, ${0.08 * (1 - d)})`;
          ctx.fillRect(0, y, width, 2);
          ctx.fillStyle = `rgba(254, 204, 27, ${0.06 * (1 - d)})`;
          ctx.fillRect((width * 0.35 + wave) % width, y, 42, 2);
        }
      } else {
        // Connected circuit / constellation / signal nodes for other routes
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          const ax = ((a.x + t * a.vx + 10) % 1) * width + px * 0.5;
          const ay = ((a.y + t * a.vy + 10) % 1) * height + py * 0.5;

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const bx = ((b.x + t * b.vx + 10) % 1) * width + px * 0.5;
            const by = ((b.y + t * b.vy + 10) % 1) * height + py * 0.5;
            const dist = Math.hypot(ax - bx, ay - by);
            if (dist < 220) {
              const alpha = (1 - dist / 220) * 0.16;
              ctx.strokeStyle =
                 (i + j) % 2 === 0
                  ? `rgba(86, 216, 255, ${alpha})`
                  : `rgba(155, 124, 255, ${alpha})`;
              ctx.beginPath();
              // Manhattan circuit routing for timeline/identity modes
              if (theme.mode === "timeline-bus" || theme.mode === "identity-matrix") {
                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, ay);
                ctx.lineTo(bx, by);
              } else {
                ctx.moveTo(ax, ay);
                ctx.lineTo(bx, by);
              }
              ctx.stroke();
            }
          }

          ctx.fillStyle = i % 3 === 0 ? theme.accent : theme.primary;
          ctx.fillRect(Math.round(ax) - 2, Math.round(ay) - 2, 4, 4);
          ctx.fillStyle = "rgba(244, 245, 250, 0.35)";
          ctx.fillText(a.glyph, Math.round(ax) + 6, Math.round(ay) + 4);
        }
      }

      // 5. Soft radial atmospheric vignette
      const vig = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        width * 0.15,
        width * 0.5,
        height * 0.5,
        width * 0.85,
      );
      vig.addColorStop(0, "rgba(5, 6, 11, 0.12)");
      vig.addColorStop(1, "rgba(5, 6, 11, 0.68)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);
    };

    drawFrame(performance.now());
    raf = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="crt-scanlines absolute inset-0" />
    </div>
  );
}
