export const mockUser = {
  name: "Ashiqur Rahman",
  email: "ashiqur.cashlessai@email.com",
  phone: "01571164022",
  avatar: "/assets/profile.png",
  memberSince: "2025-03-15",
};

/**
 * Seed reservations so the profile isn't empty on first visit.
 * New session bookings are appended at runtime.
 */
export const seedReservations = [
  {
    id: "RES-0891",
    date: "2026-08-14",
    time: "7:30 PM",
    partySize: 4,
    tableSize: 4,
    status: "Completed",
  },
  {
    id: "RES-0927",
    date: "2026-09-02",
    time: "8:00 PM",
    partySize: 2,
    tableSize: 2,
    status: "Completed",
  },
];

/**
 * Seed orders so the profile shows history on first visit.
 */
export const seedOrders = [
  {
    id: "ORD-0847",
    items: [
      { id: "margherita-pizza", name: "Neapolitan Margherita", price: 22.0, image: "/assets/margherita_pizza_1789905472609.jpg", category: "Pizza", quantity: 1 },
      { id: "carbonara-pasta", name: "Spaghetti Carbonara", price: 21.0, image: "/assets/carbonara_pasta_1789905517694.jpg", category: "Pasta", quantity: 2 },
    ],
    subtotal: 64.0,
    deliveryFee: 3.99,
    total: 67.99,
    date: "2026-08-20T19:35:00.000Z",
    status: "Delivered",
  },
  {
    id: "ORD-0913",
    items: [
      { id: "signature-rolls", name: "Chef's Signature Rolls", price: 28.5, image: "/assets/signature_rolls_1789899824873.jpg", category: "Sushi", quantity: 1 },
      { id: "matcha-dessert", name: "Matcha Cheesecake", price: 14.0, image: "/assets/matcha_dessert_1789905572558.jpg", category: "Desserts", quantity: 1 },
    ],
    subtotal: 42.5,
    deliveryFee: 3.99,
    total: 46.49,
    date: "2026-09-05T20:10:00.000Z",
    status: "Delivered",
  },
];
