"use client";

import React from "react";
import { motion } from "framer-motion";
import { Milestone, CheckCircle2, ChevronRight, Briefcase, GraduationCap } from "lucide-react";
import { JOURNEY_MILESTONES } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function JourneySection() {
  return (
    <section id="journey" className="py-24 px-4 md:px-8 max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-blue-300 uppercase tracking-widest"
        >
          <Milestone size={14} />
          <span>Timeline & Background</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Journey & Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Studying engineering while relentlessly building systems beyond the classroom.
        </motion.p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
        {JOURNEY_MILESTONES.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="relative group"
          >
            {/* Timeline Marker Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-[#050505] border-2 border-blue-500 group-hover:scale-125 group-hover:border-purple-400 transition-all shadow-[0_0_10px_rgba(59,130,246,0.6)]" />

            <SpotlightCard className="p-6 space-y-3 border border-white/10 hover:border-white/20 transition-colors">
              {/* Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {item.organization}
                  </span>
                </div>
                <span className="text-xs font-mono text-purple-400 font-medium">
                  {item.role}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-gray-400 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
