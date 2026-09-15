"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Briefcase, Package, Unlock, Lock, Sparkles, X, Wrench } from "lucide-react";
import { useArtifacts } from "./context/ArtifactContext";

interface ToolChip {
  name: string;
  category: string;
  usage: string;
  color: string;
}

const BACKPACK_TOOLS: ToolChip[] = [
  {
    name: "Python",
    category: "AI & Systems",
    usage: "Primary engine for machine learning, computer vision, data analysis, and system daemons.",
    color: "#3572A5",
  },
  {
    name: "TypeScript",
    category: "Full-Stack Software",
    usage: "Type-safe architectures for production web interfaces, business portals, and robust APIs.",
    color: "#3178C6",
  },
  {
    name: "React 19 & Next.js",
    category: "Modern Frontend",
    usage: "Component engineering, responsive interfaces, server-rendered layouts, and interactive state.",
    color: "#61DAFB",
  },
  {
    name: "PyTorch",
    category: "Deep Learning",
    usage: "Building, training, and testing convolutional networks, U-Net segmentations, and loss functions.",
    color: "#EE4C2C",
  },
  {
    name: "OpenCV",
    category: "Computer Vision",
    usage: "Real-time webcam telemetry, video frame buffers, face detection, and image pre-processing.",
    color: "#5C3EE8",
  },
  {
    name: "PostgreSQL & Supabase",
    category: "Relational Storage",
    usage: "Relational database modeling, indexing 3,600+ SKU catalogs, and real-time subscription tables.",
    color: "#336791",
  },
  {
    name: "Pandas & NumPy",
    category: "Data & Vectors",
    usage: "Vectorized linear algebra, numerical array transforms, and financial/business datasets.",
    color: "#150458",
  },
  {
    name: "Git & GitHub",
    category: "Engineering Control",
    usage: "Version control, automated continuous workflows, repository management, and collaboration.",
    color: "#F05032",
  },
  {
    name: "FastAPI",
    category: "Backend Services",
    usage: "High-performance asynchronous REST APIs connecting neural models to web frontends.",
    color: "#009688",
  },
  {
    name: "Tailwind CSS",
    category: "Design System",
    usage: "Crafting fluid responsive layouts, glassmorphism aesthetics, and clean utility styling.",
    color: "#38B2AC",
  },
];

export function DigitalBackpack({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolChip | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { mouse, isMobile, prefersReducedMotion } = useArtifacts();

  // Physical swing momentum from mouse tracking
  const swingAngle = useMotionValue(0);
  const smoothSwing = useSpring(swingAngle, { damping: 14, stiffness: 100 });

  useEffect(() => {
    if (isMobile || prefersReducedMotion || !containerRef.current) {
      swingAngle.set(0);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < 450) {
      const angle = (dx / 450) * 8; // -8deg to +8deg swing
      swingAngle.set(angle);
    } else {
      swingAngle.set(0);
    }
  }, [mouse, isMobile, prefersReducedMotion, swingAngle]);

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative select-none ${className}`}
      >
        {/* Top strap hook hanging */}
        <div className="w-12 h-6 mx-auto border-t-2 border-x-2 border-neutral-700 rounded-t-xl bg-transparent" />

        {/* Backpack Body */}
        <motion.div
          style={{ rotateZ: smoothSwing }}
          onClick={() => setIsOpen(true)}
          className="relative w-64 sm:w-72 h-80 rounded-3xl p-5 backdrop-blur-xl bg-neutral-950/85 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] luminous-border group cursor-pointer transition-all duration-300 hover:border-white/30 hover:shadow-[0_25px_60px_rgba(168,85,247,0.25)] flex flex-col justify-between"
          title="Digital Backpack - Click to unzip and explore tools"
          role="button"
          aria-label="Digital Backpack Toolkit"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          {/* Subtle ballistic nylon texture and glowing seams */}
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:10px_10px] opacity-70 pointer-events-none" />

          {/* Luminous neon seam lines */}
          <div className="absolute top-16 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          <div className="absolute top-44 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          {/* Top Zipper / Handle Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Package size={15} className="text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono tracking-wider text-neutral-300 font-bold uppercase">
                DIGITAL_TOOLKIT
              </span>
            </div>
            {/* Magnetic Quick-Lock Status */}
            <div className="flex items-center gap-1 text-[9px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {isHovered ? (
                <Unlock size={10} className="text-emerald-400" />
              ) : (
                <Lock size={10} className="text-neutral-500" />
              )}
              <span>{isHovered ? "READY" : "LOCKED"}</span>
            </div>
          </div>

          {/* Center: Tactical Backpack Design with DS Monogram Emblem */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-3">
            {/* DS Rubberized Tactical Patch */}
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950 border-2 border-white/20 p-1 shadow-inner flex items-center justify-center group-hover:border-purple-400/60 transition-colors">
              <div className="h-full w-full rounded-xl bg-neutral-900 flex flex-col items-center justify-center">
                <span className="font-mono font-black text-sm text-white tracking-tighter">
                  DS
                </span>
                <span className="text-[7px] font-mono text-purple-400 font-bold tracking-widest">
                  GEAR
                </span>
              </div>
            </div>

            {/* Tactical Webbing Straps (MOLLE-style) */}
            <div className="w-full space-y-1.5 px-4">
              <div className="h-2 rounded bg-white/[0.04] border border-white/10 flex items-center justify-between px-2">
                <span className="w-2 h-1 bg-white/20 rounded-sm" />
                <span className="w-2 h-1 bg-white/20 rounded-sm" />
                <span className="w-2 h-1 bg-white/20 rounded-sm" />
              </div>
              <div className="h-2 rounded bg-white/[0.04] border border-white/10 flex items-center justify-between px-2">
                <span className="w-2 h-1 bg-white/20 rounded-sm" />
                <span className="w-2 h-1 bg-white/20 rounded-sm" />
                <span className="w-2 h-1 bg-white/20 rounded-sm" />
              </div>
            </div>

            <p className="text-[11px] font-mono text-neutral-300 text-center px-2">
              Everyday engineering tools carried into production.
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
            <span className="text-neutral-500">10 VERIFIED TOOLS</span>
            <span className="text-purple-300 group-hover:text-white flex items-center gap-1 transition-colors">
              <span>UNZIP PACK</span>
              <Sparkles size={11} className="text-purple-400" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* Unzipped Tools Modal / Drawer on Click */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl rounded-3xl backdrop-blur-2xl bg-neutral-950/95 border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] luminous-border text-left space-y-6"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <Wrench size={15} />
                  <span>Engineering Inventory</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Inside Dheeraj's Digital Backpack</span>
                  <Sparkles size={18} className="text-purple-400" />
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  No arbitrary 95% proficiency bars. Real tools with their actual role in my projects.
                </p>
              </div>

              {/* Grid of Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                {BACKPACK_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    onClick={() => setSelectedTool(tool)}
                    className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer space-y-1 group/tool"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white group-hover/tool:text-blue-300 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[9px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                      {tool.usage}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>PRACTICAL IMPLEMENTATION</span>
                <span className="text-purple-400">TOOLS OVER GIMMICKS</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
