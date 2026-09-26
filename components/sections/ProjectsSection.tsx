"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowUpRight,
  PackageCheck,
  Bot,
  Activity,
  TrendingUp,
  Pill,
  FileText,
  Coins,
  Eye,
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PROJECTS, ProjectData } from "@/lib/data";
import { ProjectModal } from "@/components/common/ProjectModal";
import { SectionBadge } from "@/components/common/SectionBadge";
import { Tooltip } from "@/components/common/Tooltip";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Project domain metadata, custom iconography, and visual telemetry
const PROJECT_CONFIGS: Record<
  string,
  {
    icon: React.ElementType;
    accentColor: string;
    borderHover: string;
    badgeGlow: string;
    glowShadow: string;
    statusText: string;
    telemetry: { k: string; v: string }[];
  }
> = {
  "nalka-dealer-portal": {
    icon: PackageCheck,
    accentColor: "#a855f7",
    borderHover: "border-purple-500/50",
    badgeGlow: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    glowShadow: "rgba(168, 85, 247, 0.35)",
    statusText: "Production Portal",
    telemetry: [
      { k: "CATALOG", v: "3,681+ SKUs" },
      { k: "SYNC", v: "Supabase DB" },
      { k: "DOCS", v: "jsPDF Slip" },
    ],
  },
  "aura-ai-assistant": {
    icon: Bot,
    accentColor: "#38bdf8",
    borderHover: "border-sky-500/50",
    badgeGlow: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    glowShadow: "rgba(56, 189, 248, 0.35)",
    statusText: "Desktop Runtime",
    telemetry: [
      { k: "AUDIO", v: "16kHz VAD Loop" },
      { k: "VISION", v: "OpenCV Mesh" },
      { k: "AGENT", v: "Native OS IPC" },
    ],
  },
  "tb-3d-ai": {
    icon: Activity,
    accentColor: "#f43f5e",
    borderHover: "border-rose-500/50",
    badgeGlow: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    glowShadow: "rgba(244, 63, 94, 0.35)",
    statusText: "Medical Vision",
    telemetry: [
      { k: "DATASET", v: "TBX11K (11K)" },
      { k: "MODEL", v: "PyTorch U-Net" },
      { k: "XAI", v: "Grad-CAM 3D" },
    ],
  },
  "stock-prediction-experiments": {
    icon: TrendingUp,
    accentColor: "#f59e0b",
    borderHover: "border-amber-500/50",
    badgeGlow: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    glowShadow: "rgba(245, 158, 11, 0.35)",
    statusText: "ML Experiment",
    telemetry: [
      { k: "MODELS", v: "ARIMA & LSTM" },
      { k: "EVAL", v: "Walk-Forward" },
      { k: "SIGNALS", v: "RSI & MACD" },
    ],
  },
  "medx-pharmacy-system": {
    icon: Pill,
    accentColor: "#10b981",
    borderHover: "border-emerald-500/50",
    badgeGlow: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    glowShadow: "rgba(16, 185, 129, 0.35)",
    statusText: "Pharmacy Engine",
    telemetry: [
      { k: "SAFETY", v: "FEFO Auto-Lock" },
      { k: "SPEED", v: "< 2s POS Billing" },
      { k: "INVOICE", v: "GST Thermal" },
    ],
  },
  "cognitive-behavior-analysis": {
    icon: Eye,
    accentColor: "#06b6d4",
    borderHover: "border-cyan-500/50",
    badgeGlow: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    glowShadow: "rgba(6, 182, 212, 0.35)",
    statusText: "Vision Telemetry",
    telemetry: [
      { k: "LANDMARKS", v: "468 Face Mesh" },
      { k: "FPS", v: "30+ on CPU" },
      { k: "METRICS", v: "EAR & Fatigue" },
    ],
  },
  "ai-resume-analyzer": {
    icon: FileText,
    accentColor: "#c084fc",
    borderHover: "border-purple-500/50",
    badgeGlow: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    glowShadow: "rgba(192, 132, 252, 0.35)",
    statusText: "NLP Parser",
    telemetry: [
      { k: "PARSER", v: "Layout-Aware" },
      { k: "NER", v: "SpaCy Pipeline" },
      { k: "MATCH", v: "Skill Ontology" },
    ],
  },
  "binance-trading-bot": {
    icon: Coins,
    accentColor: "#eab308",
    borderHover: "border-yellow-500/50",
    badgeGlow: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
    glowShadow: "rgba(234, 179, 8, 0.35)",
    statusText: "Futures Client",
    telemetry: [
      { k: "EXCHANGE", v: "Binance Testnet" },
      { k: "AUTH", v: "HMAC-SHA256" },
      { k: "ORDERS", v: "Market & Limit" },
    ],
  },
};

const DEFAULT_CONFIG = {
  icon: Sparkles,
  accentColor: "#3b82f6",
  borderHover: "border-blue-500/50",
  badgeGlow: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  glowShadow: "rgba(59, 130, 246, 0.35)",
  statusText: "Verified Work",
  telemetry: [
    { k: "TYPE", v: "Production" },
    { k: "STACK", v: "Full-Stack" },
    { k: "SOURCE", v: "Open-Source" },
  ],
};

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const total = PROJECTS.length;

  // Seamless circular navigation
  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleGoTo = (index: number) => {
    if (index >= 0 && index < total) {
      setActiveIndex(index);
    }
  };

  // Autoplay functionality: gently cycles projects, pauses on hover/modal
  useEffect(() => {
    if (isHovered || selectedProject !== null || prefersReducedMotion || total <= 1) {
      return;
    }

    const timer = setInterval(() => {
      handleNext();
    }, 5200);

    return () => clearInterval(timer);
  }, [isHovered, selectedProject, prefersReducedMotion, total, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject !== null) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev]);

  // Active project accent color
  const activeConfig = PROJECTS[activeIndex]
    ? PROJECT_CONFIGS[PROJECTS[activeIndex].id] || DEFAULT_CONFIG
    : DEFAULT_CONFIG;

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-6 sm:mb-8">
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
          className="text-gray-400 text-sm sm:text-base font-light max-w-2xl mx-auto"
        >
          Explore production software, medical vision engines, autonomous agents, and empirical ML systems.
        </motion.p>
      </div>

      {/* 3D INFINITE CAROUSEL STAGE CONTAINER */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full py-2 select-none"
        style={{
          perspective: "1400px",
        }}
      >
        {/* Ambient Cosmic Center Glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20 transition-colors duration-700"
          style={{
            backgroundColor: activeConfig.accentColor,
          }}
        />

        {/* Edge Navigation Buttons (Left & Right) */}
        <div className="absolute left-1 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={handlePrev}
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#090912]/80 hover:bg-[#141424] active:scale-95 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft size={22} className="relative -left-0.5" />
          </button>
        </div>

        <div className="absolute right-1 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={handleNext}
            className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#090912]/80 hover:bg-[#141424] active:scale-95 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.7)] transition-all cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight size={22} className="relative -right-0.5" />
          </button>
        </div>

        {/* 3D Stage Viewport */}
        <div
          className="relative w-full h-[580px] sm:h-[610px] flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {PROJECTS.map((project, index) => {
            // Calculate circular offset distance: -total/2 ... +total/2
            let offset = ((index - activeIndex) % total + total) % total;
            if (offset > total / 2) {
              offset -= total;
            }

            // Only render cards that are in visible range (-2 to +2)
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            const isCenter = offset === 0;
            const config = PROJECT_CONFIGS[project.id] || DEFAULT_CONFIG;
            const ProjectIcon = config.icon;

            // Straight horizontal offset spacing (responsive)
            const xOffset =
              typeof window !== "undefined" && window.innerWidth < 640
                ? offset * 260
                : typeof window !== "undefined" && window.innerWidth < 1024
                ? offset * 330
                : offset * 410;

            // Straight-on depth scaling and positioning: strictly rotateY = 0, rotateX = 0
            const zOffset = isCenter ? 0 : -Math.abs(offset) * 160;
            const scale = isCenter
              ? 1
              : Math.abs(offset) === 1
              ? 0.82
              : 0.68;

            const opacity = isCenter
              ? 1
              : Math.abs(offset) === 1
              ? 0.62
              : 0.22;

            return (
              <motion.div
                key={project.id}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: 0,
                  rotateX: 0,
                  scale,
                  opacity,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1], // Smooth, cinematic ease-out curve
                      }
                }
                style={{
                  position: "absolute",
                  zIndex: isCenter ? 30 : 20 - Math.abs(offset) * 5,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (!isCenter) {
                    handleGoTo(index);
                  }
                }}
                className={`w-[88vw] max-w-[340px] sm:max-w-[400px] md:max-w-[450px] ${
                  isCenter
                    ? "filter-none cursor-default"
                    : "brightness-[0.6] hover:brightness-[0.85] cursor-pointer"
                }`}
              >
                {/* Straight 3D Glass Project Panel */}
                <div
                  className={`relative rounded-3xl p-5 sm:p-6 backdrop-blur-2xl bg-[#08080E]/95 border transition-all duration-300 overflow-hidden ${
                    isCenter
                      ? `border-white/25 shadow-[0_25px_70px_rgba(0,0,0,0.9)] ${config.borderHover}`
                      : "border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] pointer-events-none"
                  }`}
                  style={{
                    boxShadow: isCenter
                      ? `0 25px 70px rgba(0,0,0,0.9), 0 0 35px ${config.glowShadow}`
                      : undefined,
                  }}
                >
                  {/* Subtle Top Specular Sheen */}
                  <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  {/* Visual Top Banner */}
                  <div
                    className={`relative h-44 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/15 p-4 flex flex-col justify-between`}
                  >
                    {/* Blueprint Cyber Grid Pattern */}
                    <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:14px_14px]" />

                    {/* Watermark Icon */}
                    <div className="absolute right-2 -bottom-3 opacity-[0.08] pointer-events-none">
                      <ProjectIcon size={120} />
                    </div>

                    {/* Top Row: Domain Icon Badge + Category + Live Status LED */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex items-center justify-center h-8 w-8 rounded-xl bg-black/60 backdrop-blur-md border shadow-md ${config.badgeGlow}`}
                        >
                          <ProjectIcon size={16} style={{ color: config.accentColor }} />
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-black/60 backdrop-blur-md text-gray-200 border border-white/10">
                          {project.categoryLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md border border-white/10 shrink-0">
                        <span
                          className="h-1.5 w-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: config.accentColor }}
                        />
                        <span className="text-gray-300 font-medium">{config.statusText}</span>
                      </div>
                    </div>

                    {/* Bottom HUD: Tagline & Micro-Telemetry Grid */}
                    <div className="relative z-10 glass-panel p-2.5 rounded-xl border border-white/15 bg-black/40 backdrop-blur-md space-y-1.5 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-1 w-1 rounded-full shrink-0"
                          style={{ backgroundColor: config.accentColor }}
                        />
                        <p className="text-xs font-mono text-white truncate font-medium">
                          {project.tagline}
                        </p>
                      </div>

                      {/* 3-Column Micro-Telemetry */}
                      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/10">
                        {config.telemetry.map((t, i) => (
                          <div
                            key={i}
                            className="text-center px-1 py-0.5 rounded bg-white/[0.04] border border-white/5 truncate"
                          >
                            <span className="text-gray-500 block text-[8px] font-mono uppercase truncate">
                              {t.k}
                            </span>
                            <span className="text-gray-200 font-mono text-[9px] font-medium block truncate">
                              {t.v}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2 mt-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Key Metrics Chips */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div
                          key={i}
                          className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono space-y-0.5"
                        >
                          <span className="text-gray-500 block text-[8px] uppercase tracking-wider">
                            {m.label}
                          </span>
                          <span className="text-white font-semibold truncate block text-xs">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg bg-white/[0.03] border border-white/10 text-[10px] font-mono text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-lg text-[10px] font-mono text-gray-500 bg-white/[0.02]">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white border border-white/15 hover:border-white/30 text-xs font-mono font-semibold transition-all duration-300 shadow-md hover:shadow-blue-500/25 cursor-pointer group/btn"
                    >
                      <Play size={12} className="text-blue-400 group-hover/btn:text-white transition-colors" />
                      <span>Live Preview & Story</span>
                      <ArrowUpRight size={12} className="opacity-70 group-hover/btn:opacity-100 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>

                    <Tooltip content="View GitHub Repository" position="top" delay={120}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 hover:border-white/25 transition-all cursor-pointer shadow-md"
                        aria-label="View GitHub Repository"
                      >
                        <GithubIcon size={15} />
                      </a>
                    </Tooltip>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. CENTERED CAROUSEL PROGRESS INDICATOR */}
        <div className="relative z-30 flex flex-col items-center justify-center gap-2.5 mt-4">
          {/* Thin Progress Track with Luminous Gradient Indicator */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0a0a14]/80 backdrop-blur-xl border border-white/10 shadow-lg">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleGoTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === activeIndex
                    ? "w-8 sm:w-10 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]"
                    : "w-2 sm:w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          {/* Dynamic Counter Display: 03 / 08 */}
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono tracking-widest text-gray-400 shadow-md">
            <span className="text-blue-400 font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-600 mx-1.5">/</span>
            <span className="text-gray-300 font-medium">
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
