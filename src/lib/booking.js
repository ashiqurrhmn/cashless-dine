/**
 * Pure reservation availability logic.
 *
 * No React, no side effects — just functions that take data in and return results.
 * This separation makes the logic testable and reusable.
 */

import { TABLES } from "@/data/tables";

// ─── Restaurant timezone ────────────────────────────────────
const RESTAURANT_TZ = "Asia/Dhaka";

/**
 * Convert a 12-hour time string like "7:00 PM" into minutes from midnight.
 * "12:00 AM" → 0, "12:30 PM" → 750, "7:00 PM" → 1140, "9:30 PM" → 1290.
 *
 * This avoids unreliable string comparisons for time ordering.
 */
export function parseTimeToMinutes(timeStr) {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return -1;
  let [, h, m, period] = match;
  h = parseInt(h, 10);
  m = parseInt(m, 10);
  period = period.toUpperCase();

  if (period === "AM" && h === 12) h = 0;      // 12:xx AM → 0:xx
  else if (period === "PM" && h !== 12) h += 12; // 1-11 PM → 13-23
  return h * 60 + m;
}

/**
 * Get the current time in Asia/Dhaka as { hours, minutes, dateISO }.
 *
 * Uses Intl.DateTimeFormat so it works in any host timezone —
 * we always get the wall-clock time in Bangladesh.
 */
export function getNowInDhaka() {
  const now = new Date();

  // Format current date parts in Dhaka timezone
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: RESTAURANT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);

  const get = (type) => parts.find((p) => p.type === type)?.value;

  return {
    hours: parseInt(get("hour"), 10),
    minutes: parseInt(get("minute"), 10),
    dateISO: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

/**
 * Check whether a given date string matches today in Asia/Dhaka.
 */
export function isDateToday(dateStr) {
  return dateStr === getNowInDhaka().dateISO;
}

/**
 * Is a time slot at or before the current time in Dhaka?
 *
 * Rule: slot_time <= current_time → disabled
 *       slot_time >  current_time → available (for time check)
 *
 * @param {string} slotTime — e.g. "7:00 PM"
 * @returns {boolean} true if the slot has passed
 */
export function isTimeSlotPassed(slotTime) {
  const { hours, minutes } = getNowInDhaka();
  const nowMinutes = hours * 60 + minutes;
  const slotMinutes = parseTimeToMinutes(slotTime);
  return slotMinutes <= nowMinutes;
}

/**
 * Availability result reasons.
 * The UI uses these to show specific, accurate error messages.
 */
export const REASONS = {
  /** Every table in the restaurant is occupied for this date+time. */
  FULLY_BOOKED: "FULLY_BOOKED",
  /** Tables are free, but none is large enough for the requested party. */
  NO_SUITABLE_TABLE: "NO_SUITABLE_TABLE",
};

/**
 * Get the set of table IDs that are occupied for a given date + time.
 *
 * @param {string} date  — "YYYY-MM-DD"
 * @param {string} time  — e.g. "7:00 PM"
 * @param {Array}  allReservations — combined mock + session reservations
 * @returns {Set<string>} occupied table IDs
 */
export function getOccupiedTableIds(date, time, allReservations) {
  const occupied = new Set();
  for (const res of allReservations) {
    if (res.date === date && res.time === time && res.status !== "Cancelled") {
      occupied.add(res.tableId);
    }
  }
  return occupied;
}

/**
 * Find an available table for the requested date, time, and party size.
 *
 * The algorithm:
 *  1. Collect all occupied table IDs for the slot.
 *  2. Find unoccupied tables sorted by capacity (ascending).
 *  3. Return the smallest table whose capacity >= guests.
 *  4. If no match, return a typed reason explaining why.
 *
 * @param {string} date   — "YYYY-MM-DD"
 * @param {string} time   — e.g. "7:00 PM"
 * @param {number} guests — requested party size
 * @param {Array}  allReservations — combined mock + session reservations
 * @returns {{ available: boolean, table?: object, reason?: string, message: string|null }}
 */
export function findAvailableTable(date, time, guests, allReservations) {
  const occupied = getOccupiedTableIds(date, time, allReservations);

  // Tables that are free for this slot, sorted smallest → largest
  const freeTables = TABLES
    .filter((t) => !occupied.has(t.id))
    .sort((a, b) => a.capacity - b.capacity);

  // Find the smallest free table that can seat the party
  const suitable = freeTables.find((t) => t.capacity >= guests);

  if (suitable) {
    return {
      available: true,
      table: suitable,
      tableSize: suitable.capacity,
      reason: null,
      message: null,
    };
  }

  // No suitable table — determine why
  // Are there ANY tables that could seat this party size (regardless of occupancy)?
  const largeEnoughTablesExist = TABLES.some((t) => t.capacity >= guests);

  if (!largeEnoughTablesExist) {
    // The restaurant simply doesn't have tables big enough
    return {
      available: false,
      table: null,
      tableSize: null,
      reason: REASONS.NO_SUITABLE_TABLE,
      message: `We don't have a table that seats ${guests} guests. Our largest table seats ${Math.max(...TABLES.map((t) => t.capacity))}.`,
    };
  }

  if (freeTables.length === 0) {
    // Every single table is taken
    return {
      available: false,
      table: null,
      tableSize: null,
      reason: REASONS.FULLY_BOOKED,
      message: `No tables are available for ${guests} ${guests === 1 ? "guest" : "guests"} at ${time}.`,
    };
  }

  // Tables are free, but none is large enough for this party at this time
  // (the larger tables are all occupied)
  return {
    available: false,
    table: null,
    tableSize: null,
    reason: REASONS.NO_SUITABLE_TABLE,
    message: `We don't have a table available for ${guests} guests at ${time}. Smaller tables are open, but none can seat your party.`,
  };
}

/**
 * Find alternative time slots where a suitable table IS available.
 *
 * @param {string}   date            — "YYYY-MM-DD"
 * @param {number}   guests          — requested party size
 * @param {string}   excludeTime     — the time the user already tried
 * @param {Array}    allReservations  — combined mock + session reservations
 * @param {string[]} timeSlots       — all possible time slots
 * @returns {string[]} available alternative times
 */
export function findAlternativeTimes(date, guests, excludeTime, allReservations, timeSlots) {
  const today = isDateToday(date);
  const alternatives = [];
  for (const slot of timeSlots) {
    if (slot === excludeTime) continue;
    // Skip slots that have already passed (only relevant for today)
    if (today && isTimeSlotPassed(slot)) continue;
    const result = findAvailableTable(date, slot, guests, allReservations);
    if (result.available) {
      alternatives.push(slot);
    }
  }
  return alternatives;
}
