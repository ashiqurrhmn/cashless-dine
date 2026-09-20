"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { mockUser } from "@/data/user";
import Navbar from "@/components/Navbar";
import { IoCalendarOutline, IoTimeOutline, IoPeopleOutline, IoReceiptOutline } from "react-icons/io5";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Helpers ───────────────────────────────────────────────

function formatDateLong(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatOrderDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getStatusColor(status) {
  switch (status) {
    case "Confirmed":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "Completed":
    case "Delivered":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "Cancelled":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    default:
      return "text-white/60 bg-white/5 border-white/10";
  }
}

function getMemberDuration(dateStr) {
  const start = new Date(dateStr);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (months < 1) return "Less than a month";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years} yr${years > 1 ? "s" : ""}, ${rem} mo` : `${years} year${years > 1 ? "s" : ""}`;
}

// ─── Page Component ─────────────────────────────────────────

export default function ProfilePage() {
  const { reservations, allOrders } = useCart();

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      {/* ══ Profile Header ══ */}
      <section className="pt-28 pb-4 max-md:pt-20 max-md:pb-2 px-6 max-md:px-4">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 max-md:p-5 flex items-center gap-6 max-md:gap-4 max-md:flex-col max-md:text-center">
            {/* Avatar */}
            <div className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-full bg-accent/20 border-2 border-accent/40 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              {mockUser.avatar ? (
                <Image
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <span className="text-accent font-bold text-2xl max-md:text-xl tracking-wide">
                  {getInitials(mockUser.name)}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-2xl max-md:text-xl font-bold text-white mb-1">
                {mockUser.name}
              </h1>
              <p className="text-white/40 text-sm max-md:text-xs mb-3 max-md:mb-2">
                Member for {getMemberDuration(mockUser.memberSince)}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 max-md:justify-center">
                <span className="text-white/50 text-xs">{mockUser.email}</span>
                <span className="text-white/50 text-xs">{mockUser.phone}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 max-md:gap-8 flex-shrink-0 max-md:pt-2">
              <div className="text-center">
                <div className="text-white font-bold text-xl max-md:text-lg">{reservations.length}</div>
                <div className="text-white/30 text-[10px] tracking-wider uppercase">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-xl max-md:text-lg">{allOrders.length}</div>
                <div className="text-white/30 text-[10px] tracking-wider uppercase">Orders</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══ Content ══ */}
      <section className="px-6 max-md:px-4 pb-32 max-md:pb-36 pt-6 max-md:pt-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 max-md:gap-5">

          {/* ── Reservations ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-5"
          >
            <div className="flex items-center justify-between mb-5 max-md:mb-4">
              <h2 className="font-heading text-xl max-md:text-lg font-bold text-white">
                Reservations
              </h2>
              <Link
                href="/booking"
                className="text-accent text-xs font-semibold no-underline hover:underline"
              >
                + New Booking
              </Link>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-10 max-md:py-8">
                <div className="w-16 h-16 max-md:w-14 max-md:h-14 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <IoCalendarOutline className="text-2xl max-md:text-xl text-white/20" />
                </div>
                <p className="text-white/50 text-sm max-md:text-xs font-medium mb-1">
                  No reservations yet
                </p>
                <p className="text-white/25 text-xs max-md:text-[10px] mb-4">
                  You don&apos;t have any reservations yet.
                </p>
                <Link
                  href="/booking"
                  className="inline-block bg-accent text-white font-semibold text-xs px-5 py-2.5 rounded-lg no-underline hover:bg-accent-hover transition-all duration-300"
                >
                  Book a Table
                </Link>
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-3 max-md:space-y-2 max-h-[400px] overflow-y-auto pr-1"
              >
                {reservations.map((res) => (
                  <motion.div
                    key={res.id}
                    variants={cardVariant}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 max-md:p-3"
                  >
                    <div className="flex items-start justify-between mb-2 max-md:mb-1.5">
                      <span className="text-white font-bold text-sm max-md:text-xs tracking-wider">
                        {res.id}
                      </span>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="text-white/40 text-xs max-md:text-[10px] flex items-center gap-1">
                        <IoCalendarOutline size={12} /> {formatDateLong(res.date)}
                      </span>
                      <span className="text-white/40 text-xs max-md:text-[10px] flex items-center gap-1">
                        <IoTimeOutline size={12} /> {res.time}
                      </span>
                      <span className="text-white/40 text-xs max-md:text-[10px] flex items-center gap-1">
                        <IoPeopleOutline size={12} /> {res.partySize} guest{res.partySize !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── Order History ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 max-md:p-5"
          >
            <div className="flex items-center justify-between mb-5 max-md:mb-4">
              <h2 className="font-heading text-xl max-md:text-lg font-bold text-white">
                Order History
              </h2>
              <Link
                href="/menu"
                className="text-accent text-xs font-semibold no-underline hover:underline"
              >
                + New Order
              </Link>
            </div>

            {allOrders.length === 0 ? (
              <div className="text-center py-10 max-md:py-8">
                <div className="w-16 h-16 max-md:w-14 max-md:h-14 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <IoReceiptOutline className="text-2xl max-md:text-xl text-white/20" />
                </div>
                <p className="text-white/50 text-sm max-md:text-xs font-medium mb-1">
                  No orders yet
                </p>
                <p className="text-white/25 text-xs max-md:text-[10px] mb-4">
                  You haven&apos;t placed any orders yet.
                </p>
                <Link
                  href="/menu"
                  className="inline-block bg-accent text-white font-semibold text-xs px-5 py-2.5 rounded-lg no-underline hover:bg-accent-hover transition-all duration-300"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-3 max-md:space-y-2 max-h-[400px] overflow-y-auto pr-1"
              >
                {allOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    variants={cardVariant}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 max-md:p-3"
                  >
                    <div className="flex items-start justify-between mb-2.5 max-md:mb-2">
                      <div>
                        <span className="text-white font-bold text-sm max-md:text-xs tracking-wider block">
                          {order.id}
                        </span>
                        <span className="text-white/30 text-[10px]">
                          {formatOrderDate(order.date)}
                        </span>
                      </div>
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Item thumbnails */}
                    <div className="flex items-center gap-2 mb-2.5 max-md:mb-2">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="relative w-8 h-8 max-md:w-7 max-md:h-7 rounded-lg overflow-hidden border-2 border-[#0a0a0a]"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 max-md:w-7 max-md:h-7 rounded-lg bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center text-white/50 text-[9px] font-bold">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-white/30 text-[10px] ml-1">
                        {order.items.reduce((sum, i) => sum + i.quantity, 0)} item{order.items.reduce((sum, i) => sum + i.quantity, 0) !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {/* Item names */}
                    <p className="text-white/40 text-xs max-md:text-[10px] mb-2 truncate">
                      {order.items.map((i) => i.name).join(", ")}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-white/30 text-[10px]">Total</span>
                      <span className="text-white font-bold text-sm max-md:text-xs">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
