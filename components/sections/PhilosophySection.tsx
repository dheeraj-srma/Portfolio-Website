"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { PHILOSOPHY_QUOTES } from "@/lib/data";

export function PhilosophySection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHILOSOPHY_QUOTES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="philosophy" className="py-28 px-4 md:px-8 max-w-5xl mx-auto relative z-10 text-center">
      <div className="relative rounded-3xl glass-panel p-8 sm:p-14 border border-white/10 overflow-hidden shadow-2xl">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-purple-400">
            <Quote size={28} />
          </div>

          {/* Rotating Quote Container */}
          <div className="min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="space-y-4"
              >
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
                  "{PHILOSOPHY_QUOTES[index].quote}"
                </h3>
                <p className="text-sm font-mono text-blue-400 uppercase tracking-widest pt-2">
                  — {PHILOSOPHY_QUOTES[index].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {PHILOSOPHY_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-blue-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
