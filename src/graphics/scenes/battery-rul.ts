import { Grid, KEYS, palette } from "@/graphics/engine/kit";
import type { SceneModule } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#4169ff",
  "#65cfff",
  "#f9d77e",
  "#ffb35c",
]);

export const meta = {
  slug: "battery-rul",
  name: "Battery RUL Degradation Curve",
  category: "projects",
  cols: 96,
  rows: 30,
  fps: 10,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const curve = [6, 6, 7, 8, 9, 10, 12, 14, 16, 19, 22, 24];

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "BATTERY_RUL // CHARGE-DISCHARGE DEGRADATION TRAJECTORY (SCHEMATIC)", KEYS[3]);

    g.vline(10, 4, 25, "│", KEYS[2]);
    g.hline(10, 88, 25, "─", KEYS[2]);
    g.text(3, 5, "SOH", KEYS[4]);
    g.text(78, 27, "CYCLES ->", KEYS[4]);

    curve.forEach((y, i) => {
      const x = 14 + i * 6;
      if (i > 0) {
        g.line(14 + (i - 1) * 6, curve[i - 1], x, y, "─", KEYS[3]);
      }
      g.set(x, y, "●", KEYS[4]);
    });

    const cursor = Math.floor(t * 2) % curve.length;
    const cx = 14 + cursor * 6;
    const cy = curve[cursor];
    g.vline(cx, cy + 1, 24, "┊", KEYS[5]);
    g.set(cx, cy, "◆", KEYS[5]);

    g.hline(11, 87, 21, "·", KEYS[5]);
    g.text(72, 20, "EOL THRESHOLD", KEYS[5]);
    return g.frame();
  };
}

export const explain =
  "Plots a schematic lithium-ion state-of-health (SOH) degradation trajectory across charge/discharge cycles with an animated inspection cursor and end-of-life threshold.";

export const source = `const curve = [6, 6, 7, 8, 9, 10, 12, 14, 16, 19, 22, 24];

return (t) => {
  g.clear();
  g.vline(10, 4, 25, "│", KEYS[2]);
  g.hline(10, 88, 25, "─", KEYS[2]);
  curve.forEach((y, i) => {
    const x = 14 + i * 6;
    if (i > 0) g.line(14 + (i - 1) * 6, curve[i - 1], x, y, "─", KEYS[3]);
    g.set(x, y, "●", KEYS[4]);
  });
  return g.frame();
};`;

const module: SceneModule = {
  meta,
  default: create,
  explain,
  source,
};

export default module;
