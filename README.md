# Hayat+ Heart Tonic

A premium, fully responsive landing page and ordering flow for Hayat+, a herbal wellness brand, built around a single flagship product: Hayat+ Heart Tonic.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Icons (Feather outline set)
- Postgres (order storage + admin dashboard)
- Resend (optional order notification emails)

## Getting Started

```bash
npm install
cp .env.example .env.local # then fill in DATABASE_URL and ADMIN_PASSWORD, see below
npm run db:setup           # creates the orders table (only needed once)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Ordering Flow

`/product` → `/cart` → `/checkout` → `/order-confirmation`

There's no payment gateway — checkout collects shipping details and a
payment method (Cash on Delivery or Advance Payment). For Advance
Payment, the confirmation page shows bank transfer details and a
WhatsApp button so the customer can send a payment screenshot for
manual confirmation. Cart state lives in `localStorage` via
`src/lib/cart-context.tsx`.

Orders are submitted to `POST /api/orders`, which generates an order
number, saves the order to Postgres (see below), and — if
`RESEND_API_KEY` is set — emails the store owner and customer. Both the
database write and the email are best-effort: if `DATABASE_URL` or
`RESEND_API_KEY` aren't configured yet, orders still go through fine,
they just won't show up in the admin dashboard / inbox until you add them.

**Before launch, replace the placeholders in `src/lib/data.ts`:**
`productSizes` (real prices) and `bankDetails` (real bank account info).

## Admin Dashboard

`/admin` — password-protected (see `ADMIN_PASSWORD` below) — lists every
order with customer/shipping details, items, total, and a status
dropdown (new → confirmed → shipped → delivered, or cancelled). This is
where you'll see and manage everything customers submit at checkout.

### One-time setup

1. Create a free Postgres database — [Neon](https://neon.tech) or
   [Supabase](https://supabase.com) both work well and have generous free
   tiers. Copy the connection string.
2. In `.env.local` (or your host's environment variables), set:
   - `DATABASE_URL` — the Postgres connection string from step 1
   - `ADMIN_PASSWORD` — a password of your choosing for `/admin`
3. Run `npm run db:setup` once to create the `orders` table (safe to
   re-run; it won't touch existing data).

Without `DATABASE_URL` set, `/admin` will load but always show "No
orders yet" since nothing is being saved. Without `ADMIN_PASSWORD` set,
`/admin` can't be logged into at all.

## Structure

- `src/app/(site)` — the public site: landing page, `/product`, `/cart`, `/checkout`, `/order-confirmation` (all share the marketing Header/Footer via this route group's layout)
- `src/app/admin` — password-protected order dashboard (`/admin`, `/admin/login`), own minimal layout with no public nav
- `src/app/api` — `/api/orders` (place an order), `/api/admin/*` (login, logout, list/update orders)
- `src/middleware.ts` — redirects unauthenticated requests to `/admin/*` to the login page
- `src/components/sections` — one component per landing page section (Hero, Problems, Why Choose/Formula, Feature Row, Care Banner, About, FAQ, Contact)
- `src/components/layout` — Header (with cart icon) and Footer
- `src/components/product` — product buy box (size/qty/add-to-cart)
- `src/components/ui` — shared primitives (Button, Container, SectionHeading, FadeIn)
- `src/components/illustrations` — botanical SVG illustrations
- `src/lib/data.ts` — content data (ingredients, benefits, testimonials, FAQs, contact info, product/pricing, bank details)
- `src/lib/cart-context.tsx` — cart state (localStorage-backed)
- `src/lib/db.ts` — lazy Postgres connection (returns null if `DATABASE_URL` isn't set)
- `src/lib/orders.ts` / `src/lib/order-types.ts` — order persistence, email templates, and the shared types used by both server code and the admin dashboard UI
- `src/lib/admin-auth.ts` / `src/lib/admin-guard.ts` — password check + signed session cookie for `/admin`
- `db/schema.sql` — the `orders` table definition (applied via `npm run db:setup`)
