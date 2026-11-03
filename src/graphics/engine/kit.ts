/** Local TypeScript port of ascii-magic-art/lib/kit.js (MIT). */

export const RAMPS = {
  classic: " .:-=+*#%@",
  fine: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  dots: " .·•●",
  blocks: " ░▒▓█",
  soft: " .,-~:;=!*#$@",
  lines: " -=≡",
  binary: "01",
  tech: "<>/\\|{}[]",
};

export function ramp(v: number, chars = RAMPS.classic) {
  const i = Math.max(0, Math.min(chars.length - 1, Math.floor(v * chars.length)));
  return chars[i];
}

export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const TAU = Math.PI * 2;

export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(x: number, y: number, s: number) {
  let h = (x * 374761393 + y * 668265263 + s * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function noise2(x: number, y: number, seed = 0) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return lerp(lerp(a, b, xf), lerp(c, d, xf), yf);
}

export function fbm(x: number, y: number, octaves = 4, seed = 0) {
  let v = 0;
  let amp = 0.5;
  let f = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    v += amp * noise2(x * f, y * f, seed + i * 17);
    norm += amp;
    amp *= 0.5;
    f *= 2;
  }
  return v / norm;
}

export const KEYS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function palette(hexes: string[]) {
  const p: Record<string, string> = {};
  hexes.forEach((h, i) => {
    p[KEYS[i]] = h;
  });
  return p;
}

export function gradient(stops: string[], n = 10) {
  const toRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const rgb = stops.map(toRgb);
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * (rgb.length - 1);
    const j = Math.min(rgb.length - 2, Math.floor(t));
    const f = t - j;
    const c = rgb[j].map((v, k) =>
      Math.round(lerp(v, rgb[j + 1][k], f)),
    );
    out.push("#" + c.map((v) => v.toString(16).padStart(2, "0")).join(""));
  }
  return out;
}

export class Grid {
  cols: number;
  rows: number;
  ch: string[];
  co: string[];
  z: Float32Array;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.ch = new Array(cols * rows).fill(" ");
    this.co = new Array(cols * rows).fill(" ");
    this.z = new Float32Array(cols * rows);
  }

  clear(ch = " ", co = " ") {
    this.ch.fill(ch);
    this.co.fill(co);
    this.z.fill(-Infinity);
    return this;
  }

  inside(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
  }

  set(x: number, y: number, ch: string, co?: string) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (!this.inside(x, y)) return;
    const i = x + y * this.cols;
    this.ch[i] = ch;
    if (co !== undefined) this.co[i] = co;
  }

  text(x: number, y: number, s: string, co?: string) {
    for (let i = 0; i < s.length; i++) this.set(x + i, y, s[i], co);
  }

  hline(x0: number, x1: number, y: number, ch = "─", co?: string) {
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) this.set(x, y, ch, co);
  }

  vline(x: number, y0: number, y1: number, ch = "│", co?: string) {
    for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) this.set(x, y, ch, co);
  }

  line(x0: number, y0: number, x1: number, y1: number, ch = "*", co?: string) {
    x0 = Math.round(x0);
    y0 = Math.round(y0);
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let e = dx + dy;
    for (let n = 0; n < 4000; n++) {
      this.set(x0, y0, ch, co);
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * e;
      if (e2 >= dy) {
        e += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        e += dx;
        y0 += sy;
      }
    }
  }

  box(x: number, y: number, w: number, h: number, co?: string) {
    this.hline(x + 1, x + w - 2, y, "─", co);
    this.hline(x + 1, x + w - 2, y + h - 1, "─", co);
    for (let j = 1; j < h - 1; j++) {
      this.set(x, y + j, "│", co);
      this.set(x + w - 1, y + j, "│", co);
    }
    this.set(x, y, "┌", co);
    this.set(x + w - 1, y, "┐", co);
    this.set(x, y + h - 1, "└", co);
    this.set(x + w - 1, y + h - 1, "┘", co);
  }

  frame() {
    const lines: string[] = [];
    const cl: string[] = [];
    let colored = false;
    for (let y = 0; y < this.rows; y++) {
      lines.push(this.ch.slice(y * this.cols, (y + 1) * this.cols).join(""));
      const c = this.co.slice(y * this.cols, (y + 1) * this.cols).join("");
      if (!colored && c.trim()) colored = true;
      cl.push(c);
    }
    return colored
      ? { text: lines.join("\n"), color: cl.join("\n") }
      : lines.join("\n");
  }
}
