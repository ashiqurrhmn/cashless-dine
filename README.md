<div align="center">

# 🍽️ CashlessDine

### Experience Exquisite Cuisine. Pay Seamlessly.

A **modern, premium restaurant application** featuring an elegant dark-theme UI, seamless cashless ordering flow, dynamic cart management, and a buttery-smooth browsing experience.

&nbsp;

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

&nbsp;

🌍 [**Live Demo**](https://cashless-dine.vercel.app/) &nbsp;·&nbsp; 📦 [**Client Repo**](https://github.com/ashiqurrhmn/cashless-dine)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Why CashlessDine Stands Out](#-why-cashlessdine-stands-out)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 Overview

**CashlessDine** is a frontend-first restaurant ecosystem designed to provide diners with a frictionless, high-end digital experience. Built with Next.js 16's App Router and styled with Tailwind CSS, it delivers a stunning visual journey — from browsing expertly curated menus to managing a favorites wishlist and seamlessly checking out, all without the need for cash.

---

## ✨ Why CashlessDine Stands Out

| | Feature | Description |
|---|---|---|
| 🎨 | **Premium Dark-Mode UI** | A luxurious aesthetic using a pure black base, glassmorphic cards, and vibrant accent colors. |
| ⚡ | **Next.js 16 App Router** | Blazing-fast page loads utilizing modern React Server Components and file-based routing. |
| 🪶 | **Lenis Smooth Scrolling** | Buttery-smooth, momentum-based scrolling implemented globally across the application. |
| 🛒 | **Dynamic Cart Management** | Global state management via Context API and `localStorage` for instant, persistent cart updates. |
| ❤️ | **Favorites & Wishlist** | Bookmark favorite dishes directly from the menu for quick access on your next visit. |
| 🍱 | **Bento-Box Layouts** | Modern, responsive grid systems for showcasing features and menu highlights beautifully. |
| ✨ | **Framer Motion Animations** | Elegant reveal animations, staggered fade-ups, and smooth hover transitions. |

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.x | App Router, File-based routing |
| **React** | 19.x | UI library with concurrent features |
| **Tailwind CSS** | 4.x | Utility-first responsive styling |
| **Framer Motion** | 11.x | Page transitions, hover effects, micro-animations |
| **Lenis** | Latest | Hardware-accelerated smooth scrolling |
| **React Hot Toast**| Latest | Sleek, customizable notification toasts |
| **React Icons** | 5.x | Comprehensive icon library (Ionicons) |

---

## 🔑 Key Features

### 🍽️ Interactive Menu & Food Discovery
- Categorized, visually rich menu layouts.
- Dedicated detail pages for each food item.
- **Favorites System**: Instantly toggle and save favorite meals to a dedicated `/favorites` page.

### 💳 Seamless Cart & Checkout
- Persistent cart state across sessions using `localStorage`.
- Real-time cart total calculations.
- Clean, frictionless checkout flow simulating a cashless transaction.

### 📅 Booking & Reservations
- Intuitive reservation forms for booking tables for private events or regular dining.
- Form validation and instant user feedback via toast notifications.

### 💅 UI/UX & Design
- **Glassmorphism**: Elegant translucent surfaces with `backdrop-blur` and subtle borders.
- **Typography**: Paired serif (Playfair Display, Libre Baskerville) and sans-serif fonts for a high-end editorial feel.
- Responsive design tailored for mobile, tablet, and desktop viewports.

---

## 📁 Project Structure

```
cashless-dine/
├── src/
│   ├── app/
│   │   ├── (routes)/               
│   │   │   ├── menu/               # Full menu and dynamic [id] detail routes
│   │   │   ├── cart/               # Shopping cart management
│   │   │   ├── checkout/           # Simulated payment flow
│   │   │   ├── booking/            # Table reservation system
│   │   │   ├── favorites/          # Wishlist / saved items
│   │   │   ├── profile/            # User account mockup
│   │   │   └── contact/            # Support and contact info
│   │   ├── layout.js               # Root layout with Providers & Lenis
│   │   ├── page.js                 # Landing page
│   │   └── globals.css             # Tailwind base & CSS variables
│   ├── components/
│   │   ├── Navbar.jsx              # Global navigation
│   │   ├── Footer.jsx              # Global footer
│   │   ├── Features.jsx            # Bento-box features grid
│   │   ├── HighlightDish.jsx       # Full-screen image highlight
│   │   ├── SmoothScrolling.jsx     # Lenis wrapper
│   │   └── ...                     # Other reusable UI components
│   ├── context/
│   │   └── CartContext.jsx         # Global state for Cart & Favorites
│   └── data/
│       └── menu.js                 # Local mock database for food items
├── public/
│   └── assets/                     # High-quality food imagery
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (v22 recommended)
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ashiqurrhmn/cashless-dine.git

# 2. Navigate to the project directory
cd cashless-dine

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
# → Application runs on http://localhost:3000
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

<div align="center">

**Built with 🔥 by [Md. Ashiqur Rahman](https://ashiqur-portfolio0.vercel.app/)**

&nbsp;

[![Portfolio](https://img.shields.io/badge/Portfolio-ashiqur--portfolio0.vercel.app-00D4AA?style=for-the-badge&logo=vercel&logoColor=white)](https://ashiqur-portfolio0.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-@ashiqurrhmn-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ashiqurrhmn)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ashiqur_Rahman-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ashiqur-rahman00/)
[![Email](https://img.shields.io/badge/Email-ashiqur1312@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:ashiqur1312@gmail.com)

</div>

---

<div align="center">

### ⭐ If you found this helpful, give it a star!

**Built with ❤️ using Next.js 16 and Tailwind CSS**

&nbsp;

[![Star Client](https://img.shields.io/github/stars/ashiqurrhmn/cashless-dine?style=social&label=Star%20Repo)](https://github.com/ashiqurrhmn/cashless-dine)

&nbsp;

<sub>© 2026 CashlessDine. All rights reserved.</sub>

</div>
