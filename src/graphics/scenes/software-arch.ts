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
  slug: "software-arch",
  name: "Distributed Backend & AI Pipeline",
  category: "expertise",
  cols: 96,
  rows: 30,
  fps: 12,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const nodes = [
    { label: "CLIENT / REACT", x: 6, y: 6 },
    { label: "FASTAPI GATEWAY", x: 36, y: 6 },
    { label: "REDIS STREAM", x: 68, y: 6 },
    { label: "POSTGRESQL", x: 6, y: 18 },
    { label: "PINECONE VEC", x: 36, y: 18 },
    { label: "SAGEMAKER / GPU", x: 68, y: 18 },
  ];

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "BACKEND_TOPOLOGY // FASTAPI + VECTOR DB + ASYNC WORKERS", KEYS[3]);

    nodes.forEach((n, i) => {
      const active = Math.floor(t * 2) % nodes.length === i;
      g.box(n.x, n.y, 22, 6, KEYS[active ? 3 : 2]);
      g.text(n.x + 2, n.y + 2, n.label, KEYS[active ? 4 : 3]);
    });

    g.hline(28, 36, 9, "═", KEYS[3]);
    g.hline(58, 68, 9, "═", KEYS[3]);
    g.vline(47, 12, 18, "│", KEYS[5]);
    g.hline(28, 36, 21, "─", KEYS[2]);
    g.hline(58, 68, 21, "─", KEYS[2]);

    g.text(3, meta.rows - 2, "CONTAINERS: DOCKER + K8S  |  TRANSPORT: REST / WEBRTC", KEYS[4]);
    return g.frame();
  };
}

export const explain =
  "Service topology showing React clients, FastAPI gateways, Redis queues, PostgreSQL, Pinecone vector storage, and cloud GPU inference workers.";

export const source = `const nodes = [
  { label: "CLIENT / REACT", x: 6, y: 6 },
  { label: "FASTAPI GATEWAY", x: 36, y: 6 },
  { label: "REDIS STREAM", x: 68, y: 6 },
  { label: "POSTGRESQL", x: 6, y: 18 },
  { label: "PINECONE VEC", x: 36, y: 18 },
  { label: "SAGEMAKER / GPU", x: 68, y: 18 },
];`;

const module: SceneModule = {
  meta,
  default: create,
  explain,
  source,
};

export default module;
