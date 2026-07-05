# Classic Maison — Real Estate Website

Luxury real estate portfolio for **Classic Maison** (@classicmaison on Instagram).
Built with Next.js 14, Tailwind CSS, Prisma (SQLite), and next-intl.

---

## Requirements

- Node.js 18+
- npm

---

## Setup

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Generate Prisma client
DATABASE_URL="file:./dev.db" node_modules/.bin/prisma generate

# 3. Create & migrate the database
DATABASE_URL="file:./dev.db" node_modules/.bin/prisma migrate dev --name init

# 4. Seed with placeholder data
DATABASE_URL="file:./dev.db" node_modules/.bin/ts-node \
  --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

# 5. Start the dev server
DATABASE_URL="file:./dev.db" node_modules/.bin/next dev
```

Site is at **http://localhost:3000** (redirects to `/en` automatically).

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
| `/en/about` | About page |
| `/en/contact` | Contact |
| `/admin` | Admin dashboard |

Swap `en` for any supported language code (see below).

---

## Languages

`en` `sw` `zh` `ru` `fr` `ar` `es` `pt` `de` `ja` `hi` `ko` `it` `nl` `tr`

Translation files are in `/messages/[locale].json`.

---

## Admin Dashboard

Visit `/admin` to manage listings, projects, offers, and inquiries.

- Change a property status (e.g. mark as **SOLD**) → updates live instantly
- Toggle offers on/off with one click
- View and reply to all inquiries

**Default password** (set in `.env.local`): `classicmaison2024` — change before deploying.

---

## Environment Variables (`.env.local`)

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="classicmaison2024"
NEXT_PUBLIC_WHATSAPP_NUMBER="+254700200658"
NEXT_PUBLIC_INSTAGRAM_HANDLE="classicmaison"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## Production Deployment (Vercel)

1. Push the repo to GitHub
2. Import into [vercel.com](https://vercel.com)
3. Set env vars (swap `DATABASE_URL` for a PostgreSQL URL)
4. In `prisma/schema.prisma`, change `provider = "sqlite"` → `provider = "postgresql"`
5. Deploy

---

## Useful Commands

```bash
# Open Prisma Studio (visual DB editor)
DATABASE_URL="file:./dev.db" node_modules/.bin/prisma studio

# Production build
DATABASE_URL="file:./dev.db" node_modules/.bin/next build

# Re-seed the database
DATABASE_URL="file:./dev.db" node_modules/.bin/ts-node \
  --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```
