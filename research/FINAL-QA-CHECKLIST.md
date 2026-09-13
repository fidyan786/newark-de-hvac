# Final QA checklist — Newark HVAC Pros

Date: 13 Sep 2026  
Live: https://newark-de-hvac.vercel.app/

Mark `[x]` only when actually tested.

## Pages & nav

- [x] Homepage — live, premium split hero, unique service tiles
- [x] Desktop — header Call + Request Service, bronze/cream/charcoal
- [x] Tablet — 720+ two-column tiles and trust strip
- [x] Mobile — 390px, Menu + sticky Call, overflow 0
- [x] Header — logo, Services, Service Areas, About, Resources, Call, Request Service
- [x] Desktop Services dropdown — 3-column mega, unique hrefs, no overflow (scrollWidth ≤ innerWidth)
- [x] Mobile Services accordion — Cooling/Heating/Heat Pumps/IAQ/Commercial/Emergency +
- [x] No horizontal overflow — 2227px overflow −15; 390px overflow 0
- [x] No clipped mega content
- [x] No layout overflow from 100vw chat panel
- [x] Hero — Newark, Delaware eyebrow; H1 wraps cleanly
- [x] Services — editorial photo tiles, not colorful cards
- [x] Every service page — 29 `/services/{slug}/` URLs returned 200 with unique titles
- [x] Forms — contact exists; success only after backend (FORM_WEBHOOK unset → honest 503)
- [x] Chatbot — launcher present; opening “How can we help with your HVAC system?”
- [x] Phone links — Call routes to contact while phone env is empty (not invented)
- [x] Navigation — core pages 200; unknown slug 404
- [x] Footer — services, areas, about, contact, request service, privacy, terms
- [x] Images — hero and AC replacement photography render
- [x] Typography — Source Serif 4 + Source Sans 3

## Quality & SEO

- [x] Accessibility — skip link, aria-expanded, FAQ collapsed, mega keyboard open
- [x] SEO — unique titles on crawled routes; canonicals via pageMeta
- [x] Sitemap — `/sitemap.xml` 200
- [x] Robots — Allow `/`, Disallow `/api/` and `/reviews/`
- [x] Security.txt — 200, contact is `/contact/`, no invented email
- [x] No console errors — no broken images in first viewport; lazy images below fold
- [x] No hydration errors observed on live homepage
- [x] No broken images on hero / AC replacement
- [x] No dead buttons in header/footer
- [x] No broken internal service links in crawl

## Security (live HTTP)

- [x] CSP — enforcing, nonce + strict-dynamic, no unsafe-eval
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy present
- [x] HSTS: max-age=63072000; includeSubDomains; preload
- [x] Frame protection — X-Frame-Options SAMEORIGIN + CSP frame-ancestors 'self'

## Release

- [x] Production build (local `npm run build`, Next 16.3.5)
- [x] Chatbot engine tests
- [x] Site URL tests
- [x] ESLint `--max-warnings=0`
- [x] LIVE production inspection
- [x] Final visual QA — homepage, mega menu, mobile accordion, AC replacement

## Notes

Phone, 24/7, prices, reviews, and licenses are not invented. Contact form returns an honest failure until `FORM_WEBHOOK` is set. Legacy `/{slug}/` service URLs 308 to `/services/{slug}/`. `/reviews/` 308 to contact.

Follow-up shipped: hide chatbot while the mobile drawer is open so it cannot cover the drawer Call button.
