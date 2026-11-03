"use client";

import { useEffect, useRef, useState } from "react";

type Hotspot = {
  id: string;
  label: string;
  tag: string;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "cv-monitor",
    label: "COMPUTER VISION MONITOR",
    tag: "YOLO + NORFAIR // WEBRTC",
    detail: "Real-time object detection, bounding boxes, and multi-object trajectory tracking.",
    x: 0.04,
    y: 0.24,
    w: 0.28,
    h: 0.28,
    color: "#56D8FF",
  },
  {
    id: "esp32-bench",
    label: "ESP32 & SENSOR BENCH",
    tag: "ESP32 • I2C • PWM • MQTT",
    detail: "Connected microcontroller board with environmental sensors and P10 RGB LED bus.",
    x: 0.04,
    y: 0.62,
    w: 0.3,
    h: 0.26,
    color: "#34D399",
  },
  {
    id: "portrait-station",
    label: "SARANSH.EXE // WORKSTATION",
    tag: "SJ </> • FULL-STACK AI & IOT",
    detail: "Pixel-art portrait rendered from saransh-original.jpg inside the engineering lab.",
    x: 0.34,
    y: 0.18,
    w: 0.34,
    h: 0.72,
    color: "#FECC1B",
  },
  {
    id: "nn-monitor",
    label: "NEURAL ENGINE DISPLAY",
    tag: "PYTORCH • GEMINI • PINECONE",
    detail: "Multi-layer inference graph & vector similarity retrieval pipeline.",
    x: 0.68,
    y: 0.34,
    w: 0.28,
    h: 0.28,
    color: "#9B7CFF",
  },
];

// 4x4 Bayer matrix for authentic pixel-art ordered dithering
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function quantizeChannel(v: number, levels: number, dither: number): number {
  const step = 255 / (levels - 1);
  const clamped = Math.max(0, Math.min(255, v + dither));
  return Math.round(clamped / step) * step;
}

export function PixelWorkspaceHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [portraitReady, setPortraitReady] = useState(false);

  // Load `public/assets/saransh-original.jpg` and convert into a clean, background-segmented
  // high-detail pixel-art portrait sprite preserving Saransh's actual facial structure, hair, mustache & beard.
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/assets/saransh-original.jpg";
    img.onload = () => {
      const pw = 96;
      const ph = 112;
      const off = document.createElement("canvas");
      off.width = pw;
      off.height = ph;
      const octx = off.getContext("2d");
      if (!octx) return;

      // Crop tight around head & shoulders from original portrait photo
      const sx = img.width * 0.14;
      const sy = img.height * 0.04;
      const sw = img.width * 0.72;
      const sh = img.height * 0.84;
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph);

      const imgData = octx.getImageData(0, 0, pw, ph);
      const d = imgData.data;

      for (let y = 0; y < ph; y++) {
        for (let x = 0; x < pw; x++) {
          const idx = (y * pw + x) * 4;
          const r = d[idx];
          const g = d[idx + 1];
          const b = d[idx + 2];

          // Normalized coords centered on face/torso
          const nx = (x - pw * 0.5) / (pw * 0.46);
          const ny = (y - ph * 0.54) / (ph * 0.48);

          // Head + shoulders silhouette envelope
          const headDist = Math.hypot(
            (x - pw * 0.5) / (pw * 0.31),
            (y - ph * 0.38) / (ph * 0.33),
          );
          const shoulderDist =
            y > ph * 0.56
              ? Math.hypot(
                  (x - pw * 0.5) / (pw * 0.47),
                  (y - ph * 0.86) / (ph * 0.36),
                )
              : 99;
          const inSilhouette = headDist < 1.0 || shoulderDist < 1.0;

          // Detect bright sky blue, palm frond green, or bright yellow-gold fence outside face core
          const isCoreFace =
            Math.hypot(
              (x - pw * 0.5) / (pw * 0.23),
              (y - ph * 0.4) / (ph * 0.26),
            ) < 1.0;
          const isSkyBlue = b > 145 && b > r * 1.22 && y < ph * 0.72;
          const isPalmGreen = g > 110 && g > r * 1.15 && g > b * 1.12;
          const isFenceGold =
            !isCoreFace &&
            r > 180 &&
            g > 135 &&
            b < 95 &&
            (Math.abs(nx) > 0.52 || y < ph * 0.16);

          if (!inSilhouette || (!isCoreFace && (isSkyBlue || isPalmGreen || isFenceGold))) {
            d[idx + 3] = 0;
            continue;
          }

          // Convert blue backpack straps on lower shoulders into sleek dark studio hoodie/sweater
          const isBlueStrap =
            y > ph * 0.62 && b > 120 && b > r * 1.18;

          const bayer = (BAYER4[y & 3][x & 3] / 16 - 0.5) * 18;

          if (isBlueStrap) {
            d[idx] = 24;
            d[idx + 1] = 32;
            d[idx + 2] = 56;
            d[idx + 3] = 255;
          } else {
            // Boost local contrast slightly so hair, eyebrows, eyes, mustache & beard read crisply in pixel art
            const cr = (r - 128) * 1.14 + 128;
            const cg = (g - 128) * 1.1 + 126;
            const cb = (b - 128) * 1.08 + 132;

            d[idx] = quantizeChannel(cr, 9, bayer);
            d[idx + 1] = quantizeChannel(cg, 9, bayer);
            d[idx + 2] = quantizeChannel(cb, 9, bayer);
            d[idx + 3] = 255;
          }
        }
      }

      // Add subtle cyan/amber rim light on silhouette edges so portrait integrates with studio lighting
      const copy = new Uint8ClampedArray(d);
      for (let y = 1; y < ph - 1; y++) {
        for (let x = 1; x < pw - 1; x++) {
          const idx = (y * pw + x) * 4;
          if (copy[idx + 3] === 0) continue;
          const leftEmpty = copy[idx - 4 + 3] === 0;
          const rightEmpty = copy[idx + 4 + 3] === 0;
          const topEmpty = copy[idx - pw * 4 + 3] === 0;
          if (leftEmpty || topEmpty) {
            // Warm key light from hanging lamp on left/top
            d[idx] = Math.min(255, d[idx] + 45);
            d[idx + 1] = Math.min(255, d[idx + 1] + 32);
            d[idx + 2] = Math.min(255, d[idx + 2] + 10);
          } else if (rightEmpty) {
            // Cool cyan rim light from city window on right
            d[idx] = Math.min(255, d[idx] + 12);
            d[idx + 1] = Math.min(255, d[idx + 1] + 42);
            d[idx + 2] = Math.min(255, d[idx + 2] + 68);
          }
        }
      }

      octx.putImageData(imgData, 0, 0);
      portraitCanvasRef.current = off;
      setPortraitReady(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Logical pixel-art resolution: 320x210 scaled crisply with imageSmoothingEnabled = false
    const GW = 320;
    const GH = 210;
    canvas.width = GW;
    canvas.height = GH;

    let raf = 0;
    let last = -1000;
    let paintedOnce = false;
    const interval = 1000 / 15;

    const pxRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      color: string,
    ) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (paintedOnce && document.hidden) return;
      if (paintedOnce && now - last < interval) return;
      last = now;
      paintedOnce = true;

      const t = now * 0.001;
      const mx = (pointerRef.current.x - 0.5) * 6;
      const my = (pointerRef.current.y - 0.5) * 4;

      ctx.imageSmoothingEnabled = false;

      // 1. Studio Wall & Architecture Backdrop
      pxRect(0, 0, GW, GH, "#0B1022");
      // Subtle pixel brick/panel texture on studio wall
      for (let wy = 8; wy < 155; wy += 14) {
        pxRect(0, wy, GW, 1, "#111933");
        for (let wx = (wy % 28 === 0 ? 12 : 0); wx < GW; wx += 28) {
          pxRect(wx, wy, 1, 14, "#0E162D");
        }
      }

      // 2. Right Panoramic Window with Night City Skyline & Stars
      const winX = 206;
      const winY = 12;
      const winW = 104;
      const winH = 98;
      pxRect(winX - 3, winY - 3, winW + 6, winH + 6, "#1C2747");
      pxRect(winX, winY, winW, winH, "#060B1A");

      // Night sky gradient bands inside window
      pxRect(winX, winY + 20, winW, 24, "#09122A");
      pxRect(winX, winY + 44, winW, 26, "#101E42");
      pxRect(winX, winY + 70, winW, 28, "#1A2B5C");

      // Twinkling stars in window
      const starCoords = [
        [214, 18],
        [228, 25],
        [246, 16],
        [265, 22],
        [282, 19],
        [298, 28],
        [220, 36],
        [274, 34],
      ];
      starCoords.forEach(([sx, sy], i) => {
        if (Math.sin(t * 2 + i * 1.4) > -0.2) {
          pxRect(sx - mx * 0.3, sy - my * 0.2, 2, 2, i % 2 === 0 ? "#FFFFFF" : "#56D8FF");
        }
      });

      // Skyline buildings in window
      const buildings = [
        { x: 208, w: 14, h: 46, c: "#0D1630" },
        { x: 220, w: 16, h: 62, c: "#132042", spire: true },
        { x: 235, w: 14, h: 52, c: "#0F1A38" },
        { x: 248, w: 18, h: 70, c: "#16264E", spire: true },
        { x: 264, w: 15, h: 48, c: "#111D3D" },
        { x: 277, w: 17, h: 58, c: "#16264E" },
        { x: 292, w: 16, h: 44, c: "#0E1834" },
      ];
      buildings.forEach((b, bi) => {
        const by = winY + winH - b.h;
        pxRect(b.x, by, b.w, b.h, b.c);
        if (b.spire) {
          pxRect(b.x + Math.floor(b.w / 2), by - 8, 2, 8, "#243B70");
          if (Math.sin(t * 4 + bi) > 0) {
            pxRect(b.x + Math.floor(b.w / 2), by - 10, 2, 2, "#FF3B3B");
          }
        }
        for (let wy = by + 4; wy < winY + winH - 4; wy += 5) {
          for (let wx = b.x + 3; wx < b.x + b.w - 3; wx += 4) {
            const on = Math.sin(wx * 1.7 + wy * 0.9 + Math.floor(t * 1.2)) > -0.1;
            if (on) {
              pxRect(
                wx,
                wy,
                2,
                3,
                (wx + wy) % 3 === 0 ? "#FECC1B" : "#56D8FF",
              );
            }
          }
        }
      });
      // Window muntin bars
      pxRect(winX + Math.floor(winW / 2), winY, 2, winH, "#1C2747");
      pxRect(winX, winY + 52, winW, 2, "#1C2747");

      // 3. Upper Engineering Shelf (Left & Center) with Glowing "AI" Badge, Books & Plant
      pxRect(14, 24, 176, 4, "#25335A");
      pxRect(14, 28, 176, 2, "#131B33");

      // Glowing "AI" sign box on shelf
      pxRect(22, 8, 26, 16, "#172242");
      pxRect(23, 9, 24, 14, "#0B1124");
      ctx.fillStyle = "#56D8FF";
      ctx.font = "bold 9px monospace";
      ctx.fillText("AI", 28, 19);

      // Microchip plaque on shelf
      pxRect(56, 10, 20, 14, "#1C2A4E");
      pxRect(60, 13, 12, 8, "#FECC1B");

      // Pixel books
      pxRect(86, 11, 6, 13, "#4285FF");
      pxRect(93, 9, 7, 15, "#9B7CFF");
      pxRect(101, 12, 6, 12, "#FF5E5E");
      pxRect(108, 10, 7, 14, "#FECC1B");

      // Potted pixel plant on shelf
      pxRect(162, 16, 12, 8, "#C87D55");
      pxRect(160, 10, 16, 6, "#22C55E");
      pxRect(163, 7, 10, 4, "#4ADE80");

      // 4. Hanging Warm Studio Lamp + Light Cone
      const lampX = 148;
      pxRect(lampX, 0, 2, 18, "#475569");
      pxRect(lampX - 12, 18, 26, 5, "#334155");
      pxRect(lampX - 9, 23, 20, 3, "#FECC1B");

      // Soft warm light cone
      ctx.fillStyle = "rgba(254, 204, 27, 0.055)";
      ctx.beginPath();
      ctx.moveTo(lampX - 8, 26);
      ctx.lineTo(lampX + 10, 26);
      ctx.lineTo(lampX + 75, 165);
      ctx.lineTo(lampX - 75, 165);
      ctx.closePath();
      ctx.fill();

      // 5. Left Monitor: Computer Vision & CCTV Analytics (YOLO Bounding Boxes)
      const cvX = 14;
      const cvY = 52;
      const cvW = 86;
      const cvH = 56;
      pxRect(cvX - 3, cvY - 3, cvW + 6, cvH + 6, "#25355F");
      pxRect(cvX, cvY, cvW, cvH, "#071022");
      // Monitor stand
      pxRect(cvX + 36, cvY + cvH + 3, 14, 10, "#1B2644");
      pxRect(cvX + 26, cvY + cvH + 13, 34, 3, "#25355F");

      // Road grid inside CV monitor
      pxRect(cvX + 4, cvY + 32, cvW - 8, 18, "#0E1C36");
      // Moving vehicle 1 with YOLO bounding box
      const car1X = cvX + 8 + ((Math.floor(t * 14) % 52));
      pxRect(car1X, cvY + 34, 14, 7, "#4285FF");
      ctx.strokeStyle = "#56D8FF";
      ctx.lineWidth = 1;
      ctx.strokeRect(car1X - 2, cvY + 32, 18, 11);
      pxRect(car1X - 2, cvY + 28, 16, 4, "#56D8FF");

      // Moving person/vehicle 2 with amber bounding box
      const car2X = cvX + 56 - ((Math.floor(t * 10) % 44));
      pxRect(car2X, cvY + 20, 10, 8, "#34D399");
      ctx.strokeRect(car2X - 1, cvY + 19, 12, 10);
      pxRect(car2X - 1, cvY + 15, 12, 3, "#FECC1B");

      ctx.fillStyle = "#56D8FF";
      ctx.font = "6px monospace";
      ctx.fillText("YOLO // CAM_01", cvX + 4, cvY + 9);

      // 6. Right Monitor: Neural Network & Vector Graph
      const nnX = 216;
      const nnY = 76;
      const nnW = 86;
      const nnH = 54;
      pxRect(nnX - 3, nnY - 3, nnW + 6, nnH + 6, "#25355F");
      pxRect(nnX, nnY, nnW, nnH, "#080E24");
      pxRect(nnX + 36, nnY + nnH + 3, 14, 10, "#1B2644");
      pxRect(nnX + 26, nnY + nnH + 13, 34, 3, "#25355F");

      const nnLayers = [
        [
          [nnX + 14, nnY + 16],
          [nnX + 14, nnY + 28],
          [nnX + 14, nnY + 40],
        ],
        [
          [nnX + 42, nnY + 12],
          [nnX + 42, nnY + 24],
          [nnX + 42, nnY + 36],
          [nnX + 42, nnY + 46],
        ],
        [
          [nnX + 70, nnY + 20],
          [nnX + 70, nnY + 36],
        ],
      ];
      ctx.strokeStyle = "rgba(155, 124, 255, 0.55)";
      for (let l = 0; l < nnLayers.length - 1; l++) {
        for (const a of nnLayers[l]) {
          for (const b of nnLayers[l + 1]) {
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
            ctx.stroke();
          }
        }
      }
      nnLayers.flat().forEach(([nx, ny], idx) => {
        const pulse = Math.sin(t * 4 + idx) > 0;
        pxRect(nx - 2, ny - 2, 5, 5, pulse ? "#FECC1B" : "#56D8FF");
      });

      // 7. Personal Pixel-Art Portrait of Saransh (from saransh-original.jpg)
      const pX = Math.round(98 + mx * 0.4);
      const pY = Math.round(22 + my * 0.3);
      const pW = 112;

      // Studio chair back behind Saransh
      pxRect(pX + 16, pY + 46, 80, 78, "#141D38");
      pxRect(pX + 20, pY + 50, 72, 70, "#0E152B");

      // Stylized pixel-art dark navy sweater/shoulders so torso blends seamlessly with studio desk
      pxRect(pX + 14, pY + 80, 84, 52, "#162240");
      pxRect(pX + 22, pY + 74, 68, 12, "#1D2C52");

      if (portraitCanvasRef.current) {
        ctx.drawImage(
          portraitCanvasRef.current,
          0,
          0,
          96,
          84,
          pX + 8,
          pY + 2,
          pW - 16,
          88,
        );
      } else {
        // Fallback silhouette while image loads
        pxRect(pX + 34, pY + 18, 44, 48, "#D99B78");
      }

      // 8. Engineering Desk Surface
      const deskY = 152;
      pxRect(0, deskY, GW, 6, "#2A3964");
      pxRect(0, deskY + 6, GW, GH - deskY - 6, "#121A33");
      // Luminous cyan desk trim
      pxRect(0, deskY, GW, 1, "#56D8FF");

      // 9. Open Laptop in Front of Saransh ("SJ </>")
      const lapX = 122;
      const lapY = 118;
      const lapW = 68;
      const lapH = 36;
      // Laptop lid with glowing rim
      pxRect(lapX - 1, lapY - 1, lapW + 2, lapH + 2, "#56D8FF");
      pxRect(lapX, lapY, lapW, lapH, "#1D2849");
      pxRect(lapX + 3, lapY + 3, lapW - 6, lapH - 6, "#141D38");
      // Laptop base on desk
      pxRect(lapX - 6, deskY - 2, lapW + 12, 4, "#334475");

      ctx.fillStyle = "#56D8FF";
      ctx.font = "bold 9px monospace";
      ctx.fillText("SJ </>", lapX + 18, lapY + 21);

      // 10. Left Hardware Bench: ESP32 Microcontroller, Breadboard, Sensors & Blinking LEDs
      const pcbX = 16;
      const pcbY = 132;
      // Green/Teal PCB board
      pxRect(pcbX, pcbY, 78, 24, "#0F5132");
      pxRect(pcbX + 2, pcbY + 2, 74, 20, "#146C43");
      // ESP32 metallic module on PCB
      pxRect(pcbX + 8, pcbY + 5, 24, 14, "#1E293B");
      pxRect(pcbX + 11, pcbY + 7, 14, 10, "#94A3B8");
      // Gold GPIO header pins
      for (let gx = pcbX + 6; gx < pcbX + 68; gx += 4) {
        pxRect(gx, pcbY + 2, 2, 2, "#FECC1B");
        pxRect(gx, pcbY + 20, 2, 2, "#FECC1B");
      }
      // Blinking status LEDs on board
      pxRect(
        pcbX + 42,
        pcbY + 8,
        4,
        4,
        Math.sin(t * 6) > 0 ? "#4ADE80" : "#166534",
      );
      pxRect(
        pcbX + 52,
        pcbY + 8,
        4,
        4,
        Math.cos(t * 5) > 0 ? "#FF3B3B" : "#7F1D1D",
      );
      pxRect(pcbX + 62, pcbY + 8, 4, 4, "#56D8FF");

      // Animated circuit traces across the desk
      for (let tx = 20; tx < 300; tx += 18) {
        const pulse = (Math.floor(t * 8) + tx) % 36 < 12;
        pxRect(
          tx,
          deskY + 18,
          10,
          1,
          pulse ? "#56D8FF" : "rgba(86, 216, 255, 0.2)",
        );
      }

      // 11. Floating technical HUD markers ("+", coordinates)
      ctx.fillStyle = "rgba(86, 216, 255, 0.55)";
      ctx.font = "7px monospace";
      ctx.fillText("+", 8, 44);
      ctx.fillText("+", 196, 44);
      ctx.fillText("+", 308, 142);
    };

    draw(performance.now());
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [portraitReady]);

  function handlePointerMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / Math.max(1, rect.width);
    const y = (e.clientY - rect.top) / Math.max(1, rect.height);
    pointerRef.current = { x, y };

    const hit =
      HOTSPOTS.find(
        (h) => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h,
      ) ?? null;
    setActiveSpot(hit);
  }

  return (
    <div
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setActiveSpot(null)}
      className="glass-panel relative overflow-hidden rounded-xl border border-cyan/30 shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
    >
      {/* Top Studio Telemetry Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#070B18]/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="text-ink">WORKSTATION // SARANSH.EXE</span>
        </div>
        <span className="text-cyan">
          {activeSpot ? activeSpot.tag : "HOVER SUBSYSTEMS TO INSPECT"}
        </span>
      </div>

      {/* Main Pixel-Art Interactive Stage */}
      <div className="relative aspect-[320/210] w-full bg-[#070B18]">
        <canvas
          ref={canvasRef}
          aria-label="Interactive pixel-art portrait of Saransh Jajoo in an AI, computer vision, and embedded systems workstation"
          role="img"
          className="pixelated block h-full w-full"
        />

        {/* Interactive Hotspot Highlight Overlay */}
        {activeSpot ? (
          <div
            className="pointer-events-none absolute rounded border transition-all duration-150"
            style={{
              left: `${activeSpot.x * 100}%`,
              top: `${activeSpot.y * 100}%`,
              width: `${activeSpot.w * 100}%`,
              height: `${activeSpot.h * 100}%`,
              borderColor: activeSpot.color,
              boxShadow: `0 0 20px ${activeSpot.color}40, inset 0 0 12px ${activeSpot.color}25`,
            }}
          />
        ) : null}

        {/* Bottom Floating Subsystem Readout */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/15 bg-[#070B18]/85 px-3.5 py-2 backdrop-blur-md">
          {activeSpot ? (
            <div>
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: activeSpot.color }}
              >
                {activeSpot.label} · {activeSpot.tag}
              </p>
              <p className="mt-0.5 text-xs text-ink/90">{activeSpot.detail}</p>
            </div>
          ) : (
            <div className="flex w-full flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              <span className="text-cyan">▪ CV MONITOR: ACTIVE</span>
              <span className="text-yellow">▪ PORTRAIT: SARANSH JAJOO</span>
              <span className="text-emerald-400">▪ ESP32 BUS: ONLINE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
