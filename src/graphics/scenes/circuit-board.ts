import { Grid, KEYS, palette, rng } from "@/graphics/engine/kit";
import type { SceneModule, SceneOptions } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#4169ff",
  "#65cfff",
  "#f9d77e",
  "#ffb35c",
  "#ff3b3b",
]);

export const meta = {
  slug: "circuit-board",
  name: "ESP32 & Sensor Bus Schematic",
  category: "expertise",
  cols: 96,
  rows: 30,
  fps: 12,
  palette: P,
};

export function create(options: SceneOptions = {}) {
  const g = new Grid(meta.cols, meta.rows);
  const r = rng(options.seed ?? 19);
  const sensors = [
    { name: "I2C_ENV", x: 6, y: 5 },
    { name: "ADC_PH", x: 6, y: 12 },
    { name: "PWM_FAN", x: 6, y: 19 },
    { name: "GPIO_RLY", x: 72, y: 6 },
    { name: "SPI_P10", x: 72, y: 13 },
    { name: "MQTT_TX", x: 72, y: 20 },
  ];
  void r;

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "PCB_SCHEMATIC // ESP32-WROOM-32D + PERIPHERAL BUS", KEYS[3]);

    g.box(34, 6, 28, 17, KEYS[2]);
    g.text(40, 8, "ESP32-WROOM-32", KEYS[4]);
    g.text(38, 11, "DUAL-CORE @ 240MHz", KEYS[3]);
    g.text(38, 14, "I2C | SPI | ADC | PWM", KEYS[1]);
    g.text(38, 17, "WIFI / MQTT STACK", KEYS[5]);
    g.set(58, 8, Math.sin(t * 5) > 0 ? "●" : "○", KEYS[6]);

    sensors.forEach((s, i) => {
      g.box(s.x, s.y, 16, 5, KEYS[2]);
      g.text(s.x + 2, s.y + 2, s.name, KEYS[4]);
      const left = s.x < 40;
      const x0 = left ? s.x + 16 : 62;
      const x1 = left ? 34 : s.x;
      const y = s.y + 2;
      g.hline(x0, x1, y, "─", KEYS[1]);
      const span = Math.abs(x1 - x0);
      const p = Math.floor((t * 10 + i * 3) % Math.max(1, span));
      g.set(Math.min(x0, x1) + p, y, "▪", KEYS[3]);
    });

    g.text(3, meta.rows - 2, "BUS STATUS: ACTIVE  |  LOGIC: 3.3V  |  WATCHDOG: ARMED", KEYS[3]);
    return g.frame();
  };
}

export const explain =
  "Renders a dual-core ESP32 central microcontroller block tied to six peripheral buses (I2C, ADC, PWM, GPIO, SPI, MQTT) with animated signal packets traversing each trace.";

export const source = `const sensors = [
  { name: "I2C_ENV", x: 6, y: 5 },
  { name: "ADC_PH", x: 6, y: 12 },
  { name: "PWM_FAN", x: 6, y: 19 },
  { name: "GPIO_RLY", x: 72, y: 6 },
  { name: "SPI_P10", x: 72, y: 13 },
  { name: "MQTT_TX", x: 72, y: 20 },
];

return (t) => {
  g.clear();
  g.box(34, 6, 28, 17, KEYS[2]);
  g.text(40, 8, "ESP32-WROOM-32", KEYS[4]);
  sensors.forEach((s, i) => {
    g.box(s.x, s.y, 16, 5, KEYS[2]);
    g.text(s.x + 2, s.y + 2, s.name, KEYS[4]);
    const x0 = s.x < 40 ? s.x + 16 : 62, x1 = s.x < 40 ? 34 : s.x;
    g.hline(x0, x1, s.y + 2, "─", KEYS[1]);
    g.set(Math.min(x0, x1) + Math.floor((t * 10 + i * 3) % Math.abs(x1 - x0)), s.y + 2, "▪", KEYS[3]);
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
