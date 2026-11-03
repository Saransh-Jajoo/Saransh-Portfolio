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
  slug: "water-treatment",
  name: "PunarJAL Greywater Plant",
  category: "projects",
  cols: 96,
  rows: 30,
  fps: 12,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const stages = [
    { id: "01", name: "INLET", x: 4 },
    { id: "02", name: "SCREEN", x: 19 },
    { id: "03", name: "BIO-FLT", x: 34 },
    { id: "04", name: "CARBON", x: 49 },
    { id: "05", name: "SENSOR", x: 64 },
    { id: "06", name: "REUSE", x: 79 },
  ];

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "PUNARJAL // IOT GREYWATER TREATMENT & 24x7 QUALITY TELEMETRY", KEYS[3]);

    stages.forEach((s, i) => {
      g.box(s.x, 9, 13, 11, KEYS[2]);
      g.text(s.x + 2, 11, s.id, KEYS[4]);
      g.text(s.x + 2, 13, s.name, KEYS[3]);

      const level = 16 + ((i + Math.floor(t * 2)) % 3);
      for (let y = level; y < 19; y++) {
        for (let x = s.x + 1; x < s.x + 12; x++) {
          g.set(x, y, (x + y + Math.floor(t * 4)) % 2 === 0 ? "≈" : "~", KEYS[3]);
        }
      }

      if (i < stages.length - 1) {
        g.hline(s.x + 13, stages[i + 1].x - 1, 14, "═", KEYS[2]);
        const flowX = s.x + 13 + (Math.floor(t * 6 + i) % 2);
        g.set(flowX, 14, "►", KEYS[4]);
      }
    });

    g.box(4, 22, 88, 5, KEYS[1]);
    g.text(
      6,
      24,
      "TELEMETRY BUS: pH | TDS | TURBIDITY | FLOW_RATE -> ESP32 -> MQTT (ILLUSTRATIVE)",
      KEYS[5],
    );
    return g.frame();
  };
}

export const explain =
  "Six-stage greywater treatment train (Inlet, Screening, Bio-Filtration, Carbon Polish, Sensor Array, Reuse Tank) with animated water levels ('≈'/'~') and directional pipe valves.";

export const source = `const stages = [
  { id: "01", name: "INLET", x: 4 },
  { id: "02", name: "SCREEN", x: 19 },
  { id: "03", name: "BIO-FLT", x: 34 },
  { id: "04", name: "CARBON", x: 49 },
  { id: "05", name: "SENSOR", x: 64 },
  { id: "06", name: "REUSE", x: 79 },
];

return (t) => {
  g.clear();
  stages.forEach((s, i) => {
    g.box(s.x, 9, 13, 11, KEYS[2]);
    g.text(s.x + 2, 13, s.name, KEYS[3]);
    for (let y = 16; y < 19; y++)
      for (let x = s.x + 1; x < s.x + 12; x++)
        g.set(x, y, (x + y + Math.floor(t * 4)) % 2 ? "≈" : "~", KEYS[3]);
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
