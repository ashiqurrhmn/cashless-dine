"use client";

import { IoRestaurant, IoInformationCircle, IoCall } from "react-icons/io5";
import { MdTableBar } from "react-icons/md";

const Navbar = () => {
  

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="flex items-center justify-between px-12 py-5 md:px-6 max-md:px-4 max-w-[90rem] mx-auto w-full">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="text-xl max-md:text-[1.1rem] font-bold tracking-tight text-white uppercase">
              Cashless<span className="text-accent">Dine</span>
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
            <li><a href="#menu" className="nav-link">Menu</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#reservation" className="nav-link">Reservation</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>

          <a
            href="#reservation"
            className="hidden md:inline-block bg-transparent text-white border border-white/20 px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 no-underline hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(232,75,43,0.3)]"
          >
            Book a Table
          </a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (Fixed) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 hidden max-md:flex justify-around items-center bg-[#000000]/60 backdrop-blur-xl pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 ">
        <a
          href="#menu" className="mobile-nav-item">
          <IoRestaurant />
          <span>Menu</span>
        </a>
        <a href="#about" className="mobile-nav-item">
          <IoInformationCircle />
          <span>About</span>
        </a>
        <a href="#reservation" className="mobile-nav-item">
          <MdTableBar />
          <span>Reserve</span>
        </a>
        <a href="#contact" className="mobile-nav-item">
          <IoCall />
          <span>Contact</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
