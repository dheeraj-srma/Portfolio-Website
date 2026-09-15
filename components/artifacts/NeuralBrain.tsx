"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, ArrowDown, Sparkles, Activity } from "lucide-react";
import { useArtifacts } from "./context/ArtifactContext";

interface NodeData {
  id: string;
  label: string;
  category: string;
  x: number; // base % (0 to 100)
  y: number; // base % (0 to 100)
  color: string;
  radius: number;
  description: string;
}

const BRAIN_NODES: NodeData[] = [
  {
    id: "ai",
    label: "AI",
    category: "Core Intelligence",
    x: 50,
    y: 42,
    color: "#3B82F6",
    radius: 7,
    description: "Multimodal agents, transformers, and autonomous reasoning loops.",
  },
  {
    id: "ml",
    label: "ML",
    category: "Empirical Learning",
    x: 35,
    y: 30,
    color: "#8B5CF6",
    radius: 6,
    description: "Loss optimization, gradient descent, regressions, and classification.",
  },
  {
    id: "cv",
    label: "Computer Vision",
    category: "Spatial Perception",
    x: 65,
    y: 30,
    color: "#06B6D4",
    radius: 5.5,
    description: "U-Net segmentations, Grad-CAM attention maps, and OpenCV pipelines.",
  },
  {
    id: "math",
    label: "Mathematics",
    category: "Theoretical Foundation",
    x: 28,
    y: 60,
    color: "#EC4899",
    radius: 6,
    description: "Linear algebra, matrix factorizations, probability, and vector calculus.",
  },
  {
    id: "software",
    label: "Software",
    category: "Engineering Architecture",
    x: 72,
    y: 60,
    color: "#10B981",
    radius: 6,
    description: "Full-stack portals, concurrency, databases, and production APIs.",
  },
  {
    id: "data",
    label: "Data",
    category: "Signal Processing",
    x: 42,
    y: 75,
    color: "#F59E0B",
    radius: 5,
    description: "ETL pipelines, time-series telemetry, and statistical signals.",
  },
  {
    id: "automation",
    label: "Automation",
    category: "Workflow Mechanics",
    x: 58,
    y: 75,
    color: "#6366F1",
    radius: 5,
    description: "Background daemons, OS scripting, and friction elimination.",
  },
];

const CONNECTIONS: [string, string][] = [
  ["ai", "ml"],
  ["ai", "cv"],
  ["ai", "software"],
  ["ml", "math"],
  ["cv", "math"],
  ["math", "data"],
  ["software", "automation"],
  ["data", "automation"],
  ["ai", "data"],
  ["software", "data"],
  ["ml", "cv"],
];

const THINKING_CHAIN = [
  { step: "QUESTION", detail: "Dissect the system. Why does this exist? Where is the friction?" },
  { step: "UNDERSTAND", detail: "Unpack mathematical mechanics & architecture, not just surface APIs." },
  { step: "EXPERIMENT", detail: "Spin up a sandbox, build minimal prototypes, and observe behavior." },
  { step: "BUILD", detail: "Turn concepts into functioning, production-ready software." },
  { step: "BREAK", detail: "Stress-test edge cases, concurrency bottlenecks, and invalid states." },
  { step: "FIX", detail: "Refactor schemas, tighten error handling, and optimize query latency." },
  { step: "BUILD BETTER", detail: "Iteratively evolve software into an enduring, reliable tool." },
];

export function NeuralBrain({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { mouse, isMobile, prefersReducedMotion } = useArtifacts();

  // Particle positions travelling along connections
  const [particles, setParticles] = useState<{ edgeIndex: number; progress: number; speed: number }[]>(
    () =>
      CONNECTIONS.map((_, i) => ({
        edgeIndex: i,
        progress: (i * 0.15) % 1,
        speed: 0.005 + (i % 3) * 0.003,
      }))
  );

  // Animate synaptic impulses
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId: number;
    const update = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          progress: (p.progress + p.speed) % 1,
        }))
      );
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion]);

  // Compute node offsets based on cursor proximity
  const nodeOffsets = useMemo(() => {
    if (isMobile || prefersReducedMotion || !containerRef.current) {
      return BRAIN_NODES.map(() => ({ dx: 0, dy: 0, glow: 1 }));
    }

    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distToCenter = Math.hypot(mouse.x - cx, mouse.y - cy);

    if (distToCenter > 400) {
      return BRAIN_NODES.map(() => ({ dx: 0, dy: 0, glow: 1 }));
    }

    const intensity = 1 - distToCenter / 400;

    return BRAIN_NODES.map((node) => {
      const nodeX = rect.left + (node.x / 100) * rect.width;
      const nodeY = rect.top + (node.y / 100) * rect.height;
      const dx = mouse.x - nodeX;
      const dy = mouse.y - nodeY;
      const d = Math.hypot(dx, dy);

      if (d < 250) {
        const pull = (1 - d / 250) * 12 * intensity;
        const angle = Math.atan2(dy, dx);
        return {
          dx: Math.cos(angle) * pull,
          dy: Math.sin(angle) * pull,
          glow: 1 + (1 - d / 250) * 1.5,
        };
      }
      return { dx: 0, dy: 0, glow: 1 };
    });
  }, [mouse, isMobile, prefersReducedMotion]);

  const getNodePos = (id: string) => {
    const idx = BRAIN_NODES.findIndex((n) => n.id === id);
    if (idx === -1) return { x: 50, y: 50 };
    const base = BRAIN_NODES[idx];
    const offset = nodeOffsets[idx] || { dx: 0, dy: 0 };
    return {
      x: base.x + (offset.dx / 2.5),
      y: base.y + (offset.dy / 2.5),
    };
  };

  return (
    <>
      <div
        ref={containerRef}
        onClick={() => setShowModal(true)}
        className={`relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl p-4 backdrop-blur-xl bg-neutral-950/70 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] luminous-border group cursor-pointer transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] ${className}`}
        title="Neural Brain - Click to reveal How I Think"
        role="button"
        aria-label="Neural Brain Artifact - Click to view thinking methodology"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <Brain size={15} className="text-blue-400 group-hover:animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-neutral-300 font-bold uppercase">
              NEURAL_ORGANISM
            </span>
          </div>
          <span className="text-[9px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            HOW I THINK ↗
          </span>
        </div>

        {/* Interactive Neural SVG Canvas */}
        <div className="relative w-full h-[calc(100%-28px)] flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#A855F7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting Synaptic Fibers */}
            {CONNECTIONS.map(([src, dst], i) => {
              const p1 = getNodePos(src);
              const p2 = getNodePos(dst);
              return (
                <line
                  key={`line-${i}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="url(#synapseGrad)"
                  strokeWidth="0.8"
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Traveling Synaptic Energy Particles */}
            {!prefersReducedMotion &&
              particles.map((p, idx) => {
                const conn = CONNECTIONS[p.edgeIndex];
                if (!conn) return null;
                const p1 = getNodePos(conn[0]);
                const p2 = getNodePos(conn[1]);
                const curX = p1.x + (p2.x - p1.x) * p.progress;
                const curY = p1.y + (p2.y - p1.y) * p.progress;
                return (
                  <circle
                    key={`particle-${idx}`}
                    cx={curX}
                    cy={curY}
                    r="1.2"
                    fill="#60A5FA"
                    filter="url(#glow)"
                  />
                );
              })}

            {/* Neural Nodes */}
            {BRAIN_NODES.map((node, i) => {
              const pos = getNodePos(node.id);
              const offset = nodeOffsets[i] || { glow: 1 };
              const isHovered = hoveredNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Outer pulse aura */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={node.radius * (isHovered ? 1.6 : 1.2)}
                    fill={node.color}
                    opacity={isHovered ? 0.4 : 0.15 * offset.glow}
                    className="transition-all duration-300"
                  />
                  {/* Core Node Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={node.radius}
                    fill={node.color}
                    filter="url(#glow)"
                    className="transition-all duration-200"
                  />
                  {/* Node text label */}
                  <text
                    x={pos.x}
                    y={pos.y + 0.8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="3.2"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="#ffffff"
                    pointerEvents="none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Node Tooltip on Hover */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute bottom-2 inset-x-4 p-2.5 rounded-xl bg-neutral-900/95 border border-white/20 shadow-xl backdrop-blur-md pointer-events-none text-left z-20"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-white">{hoveredNode.label}</span>
                  <span className="text-blue-400">{hoveredNode.category}</span>
                </div>
                <p className="text-[10px] text-neutral-300 leading-tight mt-0.5 font-light">
                  {hoveredNode.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* "HOW I THINK" Mental Model Overlay Modal */}
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
              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="space-y-1 mb-6">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Activity size={15} />
                  <span>Cognitive Workflow</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>How I Think & Build</span>
                  <Sparkles size={18} className="text-purple-400" />
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  The actual engineering feedback loop behind every project, model, and system I build.
                </p>
              </div>

              {/* Sequential Thinking Loop Chain */}
              <div className="space-y-3 relative before:absolute before:left-[17px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-emerald-500">
                {THINKING_CHAIN.map((item, idx) => (
                  <div key={item.step} className="flex items-start gap-4 relative z-10">
                    <div className="h-9 w-9 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white shadow-md shrink-0">
                      0{idx + 1}
                    </div>
                    <div className="space-y-0.5 pt-0.5">
                      <span className="text-xs font-mono font-bold text-blue-300 tracking-wider">
                        {item.step}
                      </span>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer takeaway */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>RECURSIVE REFINEMENT</span>
                <span className="text-emerald-400">ENGINEERING LEVERAGE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
