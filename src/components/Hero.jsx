import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col">
      {/* Image determining section height naturally on desktop */}
      <div className="relative w-full">
        {/* Desktop Image */}
        <Image
          src="/assets/hero-img2.png"
          alt="Exquisite sushi platter with fresh salmon sashimi and maki rolls"
          width={1905}
          height={911}
          priority
          sizes="100vw"
          className="hidden md:block w-full h-auto object-cover object-bottom"
        />
        {/* Mobile Image */}
        <Image
          src="/assets/hero-img-mobile.png"
          alt="Exquisite sushi platter with fresh salmon sashimi and maki rolls - Mobile View"
          width={941}
          height={1672}
          priority
          sizes="100vw"
          className="block md:hidden w-full h-auto object-cover object-bottom"
        />
      </div>



      {/* Hero text & CTA overlaid on image */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center max-md:justify-start max-md:pt-[25%] max-md:pb-10 w-full max-w-[90rem] mx-auto px-12 md:px-6 max-md:px-5">
        <div className="max-w-2xl max-md:text-center max-md:mx-auto max-md:flex max-md:flex-col max-md:items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-white/10 px-4 py-1.5 max-md:px-3 max-md:py-1 rounded-full text-[0.65rem] max-md:text-[0.55rem] text-accent font-semibold tracking-widest uppercase w-fit mb-6 max-md:mb-3">
            <span className="w-1.5 h-1.5 max-md:w-1 max-md:h-1 bg-accent rounded-full"></span>
            Cashless Dining Experience
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl max-md:text-[2rem] md:text-7xl font-extrabold text-white mb-6 max-md:mb-3 leading-[1.1] tracking-tight">
            Taste the Art of <br />
            Modern <span className="text-accent">Dining</span>
          </h1>

          {/* Description */}
          <p className="text-[#888] text-base max-md:text-xs leading-relaxed max-w-md mb-8 max-md:mb-6">
            Experience exquisite cuisine crafted by world-class chefs, served in
            an elegant atmosphere. Pay seamlessly — no cash, no hassle, just
            pure culinary bliss.
          </p>

          {/* Action buttons */}
          <div className="flex items-center justify-start max-md:justify-center gap-4 mb-12 max-sm:w-[95%] max-sm:gap-3 max-sm:mb-6">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3 max-md:py-2.5 max-md:px-2 max-md:text-[0.8rem] rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_20px_rgba(232,75,43,0.4)] max-sm:flex-1 group"
            >
              Explore Menu 
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#reservation"
              className="inline-flex items-center justify-center gap-2 bg-[#222] text-white px-7 py-3 max-md:py-2.5 max-md:px-2 max-md:text-[0.8rem] rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-[#333] max-sm:flex-1"
            >
              Reserve Now
            </a>
          </div>

          {/* Stats */}
          <div className="flex max-md:hidden items-center gap-12 pt-8 max-md:pt-4 border-t border-white/10 max-md:gap-4 max-md:w-[85%] max-md:justify-between">
            <div className="max-md:text-center">
              <div className="text-2xl max-md:text-lg font-bold text-white mb-1">
                200<span className="text-accent">+</span>
              </div>
              <div className="text-[10px] max-md:text-[8px] text-white/50 tracking-widest uppercase">Dishes</div>
            </div>
            <div className="max-md:text-center">
              <div className="text-2xl max-md:text-lg font-bold text-white mb-1">
                50<span className="text-accent">k+</span>
              </div>
              <div className="text-[10px] max-md:text-[8px] text-white/50 tracking-widest uppercase">Guests</div>
            </div>
            <div className="max-md:text-center">
              <div className="text-2xl max-md:text-lg font-bold text-white mb-1">
                4.9<span className="text-accent">★</span>
              </div>
              <div className="text-[10px] max-md:text-[8px] text-white/50 tracking-widest uppercase">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
