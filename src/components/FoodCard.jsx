"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FavoriteButton from "./FavoriteButton";

const FoodCard = ({ food, index }) => {
  // Using 1-based index for the badge number
  const itemNumber = index + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="group flex flex-col mb-12 break-inside-avoid relative pl-6"
    >
      {/* The vertical thin line on the left */}
      <div className="absolute left-0 top-6 bottom-0 w-[1.5px] bg-[#fff]/20"></div>

      <div className="absolute left-[-15px] top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
        {itemNumber}
      </div>

      <div className="flex-1 flex flex-col pt-1">
        <Link href={`/menu/${food.id}`} className="no-underline block">
          {/* Title and Price row */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-heading text-2xl max-md:text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#e84b2b] leading-tight">
              {food.name}
            </h3>
            <div className="text-xl max-md:text-lg font-bold text-white whitespace-nowrap">
              ${food.price.toFixed(2)}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-[#888] text-xs leading-relaxed mb-6 max-w-[90%]">
            {food.description}
          </p>
        </Link>
        
        {/* Image */}
        <Link href={`/menu/${food.id}`} className="block relative w-full aspect-[4/3] max-md:aspect-square overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-500 group-hover:translate-y-[-5px]">
          <Image
            src={food.image}
            alt={food.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 z-20">
            <FavoriteButton foodId={food.id} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default FoodCard;
