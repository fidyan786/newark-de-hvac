export function trackChat(event: string, props: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  const safe: Record<string, string | number | boolean> = { event_source: "chatbot" };
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined) continue;
    if (k === "message" || k === "phone" || k === "name" || k === "text") continue;
    safe[k] = v;
  }
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  };
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...safe });
  if (typeof w.gtag === "function") w.gtag("event", event, safe);
}
