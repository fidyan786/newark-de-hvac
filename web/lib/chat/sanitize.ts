import { ALL_INTENTS, type Intent } from "./types";

const CLAIM_PATTERNS = [
  /\$\s?\d/,
  /\b24\s*\/\s*7\b/i,
  /\bsame[- ]day\b/i,
  /\bfree estimate\b/i,
  /\bfinancing\b/i,
  /\b\d(?:\.\d)?\s*stars?\b/i,
  /\b(?:NATE|BBB)\b/,
  /\blicense\s*#?\s*\d/i,
  /\b\d+\s+years? in business\b/i,
  /\bwe guarantee\b/i,
  /\btechnician is on the way\b/i,
];

export function containsForbiddenClaim(text: string, allowHours = false) {
  return CLAIM_PATTERNS.some((re) => {
    if (allowHours && /24/.test(re.source)) return false;
    return re.test(text);
  });
}

export function sanitizeAssistantText(text: string, allowHours = false) {
  const raw = String(text || "").replace(/\s+/g, " ").trim();
  if (!raw) return null;
  if (containsForbiddenClaim(raw, allowHours)) return null;
  return raw.length > 700 ? raw.slice(0, 697) + "…" : raw;
}

export function isValidIntent(value: string): value is Intent {
  return (ALL_INTENTS as string[]).includes(value);
}
