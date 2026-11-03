import { Grid, KEYS, fbm, palette, rng } from "@/graphics/engine/kit";
import type { SceneModule, SceneOptions } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#4169ff",
  "#65cfff",
  "#f9d77e",
  "#8a79d8",
]);

export const meta = {
  slug: "profile-art",
  name: "Systems Topology Field",
  category: "about",
  cols: 72,
  rows: 28,
  fps: 12,
  palette: P,
};

export function create(options: SceneOptions = {}) {
  const g = new Grid(meta.cols, meta.rows);
  const r = rng(options.seed ?? 42);
  void r;

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "IDENTITY_FIELD // HARDWARE <-> AI <-> SOFTWARE", KEYS[3]);

    for (let y = 3; y < meta.rows - 3; y++) {
      for (let x = 2; x < meta.cols - 2; x++) {
        const nx = (x - meta.cols / 2) / 22;
        const ny = (y - meta.rows / 2) / 10;
        const d = Math.hypot(nx, ny);
        const n = fbm(nx * 2.2 + t * 0.15, ny * 2.2 - t * 0.1, 3, 7);
        const ring = Math.sin(d * 8 - t * 2 + n * 3);
        if (d < 1.15 && ring > 0.25) {
          g.set(
            x,
            y,
            ring > 0.75 ? "█" : ring > 0.5 ? "▒" : "·",
            KEYS[ring > 0.75 ? 4 : ring > 0.5 ? 3 : 2],
          );
        }
      }
    }

    g.text(3, meta.rows - 2, "ADCET B.TECH CSE  |  CGPA 8.35/10  |  INDIA", KEYS[4]);
    return g.frame();
  };
}

export const explain =
  "Concentric FBM wave-interference field representing the coupling between physical sensors, machine learning inference, and software infrastructure.";

export const source = `for (let y = 3; y < rows - 3; y++)
  for (let x = 2; x < cols - 2; x++) {
    const nx = (x - cols / 2) / 22, ny = (y - rows / 2) / 10;
    const d = Math.hypot(nx, ny);
    const n = fbm(nx * 2.2 + t * 0.15, ny * 2.2 - t * 0.1, 3, 7);
    const ring = Math.sin(d * 8 - t * 2 + n * 3);
    if (d < 1.15 && ring > 0.25)
      g.set(x, y, ring > 0.75 ? "█" : "▒", KEYS[ring > 0.75 ? 4 : 3]);
  }`;

const module: SceneModule = {
  meta,
  default: create,
  explain,
  source,
};

export default module;
