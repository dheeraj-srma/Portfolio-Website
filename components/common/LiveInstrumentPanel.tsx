"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Maximize2, Minimize2, ExternalLink, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";
import { ProjectData } from "@/lib/data";
import { Tooltip } from "@/components/common/Tooltip";

interface LiveInstrumentPanelProps {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}

export function LiveInstrumentPanel({
  project,
  isOpen,
  onClose,
}: LiveInstrumentPanelProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Derive demo URL based on project ID
  const getDemoUrl = () => {
    if (project.demoSource) return project.demoSource;
    if (project.id === "nalka-dealer-portal") return "/demos/nalka-dealer-portal/index.html";
    if (project.id === "tb-3d-ai") return "/demos/tb-3d-ai/index.html";
    // Default fallback demo path
    return `/demos/${project.id}/index.html`;
  };

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, project.id]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-4 overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#07090f]/95 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)]"
      >
        {/* Engineered Console Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0b0e17] border-b border-white/10 text-xs font-mono">
          {/* Left Status Telemetry */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white tracking-wide">LIVE INSTRUMENT</span>
            <span className="text-gray-500">|</span>
            <span className="text-cyan-400 truncate max-w-[200px] sm:max-w-xs">{project.title}</span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20">
              <ShieldCheck size={11} />
              <span>SANDBOXED</span>
            </span>

            <Tooltip content="Reload Runtime Environment" position="bottom" delay={120}>
              <button
                onClick={handleReload}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
                aria-label="Reload demo"
              >
                <RotateCcw size={13} />
              </button>
            </Tooltip>

            <Tooltip content="Open Standalone View" position="bottom" delay={120}>
              <a
                href={getDemoUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
                aria-label="Open in new tab"
              >
                <ExternalLink size={13} />
              </a>
            </Tooltip>

            <Tooltip content="Close Live Demo" position="bottom" delay={120}>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition-colors cursor-pointer"
                aria-label="Close demo panel"
              >
                <X size={13} />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Live Instrument Viewport with Aspect-Ratio Container (CLS Safe) */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[580px] min-h-[380px] bg-[#05070c]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#07090f]/90 text-center p-4">
              <div className="relative h-10 w-10 mb-3">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-2 rounded-full border border-purple-500/30 border-b-purple-400 animate-spin" style={{ animationDirection: "reverse" }} />
              </div>
              <p className="text-xs font-mono text-cyan-300 tracking-wider">BOOTING VIRTUAL RUNTIME...</p>
              <p className="text-[10px] font-mono text-gray-500 mt-1">Initializing client-side sandbox container</p>
            </div>
          )}

          <iframe
            key={reloadKey}
            ref={iframeRef}
            src={getDemoUrl()}
            title={`${project.title} live demo instrument`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer Telemetry Strip */}
        <div className="px-4 py-2 bg-[#090b12] border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-cyan-400" />
            <span>Opt-in sandbox execution · 0 external server overhead</span>
          </div>
          <div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Inspect Source Code</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
