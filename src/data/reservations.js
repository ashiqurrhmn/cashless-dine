/**
 * Mock existing reservations.
 *
 * These represent bookings already made by other customers.
 * They are NOT real users — just simulated data so the frontend
 * behaves realistically when checking availability.
 *
 * Key scenarios created by this data:
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │ FULLY BOOKED                                                │
 * │ 2026-09-25  7:00 PM — ALL 12 tables occupied                │
 * │ → Any party size should see "No tables available"           │
 * ├──────────────────────────────────────────────────────────────┤
 * │ NO SUITABLE TABLE (large party)                             │
 * │ 2026-09-27  8:00 PM — T9, T10, T11, T12 all taken          │
 * │ → Party of 6+ has no table, but 2/4-seat tables are free   │
 * ├──────────────────────────────────────────────────────────────┤
 * │ PARTIALLY OCCUPIED                                          │
 * │ 2026-09-26  7:30 PM — a few tables taken, others free       │
 * │ → Normal bookings should succeed                            │
 * ├──────────────────────────────────────────────────────────────┤
 * │ MOSTLY FREE                                                 │
 * │ 2026-10-03  6:00 PM — only 1 table taken                   │
 * │ → Nearly everything available                                │
 * └──────────────────────────────────────────────────────────────┘
 */

export const MOCK_RESERVATIONS = [
  // ═══════════════════════════════════════════════════════════
  // 2026-09-25  7:00 PM — FULLY BOOKED (all 12 tables taken)
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1001", date: "2026-09-25", time: "7:00 PM", guests: 2, tableId: "T1", status: "Confirmed" },
  { id: "RES-1002", date: "2026-09-25", time: "7:00 PM", guests: 2, tableId: "T2", status: "Confirmed" },
  { id: "RES-1003", date: "2026-09-25", time: "7:00 PM", guests: 1, tableId: "T3", status: "Confirmed" },
  { id: "RES-1004", date: "2026-09-25", time: "7:00 PM", guests: 2, tableId: "T4", status: "Confirmed" },
  { id: "RES-1005", date: "2026-09-25", time: "7:00 PM", guests: 4, tableId: "T5", status: "Confirmed" },
  { id: "RES-1006", date: "2026-09-25", time: "7:00 PM", guests: 3, tableId: "T6", status: "Confirmed" },
  { id: "RES-1007", date: "2026-09-25", time: "7:00 PM", guests: 4, tableId: "T7", status: "Confirmed" },
  { id: "RES-1008", date: "2026-09-25", time: "7:00 PM", guests: 4, tableId: "T8", status: "Confirmed" },
  { id: "RES-1009", date: "2026-09-25", time: "7:00 PM", guests: 5, tableId: "T9", status: "Confirmed" },
  { id: "RES-1010", date: "2026-09-25", time: "7:00 PM", guests: 6, tableId: "T10", status: "Confirmed" },
  { id: "RES-1011", date: "2026-09-25", time: "7:00 PM", guests: 7, tableId: "T11", status: "Confirmed" },
  { id: "RES-1012", date: "2026-09-25", time: "7:00 PM", guests: 10, tableId: "T12", status: "Confirmed" },

  // ═══════════════════════════════════════════════════════════
  // 2026-09-25  7:30 PM — PARTIALLY BOOKED (6 tables taken)
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1013", date: "2026-09-25", time: "7:30 PM", guests: 2, tableId: "T1", status: "Confirmed" },
  { id: "RES-1014", date: "2026-09-25", time: "7:30 PM", guests: 2, tableId: "T2", status: "Confirmed" },
  { id: "RES-1015", date: "2026-09-25", time: "7:30 PM", guests: 4, tableId: "T5", status: "Confirmed" },
  { id: "RES-1016", date: "2026-09-25", time: "7:30 PM", guests: 4, tableId: "T6", status: "Confirmed" },
  { id: "RES-1017", date: "2026-09-25", time: "7:30 PM", guests: 6, tableId: "T9", status: "Confirmed" },
  { id: "RES-1018", date: "2026-09-25", time: "7:30 PM", guests: 8, tableId: "T11", status: "Confirmed" },

  // ═══════════════════════════════════════════════════════════
  // 2026-09-27  8:00 PM — NO LARGE TABLE AVAILABLE
  // All 6+ seat tables taken; only 2-seat and 4-seat tables free
  // A party of 6 should get "no suitable table" (not "fully booked")
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1019", date: "2026-09-27", time: "8:00 PM", guests: 5, tableId: "T9", status: "Confirmed" },
  { id: "RES-1020", date: "2026-09-27", time: "8:00 PM", guests: 6, tableId: "T10", status: "Confirmed" },
  { id: "RES-1021", date: "2026-09-27", time: "8:00 PM", guests: 7, tableId: "T11", status: "Confirmed" },
  { id: "RES-1022", date: "2026-09-27", time: "8:00 PM", guests: 10, tableId: "T12", status: "Confirmed" },

  // ═══════════════════════════════════════════════════════════
  // 2026-09-26  7:30 PM — NORMAL EVENING (3 tables taken)
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1023", date: "2026-09-26", time: "7:30 PM", guests: 2, tableId: "T1", status: "Confirmed" },
  { id: "RES-1024", date: "2026-09-26", time: "7:30 PM", guests: 4, tableId: "T5", status: "Confirmed" },
  { id: "RES-1025", date: "2026-09-26", time: "7:30 PM", guests: 6, tableId: "T9", status: "Confirmed" },

  // ═══════════════════════════════════════════════════════════
  // 2026-10-03  6:00 PM — MOSTLY FREE (1 table taken)
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1026", date: "2026-10-03", time: "6:00 PM", guests: 2, tableId: "T1", status: "Confirmed" },

  // ═══════════════════════════════════════════════════════════
  // 2026-09-28  7:00 PM — BUSY EVENING (8 tables taken)
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1027", date: "2026-09-28", time: "7:00 PM", guests: 2, tableId: "T1", status: "Confirmed" },
  { id: "RES-1028", date: "2026-09-28", time: "7:00 PM", guests: 2, tableId: "T2", status: "Confirmed" },
  { id: "RES-1029", date: "2026-09-28", time: "7:00 PM", guests: 2, tableId: "T3", status: "Confirmed" },
  { id: "RES-1030", date: "2026-09-28", time: "7:00 PM", guests: 4, tableId: "T5", status: "Confirmed" },
  { id: "RES-1031", date: "2026-09-28", time: "7:00 PM", guests: 4, tableId: "T6", status: "Confirmed" },
  { id: "RES-1032", date: "2026-09-28", time: "7:00 PM", guests: 4, tableId: "T7", status: "Confirmed" },
  { id: "RES-1033", date: "2026-09-28", time: "7:00 PM", guests: 6, tableId: "T9", status: "Confirmed" },
  { id: "RES-1034", date: "2026-09-28", time: "7:00 PM", guests: 8, tableId: "T11", status: "Confirmed" },

  // ═══════════════════════════════════════════════════════════
  // 2026-09-28  8:30 PM — LIGHT (2 tables taken)
  // ═══════════════════════════════════════════════════════════
  { id: "RES-1035", date: "2026-09-28", time: "8:30 PM", guests: 2, tableId: "T2", status: "Confirmed" },
  { id: "RES-1036", date: "2026-09-28", time: "8:30 PM", guests: 4, tableId: "T7", status: "Confirmed" },
];
