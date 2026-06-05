# Invytt

Marketing site and waitlist for **Invytt** — the all-in-one platform for hosting events. One place to manage guests, AI-driven inventory estimates, budgets, vendor bookings, and cost-splitting.

This repo contains the public landing page (Next.js) and the Supabase edge function that backs the email waitlist.

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **Motion** for animations, **lucide-react** for icons, **@xyflow/react** for flow diagrams, **@dicebear** for avatars
- **Supabase Edge Functions** (Deno) for the subscribe endpoint
- **Vitest** + **Testing Library** (jsdom) for tests

## Project structure

```
app/                  Next.js App Router
  page.tsx            Landing page composition
  layout.tsx          Root layout
  data.ts             Site content (event info, FAQ, marquee, cards)
  globals.css         Global styles / Tailwind entry
components/            Page sections (Hero, FAQ, HowItWorks, Footer, …)
  ui/                 Reusable UI primitives (button, beams, cards, …)
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

Prerequisites: Node 18+, npm, and [Git LFS](https://git-lfs.github.com) (the hero video `public/vid1.mp4` is stored via LFS — without it you get a text pointer instead of the file).

Install Git LFS once per machine, then clone:

```bash
git lfs install
git clone https://github.com/Invytt/landing_page.git
```

Already cloned without LFS? Pull the real files:

```bash
git lfs install
git lfs pull
```

Install dependencies:

```bash
npm install
```

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

The function uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (set in the Supabase project, not in `.env.local`).

### Deploying the edge function

```bash
supabase functions deploy subscribe
```

## Testing

Tests sit next to source (`*.test.ts` / `*.test.tsx`) and run under jsdom. Coverage includes the waitlist client, countdown logic, nav, and responsive behavior. The edge function has its own Deno test (`handler_test.ts`).

```bash
npm run test
```
