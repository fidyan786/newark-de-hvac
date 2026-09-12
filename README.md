# Newark HVAC Pros — Pay-Per-Call WordPress Site

High-conversion HVAC lead-generation website for **Newark, Delaware** and nearby New Castle County communities (Bear, Glasgow, Pike Creek, Hockessin, Christiana). Built from the September 2026 research dossier.

## Local preview (no MySQL)

PHP 8.4 is enough. From this folder:

```powershell
php -S localhost:8080 router.php
```

Then open http://localhost:8080/

## Public deploy (GitHub → Vercel)

This standalone PHP site deploys to Vercel with the community PHP runtime (`api/index.php` + `vercel.json`). Local preview stays `php -S localhost:8080 router.php`. Set `SITE_URL` on Vercel if canonical URLs should use a custom domain. Optional `FORM_WEBHOOK` receives JSON lead posts.

Pretty URLs match the blueprint (`/ac-repair-newark-de/`, `/emergency-hvac-newark-de/`, `/blog/delaware-hvac-rebates/`, etc.).

## WordPress deploy

The theme lives at `wp-content/themes/newark-hvac-pros/`.

1. Install WordPress on your host (SiteGround, WP Engine, etc.).
2. Upload the `newark-hvac-pros` theme folder.
3. Activate the theme (pages seed automatically).
4. Settings → Permalinks → Post name.
5. Replace the tracking number (see below).
6. Add a real 302 number, form webhook, GA4, and Search Console.

Do not invent Google reviews, BBB grades, NATE badges, license numbers, or a street address. The theme leaves those out until they are real.

## Replace before advertising

Edit `wp-content/themes/newark-hvac-pros/inc/config.php`:

| Key | Current | Notes |
|-----|---------|--------|
| `phone_display` / `phone_tel` | `(302) 555-0147` | Reserved 555 example. Put your CallRail / WhatConverts **302** number here. |
| `email` | `service@newarkhvacpros.com` | Change to a mailbox you monitor. |
| `address` | `null` | Service-area business until GBP verification has a real Newark address. |
| `license_note` | Placeholder | Publish the Delaware HVACR license when the contractor is assigned. |

Form leads save as JSON in `/data/leads/` on local preview. Point production at your CRM or form endpoint.

## What shipped

**Conversion**
- Sticky mobile click-to-call bar
- Phone in the header and emergency band on every layout
- Emergency page is phone-first (no form as the primary CTA)
- Four-field request form (name, phone, ZIP, service)
- Trust bar without fake star counts

**SEO architecture**
- Core service pages, location pages, cost guide, financing, diagnostics, blog
- `LocalBusiness` / `HVACBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Article` schema
- Canonical tags, XML sitemap at `/sitemap.xml`, `robots.txt`
- Unique Newark copy: climate (Cfa, July ~88°F, January ~26°F), 1978 housing stock, UD rentals, oil heat, Energize Delaware rebates (25C heat-pump credit expired after 2025)

**Not fabricated**
- No fake 4.9★ widgets
- No borrowed competitor review counts
- No fake founding year

## Launch sequence (from the dossier)

1. Swap in the real 302 tracking number
2. Google Business Profile (needs a verifiable address — partner contractor or SAB)
3. Citations: BBB, Yelp, Angi, Thumbtack, Nextdoor, Greater Newark Chamber
4. GA4 + Search Console
5. Ask real customers for Google reviews after completed jobs
