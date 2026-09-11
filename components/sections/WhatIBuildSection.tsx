"use client";

import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Layers, LineChart, Zap, FlaskConical, PackageCheck } from "lucide-react";
import { WHAT_I_BUILD } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionBadge } from "@/components/common/SectionBadge";

const ICON_MAP: Record<string, React.ElementType> = {
  BrainCircuit,
  Layers,
  LineChart,
  Zap,
  FlaskConical,
  PackageCheck
};

export function WhatIBuildSection() {
  return (
    <section id="what-i-build" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <SectionBadge
          icon={<Layers size={14} />}
          text="Scope of Work"
          color="emerald"
        />
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          What I Build
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          A mixture of practical products, algorithmic experiments, and full-stack software.
        </motion.p>
      </div>

      {/* 6 Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHAT_I_BUILD.map((item, index) => {
          const Icon = ICON_MAP[item.icon] || Layers;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-6 sm:p-7 flex flex-col justify-between group border border-white/10 hover:border-white/25 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                <div className="space-y-4">
                  {/* Icon & Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:text-white group-hover:border-blue-500/40 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      Domain 0{index + 1}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Practical Examples with micro-interactions */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    Representative Work:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.examples.map((ex) => (
                      <span
                        key={ex}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-gray-300 border border-white/10 hover:border-white/20 hover:bg-white/[0.08] hover:text-white transition-colors"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
