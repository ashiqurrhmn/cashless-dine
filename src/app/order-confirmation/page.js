"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function OrderConfirmationPage() {
  const { lastOrder } = useCart();

  // ── No order to show ──
  if (!lastOrder) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 max-md:w-20 max-md:h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="max-md:w-8 max-md:h-8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl max-md:text-2xl font-bold text-white mb-3">
              No Recent Order
            </h1>
            <p className="text-white/40 text-sm max-md:text-xs mb-8 max-w-sm mx-auto">
              There&apos;s no order to display. Place an order to see its confirmation here.
            </p>
            <Link
              href="/menu"
              className="inline-block bg-accent text-white font-semibold text-sm max-md:text-xs px-8 py-3.5 rounded-xl transition-all duration-300 no-underline hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
            >
              Browse Menu
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <section className="pt-28 pb-8 max-md:pt-20 max-md:pb-4 px-6 max-md:px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
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

          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <h1 className="font-heading text-3xl max-md:text-2xl font-bold text-white mb-2">
              Order Confirmed
            </h1>
            <p className="text-white/40 text-sm max-md:text-xs mb-1">
              Your order has been placed successfully.
            </p>
            <p className="text-accent font-bold text-lg max-md:text-base tracking-wider mb-8 max-md:mb-5">
              {lastOrder.id}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 max-md:px-4 pb-32 max-md:pb-36">
        <div className="max-w-2xl mx-auto space-y-5 max-md:space-y-4">
          {/* ── Order Details ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-4"
          >
            <h2 className="font-heading text-lg max-md:text-base font-bold text-white mb-4 max-md:mb-3">
              Order Details
            </h2>

            <div className="space-y-3 max-md:space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-sm max-md:text-xs">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-dot" />
                  {lastOrder.status}
                </span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Date</span>
                <span className="text-white font-medium text-sm max-md:text-xs">
                  {formatDate(lastOrder.date)}
                </span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Time</span>
                <span className="text-white font-medium text-sm max-md:text-xs">
                  {formatTime(lastOrder.date)}
                </span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-sm max-md:text-xs">Deliver To</span>
                <span className="text-white font-medium text-sm max-md:text-xs text-right max-w-[60%]">
                  {lastOrder.customer.name}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Ordered Items ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-4"
          >
            <h2 className="font-heading text-lg max-md:text-base font-bold text-white mb-4 max-md:mb-3">
              Items Ordered
            </h2>

            <div className="space-y-3 max-md:space-y-2">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 max-md:w-11 max-md:h-11 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm max-md:text-xs font-medium truncate">{item.name}</p>
                    <p className="text-white/30 text-xs max-md:text-[10px]">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-white font-semibold text-sm max-md:text-xs flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10 mt-4 mb-4 max-md:mt-3 max-md:mb-3" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm max-md:text-xs">
                <span className="text-white/40">Subtotal</span>
                <span className="text-white font-medium">${lastOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm max-md:text-xs">
                <span className="text-white/40">Delivery Fee</span>
                <span className="text-white font-medium">${lastOrder.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between">
                <span className="text-white font-bold text-base max-md:text-sm">Total Paid</span>
                <span className="text-white font-bold text-lg max-md:text-base">${lastOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Actions ── */}
          <div className="flex flex-col gap-3 max-md:gap-2 pt-2">
            <Link
              href="/menu"
              className="block w-full bg-accent text-white text-center font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 no-underline hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
            >
              Order More
            </Link>
            <Link
              href="/"
              className="block w-full bg-white/5 border border-white/10 text-white text-center font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 no-underline hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
