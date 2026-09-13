import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const staticPaths = [
  "/",
  "/services/",
  "/service-area/",
  "/about/",
  "/contact/",
  "/resources/",
  "/privacy-policy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    ...staticPaths,
    ...services.map((s) => `/${s.slug}/`),
    ...areas.map((a) => `/${a.slug}/`),
  ];
  return pages.map((path, i) => ({
    url: `${site.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : i < 8 ? 0.8 : 0.7,
  }));
}
