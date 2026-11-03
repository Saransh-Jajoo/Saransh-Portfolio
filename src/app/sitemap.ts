import type { MetadataRoute } from "next";
import { nav, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://saranshjajoo.dev";
  return [
    ...nav.map((item) => ({
      url: `${base}${item.href === "/" ? "" : item.href}`,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
