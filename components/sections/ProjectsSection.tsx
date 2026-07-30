"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Layers, ArrowUpRight, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { FEATURED_PROJECTS } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono text-blue-300 uppercase tracking-widest"
        >
          <Sparkles size={14} />
          <span>Product Engineering</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Featured AI & Software Systems
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Production-grade applications, AI agents, enterprise portals, and experimental products.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <SpotlightCard className="h-full flex flex-col justify-between group overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-500">
              <div className="space-y-5">
                {/* Project Visual Banner */}
                <div className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/10 flex items-center justify-center p-6 group-hover:scale-[1.02] transition-transform duration-500`}>
                  {/* Decorative Grid / Code lines pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

                  {/* Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-black/60 backdrop-blur-md text-blue-300 border border-blue-500/30">
                    {project.badge}
                  </span>

                  {/* Center Visual Mockup Box */}
                  <div className="relative z-10 w-full glass-panel p-4 rounded-lg border border-white/15 shadow-2xl flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] font-mono text-gray-400 ml-2 truncate">
                        {project.id}.sys
                      </span>
                    </div>
                    <p className="text-xs font-mono text-blue-300 truncate font-semibold">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Title & One-line Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-6">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 text-xs font-medium text-gray-200 hover:text-white transition-all hover:bg-white/[0.08]"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-medium text-white shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
