"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, BookOpen, Atom, Binary, Sparkles, Orbit, Telescope, ScrollText } from "lucide-react";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
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
          About Dheeraj
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

      {/* Main Narrative & Philosophical Breadth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Genuine Story */}
        <div className="lg:col-span-7 space-y-6 text-gray-300 font-light leading-relaxed text-base sm:text-lg">
          <SpotlightCard className="p-8 space-y-6">
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
            <div className="pt-2">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-xs">
                That variety is intentional.
              </span>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Intellectual Curiosity & Cross-Disciplinary Pillars */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3 px-1">
            Curiosity Across Disciplines
          </div>

          <SpotlightCard className="p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Binary size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Mathematics & Geometry</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Matrix transformations, vector spaces, eigenvalues, and multivariate calculus—the foundational bedrock of modern machine learning.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Orbit size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Physics & Cosmos</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Astrophysics, orbital mechanics, thermodynamics, and the structure of the universe that shapes how physical systems evolve over time.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Atom size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Engineering & Systems</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Taking concepts into the physical world through working software: schemas, caching, IPC loops, and real-time reliability.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ScrollText size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">History & Literature</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Exploring European history, classical literature, poetry, and philosophy to appreciate how human ideas and civilizations compound.
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
