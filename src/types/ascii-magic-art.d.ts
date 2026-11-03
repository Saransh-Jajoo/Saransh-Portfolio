declare module "ascii-magic-art/runtime/canvas.js" {
  export const CELL_W: number;
  export function cellAspect(meta: { cell?: string }): number;
  export class GlyphAtlas {
    constructor();
  }
  export function paint(
    ctx: CanvasRenderingContext2D,
    frame: unknown,
    palette: Record<string, string>,
    opts: Record<string, unknown>,
  ): void;
}

declare module "ascii-magic-art/runtime/glyphs.js" {
  export const LOOKS: Record<string, { label: string; chars: string | null }>;
  export function restyle(
    frame: unknown,
    palette: Record<string, string>,
    opts?: {
      look?: string;
      chars?: string;
      all?: boolean;
      mono?: boolean;
      gamma?: number;
      lift?: boolean;
      merge?: number;
    },
  ): { text: string; color?: string; palette?: Record<string, string> } | string;
}
