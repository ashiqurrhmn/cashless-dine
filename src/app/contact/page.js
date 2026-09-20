"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { IoCall, IoMail, IoLocation, IoTime } from "react-icons/io5";
import toast from "react-hot-toast";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      e.target.reset();
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 max-md:pt-24 pb-12 px-6 max-md:px-4 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <div className="inline-block h-[2px] w-12 bg-accent mb-6"></div>
          <h1 className="font-heading text-5xl max-md:text-4xl font-extrabold text-white mb-6">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-white/60 text-lg max-md:text-base max-w-2xl mx-auto font-light">
            Have a question, special request, or feedback? We'd love to hear from you. 
            Reach out to our team using the form below or our direct contact details.
          </p>
        </motion.div>
      </section>

      {/* Content Grid */}
      <section className="px-6 max-md:px-4 pb-32 max-md:pb-36 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 max-md:gap-6">
          
          {/* Left Column: Contact Details */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4"
          >
            <motion.div variants={fadeIn} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex items-start gap-5 hover:border-accent/40 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
                <IoLocation className="text-2xl text-white group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Location</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  123 Culinary Avenue<br />
                  Food District, NY 10012
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex items-start gap-5 hover:border-accent/40 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
                <IoCall className="text-2xl text-white group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Phone</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-1">
                  Reservations: +1 (555) 123-4567
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  General: +1 (555) 987-6543
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex items-start gap-5 hover:border-accent/40 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
                <IoMail className="text-2xl text-white group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Email</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-1">
                  hello@cashlessdine.com
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  events@cashlessdine.com
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex items-start gap-5 hover:border-accent/40 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all">
                <IoTime className="text-2xl text-white group-hover:text-accent transition-colors" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Hours</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-1">
                  Mon-Thu: 11:00 AM - 10:00 PM
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Fri-Sun: 11:00 AM - 11:30 PM
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-2xl p-10 max-md:p-6"
          >
            <h2 className="font-heading text-2xl font-bold text-white mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-white/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent transition-all appearance-none cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="events">Private Events</option>
                  <option value="careers">Careers</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
