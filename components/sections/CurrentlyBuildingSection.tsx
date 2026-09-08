"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Compass, BookOpen, ArrowRight, Binary } from "lucide-react";
import { CURRENTLY_BUILDING, CONTINUOUS_LEARNING } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function CurrentlyBuildingSection() {
  return (
    <section id="currently-building" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest"
        >
          <Terminal size={14} />
          <span>Active Workstation</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Currently Building & Exploring
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          A living snapshot of active software builds and areas of technical deep-dive. Not static certifications—active engineering.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side (7 cols): In Active Development */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              On The Workbench This Month
            </span>
            <span className="text-[11px] font-mono text-gray-500">Live Status</span>
          </div>

          <div className="space-y-4">
            {CURRENTLY_BUILDING.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SpotlightCard className="p-6 space-y-4 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                        {item.domain}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-gray-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold">
                      {item.progress}%
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side (5 cols): Continuous Learning (Exploration Areas) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="px-1 mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-2">
              <BookOpen size={14} />
              Continuous Learning & Reading
            </span>
          </div>

          <div className="space-y-3">
            {CONTINUOUS_LEARNING.map((item, index) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <SpotlightCard className="p-5 space-y-2 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {item.topic}
                  </h4>

                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {item.focus}
                  </p>

                  <div className="pt-2 text-[11px] font-mono text-gray-500">
                    <span className="text-gray-400">Sources:</span> {item.reading}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
