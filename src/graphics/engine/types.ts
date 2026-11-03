export type AsciiFrame =
  | string
  | { text: string; color: string; palette?: Record<string, string> };

export type SceneMeta = {
  slug: string;
  name: string;
  category?: string;
  note?: string;
  cols: number;
  rows: number;
  fps: number;
  palette: Record<string, string>;
};

export type SceneDraw = (t: number) => AsciiFrame;

export type SceneOptions = {
  seed?: number;
  cols?: number;
  rows?: number;
};

export type SceneModule = {
  meta: SceneMeta;
  default: (options?: SceneOptions) => SceneDraw;
  source: string;
  explain: string;
};

export type PaletteId = "original" | "cyan" | "amber" | "violet" | "phosphor" | "mono";

export type CharPresetId = "original" | "classic" | "blocks" | "binary" | "brackets";
