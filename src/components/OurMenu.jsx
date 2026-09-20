import Image from "next/image";

const OurMenu = () => {
  return (
    <section id="menu" className="bg-white py-24 max-md:py-12 relative z-10 max-md:-mt-1">
      <div className="max-w-[90rem] mx-auto px-12 max-md:px-5">

        {/* Row 1 — Two feature cards */}
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6 mb-6 max-md:gap-4 max-md:mb-4">
          {/* Left — Accent card with CTA */}
          <div className="bg-[#1a1a1a] rounded-2xl p-10 max-md:p-6 flex flex-col justify-between min-h-[320px] max-md:min-h-[240px]">
            <div>
              <h2 className="font-heading text-4xl max-md:text-2xl font-extrabold text-white leading-tight mb-4 max-md:mb-3">
                Modern Cashless <br className="max-md:hidden" /> Dining Experience
              </h2>
              <p className="text-white/60 text-sm max-md:text-xs leading-relaxed max-w-md mb-8 max-md:mb-6">
                Seamless ordering, cashless payments, and world-class cuisine —
                all in one place. Discover a new way to dine with CashlessDine.
              </p>
            </div>
            <div>
              <a
                href="#reservation"
                className="inline-block bg-accent text-white font-semibold text-sm max-md:text-xs px-7 py-3.5 max-md:px-5 max-md:py-2.5 rounded-full transition-all duration-300 no-underline hover:bg-accent-hover hover:shadow-[0_4px_20px_rgba(232,75,43,0.4)]"
              >
                Book a Table
              </a>
            </div>
          </div>

          {/* Right — Info card with circular image */}
          <div className="bg-white rounded-2xl p-10 max-md:p-6 relative overflow-hidden min-h-[320px] max-md:min-h-[240px] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="absolute top-6 right-6 max-md:top-4 max-md:right-4 w-20 h-20 max-md:w-14 max-md:h-14 rounded-full overflow-hidden border-4 border-[#faf8f5] shadow-lg">
              <Image
                src="/assets/sushi-platter.jpg"
                alt="Fresh sushi"
                fill
                sizes="(max-width: 768px) 56px, 80px"
                className="object-cover"
              />
            </div>
            <div className="max-w-[80%] max-md:max-w-[75%]">
              <div className="w-2 h-2 bg-accent rounded-full mb-4 max-md:mb-3"></div>
              <h3 className="font-heading text-2xl max-md:text-xl font-bold text-[#1a1a1a] leading-snug mb-3 max-md:mb-2">
                Experience Fine Cuisine <br className="max-md:hidden" /> Crafted for You
              </h3>
              <p className="text-[#888] text-sm max-md:text-xs leading-relaxed">
                Our master chefs bring decades of culinary expertise, blending
                traditional techniques with modern innovation to deliver dishes
                that delight every sense. Every plate tells a story.
              </p>
            </div>
          </div>
        </div>

        {/* Row 2 — Bento grid: image + text cards */}
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-6 mb-6 max-md:gap-4 max-md:mb-4">
          {/* Left — Large food image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[360px] max-lg:min-h-[260px] max-md:min-h-[200px]">
            <Image
              src="/assets/sashimi-plate.jpg"
              alt="Premium sashimi"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* Middle — Image on top, dark overlay card below */}
          <div className="rounded-2xl overflow-hidden flex flex-col">
            <div className="relative h-44 max-md:h-36 flex-shrink-0">
              <Image
                src="/assets/signature-rolls.jpg"
                alt="Signature rolls"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="bg-[#1a1a1a] p-6 max-md:p-5 flex-1 flex flex-col justify-center">
              <h3 className="font-heading text-lg max-md:text-base font-bold text-white mb-2 max-md:mb-1">
                Every Dish is Crafted <br className="max-md:hidden" /> with Passion
              </h3>
              <p className="text-white/50 text-sm max-md:text-xs leading-relaxed">
                From the freshest ingredients to the finest plating, each dish
                reflects our commitment to culinary perfection.
              </p>
            </div>
          </div>

          {/* Right — Dark card on top, image below */}
          <div className="rounded-2xl overflow-hidden flex flex-col max-lg:flex-col-reverse">
            <div className="bg-[#1a1a1a] p-6 max-md:p-5 flex-1 flex flex-col justify-center">
              <h3 className="font-heading text-lg max-md:text-base font-bold text-white mb-2 max-md:mb-1">
                The Freshest Catch, <br className="max-md:hidden" /> Every Day
              </h3>
              <p className="text-white/50 text-sm max-md:text-xs leading-relaxed">
                We source premium-grade fish daily, ensuring the highest quality
                in every sushi, sashimi, and roll we serve.
              </p>
            </div>
            <div className="relative h-44 max-md:h-36 flex-shrink-0">
              <Image
                src="/assets/chef-special.jpg"
                alt="Chef special"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Row 3 — Bottom text section */}
        <div className="bg-white rounded-2xl p-10 max-md:p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
          <h3 className="font-heading text-2xl max-md:text-xl font-bold text-[#1a1a1a] mb-4 max-md:mb-3">
            Excellence for Your Palate
          </h3>
          <p className="text-[#888] text-sm max-md:text-xs leading-relaxed max-w-2xl mx-auto mb-6 max-md:mb-5">
            At CashlessDine, every meal is an experience. We combine the art of
            traditional cuisine with seamless modern technology, so you can focus
            on what truly matters — savoring every moment and every flavor.
          </p>
          <a
            href="#menu"
            className="inline-block bg-accent text-white font-semibold text-sm max-md:text-xs px-7 py-3.5 max-md:px-5 max-md:py-2.5 rounded-full transition-all duration-300 no-underline hover:bg-accent-hover hover:shadow-[0_4px_20px_rgba(232,75,43,0.4)]"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurMenu;
