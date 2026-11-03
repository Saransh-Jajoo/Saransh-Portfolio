import { Grid, KEYS, palette } from "@/graphics/engine/kit";
import type { SceneModule } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#261014",
  "#ff3b3b",
  "#f9d77e",
  "#65cfff",
  "#9299a9",
]);

export const meta = {
  slug: "p10-display",
  name: "P10 RGB LED Matrix Driver",
  category: "projects",
  cols: 96,
  rows: 30,
  fps: 14,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const banner = "   ITHINK LABS // P10 RGB MATRIX // SUB-200MS FEED   ";

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[5]);
    g.text(3, 1, "P10_RGB_PANEL // ESP8266 & ESP32 PIXEL BUFFER OPTIMIZATION", KEYS[4]);

    g.box(6, 5, 84, 14, KEYS[1]);
    const shift = Math.floor(t * 6);
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 80; c++) {
        const ch = banner[(c + shift) % banner.length];
        const active = r >= 3 && r <= 6 && ch !== " ";
        g.set(
          8 + c,
          7 + r,
          active ? "█" : "·",
          KEYS[active ? (c % 12 < 6 ? 2 : 3) : 1],
        );
      }
    }

    g.text(
      6,
      22,
      "CONTROLLER: ESP8266 / ESP32   |   READABILITY GAIN: +30-40% (MEASURED)",
      KEYS[3],
    );
    g.text(
      6,
      25,
      "REFRESH LATENCY: < 200 MS     |   SCAN MODE: 1/4 MULTIPLEXED HUB75",
      KEYS[4],
    );
    return g.frame();
  };
}

export const explain =
  "Simulates an industrial P10 RGB LED matrix panel driven over HUB75 by an ESP8266/ESP32 pixel buffer with sub-200 ms web data feed updates.";

export const source = `const banner = "   ITHINK LABS // P10 RGB MATRIX // SUB-200MS FEED   ";

return (t) => {
  g.clear();
  g.box(6, 5, 84, 14, KEYS[1]);
  const shift = Math.floor(t * 6);
  for (let r = 0; r < 10; r++)
    for (let c = 0; c < 80; c++) {
      const ch = banner[(c + shift) % banner.length];
      const active = r >= 3 && r <= 6 && ch !== " ";
      g.set(8 + c, 7 + r, active ? "█" : "·", KEYS[active ? 2 : 1]);
    }
  return g.frame();
};`;

const module: SceneModule = {
  meta,
  default: create,
  explain,
  source,
};

export default module;
