"use client";

import { useEffect, useRef } from "react";
import {
  GlyphAtlas,
  cellAspect,
  paint,
} from "ascii-magic-art/runtime/canvas.js";
import { restyle } from "ascii-magic-art/runtime/glyphs.js";
import { CHAR_PRESETS, transformPalette } from "./Palette";
import type {
  AsciiFrame,
  CharPresetId,
  PaletteId,
  SceneModule,
} from "./types";

type Options = {
  playing: boolean;
  fps: number;
  seed: number;
  paletteId?: PaletteId;
  charPreset?: CharPresetId;
  density?: number;
  ink?: string;
  onFrame?: (frame: AsciiFrame, t: number) => void;
};

export function useAsciiPlayer(
  scene: SceneModule,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  wrapRef: React.RefObject<HTMLElement | null>,
  {
    playing,
    fps,
    seed,
    paletteId = "original",
    charPreset = "original",
    density = 1,
    ink = "#f1f2f5",
    onFrame,
  }: Options,
) {
  const atlasRef = useRef(new GlyphAtlas());
  const drawRef = useRef<((t: number) => AsciiFrame) | null>(null);

  useEffect(() => {
    drawRef.current = scene.default({ seed });
  }, [scene, seed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const draw = drawRef.current;
    if (!canvas || !wrap || !draw) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const meta = scene.meta;
    const aspect = cellAspect(meta as { cell?: string });
    const activePalette = transformPalette(meta.palette, paletteId);
    const presetChars = CHAR_PRESETS[charPreset]?.chars;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let visible = true;
    let raf = 0;
    let elapsed = 1.2;
    let prev = 0;
    const targetFps = Math.max(2, Math.min(30, fps));
    const step = 1000 / targetFps;
    let last = performance.now() - Math.random() * step;
    let stopped = false;

    const render = (t: number) => {
      const w = wrap.clientWidth || meta.cols * 7;
      const isMobile = typeof window !== "undefined" && window.innerWidth < 520;
      const merge = density < 0.75 ? 2 : isMobile && meta.cols > 90 && density <= 1 ? 1 : 1;
      const effectiveCols = Math.ceil(meta.cols / merge);
      const effectiveRows = Math.ceil(meta.rows / merge);

      const cw = w / effectiveCols;
      const ch = cw * aspect;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = Math.ceil(effectiveCols * cw);
      const H = Math.ceil(effectiveRows * ch);

      if (
        canvas.width !== Math.round(W * dpr) ||
        canvas.height !== Math.round(H * dpr)
      ) {
        canvas.width = Math.round(W * dpr);
        canvas.height = Math.round(H * dpr);
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
      }

      const rawFrame = draw(t);
      const finalFrame =
        presetChars || merge > 1 || paletteId === "mono"
          ? (restyle(rawFrame, activePalette, {
              chars: presetChars || " ░▒▓█",
              all: Boolean(presetChars),
              mono: paletteId === "mono",
              lift: false,
              merge,
            }) as AsciiFrame)
          : rawFrame;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      paint(ctx, finalFrame, activePalette, {
        cw,
        ch,
        mode: "text",
        ink,
        atlas: atlasRef.current,
        dpr,
      });
      onFrame?.(finalFrame, t);
    };

    render(1.2);

    const loop = (now: number) => {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      if (!visible || !playing || document.hidden) {
        prev = now;
        return;
      }
      if (prev) elapsed += (now - prev) / 1000;
      prev = now;
      if (now - last < step) return;
      last = now - ((now - last) % step);
      render(elapsed);
    };

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "100px" },
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => render(elapsed));
    ro.observe(wrap);

    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [
    canvasRef,
    wrapRef,
    scene,
    playing,
    fps,
    seed,
    paletteId,
    charPreset,
    density,
    ink,
    onFrame,
  ]);
}
