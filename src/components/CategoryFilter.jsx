"use client";

import { motion } from "framer-motion";

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`relative whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              isActive 
                ? "text-white" 
                : "text-white/60 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-accent rounded-full -z-10 shadow-[0_4px_20px_rgba(232,75,43,0.3)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
