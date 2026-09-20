"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  TIME_SLOTS,
  MAX_PARTY_SIZE,
  MIN_PARTY_SIZE,
  checkAvailability,
  findAlternativeTimes,
  generateReservationId,
} from "@/data/booking";

// ─── Helpers ───────────────────────────────────────────────

/** Today in YYYY-MM-DD for the date input min attribute */
function getTodayISO() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

/** Format YYYY-MM-DD into a long readable date */
function formatDateLong(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Validate that a date string is not in the past */
function isDateInPast(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = dateStr.split("-").map(Number);
  const selected = new Date(year, month - 1, day);
  return selected < today;
}

// ─── Framer Motion Variants ─────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const slotVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// ─── Step Indicator ─────────────────────────────────────────

function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Date & Party" },
    { num: 2, label: "Time" },
    { num: 3, label: "Confirm" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-10 max-md:mb-6">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center gap-2">
          <div
            className={`w-9 h-9 max-md:w-7 max-md:h-7 rounded-full flex items-center justify-center text-sm max-md:text-xs font-bold transition-all duration-500 ${
              currentStep >= step.num
                ? "bg-accent text-white shadow-[0_0_20px_rgba(232,75,43,0.4)]"
                : "bg-white/5 text-white/30 border border-white/10"
            }`}
          >
            {currentStep > step.num ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              step.num
            )}
          </div>
          <span className={`text-xs max-md:text-[10px] font-semibold tracking-wide transition-colors duration-300 ${
            currentStep >= step.num ? "text-white" : "text-white/30"
          }`}>
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <div className={`w-10 max-md:w-6 h-[2px] rounded-full transition-colors duration-500 ${
              currentStep > step.num ? "bg-accent" : "bg-white/10"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

export default function BookingForm() {
  // Form state
  const [date, setDate] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [selectedTime, setSelectedTime] = useState("");

  // UI state
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Reservation result
  const [reservation, setReservation] = useState(null);

  const todayISO = useMemo(() => getTodayISO(), []);

  // ── Validation ──

  function validateStep1() {
    const newErrors = {};

    if (!date) {
      newErrors.date = "Please select a date.";
    } else if (isDateInPast(date)) {
      newErrors.date = "Please select a future date.";
    }

    if (partySize < MIN_PARTY_SIZE || partySize > MAX_PARTY_SIZE) {
      newErrors.partySize = `Party size must be between ${MIN_PARTY_SIZE} and ${MAX_PARTY_SIZE}.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Step Handlers ──

  function handleStep1Next() {
    if (validateStep1()) {
      setSelectedTime("");
      setStep(2);
    }
  }

  function handleTimeSelect(time) {
    setSelectedTime(time);
  }

  function handleStep2Next() {
    if (!selectedTime) {
      setErrors({ time: "Please select a time slot." });
      return;
    }
    setErrors({});
    setStep(3);
  }

  function handleBack() {
    setErrors({});
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  }

  function handleConfirmBooking() {
    setIsProcessing(true);

    // Simulate a brief "processing" delay
    setTimeout(() => {
      const result = checkAvailability(date, selectedTime, partySize);

      if (result.available) {
        const id = generateReservationId();
        setReservation({
          id,
          date,
          time: selectedTime,
          partySize,
          tableSize: result.tableSize,
          status: "Confirmed",
        });
        toast.success("Reservation confirmed!");
        setStep(4); // confirmation view
      } else {
        const alternatives = findAlternativeTimes(date, partySize, selectedTime);
        setErrors({
          booking: result.message,
          alternatives,
        });
      }
      setIsProcessing(false);
    }, 1200);
  }

  function handleNewBooking() {
    setDate("");
    setPartySize(2);
    setSelectedTime("");
    setStep(1);
    setErrors({});
    setReservation(null);
  }

  // ── Time slot availability for the UI ──
  const timeAvailability = useMemo(() => {
    if (!date) return {};
    const result = {};
    for (const slot of TIME_SLOTS) {
      result[slot] = checkAvailability(date, slot, partySize);
    }
    return result;
  }, [date, partySize]);

  // ─── Render ───────────────────────────────────────────────

  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        {/* ═══ STEP 1: Date & Party Size ═══ */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-md:p-5"
          >
            <h2 className="font-heading text-2xl max-md:text-xl font-bold text-white mb-1">
              Select Date & Party Size
            </h2>
            <p className="text-white/40 text-sm max-md:text-xs mb-8 max-md:mb-5">
              Choose when you&apos;d like to dine and how many guests to expect.
            </p>

            {/* Date */}
            <div className="mb-6 max-md:mb-4">
              <label htmlFor="booking-date" className="block text-sm font-semibold text-white/70 mb-2 max-md:text-xs">
                Reservation Date
              </label>
              <input
                id="booking-date"
                type="date"
                min={todayISO}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors((prev) => ({ ...prev, date: undefined }));
                }}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 max-md:py-3 text-white text-sm max-md:text-xs focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 [color-scheme:dark] ${
                  errors.date ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.date && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.date}
                </motion.p>
              )}
            </div>

            {/* Party size */}
            <div className="mb-8 max-md:mb-6">
              <label htmlFor="party-size" className="block text-sm font-semibold text-white/70 mb-2 max-md:text-xs">
                Number of Guests
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPartySize(Math.max(MIN_PARTY_SIZE, partySize - 1))}
                  disabled={partySize <= MIN_PARTY_SIZE}
                  className="w-11 h-11 max-md:w-9 max-md:h-9 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-bold flex items-center justify-center transition-all duration-200 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  −
                </button>
                <div className="flex-1 relative">
                  <input
                    id="party-size"
                    type="number"
                    min={MIN_PARTY_SIZE}
                    max={MAX_PARTY_SIZE}
                    value={partySize}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        setPartySize(val);
                        setErrors((prev) => ({ ...prev, partySize: undefined }));
                      }
                    }}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 max-md:py-2.5 text-white text-center text-lg max-md:text-base font-bold focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      errors.partySize ? "border-red-500/60" : "border-white/10"
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs max-md:text-[10px] font-medium pointer-events-none">
                    {partySize === 1 ? "guest" : "guests"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPartySize(Math.min(MAX_PARTY_SIZE, partySize + 1))}
                  disabled={partySize >= MAX_PARTY_SIZE}
                  className="w-11 h-11 max-md:w-9 max-md:h-9 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-bold flex items-center justify-center transition-all duration-200 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              {errors.partySize && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.partySize}
                </motion.p>
              )}
              <p className="text-white/25 text-xs mt-2 max-md:text-[10px]">
                Maximum {MAX_PARTY_SIZE} guests. For larger parties, please call us directly.
              </p>
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={handleStep1Next}
              className="w-full bg-accent text-white font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
            >
              Choose a Time →
            </button>
          </motion.div>
        )}

        {/* ═══ STEP 2: Time Selection ═══ */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-md:p-5"
          >
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm max-md:text-xs font-medium mb-4 transition-colors duration-200"
            >
              ← Back
            </button>

            <h2 className="font-heading text-2xl max-md:text-xl font-bold text-white mb-1">
              Pick a Time
            </h2>
            <p className="text-white/40 text-sm max-md:text-xs mb-2">
              {formatDateLong(date)} · {partySize} {partySize === 1 ? "guest" : "guests"}
            </p>
            <p className="text-white/25 text-xs mb-6 max-md:mb-4 max-md:text-[10px]">
              Grey slots are fully booked for your party size.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 max-md:grid-cols-2 gap-3 max-md:gap-2 mb-8 max-md:mb-6"
            >
              {TIME_SLOTS.map((slot) => {
                const avail = timeAvailability[slot];
                const isAvailable = avail?.available;
                const isSelected = selectedTime === slot;

                return (
                  <motion.button
                    key={slot}
                    variants={slotVariant}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => handleTimeSelect(slot)}
                    className={`relative py-3.5 max-md:py-3 rounded-xl text-sm max-md:text-xs font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-accent text-white shadow-[0_0_24px_rgba(232,75,43,0.35)] ring-2 ring-accent/50"
                        : isAvailable
                        ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                        : "bg-white/[0.02] border border-white/5 text-white/20 cursor-not-allowed"
                    }`}
                  >
                    {slot}
                    {!isAvailable && (
                      <span className="block text-[9px] max-md:text-[8px] font-normal text-white/15 mt-0.5">
                        Full
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>

            {errors.time && (
              <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mb-4 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.time}
              </motion.p>
            )}

            <button
              type="button"
              onClick={handleStep2Next}
              disabled={!selectedTime}
              className="w-full bg-accent text-white font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:hover:shadow-none"
            >
              Review Booking →
            </button>
          </motion.div>
        )}

        {/* ═══ STEP 3: Review & Confirm ═══ */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-md:p-5"
          >
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm max-md:text-xs font-medium mb-4 transition-colors duration-200"
            >
              ← Back
            </button>

            <h2 className="font-heading text-2xl max-md:text-xl font-bold text-white mb-1">
              Review Your Reservation
            </h2>
            <p className="text-white/40 text-sm max-md:text-xs mb-8 max-md:mb-5">
              Please confirm the details below.
            </p>

            {/* Summary card */}
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 max-md:p-4 mb-6 max-md:mb-5 space-y-4 max-md:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Date</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">{formatDateLong(date)}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Time</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">{selectedTime}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Party Size</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">
                  {partySize} {partySize === 1 ? "Guest" : "Guests"}
                </span>
              </div>
            </div>

            {/* Errors from availability check */}
            {errors.booking && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-md:p-3 mb-5">
                <p className="text-red-400 text-sm max-md:text-xs font-medium flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {errors.booking}
                </p>
                {errors.alternatives && errors.alternatives.length > 0 && (
                  <div>
                    <p className="text-white/40 text-xs mb-2 max-md:text-[10px]">Try one of these available times:</p>
                    <div className="flex flex-wrap gap-2">
                      {errors.alternatives.slice(0, 4).map((alt) => (
                        <button
                          key={alt}
                          type="button"
                          onClick={() => {
                            setSelectedTime(alt);
                            setErrors({});
                          }}
                          className="bg-white/10 text-white text-xs max-md:text-[10px] px-3 py-1.5 rounded-lg font-semibold hover:bg-accent hover:shadow-[0_0_12px_rgba(232,75,43,0.3)] transition-all duration-200"
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <button
              type="button"
              onClick={handleConfirmBooking}
              disabled={isProcessing}
              className="w-full bg-accent text-white font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </motion.div>
        )}

        {/* ═══ STEP 4: Confirmation ═══ */}
        {step === 4 && reservation && (
          <motion.div
            key="step4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-md:p-5 text-center"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-20 h-20 max-md:w-16 max-md:h-16 mx-auto mb-6 max-md:mb-4 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="max-md:w-7 max-md:h-7">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <h2 className="font-heading text-3xl max-md:text-2xl font-bold text-white mb-2">
              Reservation Confirmed
            </h2>
            <p className="text-white/40 text-sm max-md:text-xs mb-8 max-md:mb-5">
              Your table has been reserved. We look forward to welcoming you!
            </p>

            {/* Confirmation details */}
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 max-md:p-4 mb-6 max-md:mb-5 text-left space-y-4 max-md:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Reservation ID</span>
                <span className="text-accent font-bold text-sm max-md:text-xs tracking-wider">{reservation.id}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-sm max-md:text-xs">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot" />
                  {reservation.status}
                </span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Date</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">{formatDateLong(reservation.date)}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Time</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">{reservation.time}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Party Size</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">
                  {reservation.partySize} {reservation.partySize === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Table</span>
                <span className="text-white font-semibold text-sm max-md:text-xs">
                  {reservation.tableSize}-seater
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 max-md:gap-2">
              <button
                type="button"
                onClick={handleNewBooking}
                className="w-full bg-accent text-white font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
              >
                Make Another Reservation
              </button>
              <a
                href="/"
                className="w-full inline-block bg-white/5 border border-white/10 text-white font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl text-center transition-all duration-300 hover:bg-white/10 no-underline"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
