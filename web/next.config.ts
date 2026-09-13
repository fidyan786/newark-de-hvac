import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { staticSecurityHeaders } from "./lib/csp";
import { LEGACY_SERVICE_SLUGS } from "./lib/paths";

const dir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: dir },
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  async redirects() {
    const serviceMoves = LEGACY_SERVICE_SLUGS.filter((slug) => slug !== "duct-cleaning-newark-de").map((slug) => ({
      source: `/${slug}`,
      destination: `/services/${slug}/`,
      permanent: true,
    }));
    return [
      ...serviceMoves,
      { source: "/duct-cleaning-newark-de", destination: "/services/ductwork-newark-de/", permanent: true },
      { source: "/ductwork-newark-de", destination: "/services/ductwork-newark-de/", permanent: true },
      { source: "/reviews", destination: "/contact/", permanent: true },
      { source: "/privacy", destination: "/privacy-policy/", permanent: true },
      { source: "/hvac-cost-guide-newark-de", destination: "/", permanent: true },
      { source: "/hvac-financing-newark-de", destination: "/contact/", permanent: true },
      { source: "/blog/hvac-cost-newark-delaware-2026", destination: "/", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/sitemap.xml/", destination: "/sitemap.xml" },
      { source: "/google:code.html", destination: "/gsc-verify/:code" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [...staticSecurityHeaders],
      },
    ];
  },
};

export default nextConfig;
