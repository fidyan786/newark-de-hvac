import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/reviews/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml", site.siteUrl),
    host: site.siteUrl,
  };
}
