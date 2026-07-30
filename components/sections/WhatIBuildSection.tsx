"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Zap, Network, LineChart, Layout, Building2 } from "lucide-react";
import { WHAT_I_BUILD_CARDS } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

const ICON_MAP: Record<string, React.ElementType> = {
  BrainCircuit,
  Zap,
  Network,
  LineChart,
  Layout,
  Building2,
};

export function WhatIBuildSection() {
  return (
    <section id="what-i-build" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-mono text-cyan-300 uppercase tracking-widest"
        >
          <BrainCircuit size={14} />
          <span>Product Mindset</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          What I Build & Solve
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Focusing on product outcomes, real-world utility, and system reliability over raw syntax.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WHAT_I_BUILD_CARDS.map((card, index) => {
          const Icon = ICON_MAP[card.icon] || BrainCircuit;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <SpotlightCard className={`h-full flex flex-col justify-between border ${card.gradient} transition-all duration-300 group`}>
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Product Discipline</span>
                  <span className="text-cyan-400">0{index + 1}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
