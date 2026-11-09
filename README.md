# Fleurisence

A concept online flower shop, redesigned from the ground up with calm motion and a soft, editorial look.
It's a front-end portfolio project: there's no backend, and nothing is really sold or shipped.

## What's inside

- **Landing page** (public): hero, mission & vision, featured products, categories, delivery steps, reviews, studio story
- **Sign in**: Continue with Google / Apple (demo) or email. Shopping needs an account, so the shop, checkout and profile pages are behind a sign-in gate that sends you back to where you were headed
- **Home** (signed in): a personal greeting, your latest order with a tracker, new arrivals, and shortcuts by occasion
- **Shop**: 15 products in three categories (bouquets, plants, candles & gifts) with occasion filters, search and sort. The filters live in the URL, so a filtered view can be shared or bookmarked
- **Product page**: sizes for bouquets, delivery date, card message, care tips, reviews, related items
- **Bag, checkout and order confirmation**: free-delivery progress, a 3-step checkout with friendly validation, the promo code `BLOOM10`, and "Send to myself"
- **Profile & settings**: order history, saved details, notification toggles, a motion setting (match device / calm / full), and clear-data / delete-account options
- **About us**, a photo credits page, a phone menu, and a 404 page

## Design decisions

- **Calm motion.** One easing curve, slow fades, small movements. Every animation respects the device's reduced-motion setting, and users can also turn it down in Settings
- **Account-first shopping.** The landing and about pages stay public so people can browse the brand before signing up. Google/Apple buttons make signing up a single tap
- **Honest demo.** Demo sign-in, payments and reviews are clearly labelled as such
- **Accessible by default.** Real buttons and links, visible focus rings, labelled form errors, `aria-pressed` / `role="switch"` on toggles

## Built with

React 19, Vite, Tailwind CSS v4, Motion, React Router. Data is saved in `localStorage`.

## Run it

```bash
npm install
npm run dev
```

Photos are from [Pexels](https://www.pexels.com). See [PHOTO-CREDITS.md](PHOTO-CREDITS.md).
