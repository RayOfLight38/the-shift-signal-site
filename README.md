# The Shift Signal — Launch Site

**Less Stress. More Pulse.**

A cinematic launch page for The Shift Signal, a nurse-led media community.
React + TypeScript + Vite + Tailwind CSS, deployable to Cloudflare Pages with
zero backend.

---

## Local setup

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
```

## Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve the production build locally
```

The build runs `tsc -b` first, so TypeScript errors fail the build on purpose.

---

## Deploy to Cloudflare Pages

1. Push this project to a GitHub (or GitLab) repository.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git** and select the repo.
3. Use these build settings:

   | Setting                | Value           |
   |------------------------|-----------------|
   | Framework preset       | Vite (or None)  |
   | Build command          | `npm run build` |
   | Build output directory | `dist`          |

   If Cloudflare shows an Advanced setting for environment variables, add:

   | Variable       | Value      |
   |----------------|------------|
   | `NODE_VERSION` | `22.14.0`  |

   This repo also includes `.nvmrc` with `22.14.0` so Cloudflare knows which Node.js version to use.

4. Deploy. Cloudflare builds on every push to your production branch.

### SPA routing (already handled)

`public/_redirects` contains:

```
/* /index.html 200
```

Vite copies it into `dist/` automatically, so `/music`, `/stories`, `/news`,
and `/advancement` work when refreshed or visited directly. Don't delete it.

### Connect TheShiftSignal.com

Since the domain's DNS is already on Cloudflare, this is two clicks per
hostname:

1. In your Pages project: **Custom domains → Set up a custom domain**.
2. Add `theshiftsignal.com` — Cloudflare creates the CNAME record for you.
3. Repeat for `www.theshiftsignal.com`.
4. (Recommended) In **Bulk Redirects** or a redirect rule, send `www` →
   apex (or the reverse — pick one canonical host) with a 301.
5. SSL is automatic; give the certificate a few minutes on first setup.

If DNS lives elsewhere, add a `CNAME` for each hostname pointing at
`<project>.pages.dev`, then complete the custom-domain step in Pages.

---

## Newsletter link

The main hero CTA, navbar CTA, mobile menu CTA, and shared newsletter CTA point to:

```
https://read.theshiftsignal.com/
```

To change that URL later, edit the `JOIN_URL` constants in:

- `src/components/Hero.tsx`
- `src/components/Navbar.tsx`
- `src/components/NewsletterSignup.tsx`

## Updating the content pages

The four main pages live here:

- `/music` → `src/pages/Music.tsx`
- `/stories` → `src/pages/Stories.tsx`
- `/news` → `src/pages/News.tsx`
- `/advancement` → `src/pages/Advancement.tsx`

Edit the text, cards, links, and sections in those files, then commit and push to GitHub.
Cloudflare Pages will automatically rebuild and redeploy the site after each push.

## Optional: connect an embedded newsletter form later

Right now the site links out to the live publication page instead of pretending to collect emails locally. To embed or wire up a form directly on the website:

**Option A — Beehiiv (recommended if your publication is already there)**
- Easiest: replace the form with your Beehiiv **embed form** (Publication →
  Settings → Subscribe forms) — paste the iframe/script into
  `NewsletterSignup.tsx`.
- Cleaner: keep this UI and POST to the Beehiiv API
  (`POST https://api.beehiiv.com/v2/publications/{pubId}/subscriptions`)
  from a **Cloudflare Pages Function** (see Option E) so the API key stays
  server-side. Never put the Beehiiv API key in client code.

**Option B — ConvertKit (Kit)**: POST to
`https://api.convertkit.com/v3/forms/{formId}/subscribe` with the public form
API key, directly from the form's submit handler.

**Option C — Mailchimp**: use an embedded form action URL
(`https://<dc>.list-manage.com/subscribe/post?u=...&id=...`) as a `fetch`
target with `mode: "no-cors"`, or go through a Pages Function for proper
error handling.

**Option D — Substack**: Substack has no public subscribe API; link out to
your `https://<name>.substack.com/subscribe` page or embed their iframe.

**Option E — Cloudflare Pages Function (the production-grade path)**
1. Create `functions/api/subscribe.ts` in this repo.
2. Read the email from the POST body, call your provider's API with a key
   stored as an encrypted **environment variable** in the Pages project
   settings.
3. In `NewsletterSignup.tsx`, replace the local-state `handleSubmit` with a
   `fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) })`
   and keep the same success message.

---

## Project structure

```
src/
  lib/heartbeat.tsx          shared lub-dub clock; syncs heart, streams, EKG, cards
  components/
    Hero.tsx                 full-screen hero: video, heart constellation, CTAs
    BackgroundVideo.tsx      atmosphere video with rAF-driven fade loop
    PulsingHeart.tsx         the glass anatomical heart (SVG, beat-driven)
    LightStreams.tsx         four liquid-light streams + beat comets
    CategoryCard.tsx         glass cards that glow when a stream arrives
    NewsletterSignup.tsx     local-state signup (see TODO above)
    Navbar.tsx / Footer.tsx / PageShell.tsx
  pages/                     Home, Music, Stories, News, Advancement
public/_redirects            SPA routing for Cloudflare Pages
```

## Accessibility & performance notes

- `prefers-reduced-motion` disables the heartbeat clock, stream particles,
  comets, shimmer, and the background video entirely (a calm gradient scene
  takes its place).
- All interactive elements are keyboard-focusable with a visible cyan focus
  ring; nav and cards are semantic links.
- Animation is SVG + Web Animations API on a handful of elements — no 3D
  libraries, no per-frame React renders, no DOM particle swarms.
- If the video fails or autoplay is blocked, a gradient fallback scene keeps
  the hero intact.
