"use client";

import React from "react";
import { motion } from "framer-motion";
import { VERIFIED_STATS } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function StatsSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {VERIFIED_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <SpotlightCard className="p-6 text-center space-y-2 border border-white/10 hover:border-blue-500/30 transition-all">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                {stat.value}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {stat.label}
              </h4>
              <p className="text-[11px] font-mono text-gray-400 font-light">
                {stat.detail}
              </p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
