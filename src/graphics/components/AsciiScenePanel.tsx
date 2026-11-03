"use client";

import { useRef, useState } from "react";
import type { SceneId } from "@/graphics/engine/sceneRegistry";
import { scenes } from "@/graphics/engine/sceneRegistry";
import { useAsciiPlayer } from "@/graphics/engine/useAsciiPlayer";
import type { PaletteId } from "@/graphics/engine/types";
import { SourceViewer } from "./SourceViewer";

type Props = {
  sceneId: SceneId;
  seed?: number;
  paletteId?: PaletteId;
  showSourceToggle?: boolean;
  subtitle?: string;
  className?: string;
};

const AUTO_SCENE_PRESETS: Record<
  SceneId,
  { seed: number; paletteId: PaletteId; badge: string }
> = {
  "nyc-skyline-night": {
    seed: 77,
    paletteId: "original",
    badge: "PROCEDURAL SKYLINE ENGINE",
  },
  omnichannel: {
    seed: 104,
    paletteId: "original",
    badge: "OMNICHANNEL AI ORCHESTRATOR",
  },
  "computer-vision": {
    seed: 31,
    paletteId: "original",
    badge: "YOLO + NORFAIR TRACKING STREAM",
  },
  "water-treatment": {
    seed: 58,
    paletteId: "cyan",
    badge: "24×7 IOT GREYWATER PLANT",
  },
  "cold-storage": {
    seed: 91,
    paletteId: "original",
    badge: "MODULAR COLD-STORAGE CHAMBER",
  },
  "p10-display": {
    seed: 44,
    paletteId: "original",
    badge: "P10 RGB LED PIXEL BUFFER",
  },
  "neural-network": {
    seed: 12,
    paletteId: "original",
    badge: "DEEP LEARNING TENSOR GRAPH",
  },
  "circuit-board": {
    seed: 19,
    paletteId: "original",
    badge: "ESP32 & SENSOR BUS TOPOLOGY",
  },
  "software-arch": {
    seed: 63,
    paletteId: "violet",
    badge: "DISTRIBUTED BACKEND PIPELINE",
  },
  "battery-rul": {
    seed: 29,
    paletteId: "amber",
    badge: "CYCLE DEGRADATION CURVE",
  },
  trophy: {
    seed: 88,
    paletteId: "amber",
    badge: "RECOGNITION MONUMENT",
  },
  "profile-art": {
    seed: 42,
    paletteId: "cyan",
    badge: "SYSTEMS IDENTITY FIELD",
  },
};

export function AsciiScenePanel({
  sceneId,
  seed,
  paletteId,
  showSourceToggle = false,
  subtitle,
  className = "",
}: Props) {
  const scene = scenes[sceneId];
  const preset = AUTO_SCENE_PRESETS[sceneId];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"artwork" | "source">("artwork");

  useAsciiPlayer(scene, canvasRef, wrapRef, {
    playing: true,
    fps: scene.meta.fps,
    seed: seed ?? preset.seed,
    paletteId: paletteId ?? preset.paletteId,
    charPreset: "original",
    density: 1,
  });

  return (
    <div
      className={`glass-panel overflow-hidden rounded-xl border border-white/12 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#070B18]/75 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_#56d8ff]" />
          <span className="text-ink">{scene.meta.name}</span>
          <span className="hidden text-muted/70 sm:inline">
            // {subtitle ?? preset.badge}
          </span>
        </div>

        {showSourceToggle ? (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setView("artwork")}
              className={`rounded px-2.5 py-0.5 transition-colors ${
                view === "artwork"
                  ? "border border-cyan/60 bg-cyan/15 text-cyan"
                  : "border border-white/10 text-muted hover:text-ink"
              }`}
            >
              Artwork
            </button>
            <button
              type="button"
              onClick={() => setView("source")}
              className={`rounded px-2.5 py-0.5 transition-colors ${
                view === "source"
                  ? "border border-cyan/60 bg-cyan/15 text-cyan"
                  : "border border-white/10 text-muted hover:text-ink"
              }`}
            >
              Algorithm
            </button>
          </div>
        ) : (
          <span className="font-mono text-[10px] text-cyan/80">
            LIVE PROCEDURAL RENDER
          </span>
        )}
      </div>

      {view === "artwork" ? (
        <div
          ref={wrapRef}
          className="relative overflow-hidden bg-[#060914]/90 p-2.5 sm:p-4"
        >
          <canvas
            ref={canvasRef}
            aria-label={`${scene.meta.name} procedural artwork`}
            role="img"
            className="mx-auto block max-w-full"
          />
        </div>
      ) : (
        <SourceViewer
          title={`${scene.meta.slug}.js`}
          code={scene.source}
          explain={scene.explain}
        />
      )}
    </div>
  );
}
