import { Grid, KEYS, palette, rng } from "@/graphics/engine/kit";
import type { SceneModule, SceneOptions } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#65cfff",
  "#4169ff",
  "#f9d77e",
  "#ffb35c",
  "#ff3b3b",
]);

export const meta = {
  slug: "computer-vision",
  name: "CCTV Multi-Object Tracking",
  category: "projects",
  cols: 96,
  rows: 30,
  fps: 15,
  palette: P,
};

export function create(options: SceneOptions = {}) {
  const g = new Grid(meta.cols, meta.rows);
  const r = rng(options.seed ?? 31);
  const tracks = [
    { id: "ID:04", cls: "PERSON", x: 14, y: 11, w: 12, h: 10, vx: 0.9, vy: 0.15, co: 2 },
    { id: "ID:11", cls: "VEHICLE", x: 52, y: 14, w: 20, h: 8, vx: -1.1, vy: 0.05, co: 4 },
    { id: "ID:19", cls: "PERSON", x: 36, y: 8, w: 10, h: 9, vx: 0.55, vy: -0.12, co: 5 },
  ];
  void r;

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "CAM_04 // YOLO + NORFAIR PIPELINE [SIMULATED VIEWPORT]", KEYS[2]);
    g.text(meta.cols - 22, 1, `FRAME ${String(Math.floor(t * 15)).padStart(5, "0")}`, KEYS[4]);

    for (let y = 4; y < meta.rows - 3; y += 4) {
      g.hline(2, meta.cols - 3, y, "·", KEYS[1]);
    }

    for (const tr of tracks) {
      const bx = Math.round(
        10 + ((tr.x + t * tr.vx * 4 + 200) % (meta.cols - tr.w - 16)),
      );
      const by = Math.round(6 + ((tr.y + Math.sin(t + tr.x) * 2) % 10));

      g.box(bx, by, tr.w, tr.h, KEYS[tr.co]);
      g.text(bx + 1, by - 1, `${tr.id} ${tr.cls}`, KEYS[tr.co]);

      const cx = bx + Math.floor(tr.w / 2);
      const cy = by + Math.floor(tr.h / 2);
      g.set(cx, cy, "+", KEYS[6]);

      for (let k = 1; k <= 6; k++) {
        const tx = bx - Math.round(k * Math.sign(tr.vx) * 2);
        const ty = cy + Math.round(Math.sin(t - k * 0.4) * 1);
        g.set(tx, ty, "•", KEYS[3]);
      }
    }

    g.hline(1, meta.cols - 2, meta.rows - 3, "─", KEYS[1]);
    g.text(
      3,
      meta.rows - 2,
      "STREAM: RTSP -> MEDIAMTX -> WEBRTC  |  TRACKS: 03 ACTIVE  |  DEMO ONLY",
      KEYS[2],
    );
    return g.frame();
  };
}

export const explain =
  "Simulates a multi-object tracking viewport with YOLO bounding boxes, Norfair track identifiers, centroid crosshairs, and historical trajectory breadcrumbs across a perspective grid.";

export const source = `const tracks = [
  { id: "ID:04", cls: "PERSON", x: 14, y: 11, w: 12, h: 10, vx: 0.9, co: 2 },
  { id: "ID:11", cls: "VEHICLE", x: 52, y: 14, w: 20, h: 8, vx: -1.1, co: 4 },
  { id: "ID:19", cls: "PERSON", x: 36, y: 8, w: 10, h: 9, vx: 0.55, co: 5 },
];

return (t) => {
  g.clear();
  g.box(0, 0, cols, rows, KEYS[1]);
  for (const tr of tracks) {
    const bx = Math.round(10 + ((tr.x + t * tr.vx * 4 + 200) % (cols - tr.w - 16)));
    const by = Math.round(6 + ((tr.y + Math.sin(t + tr.x) * 2) % 10));
    g.box(bx, by, tr.w, tr.h, KEYS[tr.co]);
    g.text(bx + 1, by - 1, \`\${tr.id} \${tr.cls}\`, KEYS[tr.co]);
    for (let k = 1; k <= 6; k++)
      g.set(bx - k * Math.sign(tr.vx) * 2, by + (tr.h >> 1), "•", KEYS[3]);
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
