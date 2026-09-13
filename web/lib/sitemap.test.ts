import assert from "node:assert/strict";
import { services } from "./services";
import { sitemapUrls, sitemapXml } from "./sitemap";
import { DEFAULT_PUBLIC_SITE_URL } from "./site-url";

const urls = sitemapUrls();
const xml = sitemapXml();
const titles = services.map((s) => s.title);
const descriptions = services.map((s) => s.description);

assert.equal(titles.length, new Set(titles).size);
assert.equal(descriptions.length, new Set(descriptions).size);

assert.ok(urls.includes(`${DEFAULT_PUBLIC_SITE_URL}/`));
assert.ok(urls.includes(`${DEFAULT_PUBLIC_SITE_URL}/services/`));
assert.ok(urls.includes(`${DEFAULT_PUBLIC_SITE_URL}/services/ac-repair-newark-de/`));
assert.ok(urls.includes(`${DEFAULT_PUBLIC_SITE_URL}/bear-de-hvac/`));
assert.ok(urls.includes(`${DEFAULT_PUBLIC_SITE_URL}/contact/`));
assert.equal(urls.length, new Set(urls).size);
assert.equal(
  urls.some((url) => url.includes("/api/") || url.includes("/reviews/") || url.includes("localhost")),
  false,
);
assert.doesNotMatch(xml, /lastmod|localhost|127\.0\.0\.1/i);
assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
assert.match(xml, /<loc>https:\/\/newark-de-hvac\.vercel\.app\/<\/loc>/);

console.log(`sitemap tests passed (${urls.length} urls)`);
