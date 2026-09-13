import assert from "node:assert/strict";
import {
  DEFAULT_PUBLIC_SITE_URL,
  absoluteUrl,
  isEphemeralVercelDeploymentUrl,
  isNonPublicOrigin,
  resolveCanonicalSiteUrl,
} from "./site-url";

assert.equal(isEphemeralVercelDeploymentUrl("https://web-is0ulb6d0-fidyanahmed-8729.vercel.app"), true);
assert.equal(isEphemeralVercelDeploymentUrl("https://newark-de-hvac-git-main-team.vercel.app"), true);
assert.equal(isEphemeralVercelDeploymentUrl("https://newark-de-hvac.vercel.app"), false);
assert.equal(isEphemeralVercelDeploymentUrl("https://www.example.com"), false);

assert.equal(isNonPublicOrigin("http://localhost:3000"), true);
assert.equal(isNonPublicOrigin("http://127.0.0.1:3000"), true);
assert.equal(isNonPublicOrigin(DEFAULT_PUBLIC_SITE_URL), false);

assert.equal(
  resolveCanonicalSiteUrl({
    NEXT_PUBLIC_SITE_URL: "https://newark-de-hvac.vercel.app",
    VERCEL_URL: "web-aaaa1111-team.vercel.app",
  }),
  "https://newark-de-hvac.vercel.app",
);

assert.equal(
  resolveCanonicalSiteUrl({
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    VERCEL_ENV: "production",
    NODE_ENV: "production",
  }),
  DEFAULT_PUBLIC_SITE_URL,
);

assert.equal(
  resolveCanonicalSiteUrl({
    NEXT_PUBLIC_SITE_URL: "https://web-bbbb2222-team.vercel.app",
    VERCEL_PROJECT_PRODUCTION_URL: "newark-de-hvac.vercel.app",
    VERCEL_URL: "web-bbbb2222-team.vercel.app",
  }),
  DEFAULT_PUBLIC_SITE_URL,
);

assert.equal(
  resolveCanonicalSiteUrl({
    VERCEL_PROJECT_PRODUCTION_URL: "https://hvac.example.com",
  }),
  "https://hvac.example.com",
);

assert.equal(
  resolveCanonicalSiteUrl({
    VERCEL_PROJECT_PRODUCTION_URL: "web-beryl-ten-b3rlf3jb6k.vercel.app",
    VERCEL_ENV: "production",
  }),
  DEFAULT_PUBLIC_SITE_URL,
);

assert.equal(
  resolveCanonicalSiteUrl({
    VERCEL_URL: "web-cccc3333-team.vercel.app",
    VERCEL_ENV: "preview",
  }),
  DEFAULT_PUBLIC_SITE_URL,
);

assert.equal(
  resolveCanonicalSiteUrl({
    NEXT_PUBLIC_SITE_URL: "https://hvac.example.com/",
  }),
  "https://hvac.example.com",
);

assert.equal(absoluteUrl("/contact/", "https://newark-de-hvac.vercel.app"), "https://newark-de-hvac.vercel.app/contact/");
assert.equal(absoluteUrl("/", "https://newark-de-hvac.vercel.app"), "https://newark-de-hvac.vercel.app/");
assert.equal(absoluteUrl("/contact", "https://newark-de-hvac.vercel.app"), "https://newark-de-hvac.vercel.app/contact/");
assert.equal(absoluteUrl("/sitemap.xml", "https://newark-de-hvac.vercel.app"), "https://newark-de-hvac.vercel.app/sitemap.xml");
assert.doesNotMatch(absoluteUrl("/contact/", "http://localhost:3000"), /localhost/);

console.log("site-url tests passed");
