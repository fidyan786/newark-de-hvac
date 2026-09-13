import { areas } from "@/lib/areas";
import { serviceHref } from "@/lib/paths";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

const STATIC_PATHS = [
  "/",
  "/services/",
  "/service-area/",
  "/about/",
  "/contact/",
  "/resources/",
  "/privacy-policy/",
  "/terms/",
] as const;

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Indexable production URLs only. lastmod is omitted when no real modification dates exist. */
export function sitemapPaths(): string[] {
  return [
    ...STATIC_PATHS,
    ...services.map((s) => serviceHref(s.slug)),
    ...areas.map((a) => `/${a.slug}/`),
  ];
}

export function sitemapUrls(): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const path of sitemapPaths()) {
    const url = absoluteUrl(path, site.siteUrl);
    if (seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }
  return urls;
}

export function sitemapXml(): string {
  const body = sitemapUrls()
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
