import type { CharPresetId, PaletteId } from "./types";

export const CHAR_PRESETS: Record<
  CharPresetId,
  { id: CharPresetId; label: string; sample: string; chars?: string }
> = {
  original: { id: "original", label: "Original", sample: "█▓▒░·•" },
  classic: { id: "classic", label: "Classic", sample: "@#%*+=-:.", chars: " .:-=+*%#@" },
  blocks: { id: "blocks", label: "Blocks", sample: "█▓▒░", chars: " ░▒▓█" },
  binary: { id: "binary", label: "Binary", sample: "01", chars: " 01" },
  brackets: {
    id: "brackets",
    label: "Brackets",
    sample: "<>/\\|{}[]",
    chars: " |/\\<>[]{}"
  },
};

export const PALETTE_PRESETS: Record<
  PaletteId,
  { id: PaletteId; label: string; accent: string }
> = {
  original: { id: "original", label: "NYC Night", accent: "#f9d77e" },
  cyan: { id: "cyan", label: "Electric Cyan", accent: "#65cfff" },
  amber: { id: "amber", label: "Warm Amber", accent: "#ffb35c" },
  violet: { id: "violet", label: "Deep Violet", accent: "#8a79d8" },
  phosphor: { id: "phosphor", label: "Phosphor", accent: "#4169ff" },
  mono: { id: "mono", label: "Monochrome", accent: "#f1f2f5" },
};

function hexToLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return 0.5;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function mixHex(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return (
    "#" +
    pa
      .map((v, i) =>
        Math.max(0, Math.min(255, Math.round(v + (pb[i] - v) * t)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

export function transformPalette(
  base: Record<string, string>,
  preset: PaletteId,
): Record<string, string> {
  if (preset === "original") return base;

  const stops: Record<Exclude<PaletteId, "original">, [string, string, string]> = {
    cyan: ["#060c18", "#4169ff", "#65cfff"],
    amber: ["#0d0906", "#8a4e2a", "#f9d77e"],
    violet: ["#090714", "#4169ff", "#8a79d8"],
    phosphor: ["#050914", "#2447b8", "#92b4ff"],
    mono: ["#0b0d13", "#646d82", "#f1f2f5"],
  };

  const [low, mid, high] = stops[preset];
  const out: Record<string, string> = {};
  for (const [k, hex] of Object.entries(base)) {
    const l = Math.min(1, Math.max(0, hexToLuminance(hex)));
    out[k] = l < 0.45 ? mixHex(low, mid, l / 0.45) : mixHex(mid, high, (l - 0.45) / 0.55);
  }
  return out;
}
