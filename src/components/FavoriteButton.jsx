"use client";

import { useCart } from "@/context/CartContext";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function FavoriteButton({ foodId, className = "" }) {
  const { favorites, toggleFavorite } = useCart();
  const isFav = favorites.includes(foodId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(foodId);
        if (isFav) {
          toast("Removed from favorites", { icon: "💔" });
        } else {
          toast.success("Added to favorites!");
        }
      }}
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 transition-all hover:scale-110 hover:bg-white/10 ${className}`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isFav ? "filled" : "outline"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.15 }}
        >
          {isFav ? (
            <IoHeart className="text-xl text-accent" />
          ) : (
            <IoHeartOutline className="text-xl text-white" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
