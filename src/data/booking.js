/**
 * Mock booking data and availability logic.
 * No backend — everything runs client-side with deterministic rules.
 */

export const TIME_SLOTS = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
];

export const MAX_PARTY_SIZE = 12;
export const MIN_PARTY_SIZE = 1;

/**
 * Restaurant table inventory.
 * Each table has a size (max guests) and a count (how many of that size exist).
 */
const TABLE_INVENTORY = [
  { size: 2, count: 8 },
  { size: 4, count: 6 },
  { size: 6, count: 4 },
  { size: 8, count: 2 },
  { size: 12, count: 1 },
];

/**
 * Deterministic "booked tables" seeded by date+time so availability
 * feels realistic but is reproducible across refreshes.
 */
function hashDateTimeSlot(dateStr, timeSlot) {
  let hash = 0;
  const combined = `${dateStr}-${timeSlot}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

/**
 * Returns how many tables of each size are already "booked"
 * for a given date+time.
 */
function getBookedTables(dateStr, timeSlot) {
  const seed = hashDateTimeSlot(dateStr, timeSlot);
  return TABLE_INVENTORY.map((table) => {
    // Use the seed to decide how many of this table size are taken
    const factor = ((seed * (table.size + 3)) % 100) / 100;
    // Busier during prime time (7:00 PM – 8:30 PM)
    const isPrime = ["7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"].includes(
      timeSlot
    );
    const threshold = isPrime ? 0.35 : 0.55;
    const booked = Math.floor(table.count * (factor > threshold ? factor : factor * 0.5));
    return { size: table.size, total: table.count, booked };
  });
}

/**
 * Check if a table is available for the given date, time, and party size.
 * Returns { available, table, message }.
 */
export function checkAvailability(dateStr, timeSlot, partySize) {
  const tables = getBookedTables(dateStr, timeSlot);

  // Find the smallest table that fits the party and has availability
  for (const table of tables) {
    if (table.size >= partySize && table.booked < table.total) {
      return {
        available: true,
        tableSize: table.size,
        message: null,
      };
    }
  }

  return {
    available: false,
    tableSize: null,
    message: "No tables are available for this time and party size.",
  };
}

/**
 * Find alternative times that ARE available for the same date + party size.
 */
export function findAlternativeTimes(dateStr, partySize, excludeTime) {
  const alternatives = [];
  for (const slot of TIME_SLOTS) {
    if (slot === excludeTime) continue;
    const result = checkAvailability(dateStr, slot, partySize);
    if (result.available) {
      alternatives.push(slot);
    }
  }
  return alternatives;
}

/**
 * Generate a reservation ID.
 */
let reservationCounter = 1000;
export function generateReservationId() {
  reservationCounter += 1;
  return `RES-${reservationCounter}`;
}
