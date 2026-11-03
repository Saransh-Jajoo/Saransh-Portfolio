import { Grid, KEYS, palette } from "@/graphics/engine/kit";
import type { SceneModule } from "@/graphics/engine/types";

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
  slug: "omnichannel",
  name: "AURA-CX Orchestrator",
  category: "projects",
  cols: 96,
  rows: 30,
  fps: 12,
  palette: P,
};

export function create() {
  const g = new Grid(meta.cols, meta.rows);
  const channels = [
    { name: "VOICE_SIP", y: 5 },
    { name: "EMAIL_IMAP", y: 11 },
    { name: "LIVE_CHAT", y: 17 },
    { name: "WHATSAPP", y: 23 },
  ];

  return (t: number) => {
    g.clear();
    g.box(0, 0, meta.cols, meta.rows, KEYS[1]);
    g.text(3, 1, "AURA-CX // OMNICHANNEL IDENTITY & HYBRID RETRIEVAL ENGINE", KEYS[3]);

    channels.forEach((c, i) => {
      g.box(4, c.y, 16, 4, KEYS[2]);
      g.text(6, c.y + 1, c.name, KEYS[4]);
      g.line(20, c.y + 2, 34, 14, "─", KEYS[1]);
      const u = ((t * 0.9 + i * 0.25) % 1);
      const px = Math.round(20 + (34 - 20) * u);
      const py = Math.round(c.y + 2 + (14 - (c.y + 2)) * u);
      g.set(px, py, "●", KEYS[3]);
    });

    g.box(34, 6, 28, 17, KEYS[5]);
    g.text(38, 8, "IDENTITY RESOLUTION", KEYS[4]);
    g.text(38, 11, "PINECONE VECTOR SIM", KEYS[3]);
    g.text(38, 14, "360 PROFILE + REDIS", KEYS[6]);
    g.text(38, 17, "GEMINI ORCHESTRATOR", KEYS[3]);

    g.box(70, 8, 22, 6, KEYS[2]);
    g.text(72, 10, "AGENT COMMAND UI", KEYS[4]);
    g.box(70, 16, 22, 6, KEYS[2]);
    g.text(72, 18, "SENTIMENT / CLUST", KEYS[6]);

    g.line(62, 11, 70, 11, Math.sin(t * 4) > 0 ? "═" : "─", KEYS[3]);
    g.line(62, 18, 70, 18, Math.cos(t * 4) > 0 ? "═" : "─", KEYS[5]);

    g.text(
      3,
      meta.rows - 2,
      "TARGETS: ~180S RESPONSE | 70% TIER-1 AUTO | 15% CHURN RED. (PROJECT TARGETS)",
      KEYS[4],
    );
    return g.frame();
  };
}

export const explain =
  "Four communication channels converge into a central identity-resolution and hybrid-retrieval hub (Pinecone + PostgreSQL + Redis + Gemini), dispatching orchestrated responses and sentiment analytics.";

export const source = `const channels = [
  { name: "VOICE_SIP", y: 5 },
  { name: "EMAIL_IMAP", y: 11 },
  { name: "LIVE_CHAT", y: 17 },
  { name: "WHATSAPP", y: 23 },
];

return (t) => {
  g.clear();
  channels.forEach((c, i) => {
    g.box(4, c.y, 16, 4, KEYS[2]);
    g.text(6, c.y + 1, c.name, KEYS[4]);
    g.line(20, c.y + 2, 34, 14, "─", KEYS[1]);
    const u = (t * 0.9 + i * 0.25) % 1;
    g.set(20 + (34 - 20) * u, c.y + 2 + (14 - c.y - 2) * u, "●", KEYS[3]);
  });
  g.box(34, 6, 28, 17, KEYS[5]);
  g.text(38, 8, "IDENTITY RESOLUTION", KEYS[4]);
  return g.frame();
};`;

const module: SceneModule = {
  meta,
  default: create,
  explain,
  source,
};

export default module;
