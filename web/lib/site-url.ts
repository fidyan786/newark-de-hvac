/**
 * Single source of truth for the public origin used by canonical URLs,
 * sitemap, robots, Open Graph, and JSON-LD.
 *
 * Never use VERCEL_URL (unique preview/deployment hosts). Those must not
 * become permanent canonicals. When a custom domain is attached, set
 * NEXT_PUBLIC_SITE_URL to that origin.
 *
 * Canonicals must never be localhost, private IPs, or ephemeral Vercel URLs.
 */
export const DEFAULT_PUBLIC_SITE_URL = "https://newark-de-hvac.vercel.app";

export type SiteUrlEnv = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
  VERCEL_ENV?: string;
  NODE_ENV?: string;
};

export function normalizeOrigin(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (!url.hostname) return "";
    return url.origin;
  } catch {
    return "";
  }
}

export function isNonPublicOrigin(origin: string): boolean {
  let host = "";
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    return true;
  }
  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host === "::1" || host === "[::1]") {
    return true;
  }
  if (host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) return true;
  return false;
}

/** Unique Vercel deployment / git-branch hosts, not the stable production alias. */
export function isEphemeralVercelDeploymentUrl(origin: string): boolean {
  let host = "";
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    return false;
  }
  if (!host.endsWith(".vercel.app")) return false;
  const sub = host.slice(0, -".vercel.app".length);
  if (sub.includes("-git-")) return true;
  return /-[a-z0-9]{8,10}-[a-z0-9][a-z0-9-]*$/i.test(sub);
}

function isUsablePublicOrigin(origin: string): boolean {
  return Boolean(origin) && !isNonPublicOrigin(origin) && !isEphemeralVercelDeploymentUrl(origin);
}

/**
 * Production canonical origin. Preview, localhost, and unique Vercel hosts
 * are never returned. Development still canonicalizes to the public site so
 * local HTML does not leak localhost into metadata.
 */
export function resolveCanonicalSiteUrl(env: SiteUrlEnv = process.env as SiteUrlEnv): string {
  const explicit = normalizeOrigin(env.NEXT_PUBLIC_SITE_URL);
  if (isUsablePublicOrigin(explicit)) return explicit;

  const vercelProd = normalizeOrigin(env.VERCEL_PROJECT_PRODUCTION_URL);
  if (isUsablePublicOrigin(vercelProd)) {
    const host = new URL(vercelProd).hostname.toLowerCase();
    if (!host.endsWith(".vercel.app")) return vercelProd;
  }

  if (!isUsablePublicOrigin(DEFAULT_PUBLIC_SITE_URL)) {
    throw new Error(
      "Canonical site URL is missing. Set NEXT_PUBLIC_SITE_URL to the public production origin.",
    );
  }

  return DEFAULT_PUBLIC_SITE_URL;
}

export function absoluteUrl(path: string, origin = resolveCanonicalSiteUrl()): string {
  const publicOrigin = isUsablePublicOrigin(origin) ? origin : resolveCanonicalSiteUrl();
  const originClean = publicOrigin.replace(/\/$/, "");
  const raw = path.trim() || "/";
  if (/^https?:\/\//i.test(raw)) {
    const url = new URL(raw);
    if (!url.pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(url.pathname)) {
      url.pathname += "/";
    }
    return url.toString();
  }
  const url = new URL(raw.startsWith("/") ? raw : `/${raw}`, `${originClean}/`);
  if (!url.pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(url.pathname)) {
    url.pathname += "/";
  }
  return url.toString();
}
