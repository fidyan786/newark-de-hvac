# Newark HVAC Pros

Heating and cooling website for **Newark, Delaware** and nearby New Castle County communities.

Production: https://newark-de-hvac.vercel.app/

## Local development

```powershell
cd web
npm install
npm run dev
```

Optional environment values live in `web/.env.example`. Phone, email, address, hours, and emergency coverage stay unpublished until they are set.

## Production notes

- Service pages live under `/services/`.
- Leads persist only when `FORM_WEBHOOK` is configured (or a local file store off Vercel).
- Security contact: `/.well-known/security.txt` (set `SECURITY_CONTACT_EMAIL` for a mailto line).
- Do not invent reviews, prices, licenses, or dispatch guarantees.
