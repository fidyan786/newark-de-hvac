import { sitemapXml } from "@/lib/sitemap";

export const dynamic = "force-static";

const headers = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
};

export function GET() {
  return new Response(sitemapXml(), { status: 200, headers });
}

export function HEAD() {
  return new Response(null, { status: 200, headers });
}
