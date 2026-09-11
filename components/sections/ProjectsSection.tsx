"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Layers,
  ArrowUpRight,
  BookOpen,
  Terminal,
  Eye,
  Sliders,
  Play
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PROJECTS, ProjectData } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { ProjectModal } from "@/components/common/ProjectModal";
import { SectionBadge } from "@/components/common/SectionBadge";
import { Tooltip } from "@/components/common/Tooltip";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filters = [
    { id: "all", label: "All Engineering Work" },
    { id: "software", label: "Business Software & ERP" },
    { id: "ai", label: "Artificial Intelligence & Agents" },
    { id: "vision", label: "Deep Learning & Vision" },
    { id: "ml", label: "Machine Learning Experiments" }
  ];

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <SectionBadge
          icon={<Sparkles size={14} />}
          text="Real Engineering Work"
          color="blue"
        />
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Important Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Grounded systems, medical deep learning, enterprise inventory portals, and empirical ML explorations.
        </motion.p>

        {/* Filter Pills with micro-interactions */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          {filters.map((f) => (
            <motion.button
              key={f.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeFilter === f.id
                  ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="h-full flex flex-col justify-between group overflow-hidden border border-white/10 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
                <div className="space-y-5">
                  {/* Visual Top Banner */}
                  <div
                    className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/10 p-5 flex flex-col justify-between group-hover:scale-[1.01] transition-transform duration-300`}
                  >
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:16px_16px]" />

                    {/* Top Badges */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-black/70 backdrop-blur-md text-blue-300 border border-blue-500/30">
                        {project.categoryLabel}
                      </span>
                      {project.localPort && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Dev : {project.localPort}
                        </span>
                      )}
                    </div>

                    {/* Center Frame Teaser */}
                    <div className="relative z-10 glass-panel p-3 rounded-lg border border-white/15 shadow-xl">
                      <p className="text-xs font-mono text-white truncate font-medium">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Metrics Chips */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono"
                        >
                          <span className="text-gray-500 block text-[9px] uppercase">{m.label}</span>
                          <span className="text-white font-medium truncate block">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[10px] font-mono text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-500">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Interactive Trigger Actions with micro-interactions */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-mono transition-all cursor-pointer"
                  >
                    <Play size={12} />
                    <span>Live Preview & Story</span>
                  </motion.button>

                  <Tooltip content="View GitHub Repository" position="top" delay={120}>
                    <motion.a
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                      aria-label="View GitHub Repository"
                    >
                      <GithubIcon size={14} />
                    </motion.a>
                  </Tooltip>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
