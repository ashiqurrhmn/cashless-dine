# DECISIONS.md

## How the project is structured, and why

I went with a pretty standard Next.js App Router setup, but I was intentional about how I split things up:

- **`src/app/`** handles all the routes — `/menu`, `/booking`, `/cart`, `/checkout`, `/profile`, `/favorites`, `/contact`. I kept each page in its own folder. The App Router's file-based routing made this natural, and it means I can add metadata (like SEO titles) per-page easily using `export const metadata`.

- **`src/components/`** is where all the reusable UI lives. Things like the `Navbar`, `Footer`, `BookingForm`, `FoodCard`, `FavoriteButton` — anything that appears in more than one place or is complex enough to warrant its own file. I tried to keep components focused: `BookingForm` handles the multi-step reservation wizard, `FoodCard` handles rendering a single menu item, etc.

- **`src/context/CartContext.jsx`** is the single global state container. It manages the cart, order history, reservations, and favorites all in one place. I could've split this into multiple contexts, but honestly for a frontend-only app of this size, one context kept things simpler and avoided provider nesting hell.

- **`src/data/`** holds all the mock data — menu items, restaurant tables, existing reservations, and user info. Since there's no backend, this is my "database." I kept it separate from the components so it's easy to swap out later if someone wanted to connect a real API.

- **`src/lib/booking.js`** contains the pure availability logic — no React, no side effects. Functions like `findAvailableTable()`, `getOccupiedTableIds()`, and the timezone utilities live here. I deliberately separated this from the UI code because it makes the booking algorithm testable on its own and keeps `BookingForm.jsx` from becoming even more massive.

The reasoning behind this structure is mostly about clarity. When I'm debugging why a time slot isn't showing up correctly, I know to look in `lib/booking.js`. When the layout is broken, it's in the component. When data looks wrong, it's in `data/`. That separation has saved me time more than once during development.

## Three decisions I had to make, and what I chose

**1. Context API vs. Redux for state management**

I went with React's built-in Context API. Redux would've given me devtools and middleware, which are nice, but this app doesn't have the kind of deeply nested state updates or complex async flows that make Redux worth the extra boilerplate. The state shape is straightforward — cart items, favorites list, reservation history, order history — and Context handles that cleanly. I also sync everything to `localStorage` so the app state survives page reloads and tab closures, which gives a realistic feel without needing a backend.

**2. How to handle the reservation availability system**

This was the trickiest one. The brief specifically called out "awkward cases" — what happens when all tables are booked, when someone picks a past date, when a party of 20 tries to book. I needed a deterministic system, not random availability.

I chose to build a layered approach: a fixed table inventory (12 tables with specific capacities from 2-seat to 12-seat), a set of mock reservations that create specific scenarios (fully booked evening, no large tables available, etc.), and a `findAvailableTable()` function that walks through unoccupied tables smallest-first to find the best fit. On top of that, I added timezone-aware time-slot validation using `Intl.DateTimeFormat` with `Asia/Dhaka` so that past time slots are correctly disabled even if the user's browser is in a different timezone.

The alternative was to use random availability or simple flags, but that wouldn't produce the realistic edge cases the assessment was looking for. With this approach, I can point to a specific date/time and know exactly what the user will see.

**3. CSS variables + Tailwind hybrid approach for theming**

I defined the core brand colors (`--accent: #e84b2b`, `--background: #0a0a0a`) as CSS custom properties in `globals.css` and then mapped them into Tailwind's `@theme` configuration. This means I can use `bg-accent` or `text-accent` anywhere in Tailwind classes, but the actual color values live in one place. If I ever need to support a light theme or let the restaurant customize their brand color, I only change the CSS variables and everything updates automatically.

I also paired two serif fonts — Playfair Display for headings and Libre Baskerville for body — loaded through `next/font/google` for zero layout shift. I considered using a sans-serif for body text (it's more conventional), but the serif pairing gives CashlessDine a premium editorial feel that fits a high-end dining brand.

## What is unfinished, or what I'd do differently with more time

- **Real backend and authentication.** Right now the profile page shows a hardcoded mock user and everything lives in `localStorage`. With more time I'd set up a database (mongoDB) and add BetterAuth for proper user sessions. The architecture is already set up for this — the context layer acts as an abstraction over the data, so swapping `localStorage` for API calls would be mostly contained to `CartContext.jsx`.

- **Automated testing.** I manually verified the edge cases (fully booked scenarios, past date rejection, party-too-large handling, time-slot expiry), but there are no unit tests. The booking logic in `lib/booking.js` is pure functions with no side effects, so it's very testable — I just ran out of time. I'd add Jest tests for `findAvailableTable()` and `parseTimeToMinutes()` at minimum.


## Why I picked the Favorites/Wishlist as the extra feature

I chose a Favorites system because it's probably the most natural extension for a restaurant ordering app, and it touches several parts of the codebase in interesting ways.

From a product perspective: diners are creatures of habit. When someone finds a dish they love, they want to find it again quickly next time. A favorites list acts like a personalized shortcut menu. It also handles the opposite case — when someone is browsing a large menu and sees multiple things they want but can only order one tonight. Favoriting lets them bookmark the rest for later, which encourages repeat visits.

From a technical perspective: it required me to extend the global context, add localStorage persistence for a new data type, create a dedicated `/favorites` page with its own empty state, and build a reusable `FavoriteButton` component with a satisfying toggle animation that works from both the menu grid and individual food detail pages. It's a small feature in terms of user-facing complexity, but it exercises the full stack of concerns — state management, persistence, routing, component composition, and responsive design.
