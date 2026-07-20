# Hayat+ Heart Tonic

A premium, fully responsive landing page for Hayat+, a herbal wellness brand, built around a single flagship product: Hayat+ Heart Tonic.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Icons (Feather outline set)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Structure

- `src/app` — root layout, global styles, page composition
- `src/components/sections` — one component per landing page section (Hero, Ingredients, Why Choose, Product Showcase, How to Use, Nutrition, About, Testimonials, FAQ, Contact)
- `src/components/layout` — Header and Footer
- `src/components/ui` — shared primitives (Button, Container, SectionHeading, FadeIn)
- `src/components/illustrations` — bottle and botanical SVG illustrations
- `src/lib/data.ts` — content data (ingredients, benefits, testimonials, FAQs, contact info)
