"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, BookOpen, Atom, Binary, Sparkles, Orbit, Telescope, ScrollText } from "lucide-react";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 uppercase tracking-widest"
        >
          <Compass size={14} />
          <span>Curiosity & Identity</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          An engineering student exploring the intersection of theory, building, and the physical cosmos.
        </motion.p>
      </div>

      {/* Synchronized Parallel Two-Panel Grid (Starts and Ends at Same Vertical Level) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column (7 cols): The Genuine Story (Starts and ends at identical vertical bounds) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col h-full"
        >
          {/* Synchronized Top Header */}
          <div className="h-7 flex items-center justify-between px-1 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
              <Sparkles size={14} />
              The Engineering Narrative
            </span>
            <span className="text-[11px] font-mono text-gray-500">Mindset & Core Drive</span>
          </div>

          <SpotlightCard className="h-full p-8 sm:p-10 flex flex-col justify-between border border-white/10 transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-sm sm:text-base">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Going deeper than the surface.
              </h3>
              <p>
                I am an engineering student studying technology while exploring artificial intelligence,
                machine learning, software engineering, and data systems. But I don't just want to call
                functions or read summaries.
              </p>
              <p>
                If I encounter a machine learning concept, I want to understand the linear algebra,
                loss geometry, and optimization mechanics behind it. If I build software, I care about
                how the backend, relational database schema, APIs, network requests, and concurrency models
                actually behave under real constraints.
              </p>
              <p className="text-white font-medium">
                Mathematics matters to me. Physics matters to me. Artificial intelligence, space, and astronomy
                fascinate me. But I never want to remain purely theoretical.
              </p>
              <p>
                I like taking what I learn and turning it into something tangible. That is why my projects
                span very different domains: some are algorithmic experiments, some are medical deep-learning
                investigations, some are voice assistants, and some are serious business systems running in
                production.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs font-medium">
                That variety is intentional.
              </span>
              <span className="text-xs font-mono text-gray-500">
                Theory ⊗ Execution
              </span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Right Column (5 cols): Intellectual Curiosity (4 cards evenly stretching to full height) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          {/* Synchronized Top Header */}
          <div className="h-7 flex items-center justify-between px-1 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-2">
              <Binary size={14} />
              Curiosity Across Disciplines
            </span>
            <span className="text-[11px] font-mono text-gray-500">Theoretical Bedrock</span>
          </div>

          {/* 4 Rows Grid evenly stretching to full height with staggered scroll entrance */}
          <div className="flex-1 grid grid-cols-1 grid-rows-4 gap-4">
            {[
              {
                icon: Binary,
                title: "Mathematics & Geometry",
                desc: "Matrix transformations, vector spaces, eigenvalues, and multivariate calculus—the foundational bedrock of modern ML.",
                color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
              },
              {
                icon: Orbit,
                title: "Physics & Cosmos",
                desc: "Astrophysics, orbital mechanics, thermodynamics, and the structure of the universe that shapes how physical systems evolve.",
                color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
              },
              {
                icon: Atom,
                title: "Engineering & Systems",
                desc: "Taking concepts into the physical world through working software: schemas, caching, IPC loops, and real-time reliability.",
                color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
              },
              {
                icon: ScrollText,
                title: "History & Literature",
                desc: "Exploring European history, classical literature, poetry, and philosophy to appreciate how human ideas and civilizations compound.",
                color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
              }
            ].map((disc, idx) => {
              const IconComp = disc.icon;
              return (
                <motion.div
                  key={disc.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <SpotlightCard className="h-full p-4.5 sm:p-5 flex items-center gap-4 border border-white/10 group transition-all duration-300 hover:border-white/20">
                    <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${disc.color}`}>
                      <IconComp size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-white transition-colors">
                        {disc.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">
                        {disc.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
