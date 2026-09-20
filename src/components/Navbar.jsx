"use client";

import { IoRestaurant, IoInformationCircle, IoCall } from "react-icons/io5";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="flex items-center justify-between px-12 py-5 md:px-6 max-md:px-4 max-w-[90rem] mx-auto w-full">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="text-xl max-md:text-[1.1rem] font-bold tracking-tight text-white uppercase">
              Cashless<span className="text-accent">Dine</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-12 font-semibold text-[0.95rem] tracking-wide text-white/90 max-md:hidden">
            <a href="/menu" className="nav-link">Menu</a>
            <a href="#about" className="nav-link">About</a>
            <a href="/booking" className="nav-link">Reservation</a>
            <a href="#contact" className="nav-link">Contact</a>
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
        <a
          href="/menu" className="mobile-nav-item">
          <IoRestaurant />
          <span>Menu</span>
        </a>
        <a href="#about" className="mobile-nav-item">
          <IoInformationCircle />
          <span>About</span>
        </a>
        <a href="/booking" className="mobile-nav-item">
          <MdOutlineTableRestaurant />
          <span>Reserve</span>
        </a>
        <a href="#contact" className="mobile-nav-item">
          <IoCall />
          <span>Contact</span>
        </a>
      </motion.nav>
    </>
  );
};

export default Navbar;
