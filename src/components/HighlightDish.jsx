"use client";

import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function HighlightDish() {
  return (
    <section 
      className="relative w-full min-h-[600px] flex flex-col items-center justify-start pt-24 max-md:pt-16 bg-[#000000ff] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/highlight.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        aspectRatio: '1905 / 911'
      }}
    >
      {/* Top Gradient Overlay to ensure text readability against the black background if image varies */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black via-black/10 to-transparent pointer-events-none"></div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Top Decorative Marks */}
        <div className="flex items-center gap-4 mb-2 opacity-80">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="transform rotate-180">
            <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" />
          </svg>
          <span className="w-16 h-[1px] bg-white/40"></span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z" />
          </svg>
        </div>

        {/* Main Title */}
        <h2 
          className="text-white text-7xl max-md:text-5xl max-sm:text-4xl leading-[0.9] tracking-tighter mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          HERB<br/>
          ROASTED<br/>
          CHICKEN
        </h2>

        {/* Separator Line with 'IN' */}
        <div className="flex items-center gap-3 w-full max-w-[300px] justify-center mb-4 mt-2">
          <div className="h-[1px] flex-1 bg-white/40"></div>
          <span className="text-white/90 text-sm tracking-[0.2em] font-medium">IN</span>
          <div className="h-[1px] flex-1 bg-white/40"></div>
        </div>

        {/* Subtitle */}
        <p className="text-white text-lg max-md:text-base tracking-[0.2em] font-semibold font-sans uppercase">
          CREAMY WHITE WINE SAUCE
        </p>

      </motion.div>

      {/* Bottom overlay for blending into next section if needed */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none"></div>
    </section>
  );
}
