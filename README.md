# Tandy's Window Services

A five-page marketing site for Tandy's Window Services (Fort Worth, TX) built with Next.js, Tailwind CSS, and GSAP + Lenis for scroll animation.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Home, with a scroll-scrubbed squeegee-wipe hero
- `/services` — all 8 services
- `/about` — brand story, crew, veteran discount
- `/reviews` — testimonials + link to the full Google review list
- `/contact` — full quote form + service-area map

## Quote form email delivery

The quote form on `/contact` (and the compact version on the homepage) posts to `app/api/quote/route.ts`. Until SMTP is configured, submissions are logged to the server console so nothing is lost — but no email is sent. To make it actually deliver, set these environment variables (e.g. in `.env.local`, or in your host's dashboard):

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=you@yourdomain.com
SMTP_PASS=your-smtp-password-or-app-password
QUOTE_TO_EMAIL=where-quotes-should-land@yourdomain.com
```

Any standard SMTP provider works (Gmail with an App Password, SendGrid, Postmark, your host's mail service, etc.).

## Design notes

- Colors, fonts, and shared texture utilities live in `app/globals.css` and `@theme` in the same file.
- The hero's "video scroll-scrubbing" moment is built as an illustrated squeegee-wipe reveal (CSS `clip-path` driven by a GSAP ScrollTrigger `scrub`) rather than real video footage, since no footage of the business's actual work was available — it keeps the same on-scroll mechanic the brief asked for while staying fully vector/CSS (fast, crisp on any screen, no video compression tradeoffs).
- `components/Reveal.tsx` / `RevealStagger.tsx` / `Counter.tsx` all respect `prefers-reduced-motion` and fall back to simple fades.
- Testimonials and the 5.0★/43-review count are the three verified Google reviews from the business brief — no additional reviews were invented.
