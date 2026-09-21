"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center py-20">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Something went wrong</h2>
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. An unexpected error has occurred while processing your request.
        </p>
        <button
          onClick={() => reset()}
          className="bg-accent text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_4px_24px_rgba(232,75,43,0.4)]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
