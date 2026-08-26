# AdroitOne — Talent. Automation. Delivery.

Production website for **AdroitOne** (NYC × Hyderabad) — technology talent, AI
automation, software development, and IT services.

## Stack

- **Next.js 15** (App Router) · **TypeScript**
- **Tailwind CSS 4** — custom dark/light design system in `app/globals.css`
- **Framer Motion** — reveals, scroll-linked storytelling, page transitions
- **React Three Fiber + three** — hero network visual (lazy-loaded, WebGL
  fallback included)
- **Zod** — shared client/server validation for the contact form
- **Resend** — contact-form email delivery (optional, see below)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site runs without any env vars
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Development server               |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript, no emit              |

## Environment variables

See `.env.example`. Everything is optional in development:

| Variable                   | Effect                                                        |
| -------------------------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Canonical URL used by SEO metadata, sitemap, Open Graph       |
| `RESEND_API_KEY`           | Enables real email delivery for `/api/contact`                |
| `CONTACT_EMAIL`            | Inbox that receives inquiries (must be a verified Resend domain) |
| `CONTACT_FROM`             | Optional custom "from" identity (defaults to Resend sender)   |
| `NEXT_PUBLIC_ANALYTICS_ID` | Activates the analytics abstraction (`lib/analytics.ts`)      |

### Contact form behavior

- **Provider configured** (`RESEND_API_KEY` + `CONTACT_EMAIL`) → inquiry is
  emailed via Resend with reply-to set to the submitter.
- **Not configured** → the API logs the inquiry server-side and returns
  success (`devFallback: true`), so the form is fully functional in
  development.
- Spam protection: hidden honeypot field + per-IP rate limiting
  (5 requests / 10 min). All input is validated with Zod on both client and
  server.

### Production email setup

1. Create a Resend account and verify your sending domain.
2. Set `RESEND_API_KEY`, `CONTACT_EMAIL`, and optionally `CONTACT_FROM`.
3. Deploy — no other changes required.

## Brand & imagery

- **Logo**: the official AdroitOne lockup lives at
  `public/images/adroitone-logo.png` (background removed, margins trimmed —
  artwork untouched). It is used in the navbar, mobile menu, footer and
  loader via `components/navigation/Logo.tsx`. The favicon (`app/icon.png`)
  is the symbol extracted from the same asset.
- **Photography**: editorial placeholders in `public/images/`, registered in
  `data/images.ts`. City imagery is from Wikimedia Commons; workplace imagery
  from Unsplash. Nothing is presented as AdroitOne company photography.
  Replace files with licensed company photography whenever available —
  filenames are stable, so no code changes are needed.

  Credits: NYC — "Lower Manhattan from Jersey City November 2014 panorama 3"
  (Wikimedia Commons); Hyderabad — "Aerial view of Durgam Cheruvu and HITEC
  City" (Wikimedia Commons); workplace photos — Unsplash.

- **Build scripts** (`scripts/`, not part of the app bundle): logo processing,
  image fetching, favicon sizing.

## Content model

All marketing content lives in typed data files under `data/` — edit there,
not in components:

| File                  | Contents                                        |
| --------------------- | ----------------------------------------------- |
| `data/services.ts`    | Four service pillars + form service options     |
| `data/technologies.ts`| Technology categories shown across the site     |
| `data/case-studies.ts`| Case-study templates (**clearly labeled illustrative**) |
| `data/testimonials.ts`| Empty by design — add only verified quotes      |
| `data/insights.ts`    | Editorial placeholders powering `/insights`     |
| `data/site.ts`        | Verified office information                     |

> **No fabricated claims:** clients, testimonials, awards, statistics and
> addresses are intentionally absent until verified. The New York street
> address is deliberately omitted pending official confirmation.

## Routes

```
/                        /services/[slug] (4 pages)
/services                /technology
/talent                  /company
/case-studies            /insights (+ /insights/[slug])
/contact                 /privacy  /terms
/api/contact (POST)      /sitemap.xml  /robots.txt
```

## Accessibility & performance

- Semantic HTML, skip link, focus-visible styles, ARIA labels
- Full `prefers-reduced-motion` support (3D disabled, animations minimized)
- Hero 3D mounts after first paint; static SVG fallback without WebGL
- All content routes prerendered statically; fonts self-hosted via `next/font`
