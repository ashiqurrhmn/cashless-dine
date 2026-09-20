"use client";

import { motion } from "framer-motion";
import { IoRestaurantOutline, IoSpeedometerOutline, IoCardOutline, IoStarOutline } from "react-icons/io5";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Features() {
  return (
    <section className="py-24 px-6 max-md:px-4 bg-[var(--background)] relative overflow-hidden">
      
      <div className="max-w-[70rem] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-medium mb-4 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Cashless Experience
          </h2>
          <p className="text-white/50 text-sm max-w-2xl mx-auto tracking-wide">
            Discover a new standard of dining where seamless technology meets culinary excellence. Let us redefine your expectations.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          
          {/* Left Column: Tall Card */}
          <motion.div variants={fadeUpVariants} className="bg-white/[0.03] border border-white/10 p-10 flex flex-col items-center text-center rounded-2xl hover:border-accent/30 transition-colors">
            <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center mb-6">
              <IoRestaurantOutline className="text-xl" />
            </div>
            <h3 className="font-heading text-xl font-medium tracking-widest uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Premium Dining
            </h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Immerse yourself in an atmosphere of refined elegance. Our expertly curated menus are designed to delight the senses and provide an unforgettable gastronomic journey.
            </p>
            <p className="text-[#888] text-xs leading-relaxed mb-8 italic">
              From hand-selected ingredients to masterful presentation, every detail matters.
            </p>
            <div className="w-16 h-[1px] bg-accent/30 my-4"></div>
            <p className=" text-xs font-semibold tracking-widest uppercase mt-4">
              Learn More
            </p>
          </motion.div>

          {/* Center Column: Two Stacked Cards */}
          <div className="flex flex-col gap-6">
            <motion.div variants={fadeUpVariants} className="bg-white/[0.03] border border-white/10 p-8 flex flex-col items-center text-center rounded-2xl flex-1 justify-center hover:border-accent/30 transition-colors">
              <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center mb-4">
                <IoSpeedometerOutline className="text-lg" />
              </div>
              <h3 className="font-heading text-lg font-medium tracking-widest uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Fast Service
              </h3>
              <p className="text-[#a0a0a0] text-xs leading-relaxed mb-4">
                Hot and fresh to your table or your door in record time, without ever compromising on quality.
              </p>
              <p className=" text-xs font-semibold tracking-widest uppercase mt-2">
                Order Now
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="bg-white/[0.03] border border-white/10 p-8 flex flex-col items-center text-center rounded-2xl flex-1 justify-center hover:border-accent/30 transition-colors">
              <div className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center mb-4">
                <IoCardOutline className="text-lg" />
              </div>
              <h3 className="font-heading text-lg font-medium tracking-widest uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Seamless Pay
              </h3>
              <p className="text-[#a0a0a0] text-xs leading-relaxed mb-4">
                Leave your wallet at home. Order, split the bill, and pay directly from your phone.
              </p>
              <div className="w-8 h-[1px] bg-accent/30 mt-4 mb-2"></div>
            </motion.div>
          </div>

          {/* Right Column: Tall Card */}
          <motion.div variants={fadeUpVariants} className="bg-white/[0.03] border border-white/10 p-10 flex flex-col items-center text-center rounded-2xl hover:border-accent/30 transition-colors">
            <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center mb-6">
              <IoStarOutline className="text-xl" />
            </div>
            <h3 className="font-heading text-xl font-medium tracking-widest uppercase mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Private Events
            </h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
              Elevate your special occasions with our exclusive private dining experiences. Tailored menus and dedicated staff ensure perfection.
            </p>
            <p className="text-[#888] text-xs leading-relaxed mb-8 italic">
              Perfect for corporate gatherings, intimate weddings, and milestone celebrations.
            </p>
            <div className="w-16 h-[1px] bg-accent/30 my-4"></div>
            <p className=" text-xs font-semibold tracking-widest uppercase mt-4">
              Book Event
            </p>
          </motion.div>

        </motion.div>
        
        {/* Footer text of section */}
        <motion.div 
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-12"
        >
           <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">Explore</p>
           <p className=" text-xs italic tracking-wider">Discover our world of culinary excellence and modern dining.</p>
        </motion.div>
      </div>
    </section>
  );
}
