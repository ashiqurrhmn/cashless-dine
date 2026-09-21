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
export const seedReservations = [];

/**
 * Seed orders so the profile shows history on first visit.
 */
export const seedOrders = [];
