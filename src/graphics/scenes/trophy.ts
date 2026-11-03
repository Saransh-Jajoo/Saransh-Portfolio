import { Grid, KEYS, palette } from "@/graphics/engine/kit";
import type { SceneModule } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#f9d77e",
  "#ffb35c",
  "#65cfff",
  "#4169ff",
]);

export const meta = {
  slug: "trophy",
  name: "Recognition Monument",
  category: "achievements",
  cols: 96,
  rows: 30,
  fps: 10,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const items = [
    "2025  SAMSUNG SOLVE FOR TOMORROW — TOP 100",
    "2025  PUNEAGRI HACKATHON — FINALIST",
    "2025  SMART INDIA HACKATHON — GRAND FINALIST",
    "2026  ANVESHAN — NATIONAL FINALIST",
    "2025  ADCET HACKATHON — WINNER",
    "2025  IDEA 2.0 — TOP 100",
  ];

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "RECOGNITION // NATIONAL & INSTITUTIONAL ENGINEERING MILESTONES", KEYS[4]);

    const cup = [
      "    ████████████    ",
      "  ██░░░░░░░░░░░░██  ",
      " ██░░██████████░░██ ",
      "  ██░░░░░░░░░░░░██  ",
      "    ████████████    ",
      "       ██████       ",
      "        ████        ",
      "        ████        ",
      "     ██████████     ",
      "   ██████████████   ",
    ];
    cup.forEach((line, r) => {
      for (let i = 0; i < line.length; i++) {
        if (line[i] !== " ") {
          g.set(8 + i, 8 + r, line[i], KEYS[line[i] === "█" ? 2 : 3]);
        }
      }
    });

    items.forEach((line, i) => {
      const active = Math.floor(t * 1.5) % items.length === i;
      g.text(34, 6 + i * 3, active ? "►" : "·", KEYS[active ? 2 : 5]);
      g.text(36, 6 + i * 3, line, KEYS[active ? 2 : 4]);
    });

    return g.frame();
  };
}

export const explain =
  "ASCII trophy emblem paired with a cycling register of verified national and university hackathon recognitions.";

export const source = `const items = [
  "2025  SAMSUNG SOLVE FOR TOMORROW — TOP 100",
  "2025  PUNEAGRI HACKATHON — FINALIST",
  "2025  SMART INDIA HACKATHON — GRAND FINALIST",
  "2026  ANVESHAN — NATIONAL FINALIST",
  "2025  ADCET HACKATHON — WINNER",
  "2025  IDEA 2.0 — TOP 100",
];

return (t) => {
  g.clear();
  drawCup(g, 8, 8);
  items.forEach((line, i) => {
    const active = Math.floor(t * 1.5) % items.length === i;
    g.text(36, 6 + i * 3, line, KEYS[active ? 2 : 4]);
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
