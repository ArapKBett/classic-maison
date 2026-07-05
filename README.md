# Classic Maison — Real Estate Website

Luxury real estate portfolio for **Classic Maison** (@classicmaison on Instagram).
Built with Next.js 14, Tailwind CSS, Prisma, and next-intl (15 languages).

---

## Local Development

### Requirements
- Node.js 18+
- npm

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/ArapKBett/classic-maison.git
cd classic-maison

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Copy env file and edit values
cp .env.example .env.local

# 4. Generate Prisma client
DATABASE_URL="file:./dev.db" node_modules/.bin/prisma generate

# 5. Create & migrate the database
DATABASE_URL="file:./dev.db" node_modules/.bin/prisma migrate dev --name init

# 6. Seed with placeholder data
DATABASE_URL="file:./dev.db" node_modules/.bin/ts-node \
  --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

# 7. Start the dev server
DATABASE_URL="file:./dev.db" node_modules/.bin/next dev
```

Site is at **http://localhost:3000** — auto-redirects to `/en`.

---

## Deploying to Render

The `render.yaml` in this repo configures everything automatically.

### Steps

1. **Switch database provider** — in `prisma/schema.prisma` change:
   ```prisma
   provider = "sqlite"   →   provider = "postgresql"
   ```
   Then commit and push.

2. **Create a Render account** at [render.com](https://render.com)

3. **New → Blueprint** → connect this GitHub repo
   Render reads `render.yaml` and creates:
   - A **Web Service** (Next.js app)
   - A **PostgreSQL database** (free tier)

4. **Set these env vars manually** in the Render dashboard:
   - `ADMIN_PASSWORD` — your chosen admin password
   - `NEXT_PUBLIC_SITE_URL` — your Render URL (e.g. `https://classic-maison.onrender.com`)

5. Click **Deploy** — Render will:
   - Run `npm install && npm run build`
   - Run `prisma migrate deploy` before start
   - Serve the app on your `.onrender.com` URL

### Render Pricing

| Service | Plan | Cost |
|---|---|---|
| Web Service | Free (sleeps after inactivity) | $0 |
| Web Service | Starter (always on) | $7/mo |
| PostgreSQL | Free (90-day limit, 0.5 GB) | $0 |
| PostgreSQL | Basic (persistent) | $7/mo |

**Recommended for production: Starter + Basic = ~$14/mo**

---

## Site Map

| URL | Page |
|---|---|
| `/en` | Homepage |
| `/en/listings` | All properties |
| `/en/listings/residential` | Residential |
| `/en/listings/commercial` | Commercial |
| `/en/listings/land` | Land & Plots |
| `/en/listings/luxury` | Luxury |
| `/en/listings/rentals` | Rentals |
| `/en/listings/industrial` | Industrial |
| `/en/listings/[slug]` | Property detail |
| `/en/projects` | Upcoming projects |
| `/en/offers` | Special offers |
| `/en/about` | About |
| `/en/contact` | Contact |
| `/admin` | Admin dashboard |

Replace `en` with any supported language code.

---

## Languages

`en` `sw` `zh` `ru` `fr` `ar` `es` `pt` `de` `ja` `hi` `ko` `it` `nl` `tr`

Translation files: `/messages/[locale].json`

---

## Admin Dashboard

Visit `/admin` — manage listings, projects, offers, and inquiries.

- Mark a property **SOLD/RENTED** → status + timestamp update instantly
- Toggle offers active/inactive with one click
- View all inquiries and reply via email or WhatsApp

Set `ADMIN_PASSWORD` in your env file before going live.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
DATABASE_URL="file:./dev.db"                   # PostgreSQL URL in production
ADMIN_PASSWORD="change-me"
NEXT_PUBLIC_WHATSAPP_NUMBER="+254700200658"
NEXT_PUBLIC_INSTAGRAM_HANDLE="classicmaison"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## Useful Commands

```bash
# Visual database editor
DATABASE_URL="file:./dev.db" node_modules/.bin/prisma studio

# Production build check
DATABASE_URL="file:./dev.db" node_modules/.bin/next build

# Re-seed placeholder data
DATABASE_URL="file:./dev.db" node_modules/.bin/ts-node \
  --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```
