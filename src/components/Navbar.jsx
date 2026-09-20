"use client";

import Link from "next/link";
import { IoRestaurant, IoInformationCircle, IoCall, IoCart, IoPersonOutline, IoHeartOutline } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { itemCount, favorites } = useCart();

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="flex items-center justify-between px-12 py-5 md:px-6 max-md:px-4 max-w-[90rem] mx-auto w-full">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="text-xl max-md:text-[1.1rem] font-bold tracking-tight text-white uppercase">
              Cashless<span className="text-accent">Dine</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-10 font-semibold text-[0.95rem] tracking-wide text-white/90 max-md:hidden">
            <Link href="/menu" className="nav-link">Menu</Link>
            <Link href="/booking" className="nav-link">Reservation</Link>
            <a href="#contact" className="nav-link">Contact</a>
            
            <div className="flex items-center gap-6 ml-4 border-l border-white/20 pl-10">
              <Link href="/favorites" className="relative hover:text-accent transition-colors" aria-label="Favorites">
                <IoHeartOutline className="text-2xl" />
                <AnimatePresence>
                  {favorites.length > 0 && (
                    <motion.span
                      key="fav-badge-desktop"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2.5 -right-3 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full px-1 shadow-[0_0_10px_rgba(232,75,43,0.5)]"
                    >
                      {favorites.length > 99 ? "99+" : favorites.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              <Link href="/cart" className="relative hover:text-accent transition-colors" aria-label="Cart">
                <IoCart className="text-2xl" />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key="cart-badge-desktop"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2.5 -right-3 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full px-1 shadow-[0_0_10px_rgba(232,75,43,0.5)]"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              <Link href="/profile" className="relative hover:text-accent transition-colors" aria-label="Profile">
                <IoPersonOutline className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation (Fixed) */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 hidden max-md:flex justify-around items-center bg-[#000000]/60 backdrop-blur-xl pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 "
      >
        <Link href="/menu" className="mobile-nav-item">
          <IoRestaurant />
          <span>Menu</span>
        </Link>
        <Link href="/favorites" className="mobile-nav-item relative">
          <IoHeartOutline />
          <span>Favorites</span>
          <AnimatePresence>
            {favorites.length > 0 && (
              <motion.span
                key="fav-badge-mobile"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 right-0 min-w-[16px] h-[16px] flex items-center justify-center bg-accent text-white text-[9px] font-bold rounded-full px-0.5 shadow-[0_0_10px_rgba(232,75,43,0.5)]"
              >
                {favorites.length > 99 ? "99+" : favorites.length}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link href="/booking" className="mobile-nav-item">
          <MdOutlineTableRestaurant />
          <span>Reserve</span>
        </Link>
        <Link href="/cart" className="mobile-nav-item relative">
          <IoCart />
          <span>Cart</span>
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.span
                key="cart-badge-mobile"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 right-0 min-w-[16px] h-[16px] flex items-center justify-center bg-accent text-white text-[9px] font-bold rounded-full px-0.5 shadow-[0_0_10px_rgba(232,75,43,0.5)]"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Link href="/profile" className="mobile-nav-item">
          <IoPersonOutline />
          <span>Profile</span>
        </Link>
      </motion.nav>
    </>
  );
};

export default Navbar;
