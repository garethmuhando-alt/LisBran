# LisBran

Kenya's marketplace for marketing suppliers — printers, designers, agencies, influencers, activation crews, brand ambassadors and dancers. Buyers describe the job (service, urgency, city, budget) and see which suppliers can take it; suppliers list their services and get enquiries directly on WhatsApp, phone or email.

> Product brief: [PRODUCT.md](PRODUCT.md) · Design system: [DESIGN.md](DESIGN.md)

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** with CSS-variable design tokens (`src/app/globals.css`)
- **Supabase** — supplier listings, passwordless seller sign-in, admin auth (optional in development)
- **Google Maps JavaScript API** — events map (optional)
- **framer-motion** — the tension-network animation

> This Next.js version has breaking changes from older releases. Read the guides in `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Quick start

```bash
npm ci
cp .env.example .env.local   # fill in what you have; everything is optional locally
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

| Variable | Needed for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph | e.g. `https://lisbranmarketing.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Live listings, seller sign-in, admin | See [docs/SUPABASE.md](docs/SUPABASE.md) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same | Public anon key; security comes from Row Level Security |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | `/map` | Restrict by HTTP referrer. Without it the map page shows the list only |

Without Supabase the site still works: sample listings are shown, seller onboarding saves to the browser only, and `/admin` explains that it needs Supabase. In development builds a one-time code is shown on screen so onboarding can be tested offline.

## How the site is organised

```
src/
  app/
    layout.tsx            Root layout: fonts, metadata, theme pre-paint script, JSON-LD
    page.tsx              Landing page (/) → components/SplashScreen.tsx
    (main)/               Everything with the top bar + phone/tablet tab bar
      layout.tsx          TopNav · page · SiteFooter · BottomNav
      home/               Video masthead, job tensioner + tension network, services index
      categories/ search/[category]/ supplier/[id]/ services/*
      events/ map/ trends/ contact/ support/
      profile/ saved/ notifications/ rewards/ surveys/
      seller/onboarding/ seller/dashboard/ admin/
      privacy/ terms/ cookies/
    robots.ts sitemap.ts manifest.ts opengraph-image.jpg icon.png apple-icon.png
  components/
    TopNav.tsx BottomNav.tsx SiteFooter.tsx ThemeProvider.tsx ThemeToggle.tsx CookieNotice.tsx
    tension/              JobControls + TensionNetwork (the signature interaction)
    ui/                   VideoMasthead, BackgroundVideo, PageHeader, SupplierCard, Button, Logo …
  lib/
    catalog.ts            Services, SAMPLE suppliers, matching rules (canTake)
    events.ts             Illustrative events + city coordinates for the map
    nav.ts                Single source for top-bar and tab-bar links
    site.ts metadata.ts   Brand/contact details and per-page metadata helper
    theme.ts saved.ts supabase.ts
public/
  video/                  Intro film, web-optimised (see below)
supabase/migrations/      Database schema + Row Level Security
docs/                     Supabase, deployment, content guides
```

## Design

The visual system ("Tension Network") is documented in [DESIGN.md](DESIGN.md). In short: concrete (day) and carbon (night) grounds, solid rods as structure, one cord colour for urgency, selection and primary actions, Archivo condensed display type with Geist Mono for data. Colours are CSS variables, so both themes share every component.

- **Themes**: System / Day / Night. The choice is applied before first paint (no flash) and synced across tabs.
- **Layout**: full-width grounds with content on a 12-column grid (`.wrap`, max 1600px).
- **Navigation**: one link list (`src/lib/nav.ts`) drives the desktop top bar (≥1024px) and the labelled tab bar on phones and tablets.
- **Responsive**: verified across 320–2560px, portrait and landscape phones and tablets, 200% page zoom and 200% text size.

### The intro video

`public/video/` holds the film transcoded for the web (the 37.7 MB master is not committed):

| File | Use |
| --- | --- |
| `lisbran-intro-720.webm` / `.mp4` | Tablets and desktops (~1.1–1.3 MB) |
| `lisbran-intro-480.webm` / `.mp4` | Phones (~0.6–0.7 MB) |
| `lisbran-intro-poster.jpg` | Poster and fallback |

The player (`src/components/ui/BackgroundVideo.tsx`) is muted, only plays on screen, pauses in background tabs, shows the poster for reduced-motion, Save-Data and 2G visitors, and has a pause button. To replace the film, re-encode with the commands in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md#replacing-the-intro-video) and **rename the files** (they are cached for a year).

## Content status

Supplier listings, ratings, prices and events in `src/lib/catalog.ts` and `src/lib/events.ts` are **sample data**, labelled as such on every page. Payments (M-Pesa), rewards and buyer accounts are **planned**, and the UI says so. See [docs/CONTENT.md](docs/CONTENT.md) for how to swap in real content.

## Security and privacy

- Security headers (CSP, HSTS, frame, referrer and permissions policies) are set in `next.config.ts`.
- Admin access uses Supabase Auth plus an `admin` role claim; the database enforces access with Row Level Security. No credentials live in the code.
- Only essential browser storage is used (theme, city, saved suppliers, onboarding data); see the Cookie Policy page.
- Legal pages (`/terms`, `/privacy`, `/cookies`) are written for Kenyan law but must be reviewed by a Kenyan advocate before launch.

## Deploying

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Vercel setup, environment variables and the launch checklist.
