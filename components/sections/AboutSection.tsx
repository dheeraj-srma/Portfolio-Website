"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Eye, BarChart3, Code2, Zap, Rocket, Sparkles } from "lucide-react";
import { ABOUT_IDENTITY_CARDS } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Cpu,
  Eye,
  BarChart3,
  Code2,
  Zap,
  Rocket,
  Sparkles,
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 uppercase tracking-widest"
        >
          <Brain size={14} />
          <span>Core Competencies</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Engineering Identity & Mindset
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Direct, zero-fluff capabilities focused on building high-performance intelligence systems.
        </motion.p>
      </div>

      {/* Identity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ABOUT_IDENTITY_CARDS.map((card, index) => {
          const Icon = ICON_MAP[card.icon] || Sparkles;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <SpotlightCard className="h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  {/* Icon Container */}
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300">
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                    {card.title}
                  </h3>

                  {/* One sentence description */}
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-blue-500/0 via-purple-500/40 to-blue-500/0 group-hover:via-blue-400 transition-all" />
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
