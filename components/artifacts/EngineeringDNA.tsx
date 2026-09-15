"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, X, Layers, Sparkles, ArrowRight } from "lucide-react";
import { useArtifacts } from "./context/ArtifactContext";

interface DnaRung {
  id: string;
  name: string;
  topics: string[];
  color: string;
  angleOffset: number; // in radians
}

const DNA_RUNGS: DnaRung[] = [
  {
    id: "math",
    name: "MATHEMATICS",
    topics: ["Linear Algebra", "Matrix Factorization", "Probability & Statistics", "Convex Optimization"],
    color: "#3B82F6",
    angleOffset: 0,
  },
  {
    id: "physics",
    name: "PHYSICS",
    topics: ["Thermodynamics", "Classical Mechanics", "Entropy & Information", "Wave Propagation"],
    color: "#8B5CF6",
    angleOffset: Math.PI / 4,
  },
  {
    id: "ai",
    name: "AI & ML",
    topics: ["Neural Architectures", "Gradient Descent", "Loss Landscapes", "Semantic Segmentation"],
    color: "#EC4899",
    angleOffset: Math.PI / 2,
  },
  {
    id: "software",
    name: "SOFTWARE",
    topics: ["Full-Stack Architecture", "Concurrency & Threads", "Data Normalization", "System Ergonomics"],
    color: "#10B981",
    angleOffset: (3 * Math.PI) / 4,
  },
  {
    id: "data",
    name: "DATA",
    topics: ["ETL Pipelines", "Real-Time Telemetry", "Analytical Aggregations", "Statistical Signals"],
    color: "#F59E0B",
    angleOffset: Math.PI,
  },
  {
    id: "systems",
    name: "SYSTEMS",
    topics: ["Database Query Planners", "Network Sockets", "OS Daemons", "State Synchronization"],
    color: "#06B6D4",
    angleOffset: (5 * Math.PI) / 4,
  },
  {
    id: "curiosity",
    name: "CURIOSITY",
    topics: ["Cosmic Mechanics", "Late-Night Experiments", "Dissecting Black Boxes", "Continuous Discovery"],
    color: "#A855F7",
    angleOffset: (3 * Math.PI) / 2,
  },
  {
    id: "experimentation",
    name: "EXPERIMENT",
    topics: ["Empirical Prototyping", "Rapid Stress Testing", "Ablation Studies", "Iterative Refactoring"],
    color: "#38BDF8",
    angleOffset: (7 * Math.PI) / 4,
  },
];

const DISCIPLINARY_SYNTHESIS = [
  {
    discipline: "Mathematics",
    role: "The Theoretical Foundation",
    detail: "Linear algebra and multivariable calculus define how neural network gradients backpropagate and converge.",
  },
  {
    discipline: "AI & ML",
    role: "The Cognitive Layer",
    detail: "Statistical models, computer vision, and transformer embeddings that process unstructured data into actionable inferences.",
  },
  {
    discipline: "Software Engineering",
    role: "The Concrete Execution",
    detail: "Robust typing, transactional relational databases, and decoupled REST APIs turn algorithms into reliable utilities.",
  },
  {
    discipline: "Data & Signals",
    role: "The Ground Truth",
    detail: "Clean ETL pipelines, real-time logging, and telemetry metrics keep models grounded in empirical reality.",
  },
  {
    discipline: "Real-World Systems",
    role: "The End Purpose",
    detail: "Practical solutions that remove friction for actual people: business portals, assistants, and analytical dashboards.",
  },
];

export function EngineeringDNA({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredRung, setHoveredRung] = useState<DnaRung | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { mouse, isMobile, prefersReducedMotion } = useArtifacts();

  // Slow continuous 3D rotation of the helix
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      setRotationAngle((prev) => (prev + dt * 0.4) % (2 * Math.PI));
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion]);

  // Compute 3D projection for each rung of the double helix
  const calculatedRungs = useMemo(() => {
    const totalHeight = 85; // percentage
    const stepY = totalHeight / (DNA_RUNGS.length - 1);

    return DNA_RUNGS.map((rung, index) => {
      const currentAngle = rotationAngle + rung.angleOffset;
      const y = 8 + index * stepY;

      // Strand A coordinates (-1 to 1 projected into 15% to 85%)
      const xA = 50 + Math.cos(currentAngle) * 32;
      const depthA = Math.sin(currentAngle); // -1 (back) to 1 (front)

      // Strand B coordinates (opposite phase)
      const xB = 50 - Math.cos(currentAngle) * 32;
      const depthB = -depthA;

      return {
        ...rung,
        y,
        xA,
        xB,
        depthA,
        depthB,
        scaleA: 0.7 + (depthA + 1) * 0.25,
        scaleB: 0.7 + (depthB + 1) * 0.25,
        alphaA: 0.4 + (depthA + 1) * 0.3,
        alphaB: 0.4 + (depthB + 1) * 0.3,
      };
    });
  }, [rotationAngle]);

  return (
    <>
      <div
        ref={containerRef}
        onClick={() => setShowModal(true)}
        className={`relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl p-4 backdrop-blur-xl bg-neutral-950/70 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] luminous-border group cursor-pointer transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] ${className}`}
        title="Engineering DNA - Click to view Disciplinary Synthesis"
        role="button"
        aria-label="Engineering DNA Double Helix Artifact"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Dna size={15} className="text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-[10px] font-mono tracking-wider text-neutral-300 font-bold uppercase">
              ENGINEERING_DNA
            </span>
          </div>
          <span className="text-[9px] font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            SYNTHESIS ↗
          </span>
        </div>

        {/* 3D Helix SVG Canvas */}
        <div className="relative w-full h-[calc(100%-32px)] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="dnaStrandA" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="dnaStrandB" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Connecting Base Pair Rungs */}
            {calculatedRungs.map((rung) => {
              const isHovered = hoveredRung?.id === rung.id;
              return (
                <g
                  key={`rung-${rung.id}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredRung(rung)}
                  onMouseLeave={() => setHoveredRung(null)}
                >
                  {/* Connecting Rung Line */}
                  <line
                    x1={rung.xA}
                    y1={rung.y}
                    x2={rung.xB}
                    y2={rung.y}
                    stroke={isHovered ? "#ffffff" : rung.color}
                    strokeWidth={isHovered ? 1.5 : 0.8}
                    strokeOpacity={isHovered ? 1 : 0.4}
                    className="transition-all duration-200"
                  />

                  {/* Center Rung Data Point */}
                  <circle
                    cx={50}
                    cy={rung.y}
                    r={isHovered ? 2.2 : 1.2}
                    fill={rung.color}
                    className="transition-all duration-200"
                  />

                  {/* Strand A Node */}
                  <circle
                    cx={rung.xA}
                    cy={rung.y}
                    r={2.8 * rung.scaleA}
                    fill="#60A5FA"
                    fillOpacity={rung.alphaA}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.5"
                  />

                  {/* Strand B Node */}
                  <circle
                    cx={rung.xB}
                    cy={rung.y}
                    r={2.8 * rung.scaleB}
                    fill="#A855F7"
                    fillOpacity={rung.alphaB}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Hover Discipline Expansion Tooltip */}
          <AnimatePresence>
            {hoveredRung && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                className="absolute bottom-2 inset-x-3 p-3 rounded-2xl bg-neutral-900/95 border border-white/20 shadow-2xl backdrop-blur-md text-left z-20"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-white pb-1 border-b border-white/10">
                  <span className="text-blue-300">{hoveredRung.name}</span>
                  <span className="text-[9px] text-neutral-400 font-normal">AREAS EXPLORED</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {hoveredRung.topics.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[9px] font-mono text-neutral-200 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Disciplinary Synthesis Modal on Click */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-neutral-950/95 border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] luminous-border text-left"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="space-y-1 mb-6">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Layers size={15} />
                  <span>Foundational Matrix</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>The Things That Shape How I Build</span>
                  <Sparkles size={18} className="text-purple-400" />
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  How core disciplines intersect rather than existing in isolated silos.
                </p>
              </div>

              {/* Synthesis Stack */}
              <div className="space-y-3">
                {DISCIPLINARY_SYNTHESIS.map((item, idx) => (
                  <div
                    key={item.discipline}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                        <span className="text-blue-400">0{idx + 1}.</span>
                        {item.discipline}
                      </span>
                      <span className="text-[10px] font-mono text-purple-300">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>MULTIDISCIPLINARY DNA</span>
                <span className="text-blue-400">WORKING SYSTEMS</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
