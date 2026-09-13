# Final forensic audit — Newark HVAC Pros

**Live:** https://newark-de-hvac.vercel.app/  
**Inspected:** 13 September 2026  
**Codebase:** `web/` Next.js 16.3.5 App Router (production). WordPress theme in `wp-content/` is not what Vercel serves.

Local source and live HTML match the same Next.js app. Photography is present in production (`/images/hero/service.jpg`) but is not fully guaranteed in this workspace until re-downloaded. Do not assume a local `next build` equals production until images, env, and headers are verified on the live host.

---

## CRITICAL

1. **No enforcing Content-Security-Policy on production HTML.** Homepage response has `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` only. CSP is absent (not even Report-Only). Pentest finding confirmed.
2. **`/.well-known/security.txt` is 404** on production. Pentest finding confirmed.
3. **Service IA is incomplete and duplicated.** Mega-menu items such as AC Replacement, AC Maintenance, Heating Repair, Humidifiers, Commercial AC, and Commercial Heating all point at a handful of generic pages. Keyword-swapped shells, not unique routes.
4. **Required `/services/{slug}/` architecture is not live.** Public URLs are still `/{slug}/` (e.g. `/ac-repair-newark-de/`). Spec requires `/services/ac-repair-newark-de/` and peers.
5. **Lead form has no production backend unless `FORM_WEBHOOK` is set.** Contact form correctly refuses fake success (503), but chatbot `leadEnabled` is false on Vercel without a webhook — conversion path is weak, not dishonest.
6. **Photography is not in git.** `web/public/images/` is credits-only locally. A clean deploy without downloading images will 404 every `<Image>`.

## HIGH

7. **Homepage HTML is missing `Strict-Transport-Security`.** `robots.txt` / `sitemap.xml` receive `max-age=63072000; includeSubDomains; preload` from Vercel; cached HTML did not show HSTS in this inspection. Must be set in app headers so HTML cannot miss it.
8. **`Permissions-Policy` is missing.**
9. **`Access-Control-Allow-Origin: *` is present on HTML and API-adjacent responses.** Unnecessary disclosure of a permissive CORS posture. APIs rely on a same-origin check; still should not advertise `*`.
10. **Mega menu positioning is fragile.** `.mega` uses `transform: translateX(-36%/-42%)` from the Services button. Risk of clipping, horizontal overflow, and going off-viewport at 1280–1440. CSS `:hover` + `:focus-within` + JS `open` fight each other. Keyboard support is incomplete (no arrow-key model, click on desktop does not toggle).
11. **Header CTA copy does not match the brand spec.** Desktop right side is “Call for Service” + “Request Service”; spec is **Call** + **Request Service**.
12. **Missing unique pages (must exist, unique copy):**  
    AC replacement/maintenance, emergency AC, furnace replacement/maintenance, heating repair, emergency heating, HVAC repair, heat-pump maintenance, mini-split repair/installation, air filtration, humidifiers/dehumidifiers, ductwork (not “duct cleaning” as the product), commercial AC/heating/maintenance.
13. **Internal strategy language** in repo README (“Pay-Per-Call”, lead-generation) and leftover WordPress location copy (“SEO or our routing”, competitor geo URLs). Not on the Next.js chrome, but must not leak into public pages or customer-facing resources.
14. **`/reviews/` exists.** No fake stars (good), but a reviews URL with no verified reviews should not be a public product surface. Chatbot still links to it.
15. **JsonLd uses `dangerouslySetInnerHTML`** without `<` escaping. Data is currently static; still harden.
16. **`FORM_WEBHOOK` is fetched server-side with no URL allowlist** (SSRF if env is poisoned).
17. **Technology fingerprinting:** `server: Vercel`, `x-nextjs-prerender`, `x-matched-path`, `x-vercel-id`. `X-Powered-By` already off. Do not break the app to hide Vercel; keep `poweredByHeader: false`.

## MEDIUM

18. **Robots.txt is `Allow: /` only.** Does not Disallow `/api/`. Does not expose admin paths (none exist). Sitemap URL is correct. Live `/sitemap.xml` returned 200 on same-origin fetch (an earlier external fetch returned 500 — treat sitemap generation as flaky until rewritten).
19. **Homepage section rhythm is repetitive.** Five identical editorial image/text rows, then a problem list. Spec wants distinct Cooling / Heating / Heat pump chapters after a services overview, plus problem-first, why, process, local, emergency, FAQ, CTA.
20. **Breadcrumbs sit below the service hero**, not at the top of the page.
21. **Contact `LeadForm` has no honeypot** (chat form does). Inconsistent.
22. **Inline `style={{}}` across pages** — harder to keep spacing consistent; some CSP style policies will complain if we ever drop `'unsafe-inline'` for styles.
23. **Accent color is a navy (`#2F4A63`).** Restrained, but the spec asks to avoid excessive blue. Shift to charcoal + one warm bronze accent.
24. **Typography is Inter + Inter Tight** — a common “AI SaaS” pairing. Replace with a mature serif display + humanist sans.
25. **Logo is a boxed “N” wordmark only.** Need light/dark/mono marks, SVG brand files, and a favicon that is not a flat navy tile.
26. **Chat launcher is a 48px “N”** that can collide with the sticky mobile call bar (already offset, but tight on 320–390).
27. **Secondary CTA label is “Explore HVAC Services”** instead of “Explore Services”.
28. **Safety intent regex** misses some fire/smoke phrasings the spec requires.
29. **WordPress PHP theme and root README still describe a 555 example number** and pay-per-call workflow. Next.js correctly leaves phone empty unless env is set.
30. **Root `[slug]` mixes services and area pages.** After the `/services/` move, keep areas at `/bear-de-hvac/` etc., 301 the old service URLs.

## LOW

31. Default Next/Vercel SVGs remain in `web/public/` (`next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`) — leftover starter chrome.
32. First FAQ item defaults to expanded (`useState(0)`), which looks accidental on desktop.
33. Chat “Call Now” chip is labeled “Call for Service” when no phone is configured and then links to contact — confusing.
34. `sameOrigin` allows requests with **no** Origin and no Referer (good for some browsers; slightly loose).
35. In-memory rate limit does not hold across serverless isolates.
36. `trailingSlash: true` is fine; confirm canonicals always match.
37. Open Graph uses a single technician photo for every page.

## POLISH

38. Hero H1 wrapping (“Newark,” / “Delaware”) is strong; keep a controlled measure, not a 16ch trap on tablet.
39. Button heights: header call 40px mobile / 46px desktop vs body buttons 46px — unify at 44/48.
40. Mega menu 3-column grid for 6 groups + emergency is cramped; use a full-bleed panel under the header.
41. Uneven editorial row image crops; assign distinct photos per category.
42. Footer padding vs sticky mobile bar vs chatbot — verify 320–430.
43. Focus rings exist (`:focus-visible`); mega menu items need a visible focus inside the panel.
44. Dark emergency band eyebrow uses a one-off inline color.
45. Resources cards still point at root service slugs.
46. No `opengraph-image` route — social cards depend on a JPG that may be missing in some deploys.

## Live vs local (this inspection)

| Check | Live | Local source |
| --- | --- | --- |
| Framework | Next.js on Vercel | `web/` Next 16.3.5 |
| Title | HVAC Service in Newark, DE \| Heating & Cooling | Same |
| CSP | Missing | Missing |
| HSTS on HTML | Missing on cached `/` | Not in `next.config` |
| HSTS on robots/sitemap | Present | N/A (platform) |
| security.txt | 404 | Not implemented |
| robots.txt | Allow `/`, sitemap set | `app/robots.ts` |
| sitemap.xml | 200 (same-origin) | `app/sitemap.ts` |
| Phone | Not published | Env-empty, correct |
| Fake reviews | None | None |
| Horizontal overflow @ ~2227px | scrollWidth 2212 < innerWidth | Untested at 1280–1920 in this pass |
| Images | Present on live | Not in workspace git |

## Security review (beyond the Light scan)

Light scan did **not** test SQLi, XSS exploit, RCE, LFI. Code review notes:

- No SQL. No auth. No admin.
- Chat and lead APIs are POST JSON/form, origin-checked, rate-limited, input-length-capped.
- Chat AI keys are server-only; client never receives the system prompt.
- Assistant output is claim-filtered (no prices, 24/7, stars, licenses).
- `dangerouslySetInnerHTML` only for JSON-LD.
- No debug routes. No `.env` committed.
- Webhook SSRF and JSON-LD escaping still need hardening.
- CSP + frame-ancestors should replace reliance on `X-Frame-Options` alone.

## Decision

Treat this as a **production rebuild of `web/`**, not a skin pass:

1. Brand + type + color system.  
2. `/services/*` unique pages + 301s.  
3. Header mega menu + mobile accordion.  
4. Homepage information architecture.  
5. Chatbot context, safety, no fake data.  
6. Forms, honeypot, webhook allowlist.  
7. Enforcing CSP (nonces), HSTS, Permissions-Policy, security.txt, robots.  
8. Photography restored locally, production build, deploy, live QA.

No fake phone, email, address, ratings, years, licenses, warranties, prices, or 24/7 claims. Those stay in `site` env config until real.
