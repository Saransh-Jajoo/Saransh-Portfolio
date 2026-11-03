import { Grid, KEYS, clamp, palette, rng } from "@/graphics/engine/kit";
import type { SceneModule, SceneOptions } from "@/graphics/engine/types";

const P = palette([
  "#080a10",
  "#18203e",
  "#4169ff",
  "#65cfff",
  "#f9d77e",
  "#8a79d8",
  "#ffb35c",
]);

export const meta = {
  slug: "neural-network",
  name: "Neural Network Propagation",
  category: "expertise",
  cols: 96,
  rows: 30,
  fps: 14,
  palette: P,
};

export function create(options: SceneOptions = {}) {
  const g = new Grid(meta.cols, meta.rows);
  const r = rng(options.seed ?? 12);
  const layers = [6, 9, 9, 7, 4];
  const nodes = layers.map((n, li) =>
    Array.from({ length: n }, (_, i) => ({
      x: 10 + li * 19,
      y: 3 + Math.round(((meta.rows - 7) / (n + 1)) * (i + 1)),
      id: li * 100 + i,
      bias: r() * 6.28,
    })),
  );

  return (t: number) => {
    g.clear();
    g.text(3, 1, "TENSOR GRAPH / FORWARD PASS", KEYS[3]);
    g.text(meta.cols - 28, 1, "LATENT DIM: 512 -> 4", KEYS[5]);

    for (let li = 0; li < nodes.length - 1; li++) {
      for (const a of nodes[li]) {
        for (const b of nodes[li + 1]) {
          const w = Math.sin(t * 2.4 + a.bias + b.id * 0.17);
          if (w > 0.38) {
            g.line(
              a.x + 1,
              a.y,
              b.x - 1,
              b.y,
              w > 0.78 ? "═" : w > 0.58 ? "─" : "·",
              KEYS[w > 0.78 ? 4 : w > 0.58 ? 3 : 1],
            );
          }
        }
      }
    }

    nodes.forEach((layer, li) => {
      for (const n of layer) {
        const act = clamp(0.5 + 0.5 * Math.sin(t * 3 - li * 0.7 + n.bias));
        const ch = act > 0.75 ? "●" : act > 0.45 ? "•" : "○";
        const co = KEYS[act > 0.75 ? 4 : act > 0.45 ? 3 : 2];
        g.set(n.x, n.y, ch, co);
        g.set(n.x - 1, n.y, "[", KEYS[1]);
        g.set(n.x + 1, n.y, "]", KEYS[1]);
      }
    });

    const labels = ["IN", "CONV", "ATTN", "MLP", "LOGIT"];
    labels.forEach((lbl, li) => {
      g.text(8 + li * 19, meta.rows - 2, lbl, KEYS[5]);
    });

    return g.frame();
  };
}

export const explain =
  "Five-layer directed acyclic network. Edge weights oscillate with phase-shifted sinusoids; high-activation edges upgrade from '·' to '─' and '═' while node glyphs pulse between '○', '•', and '●'.";

export const source = `const layers = [6, 9, 9, 7, 4];
const nodes = layers.map((n, li) =>
  Array.from({ length: n }, (_, i) => ({
    x: 10 + li * 19,
    y: 3 + Math.round(((rows - 7) / (n + 1)) * (i + 1)),
    bias: r() * 6.28,
  }))
);

return (t) => {
  g.clear();
  for (let li = 0; li < nodes.length - 1; li++)
    for (const a of nodes[li])
      for (const b of nodes[li + 1]) {
        const w = Math.sin(t * 2.4 + a.bias + b.id * 0.17);
        if (w > 0.38)
          g.line(a.x + 1, a.y, b.x - 1, b.y, w > 0.78 ? "═" : "─", KEYS[w > 0.78 ? 4 : 3]);
      }
  nodes.forEach((layer, li) =>
    layer.forEach((n) => {
      const act = clamp(0.5 + 0.5 * Math.sin(t * 3 - li * 0.7 + n.bias));
      g.set(n.x, n.y, act > 0.75 ? "●" : "○", KEYS[act > 0.75 ? 4 : 3]);
    })
  );
  return g.frame();
};`;

const module: SceneModule = {
  meta,
  default: create,
  explain,
  source,
};

export default module;
