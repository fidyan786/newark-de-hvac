/**
 * Google Search Console ownership token.
 * Set GOOGLE_SITE_VERIFICATION to the HTML-tag content value from Search Console.
 * Do not invent or placeholder this value.
 */
export function googleSiteVerification(): string | undefined {
  const value = (process.env.GOOGLE_SITE_VERIFICATION || "").trim();
  if (!value) return undefined;
  if (/^google[A-Za-z0-9_-]+\.html$/i.test(value)) return undefined;
  return value;
}

/** HTML-file method: env may be `googleXXXX.html` or just `XXXX`. */
export function googleHtmlVerificationCode(): string | undefined {
  const value = (process.env.GOOGLE_SITE_VERIFICATION || "").trim();
  if (!value) return undefined;
  const file = value.match(/^google([A-Za-z0-9_-]+)\.html$/i);
  if (file) return file[1];
  return undefined;
}
