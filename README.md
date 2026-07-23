# Hayat+ Heart Tonic

A premium, fully responsive landing page and ordering flow for Hayat+, a herbal wellness brand, built around a single flagship product: Hayat+ Heart Tonic.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Icons (Feather outline set)
- Resend (optional order notification emails)

## Getting Started

```bash
npm install
cp .env.example .env.local # optional — see below
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
number and — if `RESEND_API_KEY` is set — emails the store owner and
customer. Without the key, orders still work; email sending is skipped.

**Before launch, replace the placeholders in `src/lib/data.ts`:**
`productSizes` (real prices) and `bankDetails` (real bank account info).

## Structure

- `src/app` — routes: landing page, `/product`, `/cart`, `/checkout`, `/order-confirmation`, `/api/orders`
- `src/components/sections` — one component per landing page section (Hero, Problems, Why Choose/Formula, Feature Row, Care Banner, About, FAQ, Contact)
- `src/components/layout` — Header (with cart icon) and Footer
- `src/components/product` — product buy box (size/qty/add-to-cart)
- `src/components/ui` — shared primitives (Button, Container, SectionHeading, FadeIn)
- `src/components/illustrations` — botanical SVG illustrations
- `src/lib/data.ts` — content data (ingredients, benefits, testimonials, FAQs, contact info, product/pricing, bank details)
- `src/lib/cart-context.tsx` — cart state (localStorage-backed)
- `src/lib/orders.ts` — order number generation + email templates
