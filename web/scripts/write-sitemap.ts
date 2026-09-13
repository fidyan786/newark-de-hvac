import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { sitemapXml } from "../lib/sitemap";

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "..", "public", "sitemap.xml");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, sitemapXml(), "utf8");
console.log(`wrote ${out}`);
