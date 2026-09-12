import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: dir },
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/hvac-cost-guide-newark-de", destination: "/", permanent: true },
      { source: "/hvac-financing-newark-de", destination: "/contact", permanent: true },
      { source: "/blog/hvac-cost-newark-delaware-2026", destination: "/", permanent: true },
      { source: "/ductwork-newark-de", destination: "/duct-cleaning-newark-de", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
