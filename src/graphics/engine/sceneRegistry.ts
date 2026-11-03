import type { SceneModule } from "@/graphics/engine/types";
import nyc from "@/graphics/scenes/nyc-skyline";
import neural from "@/graphics/scenes/neural-network";
import cctv from "@/graphics/scenes/computer-vision";
import circuit from "@/graphics/scenes/circuit-board";
import software from "@/graphics/scenes/software-arch";
import water from "@/graphics/scenes/water-treatment";
import cold from "@/graphics/scenes/cold-storage";
import aura from "@/graphics/scenes/omnichannel";
import battery from "@/graphics/scenes/battery-rul";
import trophy from "@/graphics/scenes/trophy";
import profile from "@/graphics/scenes/profile-art";
import p10 from "@/graphics/scenes/p10-display";

export type SceneId =
  | "nyc-skyline-night"
  | "neural-network"
  | "computer-vision"
  | "circuit-board"
  | "software-arch"
  | "water-treatment"
  | "cold-storage"
  | "omnichannel"
  | "battery-rul"
  | "trophy"
  | "profile-art"
  | "p10-display";

export const scenes: Record<SceneId, SceneModule> = {
  "nyc-skyline-night": nyc,
  "neural-network": neural,
  "computer-vision": cctv,
  "circuit-board": circuit,
  "software-arch": software,
  "water-treatment": water,
  "cold-storage": cold,
  omnichannel: aura,
  "battery-rul": battery,
  trophy,
  "profile-art": profile,
  "p10-display": p10,
};

export const sceneList = Object.entries(scenes).map(([id, mod]) => ({
  id: id as SceneId,
  ...mod.meta,
}));
