"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Layers, Cpu, Database, Wrench, BarChart2 } from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Programming Languages": Code2,
  "AI & Machine Learning": Cpu,
  "Data & Visualization": BarChart2,
  "Backend & Frameworks": Layers,
  "Databases & Storage": Database,
  "Tools & DevOps": Wrench,
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-mono text-pink-300 uppercase tracking-widest"
        >
          <Code2 size={14} />
          <span>Technical Arsenal</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Categorized tech stack optimized for machine intelligence, data pipelines, and full-stack execution.
        </motion.p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((category, catIndex) => {
          const Icon = CATEGORY_ICONS[category.name] || Code2;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <SpotlightCard className="h-full space-y-6">
                {/* Category Title Header */}
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.name}
                  </h3>
                </div>

                {/* Tech Chips Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative cursor-default"
                    >
                      <div className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono font-medium text-gray-200 backdrop-blur-md transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600/30 group-hover:to-purple-600/30 group-hover:border-blue-400/50 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
