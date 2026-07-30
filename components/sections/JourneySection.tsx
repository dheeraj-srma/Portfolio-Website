"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Milestone, CheckCircle2, ChevronRight } from "lucide-react";
import { JOURNEY_MILESTONES } from "@/lib/data";

export function JourneySection() {
  return (
    <section id="journey" className="py-24 px-4 md:px-8 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-blue-300 uppercase tracking-widest"
        >
          <Milestone size={14} />
          <span>Growth Evolution</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          The Engineering Roadmap
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          A progressive trajectory of technical compounding, product experimentation, and machine intelligence.
        </motion.p>
      </div>

      {/* Interactive Timeline Container */}
      <div className="relative">
        {/* Vertical Center Glow Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 transform -translate-x-1/2" />

        <div className="space-y-12">
          {JOURNEY_MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.05 * index }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node Marker */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="h-9 w-9 rounded-full bg-[#0A0A0E] border-2 border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center text-blue-400">
                    <CheckCircle2 size={16} />
                  </div>
                </div>

                {/* Content Box */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                  <div className="group relative rounded-2xl glass-panel p-6 border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] shadow-xl">
                    {/* Top Meta info */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {item.year}
                      </span>
                      <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                        <span>{item.category}</span>
                        <ChevronRight size={12} className="text-gray-500" />
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-purple-400 mt-1 mb-3">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
