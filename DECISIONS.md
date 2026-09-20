# DECISIONS.md

## How the project is structured, and why
The application is built using **Next.js (App Router)** and **Tailwind CSS**. 
- **`src/app/`**: Contains the route definitions (`/menu`, `/cart`, `/booking`, `/profile`, `/favorites`, etc.). This leverages Next.js file-based routing for clean, easily navigable code.
- **`src/components/`**: Houses all reusable UI elements (e.g., `Navbar`, `Footer`, `Hero`, `FavoriteButton`). Keeping UI modular ensures a consistent design system and easier maintenance.
- **`src/context/`**: Contains `CartContext.jsx`, which acts as the centralized store for the frontend state.
- **`src/data/`**: Holds the local mock data (`menu.js`, `user.js`) since there is no backend.

**Why:** This structure separates concerns cleanly. Routing is decoupled from UI components, and global state is abstracted away from individual pages, making the codebase highly scalable and readable.

## Three decisions made, and what was chosen
1. **State Management (Context API vs Redux):** 
   *Choice:* **React Context API**. 
   *Reasoning:* Since this is a frontend-only application with straightforward state requirements (Cart, Favorites, Mock Bookings), Redux would introduce unnecessary boilerplate. Context is lightweight and native to React.
2. **Data Persistence (`localStorage`):** 
   *Choice:* Syncing Context state with **`localStorage`**. 
   *Reasoning:* To simulate a real application experience without a database, saving the cart and favorites to `localStorage` ensures data persists across page reloads and tab closures, preventing frustrating data loss for the user.
3. **Styling Approach (Tailwind + CSS Variables):** 
   *Choice:* **Tailwind CSS** combined with CSS variables (e.g., `var(--background)`) and a configured `accent` color in `tailwind.config.js`. 
   *Reasoning:* This enabled rapid, highly customized UI development (like complex glassmorphism and strict dark themes) while maintaining a single source of truth for the brand's primary colors.

## What is unfinished, or what would be done differently with more time
- **Real Backend & Authentication:** Currently, the user profile and checkout flow rely purely on mock data and local state. With more time, I would implement a real database (e.g., PostgreSQL or MongoDB) and secure authentication (e.g., NextAuth) for genuine user sessions.
- **Advanced Form Validation & Error Handling:** The booking and checkout forms are currently simple. I would add robust schema validation (like Zod + React Hook Form) and better error states for edge cases (e.g., network failures, invalid credit cards).

## Why the extra feature (Favorites/Wishlist) was picked
I chose to implement a **Favorites / Wishlist** feature because it is a highly natural extension for a restaurant ordering platform. 
- **Returning Customers:** Diners are creatures of habit. A favorites list acts as a personalized quick-access menu, allowing them to instantly re-order their "usual" without browsing.
- **Exploration & Retention:** When a user browses a large menu, they may see multiple appealing items but only want to order one today. Favoriting allows them to bookmark dishes for their *next* visit, which encourages repeat business and improves overall user retention.
