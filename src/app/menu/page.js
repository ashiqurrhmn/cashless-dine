"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FoodCard from "@/components/FoodCard";
import CategoryFilter from "@/components/CategoryFilter";
import { menuItems, categories } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-black pb-24 selection:bg-accent selection:text-white">
      {/* We can hide the default Navbar on this specific elegant page, or keep it. 
          Given the screenshot has a specific back button and header, we will omit the default Navbar
          to achieve the exact look of the design, or maybe just render it but we don't need it.
          We will omit Navbar here for maximum fidelity to the screenshot. */}

      {/* Floating Back Button */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 max-md:top-6 max-md:left-6 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-50 shadow-2xl border border-white/20 group"
      >
        <IoArrowBack className="text-xl transition-transform group-hover:-translate-x-1" />
      </Link>

      <section className="pt-16 pb-12 px-12 max-md:px-6 max-w-[75rem] mx-auto w-full">
        {/* Page Header */}
        <div className="flex justify-end items-start mb-16 max-md:mb-12">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right"
          >
            <p className="text-white text-xs max-md:text-[0.65rem] font-bold tracking-[0.3em] uppercase mb-1">
              Cashless Dine
            </p>
            <div className="font-heading text-white flex flex-col items-end leading-[0.75]">
               <div className="text-[8rem] max-md:text-[5rem] font-medium tracking-tight">ME</div>
               <div className="text-[8rem] max-md:text-[5rem] font-medium tracking-tighter">NU</div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>

        {/* Food Grid - Masonry style using CSS columns */}
        <div className="columns-1 md:columns-2 gap-x-12 max-md:gap-x-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <FoodCard key={item.id} food={item} index={index} />
            ))}
            
            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center break-inside-avoid w-full inline-block"
              >
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-xl text-white font-bold mb-2">No items found</h3>
                <p className="text-white/60 text-sm">We couldn't find any dishes in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
