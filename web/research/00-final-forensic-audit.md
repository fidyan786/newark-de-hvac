# Final forensic audit — Newark HVAC Pros

Audited: local Next.js app (`web/`) and live production `https://newark-de-hvac.vercel.app/` on 13 Sep 2026.

Local and live match on visual system (charcoal / paper / restrained accent). Live is a prior production build and is missing several files that exist only locally (chat polish) plus security endpoints.

---

## CRITICAL

1. **No Content-Security-Policy** on live responses. Pentest finding confirmed. Headers present: HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options. Missing: CSP, Permissions-Policy.
2. **`/.well-known/security.txt` is 404** on live.
3. **`/services/{slug}/` is 404** on live (example: `/services/ac-repair-newark-de/`). Spec and breadcrumbs promise this tree; pages currently live only at `/{slug}/`.
4. **Many nav items are aliases, not unique pages.** AC Replacement, AC Maintenance, Furnace Replacement, Heating Repair, Heat Pump Maintenance, Air Filtration, Humidifiers, Dehumidifiers, Commercial AC/Heating/Maintenance all collapse onto a handful of URLs.

## HIGH

5. **`sameOrigin()` allows POSTs with neither Origin nor Referer** (`lib/leads/rateLimit.ts`) — CSRF-shaped hole on `/api/lead` and `/api/chat`.
6. **Contact `LeadForm` has no honeypot** (chat form does).
7. **JsonLd uses `dangerouslySetInnerHTML`** without `<` escaping.
8. **Robots.txt allows `/` with no `/api/` disallow.** Does not leak admin (none exists) but should not invite API crawling.
9. **Services mega menu: desktop click never closes** (pointer:fine always sets open). Keyboard: no ArrowDown-to-first-link. Heating Maintenance missing. “Maintenance” under Commercial is ambiguous.
10. **Hero H1 wraps “Newark,” / “Delaware”** because `.home-hero h1` is capped at `16ch`.

## MEDIUM

11. Fingerprinting: `Server: Vercel`, `X-Nextjs-Prerender`, `X-Vercel-Id`. `poweredByHeader` already false. Do not break the app to hide Vercel.
12. Homepage problem grid has **7 cards** (uneven last row at 2-col).
13. FAQ control concatenates “–” into the accessible name.
14. Inline `style=` on homepage emergency band / CTA (inconsistent with tokens).
15. Chat `Call Now` without a configured phone still labeled “Call for Service” while linking to `/contact/`.
16. `trailingSlash: true` has historically 500’d `/sitemap.xml` via some fetchers; HEAD was 200 on live. Harden sitemap generation.
17. Lead persist on Vercel without `FORM_WEBHOOK` honestly fails — correct, but production must not pretend success.

## LOW

18. Reviews page is not fake reviews (good) but is a thin stub; keep no-index.
19. Duplicate image use (hero technician reused in “why us”).
20. Header Request Service hidden below 1024px (Call + Menu only) — acceptable if Call remains, but Request should stay available in the drawer (it is, via Contact).
21. Chat launcher sits above mobile call bar locally; verify live after deploy.

## POLISH

22. Services chevron missing on the nav button.
23. Mega menu should be viewport-clamped (currently OK at 2227px; still fix transform offset).
24. Trust strip feels light under the hero — tighten type, add a hairline rhythm.
25. Button height: header Call is 46px desktop / 40px compact; keep one height at ≥1024.
26. Focus rings exist; confirm mega links and drawer.
27. No fake phone/reviews/prices on live (verified). Keep it that way.

## APPLICATION SECURITY (beyond the Light scan)

| Check | Result |
|---|---|
| `dangerouslySetInnerHTML` | JsonLd only — escape `<` |
| Secrets in client | `NEXT_PUBLIC_*` only for public business fields; OpenAI/webhook server-side |
| Debug routes | None found |
| Open redirects | Redirects are static allow-list in `next.config.ts` |
| Chat | Input truncated, sanitized, no fake claims |
| Auth | No login surface |
| SQL/RCE | No database; file/webhook leads only |

## LIVE vs LOCAL

| Item | Live | Local |
|---|---|---|
| Visual identity | Premium, restrained | Same tokens; chatbot CSS isolated |
| CSP / security.txt | Missing | To be added |
| `/services/{slug}` | 404 | To be added + 308 from old slugs |
| Unique service pages | Partial | To be completed |
| Chatbot | Present on live | Full engine + lead form locally |
| Sitemap | 200 (HEAD) | Needs `/services/` URLs |
| HSTS | Present (Vercel) | Keep |

## FIX ORDER

1. Security headers, CSP (nonce), security.txt, robots, CSRF origin check
2. Unique service catalog + `/services/[slug]` + redirects
3. Nav / mega menu / mobile accordion
4. Homepage H1, grids, FAQ, form honeypot
5. Chat routes + openings for new slugs
6. Production build, deploy, live re-test
