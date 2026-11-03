import { Grid, KEYS, palette } from "@/graphics/engine/kit";
import type { SceneModule } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#4169ff",
  "#65cfff",
  "#f9d77e",
  "#8a79d8",
]);

export const meta = {
  slug: "cold-storage",
  name: "SensiCold Modular Unit",
  category: "projects",
  cols: 96,
  rows: 30,
  fps: 10,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const layers = [
    { name: "INSULATED ENCLOSURE SHELL", y: 4 },
    { name: "PELTIER / COOLING ACTUATORS", y: 9 },
    { name: "4+ ENV SENSORS (TEMP/HUM/GAS)", y: 14 },
    { name: "ESP32 CONTROLLER + PWM LOOP", y: 19 },
    { name: "MULTI-UNIT SUPERVISION UI", y: 24 },
  ];

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "SENSICOLD // ONE-UNIT-PER-CROP PORTABLE COLD STORAGE", KEYS[3]);

    layers.forEach((l, i) => {
      const pulse = Math.floor(t * 2) % layers.length === i;
      g.box(8, l.y, 52, 4, KEYS[pulse ? 3 : 2]);
      g.text(11, l.y + 1, `0${i + 1}  ${l.name}`, KEYS[pulse ? 4 : 3]);
      if (i < layers.length - 1) {
        g.set(34, l.y + 4, "│", KEYS[2]);
      }
    });

    g.box(64, 4, 28, 24, KEYS[2]);
    g.text(67, 6, "CHAMBER TELEMETRY", KEYS[4]);
    g.text(67, 9, "PROFILE : CROP_A", KEYS[3]);
    g.text(67, 12, "SENSORS : 04 ONLINE", KEYS[3]);
    g.text(67, 15, "COOLING : ADAPTIVE", KEYS[5]);
    g.text(67, 18, "CONTROL : ESP32", KEYS[4]);

    for (let x = 67; x < 89; x++) {
      const wave = Math.sin(t * 2 + x * 0.3) > 0 ? "▀" : "▄";
      g.set(x, 22, wave, KEYS[3]);
    }
    g.text(67, 25, "SIMULATED ENVELOPE", KEYS[1]);

    return g.frame();
  };
}

export const explain =
  "Exploded architectural stack of the SensiCold portable cold-storage chamber paired with an ESP32 adaptive control loop and crop-profile supervision panel.";

export const source = `const layers = [
  { name: "INSULATED ENCLOSURE SHELL", y: 4 },
  { name: "PELTIER / COOLING ACTUATORS", y: 9 },
  { name: "4+ ENV SENSORS (TEMP/HUM/GAS)", y: 14 },
  { name: "ESP32 CONTROLLER + PWM LOOP", y: 19 },
  { name: "MULTI-UNIT SUPERVISION UI", y: 24 },
];

return (t) => {
  g.clear();
  layers.forEach((l, i) => {
    const pulse = Math.floor(t * 2) % layers.length === i;
    g.box(8, l.y, 52, 4, KEYS[pulse ? 3 : 2]);
    g.text(11, l.y + 1, \`0\${i + 1}  \${l.name}\`, KEYS[pulse ? 4 : 3]);
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
