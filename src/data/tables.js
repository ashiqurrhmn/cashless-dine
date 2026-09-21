/**
 * Restaurant table inventory.
 *
 * Each table has a stable ID and a fixed capacity.
 * This is the single source of truth for what tables exist in the restaurant.
 *
 * Layout:
 *   4 × 2-seat   (intimate / couple tables)
 *   4 × 4-seat   (small group)
 *   2 × 6-seat   (medium group)
 *   1 × 8-seat   (large group)
 *   1 × 12-seat  (private dining)
 */

export const TABLES = [
  { id: "T1", capacity: 2 },
  { id: "T2", capacity: 2 },
  { id: "T3", capacity: 2 },
  { id: "T4", capacity: 2 },
  { id: "T5", capacity: 4 },
  { id: "T6", capacity: 4 },
  { id: "T7", capacity: 4 },
  { id: "T8", capacity: 4 },
  { id: "T9", capacity: 6 },
  { id: "T10", capacity: 6 },
  { id: "T11", capacity: 8 },
  { id: "T12", capacity: 12 },
];

/** The largest table capacity in the restaurant. */
export const MAX_TABLE_CAPACITY = Math.max(...TABLES.map((t) => t.capacity));
