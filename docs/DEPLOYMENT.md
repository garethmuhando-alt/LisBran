# Deployment and launch checklist

## Vercel

1. Import the GitHub repository in Vercel (framework: Next.js; defaults are fine).
2. Add the environment variables from [`.env.example`](../.env.example) for **Production** and **Preview**:
   `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_KEY`.
3. Attach the domain (e.g. `lisbranmarketing.com`) and redirect `www` to the apex (or the reverse — keep `NEXT_PUBLIC_SITE_URL` matching).
4. Deploy. `next build` type-checks; run `npm run lint` in CI as well.

## What the build already provides

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards; `sitemap.xml`, `robots.txt`, web app manifest, icons, Organization/WebSite JSON-LD.
- Security headers in `next.config.ts`: Content-Security-Policy (allows only self, Google Maps and Supabase), HSTS with preload, `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, restrictive permissions policy.
- Long-lived caching for `/video/*` (1 year, immutable) and images.
- Custom 404 and error pages.

If you add analytics, a chat widget or another third party, **add its origins to the CSP** in `next.config.ts` and update the Cookie Policy (and switch the cookie notice to opt-in consent).

## Launch checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain; check `/sitemap.xml` and page source canonical links.
- [ ] Supabase migration applied and RLS verified ([SUPABASE.md](SUPABASE.md)); at least one admin created.
- [ ] Google Maps key restricted to your domain (HTTP referrer) and to the Maps JavaScript API.
- [ ] Sample suppliers and events replaced or clearly still labelled ([CONTENT.md](CONTENT.md)).
- [ ] Legal pages reviewed by a Kenyan advocate; confirm whether LisBran must register with the ODPC as a data controller (direct-marketing businesses generally must).
- [ ] Contact details in `src/lib/site.ts` correct (email, phone, WhatsApp, socials).
- [ ] Submit the sitemap in Google Search Console.
- [ ] Test on a mid-range Android phone on mobile data: the intro film should start within a second or two, or show its poster on Save-Data.

## Replacing the intro video

Keep the master outside the repo. From the master file, create the four web encodes and the poster (requires `ffmpeg`), using **new file names** because the old ones are cached for a year:

```bash
IN="Final Intro.mp4"; OUT=public/video; V=v2
ffmpeg -i "$IN" -an -vf "scale=1280:-2,fps=25" -c:v libx264 -profile:v high -preset slow -crf 27 -maxrate 1800k -bufsize 3600k -pix_fmt yuv420p -movflags +faststart $OUT/lisbran-intro-$V-720.mp4
ffmpeg -i "$IN" -an -vf "scale=854:-2,fps=25"  -c:v libx264 -profile:v main -preset slow -crf 28 -maxrate 900k -bufsize 1800k -pix_fmt yuv420p -movflags +faststart $OUT/lisbran-intro-$V-480.mp4
ffmpeg -i "$IN" -an -vf "scale=1280:-2,fps=25" -c:v libvpx-vp9 -crf 38 -b:v 0 -deadline good -cpu-used 2 -row-mt 1 $OUT/lisbran-intro-$V-720.webm
ffmpeg -i "$IN" -an -vf "scale=854:-2,fps=25"  -c:v libvpx-vp9 -crf 40 -b:v 0 -deadline good -cpu-used 2 -row-mt 1 $OUT/lisbran-intro-$V-480.webm
ffmpeg -ss 10 -i "$IN" -frames:v 1 -vf "scale=1280:-2" -q:v 4 $OUT/lisbran-intro-$V-poster.jpg
```

Then update the file names in `src/components/ui/BackgroundVideo.tsx` (sources and `INTRO_POSTER`).
