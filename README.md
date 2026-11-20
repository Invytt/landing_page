# Invytt

Marketing site and waitlist for **Invytt** — the all-in-one platform for hosting events. One place to manage guests, AI-driven inventory estimates, budgets, vendor bookings, and cost-splitting.

This repo contains the public landing page (Next.js) and the Supabase edge function that backs the email waitlist.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **Motion** for scroll scenes and animation, **three** for the hero's 3D phone, **lenis** for smooth scrolling, **lucide-react** for icons
- **Supabase Edge Functions** (Deno) for the subscribe endpoint
- **Vitest** + **Testing Library** (jsdom) for tests

## Project structure

```
app/                  Next.js App Router
  page.tsx            Landing page composition
  layout.tsx          Root layout
  data.ts             Site content (pillars, steps, games, FAQ, marquee, cards)
  globals.css         Ember theme tokens, sticker styles, keyframes
  fonts/              Instrument Sans + Instrument Serif, self-hosted
  m/[code]/           Meet links (profile QR) forwarded to Supabase
  .well-known/        App-link association files, forwarded to Supabase
  dev/screens/        Dev-only sheet of every app screen (404 in production)
components/            Page sections, in page order: Hero, Problem, Pillars,
                      Steps, InsideApp, PartyLive, GuestWeb, About, FAQ,
                      TicketCTA (waitlist), Footer
  screens/            Web rebuilds of the app's screens, shown in phone frames
  site/               Loader, smooth scroll, cursor, progress line, 3D hero scene
  ui/                 Sticker kit (kit.tsx) and device frames (phone.tsx)
lib/                  Logic + helpers
  waitlist.ts         subscribe() client — POSTs email to edge function
  countdown.ts        Countdown timer logic
  utils.ts            cn() and shared helpers
supabase/
  functions/subscribe Deno edge function (handler + tests)
  config.toml         Supabase function config
test/                 Vitest setup
public/               Static assets (images, etc.)
```

## Getting started

Prerequisites: Node 18+ and npm.

```bash
git clone https://github.com/Invytt/landing_page.git
npm install
```

> Note: the hero film `public/hero.mp4` is the app's lit-windows splash video (720p, no audio, about 1 MB). Re-encode any replacement the same way (e.g. `ffmpeg -i in.mp4 -vf scale=720:-2 -c:v libx264 -crf 28 -an -movflags +faststart public/hero.mp4`) and replace `public/hero-poster.jpg` with its first frame.
>
> The screen on the hero's 3D phone is an image, `public/app/hero-screen.png`. To refresh it after changing `EventScreen`, run `npm run dev`, open `/dev/screens`, and capture the first screen (`#shot`) at 3x.

Create `.env.local`:

```bash
# URL of the deployed Supabase `subscribe` edge function
NEXT_PUBLIC_SUBSCRIBE_URL=https://<project>.supabase.co/functions/v1/subscribe
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint (`eslint-config-next`) |
| `npm run test` | Run tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

## Editing site content

Most copy lives in `app/data.ts` — event details, marquee items, "who it's for" cards (`SPEAKERS`), and the FAQ list. Edit there rather than hardcoding strings in components.

## Waitlist flow

1. Visitor submits an email in the UI.
2. `lib/waitlist.ts` `subscribe()` POSTs `{ email }` to `NEXT_PUBLIC_SUBSCRIBE_URL`.
3. The Supabase edge function (`supabase/functions/subscribe`) inserts the email into the `User` table, returning:
   - `201` + `success` → new signup
   - `409` + `alreadyExists` → duplicate
   - otherwise → error

The function uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (set in the Supabase project as secrets, not in a local env file). See `.env.example` for the full variable reference and which file each one belongs in.

### Deploying the edge functions

Both functions are called without a Supabase JWT — the browser form has no auth header, and the mail worker authenticates its caller with the `x-cron-secret` header — so both must be deployed with `--no-verify-jwt`:

```bash
supabase functions deploy subscribe --no-verify-jwt
supabase functions deploy send-waitlist-emails --no-verify-jwt
```

## Testing

Tests sit next to source (`*.test.ts` / `*.test.tsx`) and run under jsdom. Coverage includes the waitlist client, countdown logic, nav, and responsive behavior. The edge function has its own Deno test (`handler_test.ts`).

```bash
npm run test
```
