import Image from "next/image";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-img.png"
          alt="Exquisite sushi platter with fresh salmon sashimi and maki rolls"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] max-md:object-[70%_center]"
        />
      </div>

      <Navbar />

      {/* Hero text & CTA overlaid on image */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[90rem] mx-auto px-12 pb-20 pt-8 md:px-6 max-md:px-6 max-md:pb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[0.78rem] text-accent font-semibold tracking-wider uppercase w-fit mb-6 animate-fade-in-up">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot"></span>
          Cashless Dining Experience
        </div>

        {/* Heading */}
        <h1 className="font-heading text-[clamp(2.8rem,5.5vw,4.5rem)] max-md:text-4xl font-extrabold leading-[1.08] tracking-tighter text-white mb-6 animate-fade-in-up-delay-1">
          Taste the Art of <br /> Modern  
           <span className="text-accent"> Dining</span>
        </h1>

        {/* Description */}
        <p className="text-[1.05rem] leading-7 text-white/65 max-w-[480px] mb-8 animate-fade-in-up-delay-2">
          Experience exquisite cuisine crafted by world-class chefs, served in
          an elegant atmosphere. Pay seamlessly — no cash, no hassle, just
          pure culinary bliss.
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mb-10 max-sm:flex-col max-sm:w-full animate-fade-in-up-delay-3">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 bg-accent text-white px-9 py-4 rounded-xl text-base font-semibold no-underline border-none cursor-pointer transition-all duration-300 shadow-[0_4px_24px_rgba(232,75,43,0.3)] hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(232,75,43,0.3)] max-sm:w-full max-sm:justify-center group"
          >
            Explore Menu
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md text-white px-9 py-4 rounded-xl text-base font-semibold no-underline border border-white/12 cursor-pointer transition-all duration-300 hover:border-white/30 hover:bg-white/12 max-sm:w-full max-sm:justify-center"
          >
            Reserve Now
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-10 pt-6 border-t border-white/10 max-md:gap-6 max-md:flex-wrap animate-fade-in-up-delay-4">
          <div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              200<span className="text-accent">+</span>
            </div>
            <div className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">Dishes</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              50<span className="text-accent">k+</span>
            </div>
            <div className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">Happy Guests</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              4.9<span className="text-accent">★</span>
            </div>
            <div className="text-xs text-white/50 mt-0.5 uppercase tracking-wide">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
