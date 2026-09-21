/**
 * Booking data and availability — public API.
 *
 * This module re-exports the pure availability logic from @/lib/booking
 * and keeps the constants / helpers that the BookingForm already imports.
 *
 * Existing imports like:
 *   import { TIME_SLOTS, MAX_PARTY_SIZE, checkAvailability, ... } from "@/data/booking"
 * continue to work unchanged.
 */

export { findAvailableTable, findAlternativeTimes, REASONS } from "@/lib/booking";
export { TABLES } from "@/data/tables";
export { MOCK_RESERVATIONS } from "@/data/reservations";

export const TIME_SLOTS = [
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];

export const MAX_PARTY_SIZE = 12;
export const MIN_PARTY_SIZE = 1;

/**
 * Generate a reservation ID.
 */
export function generateReservationId() {
  return `RES-${Math.floor(10000 + Math.random() * 90000)}`;
}
