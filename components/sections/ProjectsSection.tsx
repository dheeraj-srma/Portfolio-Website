"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
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

const AUTOPLAY_INTERVAL_MS = 5500;

// Pre-cached project configs & visual telemetry (static memory cache)
const PROJECT_CONFIGS: Record<
  string,
  {
    icon: React.ElementType;
    accentColor: string;
    borderHover: string;
    badgeGlow: string;
    statusText: string;
    telemetry: { k: string; v: string }[];
  }
> = {
  "nalka-dealer-portal": {
    icon: PackageCheck,
    accentColor: "#a855f7",
    borderHover: "border-purple-500/50",
    badgeGlow: "bg-purple-950/80 text-purple-300 border-purple-500/30",
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
    badgeGlow: "bg-sky-950/80 text-sky-300 border-sky-500/30",
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
    badgeGlow: "bg-rose-950/80 text-rose-300 border-rose-500/30",
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
    badgeGlow: "bg-amber-950/80 text-amber-300 border-amber-500/30",
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
    badgeGlow: "bg-emerald-950/80 text-emerald-300 border-emerald-500/30",
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
    badgeGlow: "bg-cyan-950/80 text-cyan-300 border-cyan-500/30",
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
    badgeGlow: "bg-purple-950/80 text-purple-300 border-purple-500/30",
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
    badgeGlow: "bg-yellow-950/80 text-yellow-300 border-yellow-500/30",
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
  badgeGlow: "bg-blue-950/80 text-blue-300 border-blue-500/30",
  statusText: "Verified Work",
  telemetry: [
    { k: "TYPE", v: "Production" },
    { k: "STACK", v: "Full-Stack" },
    { k: "SOURCE", v: "Open-Source" },
  ],
};

// Pure memoized card component to avoid full DOM re-renders & GPU layer thrashing
interface ProjectCardItemProps {
  project: ProjectData;
  offset: number;
  onSelect: (project: ProjectData) => void;
  onNavigate: () => void;
  prefersReducedMotion: boolean;
}

const ProjectCardItem = React.memo(function ProjectCardItem({
  project,
  offset,
  onSelect,
  onNavigate,
  prefersReducedMotion,
}: ProjectCardItemProps) {
  const isCenter = offset === 0;
  const config = PROJECT_CONFIGS[project.id] || DEFAULT_CONFIG;
  const ProjectIcon = config.icon;

  // Responsive horizontal offset positioning
  const xOffset =
    typeof window !== "undefined" && window.innerWidth < 640
      ? offset * 210
      : typeof window !== "undefined" && window.innerWidth < 1024
      ? offset * 310
      : offset * 400;

  const zOffset = isCenter ? 0 : -Math.abs(offset) * 140;
  const scale = isCenter ? 1 : 0.82;
  const opacity = isCenter ? 1 : 0.55;

  return (
    <motion.div
      animate={{
        x: xOffset,
        z: zOffset,
        scale,
        opacity,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0.1 }
          : {
              duration: 0.55,
              ease: [0.25, 1, 0.5, 1],
            }
      }
      style={{
        position: "absolute",
        zIndex: isCenter ? 30 : 15,
        willChange: "transform, opacity",
      }}
      onClick={!isCenter ? onNavigate : undefined}
      className={`w-[84vw] max-w-[320px] sm:max-w-[390px] md:max-w-[440px] select-none ${
        isCenter ? "cursor-default" : "cursor-pointer"
      }`}
    >
      {/* High Performance Solid Dark Panel */}
      <div
        className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 bg-[#0B0B12] border transition-colors duration-200 overflow-hidden ${
          isCenter
            ? `border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.85)] ${config.borderHover}`
            : "border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.5)] opacity-90 hover:opacity-100"
        }`}
      >
        {/* Top Specular Sheen (Center Card Only) */}
        {isCenter && (
          <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
        )}

        {/* Visual Top Banner */}
        <div
          className={`relative h-36 sm:h-44 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} border border-white/15 p-3 sm:p-4 flex flex-col justify-between`}
        >
          {/* Static Blueprint Grid */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:14px_14px]" />

          {/* Watermark Icon */}
          <div className="absolute right-2 -bottom-2 opacity-[0.07] pointer-events-none">
            <ProjectIcon size={96} />
          </div>

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-lg sm:rounded-xl border shadow-sm ${config.badgeGlow}`}
              >
                <ProjectIcon size={14} style={{ color: config.accentColor }} />
              </div>
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold uppercase bg-black/75 text-gray-200 border border-white/10 truncate max-w-[120px] sm:max-w-none">
                {project.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono bg-black/75 border border-white/10 shrink-0">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: config.accentColor }}
              />
              <span className="text-gray-300 font-medium">{config.statusText}</span>
            </div>
          </div>

          {/* Bottom HUD: Tagline & Micro-Telemetry Grid */}
          <div className="relative z-10 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/15 bg-black/70 space-y-1 sm:space-y-1.5 shadow-md">
            <div className="flex items-center gap-1.5">
              <span
                className="h-1 w-1 rounded-full shrink-0"
                style={{ backgroundColor: config.accentColor }}
              />
              <p className="text-[11px] sm:text-xs font-mono text-white truncate font-medium">
                {project.tagline}
              </p>
            </div>

            {/* 3-Column Micro-Telemetry */}
            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-white/10">
              {config.telemetry.map((t, i) => (
                <div
                  key={i}
                  className="text-center px-0.5 sm:px-1 py-0.5 rounded bg-white/[0.04] border border-white/5 truncate"
                >
                  <span className="text-gray-500 block text-[7px] sm:text-[8px] font-mono uppercase truncate">
                    {t.k}
                  </span>
                  <span className="text-gray-200 font-mono text-[8px] sm:text-[9px] font-medium block truncate">
                    {t.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Title & Summary */}
        <div className="space-y-1 mt-3 sm:mt-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight truncate">
            {project.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-300 font-light leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Key Metrics Chips */}
        {project.metrics && (
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
            {project.metrics.slice(0, 2).map((m, i) => (
              <div
                key={i}
                className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/5 text-[10px] sm:text-[11px] font-mono space-y-0.5"
              >
                <span className="text-gray-500 block text-[7px] sm:text-[8px] uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="text-white font-semibold truncate block text-[11px] sm:text-xs">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5 sm:mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg bg-white/[0.03] border border-white/10 text-[9px] sm:text-[10px] font-mono text-gray-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono text-gray-500 bg-white/[0.02]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600/40 via-indigo-600/40 to-purple-600/40 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white border border-white/15 hover:border-white/30 text-[11px] sm:text-xs font-mono font-semibold transition-all duration-200 shadow-sm cursor-pointer group/btn"
          >
            <Play size={11} className="text-blue-400 group-hover/btn:text-white transition-colors" />
            <span>Live Preview</span>
            <ArrowUpRight size={11} className="opacity-70 group-hover/btn:opacity-100 transition-transform group-hover/btn:translate-x-0.5" />
          </button>

          <Tooltip content="View GitHub Repository" position="top" delay={120}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 hover:border-white/25 transition-colors cursor-pointer shadow-sm"
              aria-label="View GitHub Repository"
            >
              <GithubIcon size={14} />
            </a>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
});

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const prefersReducedMotion = usePrefersReducedMotion();
  // Viewport observer: only active when the Projects section is actually visible
  const isSectionInView = useInView(sectionRef, { amount: 0.15 });

  const total = PROJECTS.length;

  // Single source of truth for timer scheduling (resets clock cleanly after manual actions)
  const scheduleNextAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }

    // Only schedule if section is in viewport, not hovered, no modal open, and motion is allowed
    if (
      !isSectionInView ||
      isHovered ||
      selectedProject !== null ||
      prefersReducedMotion ||
      total <= 1
    ) {
      return;
    }

    autoplayTimerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL_MS);
  }, [isSectionInView, isHovered, selectedProject, prefersReducedMotion, total]);

  // Handle Manual Navigation (Overrides & resets auto-scroll timer to full duration)
  const handleManualNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
    scheduleNextAutoplay();
  }, [total, scheduleNextAutoplay]);

  const handleManualPrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
    scheduleNextAutoplay();
  }, [total, scheduleNextAutoplay]);

  const handleManualGoTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < total) {
        setActiveIndex(index);
        scheduleNextAutoplay();
      }
    },
    [total, scheduleNextAutoplay]
  );

  // Synchronize autoplay lifecycle when activeIndex, viewport, hover, or modal changes
  useEffect(() => {
    scheduleNextAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [activeIndex, isSectionInView, isHovered, selectedProject, prefersReducedMotion, scheduleNextAutoplay]);

  // Keyboard navigation: only active when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionInView || selectedProject !== null) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleManualPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleManualNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSectionInView, selectedProject, handleManualNext, handleManualPrev]);

  // Mobile touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only trigger if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        handleManualNext();
      } else {
        handleManualPrev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Memoize visible items (only center and immediate left/right neighbors: offset -1, 0, 1)
  const visibleProjects = useMemo(() => {
    return PROJECTS.map((project, index) => {
      let offset = ((index - activeIndex) % total + total) % total;
      if (offset > total / 2) {
        offset -= total;
      }
      return { project, index, offset };
    }).filter((item) => Math.abs(item.offset) <= 1);
  }, [activeIndex, total]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 sm:py-18 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20 overflow-hidden"
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
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Important Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-gray-400 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto"
        >
          Explore production software, medical vision engines, autonomous agents, and empirical ML systems.
        </motion.p>
      </div>

      {/* 3D INFINITE CAROUSEL STAGE CONTAINER */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full py-2 select-none"
        style={{
          perspective: "1200px",
        }}
      >
        {/* Lightweight Center Ambient Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />

        {/* Edge Navigation Buttons (Left & Right) */}
        <div className="absolute left-0.5 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={handleManualPrev}
            className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0E0E18] hover:bg-[#1A1A28] active:scale-95 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft size={20} className="relative -left-0.5" />
          </button>
        </div>

        <div className="absolute right-0.5 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-40">
          <button
            onClick={handleManualNext}
            className="flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#0E0E18] hover:bg-[#1A1A28] active:scale-95 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-all cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight size={20} className="relative -right-0.5" />
          </button>
        </div>

        {/* 3D Stage Viewport (Responsive Height & Pure GPU Hardware Layer) */}
        <div
          className="relative w-full h-[510px] sm:h-[560px] md:h-[600px] flex items-center justify-center transform-gpu"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {visibleProjects.map(({ project, index, offset }) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              offset={offset}
              onSelect={setSelectedProject}
              onNavigate={() => handleManualGoTo(index)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* 4. CENTERED CAROUSEL PROGRESS INDICATOR */}
        <div className="relative z-30 flex flex-col items-center justify-center gap-2 mt-3 sm:mt-4">
          {/* Progress Track with Gradient Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0A0A14] border border-white/10 shadow-lg">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualGoTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-6 sm:w-8 md:w-10 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                    : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          {/* Dynamic Counter Display: 03 / 08 */}
          <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/80 border border-white/10 text-[10px] sm:text-xs font-mono tracking-widest text-gray-400 shadow-md">
            <span className="text-blue-400 font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-600 mx-1">/</span>
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
