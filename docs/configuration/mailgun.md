# Contact form email on Vercel

The form posts JSON to `/api/contact`. Vercel runs `api/contact.js` on the
server; the rest of the Astro site stays static. The endpoint sends an HTML email using the Casa Vacanze Ianes layout, branded El Bombet,
with a plain-text fallback with the visitor's address as Reply-To. Recipients and sender are set on
the server and cannot be supplied by visitors.

## Configuration

In the El Bombet Vercel project's Environment Variables, set `MAILGUN_API_KEY`
to the secret for Mailgun's existing `elbombet` domain sending key. The key ID
shown in the Mailgun table is not the secret. Never use a `PUBLIC_` prefix,
commit the secret, or put it in `site.config.ts`.

The defaults (also listed in `.env.example`) are:

- `MAILGUN_DOMAIN`: `mg.fiemmenelcuore.it`
- `MAILGUN_REGION`: `EU`
- `MAILGUN_FROM`: `El Bombet <contatti@mg.fiemmenelcuore.it>`
- `CONTACT_EMAIL_TO`: `loianes.re@gmail.com`

Set overrides in Vercel if needed. Scope the real key to Production; only add
it to Preview when sending real test emails is intended. Redeploy after changing
environment variables. An unset key returns a generic unavailable response.

## Verification

Run `node --test tests/contact.test.js` for mocked provider tests. `astro dev`
does not serve the root `api` directory; use `vercel dev` or a Vercel deployment
for end-to-end tests. Submit one form and check Mailgun's EU Logs for delivery,
then confirm the receiving inbox and Reply-To.

The handler validates payloads, restricts browser origins, and uses a honeypot.
These are basic filters, not distributed rate limiting. Configure a Vercel
Firewall rate limit on POST `/api/contact` before exposing it to sustained
traffic; monitor the Mailgun quota. No client-controlled recipient or automatic
visitor confirmation is supported.
