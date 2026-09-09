"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Lightbulb, ChevronRight, Binary, ArrowRight } from "lucide-react";
import { ENGINEERING_PHILOSOPHY } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function PhilosophySection() {
  const [selectedId, setSelectedId] = useState(ENGINEERING_PHILOSOPHY[0].id);
  const activeTenet = ENGINEERING_PHILOSOPHY.find((t) => t.id === selectedId) || ENGINEERING_PHILOSOPHY[0];

  return (
    <section id="philosophy" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-blue-300 uppercase tracking-widest"
        >
          <Lightbulb size={14} />
          <span>Core Principles</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Engineering Philosophy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Five principles that govern how I study, experiment, and build systems.
        </motion.p>
      </div>

      {/* Interactive Philosophy Station Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side (5 cols): List of 5 Tenets evenly stretched with stagger */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full gap-3">
          {ENGINEERING_PHILOSOPHY.map((tenet, idx) => {
            const isSelected = tenet.id === selectedId;
            return (
              <motion.button
                key={tenet.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedId(tenet.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-blue-600/15 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs font-semibold ${
                      isSelected ? "text-blue-400" : "text-gray-500 group-hover:text-gray-400"
                    }`}
                  >
                    {tenet.number}
                  </span>
                  <div>
                    <h3
                      className={`text-base font-bold tracking-tight transition-colors ${
                        isSelected ? "text-white" : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {tenet.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light truncate max-w-xs mt-0.5">
                      {tenet.principle}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    isSelected ? "text-blue-400 translate-x-1" : "text-gray-600 group-hover:text-gray-400"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Right Side (7 cols): Deep-Dive Exploration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col h-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTenet.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-8 sm:p-10 flex flex-col justify-between border border-white/15 bg-white/[0.02] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="space-y-6">
                  {/* Top Meta */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
                      Principle {activeTenet.number}
                    </span>
                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                      {activeTenet.motif}
                    </span>
                  </div>

                  {/* Title & Principle */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {activeTenet.title}
                    </h3>
                    <p className="text-base sm:text-lg font-mono text-purple-300">
                      "{activeTenet.principle}"
                    </p>
                  </div>

                  {/* Full Description */}
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                    {activeTenet.description}
                  </p>
                </div>

                {/* Footnote on execution */}
                <div className="pt-8 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>How I work</span>
                  <span className="text-blue-400 flex items-center gap-1">
                    Continuous practice <ArrowRight size={12} />
                  </span>
                </div>
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
