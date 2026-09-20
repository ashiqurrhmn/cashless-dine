"use client";

import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoMailOutline, IoLocationOutline, IoCallOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 max-md:px-4 mt-auto">
      <div className="max-w-[85rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-md:gap-10 mb-16">
          
          {/* Brand & Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block no-underline">
              <div className="text-2xl font-bold tracking-tight text-white uppercase font-heading">
                Cashless<span className="text-accent">Dine</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed pr-4">
              Experience exquisite cuisine crafted by world-class chefs, served in an elegant atmosphere. No cash, no hassle, just pure culinary bliss.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/40 transition-all">
                <IoLogoInstagram className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/40 transition-all">
                <IoLogoFacebook className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent/40 transition-all">
                <IoLogoTwitter className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-sm font-heading">Explore</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/menu" className="text-white/60 hover:text-accent transition-colors text-sm">Our Menu</Link>
              </li>
              <li>
                <Link href="/booking" className="text-white/60 hover:text-accent transition-colors text-sm">Reservations</Link>
              </li>
              <li>
                <Link href="/profile" className="text-white/60 hover:text-accent transition-colors text-sm">My Account</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-accent transition-colors text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-sm font-heading">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <IoLocationOutline className="text-accent text-xl flex-shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  123 Culinary Avenue<br />
                  Food District, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <IoCallOutline className="text-accent text-xl flex-shrink-0" />
                <span className="text-white/60 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <IoMailOutline className="text-accent text-xl flex-shrink-0" />
                <span className="text-white/60 text-sm">hello@cashlessdine.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-sm font-heading">Newsletter</h4>
            <p className="text-white/50 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30"
              />
              <button 
                type="submit" 
                className="w-full bg-accent text-white font-semibold text-sm px-4 py-3 rounded-lg hover:bg-accent-hover transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            © {new Date().getFullYear()} CashlessDine. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
