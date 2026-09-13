const PRIVATE_HOST =
  /^(localhost|127\.0\.0\.1|0\.0\.0\.0|::1)$/i;
const PRIVATE_NET =
  /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/;

export function isAllowedWebhookUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  if (url.username || url.password) return false;
  const host = url.hostname;
  if (PRIVATE_HOST.test(host) || PRIVATE_NET.test(host)) return false;
  if (host.endsWith(".local") || host.endsWith(".internal")) return false;
  return true;
}

export function jsonLdText(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function securityContactEmail() {
  return (process.env.SECURITY_CONTACT_EMAIL || process.env.NEXT_PUBLIC_EMAIL || "").trim();
}
