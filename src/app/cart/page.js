"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { IoTrashOutline, IoAdd, IoRemove, IoArrowBack } from "react-icons/io5";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -80, transition: { duration: 0.3 } },
};

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, MAX_ITEM_QTY } = useCart();

  // ─── Empty Cart ────────────────────────────────────────
  if (items.length === 0) {
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
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl max-md:text-2xl font-bold text-white mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-white/40 text-sm max-md:text-xs mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything yet. Browse our menu to discover exquisite dishes.
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

  // ─── Cart with Items ───────────────────────────────────
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <section className="pt-28 pb-6 max-md:pt-20 max-md:pb-4 px-6 max-md:px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm max-md:text-xs font-medium mb-6 transition-colors duration-200 no-underline"
          >
            <IoArrowBack /> Continue Shopping
          </Link>

          <div className="flex items-baseline justify-between mb-8 max-md:mb-5">
            <h1 className="font-heading text-3xl max-md:text-2xl font-bold text-white">
              Your Cart
            </h1>
            <span className="text-white/30 text-sm max-md:text-xs">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>
      </section>

      <section className="px-6 max-md:px-4 pb-32 max-md:pb-36">
        <div className="max-w-4xl mx-auto grid grid-cols-[1fr_340px] max-lg:grid-cols-1 gap-8 max-md:gap-5 items-start">
          {/* ── Items List ── */}
          <div className="space-y-4 max-md:space-y-3">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 max-md:p-4 flex gap-5 max-md:gap-3 items-center"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 max-md:w-20 max-md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg max-md:text-base font-bold text-white mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-white/40 text-xs mb-3 max-md:mb-2">{item.category}</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <IoRemove size={14} />
                        </button>
                        <span className="w-10 text-center text-white text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= MAX_ITEM_QTY}
                          className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <IoAdd size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <IoTrashOutline size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-white font-bold text-lg max-md:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-white/30 text-xs">
                        ${item.price.toFixed(2)} each
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Order Summary ── */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-5 sticky top-24">
            <h2 className="font-heading text-xl max-md:text-lg font-bold text-white mb-6 max-md:mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 max-md:space-y-2 mb-6 max-md:mb-4">
              <div className="flex justify-between text-sm max-md:text-xs">
                <span className="text-white/40">Subtotal</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm max-md:text-xs">
                <span className="text-white/40">Delivery Fee</span>
                <span className="text-white font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between">
                <span className="text-white font-bold text-base max-md:text-sm">Total</span>
                <span className="text-white font-bold text-lg max-md:text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-accent text-white text-center font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 no-underline hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/menu"
              className="block w-full text-center text-white/40 hover:text-white/60 text-xs mt-3 transition-colors no-underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
