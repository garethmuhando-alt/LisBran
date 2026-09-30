# Content: what is real, what is sample, how to change it

LisBran's product principle is *honest about what is live*. Anything not yet real is labelled on screen. This file lists every place to change when real content arrives.

## Services

`src/lib/catalog.ts` → `services`. The eight services come from the product brief. Each has a `slug` (used in `/search/<slug>`), a name, a one-line blurb, a link, and optional artwork in `public/` (`icon-graphic.png`, `icon-printing.png`, `icon-marketing.png`). Adding a service here adds it to the job tensioner, the Services index, the footer, onboarding and the sitemap.

## Suppliers (sample)

`src/lib/catalog.ts` → `suppliers`. **All sample data** with placeholder phone numbers and `hello@example.com` emails. Pages that show them say "Sample listings"; supplier profiles are `noindex` and excluded from the sitemap.

When real suppliers are verified in Supabase they appear on search results automatically (see `src/app/(main)/search/[category]/page.tsx`). To retire the samples, empty the `suppliers` array — the home network, map and graphic-design page read from it, so they will show only live data once you wire them to Supabase too — and remove `index: false` from `src/app/(main)/supplier/[id]/layout.tsx`.

Matching rules for "who can take this job" live in `canTake()` in the same file: a supplier matches when they offer the service, are in the city, turn work around at least as fast as the job needs, and are in the budget tier.

## Events (illustrative)

`src/lib/events.ts` → `events`. Illustrative examples, not affiliated with any organiser; the Events page and map say so. Replace with confirmed events (and permission to list them) before removing the label.

## Contact details and brand

`src/lib/site.ts` holds the company name, email, phone, WhatsApp, social links, the legal "last updated" date, and the canonical URL fallback. Everything else (footer, contact page, legal pages, JSON-LD) reads from it.

## Planned features (not live)

Shown as "coming soon" or omitted, never simulated:

- M-Pesa deposits and escrow (supplier page note)
- Buyer accounts (profile sign-up form shows "opening soon")
- Rewards and tokens (`/rewards`)
- Supplier tiers (gold/silver/bronze), bidding, job postings, Swahili

When you build one, remove its "coming soon" copy in the same change.
