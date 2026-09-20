import { menuItems } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";

export default async function FoodDetail({ params }) {
  const { id } = await params;
  
  const food = menuItems.find(item => item.id === id);

  if (!food) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-5 relative overflow-hidden">
        {/* Abstract background blobs for error state */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>
        <div className="text-6xl mb-6 relative z-10">🍽️</div>
        <h1 className="font-heading text-4xl text-white font-bold mb-4 relative z-10">Dish Not Found</h1>
        <p className="text-white/60 mb-8 relative z-10 max-w-md">We couldn't find the culinary masterpiece you're looking for.</p>
        <Link href="/menu" className="relative z-10 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
          Return to Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex max-lg:flex-col selection:bg-accent selection:text-white relative">
      {/* Floating Back Button */}
      <Link 
        href="/menu" 
        className="fixed top-8 left-8 max-md:top-6 max-md:left-6 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-50 shadow-2xl border border-white/20 group"
      >
        <IoArrowBack className="text-xl transition-transform group-hover:-translate-x-1" />
      </Link>

      {/* Left side: Massive Image Edge-to-Edge */}
      <div className="w-1/2 max-lg:w-full max-lg:h-[55vh] relative">
        <Image
          src={food.image}
          alt={food.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        {/* Gradient overlays to blend smoothly into the black content area */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black max-lg:hidden pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent lg:hidden pointer-events-none"></div>
      </div>

      {/* Right side: Modern Content Block */}
      <div className="w-1/2 max-lg:w-full flex items-center justify-center p-20 max-lg:p-12 max-md:p-8 relative">
        <div className="max-w-xl w-full">
          {/* Category Tag with Line Accent */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-accent"></div>
            <p className="text-accent text-sm font-bold tracking-[0.3em] uppercase">
              {food.category}
            </p>
          </div>
          
          
          <div className="flex items-start justify-between gap-6 mb-6">
            <h1 className="font-heading text-6xl max-xl:text-5xl max-md:text-4xl font-extrabold text-white leading-[1.1]">
              {food.name}
            </h1>
            <div className="pt-2">
              <FavoriteButton foodId={food.id} className="w-12 h-12 border-2" />
            </div>
          </div>
          
          <div className="text-5xl max-md:text-4xl font-light text-white mb-10 tracking-tight">
            ${food.price.toFixed(2)}
          </div>
          
          <p className="text-white/70 text-lg max-md:text-base leading-relaxed mb-14 font-light">
            {food.description}
          </p>

          {/* Action Buttons */}
          <AddToCartButton food={food} />
        </div>
      </div>
    </main>
  );
}
