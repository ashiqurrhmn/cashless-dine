"use client";

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ food }) {
  const { addItem, items } = useCart();
  const router = useRouter();

  const existingItem = items.find((i) => i.id === food.id);
  const isMaxed = existingItem?.quantity >= 20;

  function handleAddToCart() {
    if (isMaxed) {
      toast.error("Maximum quantity reached for this item.");
      return;
    }
    addItem(food);
    toast.success(`${food.name} added to cart!`);
  }

  function handleBuyNow() {
    if (!isMaxed) {
      addItem(food);
    }
    router.push("/cart");
  }

  return (
    <div className="flex gap-4 max-md:flex-col mt-4">
      <button
        onClick={handleAddToCart}
        disabled={isMaxed}
        className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isMaxed ? "Max in Cart" : existingItem ? `Add Another (${existingItem.quantity} in cart)` : "Add to Cart"}
      </button>
      <button
        onClick={handleBuyNow}
        className="flex-1 bg-accent hover:bg-[#ff6347] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(232,75,43,0.4)] hover:shadow-[0_6px_25px_rgba(232,75,43,0.6)]"
      >
        Buy Now
      </button>
    </div>
  );
}
