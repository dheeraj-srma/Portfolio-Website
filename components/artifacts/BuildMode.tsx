"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, ShieldCheck, Activity, Eye, Zap, Layers } from "lucide-react";
import { useArtifacts } from "./context/ArtifactContext";

export function BuildModeToggle({ className = "" }: { className?: string }) {
  const { buildMode, toggleBuildMode, mouse } = useArtifacts();
  const [fps, setFps] = useState(60);

  // Measure rough client render cadence for real FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (time - lastTime))));
        frameCount = 0;
        lastTime = time;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* 1. Floating Build Mode Toggle Trigger Button */}
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleBuildMode}
          className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold tracking-wider backdrop-blur-xl border transition-all duration-300 shadow-2xl ${
            buildMode
              ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
              : "bg-neutral-950/80 border-white/15 text-neutral-400 hover:text-white hover:border-white/30"
          }`}
          title={buildMode ? "Switch to Portfolio Mode" : "Switch to Engineering Build Mode"}
          aria-pressed={buildMode}
          aria-label="Toggle Engineering Build Mode"
        >
          <div className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                buildMode ? "bg-cyan-400" : "bg-neutral-500"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                buildMode ? "bg-cyan-400" : "bg-neutral-500"
              }`}
            />
          </div>

          <Terminal size={14} className={buildMode ? "text-cyan-300" : "text-neutral-400"} />
          <span>BUILD MODE</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] ${
              buildMode
                ? "bg-cyan-400/20 text-cyan-200 border border-cyan-400/40"
                : "bg-white/5 text-neutral-500"
            }`}
          >
            {buildMode ? "ON" : "OFF"}
          </span>
        </motion.button>
      </div>

      {/* 2. Global Engineering Overlay When Active */}
      <AnimatePresence>
        {buildMode && (
          <>
            {/* Full-screen Technical Blueprint Grid Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 pointer-events-none z-30 blueprint-grid opacity-60"
            />

            {/* Corner Coordinate HUD Indicators */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="fixed top-20 left-6 z-40 pointer-events-none hidden md:block"
            >
              <div className="p-3 rounded-2xl bg-neutral-950/90 border border-cyan-500/30 backdrop-blur-xl font-mono text-[10px] text-cyan-300/80 space-y-1 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-cyan-500/20 pb-1 text-cyan-400 font-bold">
                  <Cpu size={12} />
                  <span>SYS_COORDINATES</span>
                </div>
                <div>X_POS: {Math.round(mouse.x)} px</div>
                <div>Y_POS: {Math.round(mouse.y)} px</div>
                <div>CADENCE: {fps} FPS</div>
                <div>VIEWPORT: {typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1920x1080"}</div>
              </div>
            </motion.div>

            {/* Floating Live System Telemetry HUD Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 right-6 z-40 pointer-events-none"
            >
              <div className="w-64 p-4 rounded-3xl bg-neutral-950/95 border border-cyan-500/40 backdrop-blur-2xl font-mono text-[11px] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.2)] space-y-2.5 text-left">
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Activity size={13} className="text-cyan-400 animate-pulse" />
                    SYSTEM TELEMETRY
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-500/30">
                    LIVE
                  </span>
                </div>

                {/* Status Readouts */}
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>FRONTEND ENGINE</span>
                    <span className="text-emerald-400 font-bold">ONLINE (NEXT.JS 16)</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>GITHUB TELEMETRY</span>
                    <span className="text-cyan-400 font-bold">CONNECTED (REST)</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>PROJECT GRAPH</span>
                    <span className="text-purple-400 font-bold">READY (6 VERIFIED)</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>ANIMATION LAYER</span>
                    <span className="text-emerald-400 font-bold">ACTIVE ({fps} FPS)</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400">
                    <span>RUN MODE</span>
                    <span className="text-cyan-300 font-bold uppercase">ENGINEERING</span>
                  </div>
                </div>

                {/* Sub-label */}
                <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[9px] text-neutral-500">
                  <span>DISSECTING SYSTEM</span>
                  <span className="text-cyan-400/80">NO KEYS EXPOSED</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Component Label Tag for Build Mode
 * Renders technical overlay badges on any portfolio section when Build Mode is active.
 */
export function BuildModeTag({
  label,
  spec,
  className = "",
}: {
  label: string;
  spec?: string;
  className?: string;
}) {
  const { buildMode } = useArtifacts();

  if (!buildMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/90 border border-cyan-400/50 backdrop-blur-md font-mono text-[10px] text-cyan-300 shadow-md z-30 pointer-events-none tracking-widest uppercase ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
      <span className="font-bold">[{label}]</span>
      {spec && <span className="text-cyan-400/60 font-normal">::{spec}</span>}
    </motion.div>
  );
}
