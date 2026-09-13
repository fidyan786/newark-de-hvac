import { sitemapXml } from "@/lib/sitemap";

export const dynamic = "force-static";

export function GET() {
  return new Response(sitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
