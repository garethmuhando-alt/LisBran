# Product

<!-- impeccable:product-schema 1 -->

Source: "LisBran App" product brief (PDF supplied by the owner, 2026-09-30) plus the current codebase.

## Platform

web

Mobile-first. The brief targets phones first (it originally specified a native app); this Next.js site is the product today and must work equally well on desktop.

## Users

- **Primary — marketers buying marketing services and materials.** Brand and marketing staff at Kenyan corporates and FMCG companies who need printing, design, activations, influencers or consultancy, often against a deadline. Their job: find a trustworthy supplier fast, compare prices, and get it delivered — sometimes overnight.
- **Secondary — service providers.** Designers, printers, marketing agencies, marketing consultants and influencers who build a profile with portfolio and contact details so buyers can review them and reach out. Agencies also use LisBran to hand overflow work to freelancers when overwhelmed.

## Product Purpose

"Make marketing procurement fast and reliable by offering a wide range of supplier choices and immediate price comparisons." Taglines in the brief: *Your marketing needs all in one place*; *The agency of marketing agencies*; *A search engine for marketing services and materials*.

Success: a buyer searches, compares tiered suppliers, and connects with the right one in minutes; suppliers win deals they would not have found.

## Positioning

A Kenya-specific procurement marketplace for marketing — not a general gig site. Suppliers are **verified** and **tiered by urgency and budget** (standard vs overnight/ultra-urgent at a premium; low/medium/premium budget), so a buyer with a rush FMCG job can find an overnight printer. Contact is local and direct (WhatsApp/phone), in Nairobi, Mombasa and other cities.

## Operating Context

Journey: open site → sign in / sign up → search for a service → link with a service provider.

Services: graphic design; printing; marketing consultancy; marketing agencies' ballpark services; influencers; marketing activations; brand ambassador sourcing; dancers for activations. Plus an events map of activations around Kenya and a marketing ideas/trends section.

## Capabilities and Constraints

Live in the codebase today: home search, service categories, supplier profiles (portfolio, rating, WhatsApp contact), seller onboarding, events map (Google Maps), trends, rewards/surveys, admin approval screen, dark/light theme, intro brand video.

Planned (from the brief — do not present as live): buyer/supplier accounts with ID/NITA verification; urgency and budget filters; real-time availability; quote chat; M-Pesa/PesaPal payments and escrow; urgent-premium pricing (+20–50%); gold/silver/bronze supplier tiers; bidding on posted projects; job postings; push notifications; Swahili support; analytics dashboard.

Open decisions: exact tier criteria and pricing; commission rate (brief suggests 5–15%); subscription pricing (brief suggests KSh 500/month pilot).

## Brand Commitments

- Name **LisBran**; operated by LisBran Marketing, Nairobi.
- Logo: the "B" mark (white and black PNGs in `/public`) and the LisBran wordmark.
- Intro video (`/public/video/lisbran-intro-*`) — brand-owned; its own palette is magenta/violet on near-black. Its lines: "Where identity meets intention", "We build brands with depth and design with purpose", "It all starts here, with us", "Ready to think differently?"
- Service artwork: `/public/icon-graphic.png`, `/public/icon-marketing.png`, `/public/icon-printing.png`.
- Owner requirements: no emojis anywhere; must not look AI-generated; full-width layout; consistent navigation across every page; working dark and light themes.

## Evidence on Hand

- Contact: info@lisbranmarketing.com, 0710 147 123, WhatsApp +254 710 147 123; Instagram and LinkedIn `lisbranmarketing`.
- Vendor names, ratings and events in the code are **sample data**. There are no real testimonials, client logos, counts or press. Do not invent statistics (vendor counts, deal volumes) or reviews.

## Product Principles

1. **Speed to the right supplier.** Every screen should shorten search → compare → contact.
2. **Trust is the product.** Verification, tiers and honest pricing signals matter more than decoration.
3. **Built for Kenya.** Local cities, WhatsApp and M-Pesa norms, KES pricing, English now with Swahili later.
4. **Honest about what is live.** Planned features are labelled or absent, never faked.

## Accessibility & Inclusion

Mobile-first on mid-range Android phones and variable networks: keep pages light, respect Save-Data and reduced motion. Target WCAG 2.2 AA contrast in both themes.
