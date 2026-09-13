# Final QA checklist — Newark HVAC Pros

Date: 13 Sep 2026  
Live: https://newark-de-hvac.vercel.app/

Mark `[x]` only when actually tested.

## Pages & nav

- [ ] Homepage
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Header
- [ ] Desktop Services dropdown
- [ ] Mobile Services accordion
- [ ] No horizontal overflow
- [ ] No clipped content
- [ ] No layout overflow
- [ ] Hero
- [ ] Services
- [ ] Every service page
- [ ] Forms
- [ ] Chatbot
- [ ] Phone links
- [ ] Navigation
- [ ] Footer
- [ ] Images
- [ ] Typography

## Quality & SEO

- [ ] Accessibility
- [ ] SEO
- [ ] Sitemap
- [ ] Robots
- [ ] Security.txt
- [ ] No console errors
- [ ] No hydration errors
- [ ] No broken images
- [ ] No dead buttons
- [ ] No broken links

## Security (live HTTP)

- [ ] CSP
- [ ] X-Content-Type-Options
- [ ] Referrer-Policy
- [ ] Permissions-Policy
- [ ] HSTS
- [ ] Frame protection

## Release

- [x] Production build (local `npm run build`, Next 16.3.5)
- [x] Chatbot engine tests
- [x] Site URL tests
- [x] ESLint `--max-warnings=0`
- [ ] LIVE production inspection
- [ ] Final visual QA

## Notes

Phone, 24/7, prices, reviews, and licenses are not invented. Contact form returns an honest failure until `FORM_WEBHOOK` is set.
