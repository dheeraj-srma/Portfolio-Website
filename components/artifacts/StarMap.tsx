"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, Compass, Star, X } from "lucide-react";
import { PROJECTS, ProjectData } from "@/lib/data";
import { useArtifacts } from "./context/ArtifactContext";

interface StarProject {
  id: string;
  name: string;
  category: string;
  x: number; // 0 to 100%
  y: number; // 0 to 100%
  magnitude: number; // visual brightness / size
  color: string;
  projectRef: ProjectData | undefined;
}

export function StarMap({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStar, setHoveredStar] = useState<StarProject | null>(null);
  const [activePreview, setActivePreview] = useState<ProjectData | null>(null);
  const { mouse, isMobile, prefersReducedMotion } = useArtifacts();

  // Map real projects into constellation stars
  const projectStars: StarProject[] = useMemo(() => {
    return [
      {
        id: "aura",
        name: "AURA",
        category: "AI ASSISTANT",
        x: 28,
        y: 35,
        magnitude: 7,
        color: "#60A5FA",
        projectRef: PROJECTS.find((p) => p.id === "aura-ai-assistant"),
      },
      {
        id: "nalka",
        name: "NALKA PORTAL",
        category: "BUSINESS SOFTWARE",
        x: 72,
        y: 28,
        magnitude: 8,
        color: "#A855F7",
        projectRef: PROJECTS.find((p) => p.id === "nalka-dealer-portal"),
      },
      {
        id: "tb3d",
        name: "TB 3D AI",
        category: "COMPUTER VISION",
        x: 50,
        y: 55,
        magnitude: 7.5,
        color: "#06B6D4",
        projectRef: PROJECTS.find((p) => p.id === "tb-3d-ai"),
      },
      {
        id: "timeseries",
        name: "TIME SERIES",
        category: "ML PREDICTION",
        x: 24,
        y: 75,
        magnitude: 6,
        color: "#EC4899",
        projectRef: PROJECTS.find((p) => p.id === "time-series-prediction"),
      },
      {
        id: "cognitive",
        name: "BEHAVIOR AI",
        category: "VISION TELEMETRY",
        x: 76,
        y: 72,
        magnitude: 6.5,
        color: "#10B981",
        projectRef: PROJECTS.find((p) => p.id === "cognitive-behavior-analysis"),
      },
      {
        id: "faceanalyzer",
        name: "FACE ANALYZER",
        category: "REAL-TIME VISION",
        x: 52,
        y: 20,
        magnitude: 5.5,
        color: "#F59E0B",
        projectRef: PROJECTS.find((p) => p.id === "face-analyzer"),
      },
    ];
  }, []);

  // Background celestial dust stars (fixed positions)
  const dustStars = useMemo(() => {
    return [
      { x: 12, y: 18, r: 1 },
      { x: 85, y: 15, r: 1.2 },
      { x: 18, y: 50, r: 0.8 },
      { x: 88, y: 55, r: 1.1 },
      { x: 40, y: 85, r: 0.9 },
      { x: 65, y: 88, r: 1 },
      { x: 35, y: 12, r: 1.3 },
      { x: 62, y: 40, r: 0.7 },
      { x: 10, y: 82, r: 1 },
      { x: 92, y: 85, r: 0.9 },
    ];
  }, []);

  // Constellation lines connecting the project stars
  const constellationLines = useMemo(() => {
    return [
      ["faceanalyzer", "aura"],
      ["faceanalyzer", "nalka"],
      ["aura", "tb3d"],
      ["nalka", "tb3d"],
      ["aura", "timeseries"],
      ["tb3d", "timeseries"],
      ["tb3d", "cognitive"],
      ["nalka", "cognitive"],
    ];
  }, []);

  // Mouse parallax offset
  const parallax = useMemo(() => {
    if (isMobile || prefersReducedMotion || !containerRef.current) {
      return { x: 0, y: 0 };
    }
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (mouse.x - cx) / 30;
    const dy = (mouse.y - cy) / 30;
    return {
      x: Math.max(-12, Math.min(12, dx)),
      y: Math.max(-12, Math.min(12, dy)),
    };
  }, [mouse, isMobile, prefersReducedMotion]);

  const getStarCoords = (id: string) => {
    const s = projectStars.find((star) => star.id === id);
    return s ? { x: s.x, y: s.y } : { x: 50, y: 50 };
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl p-4 backdrop-blur-xl bg-neutral-950/70 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] luminous-border group select-none transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(168,85,247,0.2)] ${className}`}
      >
        {/* Deep space cosmic gradient */}
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/15 via-blue-950/10 to-transparent opacity-70" />

        {/* Header Badge */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-purple-400 group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-[10px] font-mono tracking-wider text-neutral-300 font-bold uppercase">
              STAR_MAP // CONSTELLATION
            </span>
          </div>
          <span className="text-[9px] font-mono text-neutral-500">
            6 ACTIVE STARS
          </span>
        </div>

        {/* Constellation Canvas Viewport */}
        <div className="relative w-full h-[calc(100%-28px)] overflow-hidden">
          <motion.div
            animate={{
              x: parallax.x,
              y: parallax.y,
            }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="w-full h-full"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <filter id="starGlow">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background celestial dust stars */}
              {dustStars.map((d, i) => (
                <circle
                  key={`dust-${i}`}
                  cx={d.x}
                  cy={d.y}
                  r={d.r}
                  fill="#ffffff"
                  opacity={0.3}
                />
              ))}

              {/* Constellation Connecting Lines */}
              {constellationLines.map(([src, dst], i) => {
                const p1 = getStarCoords(src);
                const p2 = getStarCoords(dst);
                const isLineActive =
                  hoveredStar &&
                  (hoveredStar.id === src || hoveredStar.id === dst);

                return (
                  <line
                    key={`const-line-${i}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={isLineActive ? "#C084FC" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isLineActive ? "0.9" : "0.5"}
                    strokeDasharray={isLineActive ? "none" : "1.5, 1.5"}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Project Stars */}
              {projectStars.map((star) => {
                const isHovered = hoveredStar?.id === star.id;
                return (
                  <g
                    key={star.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => {
                      if (star.projectRef) setActivePreview(star.projectRef);
                    }}
                  >
                    {/* Outer radiant corona */}
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={star.magnitude * (isHovered ? 1.8 : 1.1)}
                      fill={star.color}
                      opacity={isHovered ? 0.35 : 0.12}
                      className="transition-all duration-300"
                    />
                    {/* Diamond star marker */}
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={star.magnitude / 2.8}
                      fill={star.color}
                      filter="url(#starGlow)"
                    />
                    {/* Center white twinkle */}
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={isHovered ? 1.4 : 0.9}
                      fill="#ffffff"
                    />
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* Star Label Tooltip on Hover */}
          <AnimatePresence>
            {hoveredStar && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute bottom-2 inset-x-3 p-2 rounded-xl bg-neutral-900/95 border border-white/20 shadow-xl backdrop-blur-md pointer-events-none text-left z-20 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <Star size={12} className="text-amber-400" fill="#F59E0B" />
                    <span className="text-xs font-mono font-bold text-white tracking-wide">
                      {hoveredStar.name}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-purple-300">
                    {hoveredStar.category}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  CLICK ↗
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Quick View Modal on Star Click */}
      <AnimatePresence>
        {activePreview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActivePreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl backdrop-blur-2xl bg-neutral-950/95 border border-white/20 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.8)] luminous-border text-left"
            >
              <button
                type="button"
                onClick={() => setActivePreview(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-semibold block">
                  CONSTELLATION NODE // {activePreview.categoryLabel}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {activePreview.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {activePreview.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activePreview.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-[10px] font-mono text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={activePreview.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors"
                  >
                    <span>View Repository</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActivePreview(null)}
                    className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
