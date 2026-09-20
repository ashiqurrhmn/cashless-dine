"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

let orderCounter = 1000;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, setLastOrder, addOrder } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;

  // ── Redirect if empty cart ──
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
              Nothing to Checkout
            </h1>
            <p className="text-white/40 text-sm max-md:text-xs mb-8 max-w-sm mx-auto">
              Your cart is empty. Add some items before proceeding to checkout.
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

  // ── Validation ──
  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    else if (form.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";

    if (!form.phone.trim()) newErrors.phone = "Please enter your phone number.";
    else if (!/^[\d\s\-+()]{7,20}$/.test(form.phone.trim()))
      newErrors.phone = "Please enter a valid phone number.";

    if (!form.address.trim()) newErrors.address = "Please enter a delivery address.";
    else if (form.address.trim().length < 10) newErrors.address = "Please enter a complete address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleInputChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handlePlaceOrder() {
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      orderCounter += 1;
      const order = {
        id: `ORD-${orderCounter}`,
        items: items.map((i) => ({ ...i })),
        subtotal,
        deliveryFee,
        total,
        customer: { ...form },
        date: new Date().toISOString(),
        status: "Confirmed",
      };

      setLastOrder(order);
      addOrder(order);
      clearCart();
      toast.success("Order placed successfully!");
      router.push("/order-confirmation");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <section className="pt-28 pb-6 max-md:pt-20 max-md:pb-4 px-6 max-md:px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm max-md:text-xs font-medium mb-6 transition-colors duration-200 no-underline"
          >
            <IoArrowBack /> Back to Cart
          </Link>
          <h1 className="font-heading text-3xl max-md:text-2xl font-bold text-white mb-2">
            Checkout
          </h1>
          <p className="text-white/40 text-sm max-md:text-xs">
            Complete your details to place your order.
          </p>
        </div>
      </section>

      <section className="px-6 max-md:px-4 pb-32 max-md:pb-36 pt-4">
        <div className="max-w-4xl mx-auto grid grid-cols-[1fr_360px] max-lg:grid-cols-1 gap-8 max-md:gap-5 items-start">
          {/* ── Customer Details Form ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-5"
          >
            <h2 className="font-heading text-xl max-md:text-lg font-bold text-white mb-6 max-md:mb-4">
              Delivery Details
            </h2>

            {/* Name */}
            <div className="mb-5 max-md:mb-4">
              <label htmlFor="checkout-name" className="block text-sm font-semibold text-white/70 mb-2 max-md:text-xs">
                Full Name
              </label>
              <input
                id="checkout-name"
                type="text"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. John Doe"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 max-md:py-3 text-white text-sm max-md:text-xs placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 ${
                  errors.name ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.name && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5">
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-5 max-md:mb-4">
              <label htmlFor="checkout-phone" className="block text-sm font-semibold text-white/70 mb-2 max-md:text-xs">
                Phone Number
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="e.g. +1 (555) 123-4567"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 max-md:py-3 text-white text-sm max-md:text-xs placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 ${
                  errors.phone ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.phone && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5">
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Address */}
            <div className="mb-5 max-md:mb-4">
              <label htmlFor="checkout-address" className="block text-sm font-semibold text-white/70 mb-2 max-md:text-xs">
                Delivery Address
              </label>
              <textarea
                id="checkout-address"
                value={form.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="e.g. 123 Main Street, Apt 4B, New York, NY 10001"
                rows={3}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 max-md:py-3 text-white text-sm max-md:text-xs placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 resize-none ${
                  errors.address ? "border-red-500/60" : "border-white/10"
                }`}
              />
              {errors.address && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5">
                  {errors.address}
                </motion.p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="checkout-notes" className="block text-sm font-semibold text-white/70 mb-2 max-md:text-xs">
                Order Notes <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                value={form.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any special instructions or dietary requirements..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 max-md:py-3 text-white text-sm max-md:text-xs placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300 resize-none"
              />
            </div>
          </motion.div>

          {/* ── Order Summary Sidebar ── */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-5 sticky top-24">
            <h2 className="font-heading text-xl max-md:text-lg font-bold text-white mb-5 max-md:mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 max-md:space-y-2 mb-5 max-md:mb-4 max-h-[280px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                    <p className="text-white/30 text-[10px]">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-white text-xs font-semibold flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10 mb-4 max-md:mb-3" />

            {/* Totals */}
            <div className="space-y-2.5 max-md:space-y-2 mb-5 max-md:mb-4">
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

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-accent text-white font-semibold text-sm max-md:text-xs py-3.5 max-md:py-3 rounded-xl transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                `Place Order · $${total.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
