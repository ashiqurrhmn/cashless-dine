"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { menuItems } from "@/data/menu";
import Navbar from "@/components/Navbar";
import { IoHeartOutline, IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addItem } = useCart();
  
  // Map favorite IDs to actual menu items
  const favoriteItems = favorites
    .map(id => menuItems.find(item => item.id === id))
    .filter(Boolean); // remove any undefined if IDs don't match

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      <section className="pt-28 pb-8 max-md:pt-20 max-md:pb-6 px-6 max-md:px-4">
        <div className="max-w-5xl mx-auto flex items-baseline justify-between">
          <h1 className="font-heading text-4xl max-md:text-3xl font-bold text-white mb-2">
            Favorites
          </h1>
          <span className="text-white/40 text-sm max-md:text-xs font-medium">
            {favoriteItems.length} {favoriteItems.length === 1 ? "item" : "items"}
          </span>
        </div>
      </section>

      <section className="px-6 max-md:px-4 pb-32 max-md:pb-36">
        <div className="max-w-5xl mx-auto">
          {favoriteItems.length === 0 ? (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-20 max-md:py-16 text-center"
            >
              <div className="w-24 h-24 max-md:w-20 max-md:h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <IoHeartOutline className="text-4xl max-md:text-3xl text-white/20" />
              </div>
              <h2 className="font-heading text-2xl max-md:text-xl font-bold text-white mb-3">
                No favorites yet
              </h2>
              <p className="text-white/40 text-sm max-md:text-xs mb-8 max-w-sm mx-auto">
                Keep track of your most loved dishes by tapping the heart icon on the menu.
              </p>
              <Link
                href="/menu"
                className="inline-block bg-accent text-white font-semibold text-sm max-md:text-xs px-8 py-3.5 rounded-xl transition-all duration-300 no-underline hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
              >
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-md:gap-4">
              <AnimatePresence mode="popLayout">
                {favoriteItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-colors"
                  >
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          onClick={() => {
                            toggleFavorite(item.id);
                            toast("Removed from favorites", { icon: "💔" });
                          }}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 transition-all hover:scale-110 hover:bg-white/10 hover:text-red-500 text-white"
                          aria-label="Remove from favorites"
                        >
                          <IoTrashOutline className="text-xl" />
                        </button>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-heading text-xl font-bold text-white mb-2 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-white/40 text-xs line-clamp-2 mb-4 flex-1">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-white font-bold text-lg">
                          ${item.price.toFixed(2)}
                        </span>
                        <Link
                          href={`/menu/${item.id}`}
                          className="text-accent text-sm font-semibold hover:underline"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
