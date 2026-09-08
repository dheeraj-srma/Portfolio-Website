"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Maximize2,
  Minimize2,
  Terminal,
  Layers,
  BookOpen,
  Code2,
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Sliders,
  Play,
  RotateCcw
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { ProjectData } from "@/lib/data";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

type TabType = "preview" | "story" | "architecture" | "code";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(false);

  // Interactive Sandbox state
  const [tbShowHeatmap, setTbShowHeatmap] = useState(true);
  const [tbThreshold, setTbThreshold] = useState(72);
  const [auraInput, setAuraInput] = useState("");
  const [auraLogs, setAuraLogs] = useState<string[]>([
    "AURA Core v2.4 initialized.",
    "Microphone listener: Background thread active (sample_rate=16000Hz).",
    "Computer vision module: OpenCV standby (face_mesh loaded).",
    "System automation: Windows PowerShell IPC linked."
  ]);
  const [stockModelSelect, setStockModelSelect] = useState<"arima" | "lstm" | "rf">("lstm");
  const [nalkaSearch, setNalkaSearch] = useState("");
  const [nalkaCartCount, setNalkaCartCount] = useState(3);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleAuraSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auraInput.trim()) return;
    const cmd = auraInput.trim();
    setAuraLogs((prev) => [
      ...prev,
      `> User: "${cmd}"`,
      `[Intent Engine]: Parsed action: DISPATCH_QUERY -> Routing to local agent runtime...`,
      `[AURA Response]: Executed request for "${cmd}". System state nominal.`
    ]);
    setAuraInput("");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto">
        {/* Background click to dismiss */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        {/* Browser / Workstation Frame Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full ${
            isFullscreen ? "fixed inset-2 z-50 h-[calc(100vh-16px)]" : "max-w-5xl h-[88vh]"
          } bg-[#0A0A0F] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200 transition-all duration-300`}
        >
          {/* Top Browser Bar */}
          <div className="h-14 px-4 bg-[#0E0E16] border-b border-white/10 flex items-center justify-between gap-4 select-none shrink-0">
            {/* Window Controls (Traffic Lights) */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition-colors flex items-center justify-center group"
                aria-label="Close"
              >
                <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold">×</span>
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors"
                aria-label="Maximize"
              />
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors"
                aria-label="Fullscreen"
              />
            </div>

            {/* Omnibar / Address Bar */}
            <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-gray-300">
              <span className="text-emerald-400">https://</span>
              <span className="text-white truncate">dheeraj.engineering/projects/{project.id}</span>
              {project.localPort && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Dev Port :{project.localPort}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="View on GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors hidden sm:inline-flex"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div className="px-6 pt-3 bg-[#0C0C14] border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium transition-colors border-t border-x ${
                activeTab === "preview"
                  ? "bg-[#0A0A0F] border-white/15 text-white shadow-sm"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <Sparkles size={14} className="text-blue-400" />
              <span>Interactive Preview</span>
            </button>

            <button
              onClick={() => setActiveTab("story")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium transition-colors border-t border-x ${
                activeTab === "story"
                  ? "bg-[#0A0A0F] border-white/15 text-white shadow-sm"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <BookOpen size={14} className="text-purple-400" />
              <span>The Engineering Story (7 Questions)</span>
            </button>

            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium transition-colors border-t border-x ${
                activeTab === "architecture"
                  ? "bg-[#0A0A0F] border-white/15 text-white shadow-sm"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <Layers size={14} className="text-emerald-400" />
              <span>Architecture & Data Flow</span>
            </button>

            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-medium transition-colors border-t border-x ${
                activeTab === "code"
                  ? "bg-[#0A0A0F] border-white/15 text-white shadow-sm"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <Code2 size={14} className="text-amber-400" />
              <span>Source & Tech Stack</span>
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {/* TAB 1: INTERACTIVE PREVIEW & SANDBOX */}
            {activeTab === "preview" && (
              <div className="space-y-6">
                {/* Mode Selector / Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 font-light">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.localPort && (
                      <button
                        onClick={() => setIsLocalMode(!isLocalMode)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                          isLocalMode
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {isLocalMode ? "Connected to Local Port" : `Try Local :${project.localPort}`}
                      </button>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/10 text-white hover:bg-white/15 border border-white/15 transition-colors"
                    >
                      <span>Open GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* IFRAME / LOCAL STREAM OR INTERACTIVE SIMULATOR */}
                {isLocalMode && project.localPort ? (
                  <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-white/15 bg-black">
                    <iframe
                      src={`http://localhost:${project.localPort}`}
                      title={project.title}
                      className="w-full h-full border-0"
                      onError={() => setIsLocalMode(false)}
                    />
                  </div>
                ) : (
                  /* HIGH-FIDELITY SIMULATION SUITE (Zero Broken Iframes) */
                  <div className="space-y-6">
                    {/* 1. Nalka Metals Dealer Portal Simulator */}
                    {project.id === "nalka-dealer-portal" && (
                      <div className="rounded-xl border border-white/15 bg-[#0D0D14] p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300">
                              NM
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">Nalka Metals · Dealer Order Engine</h4>
                              <p className="text-[11px] font-mono text-gray-400">Active SKUs: 3,681 · Supabase Realtime Connected</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              Cart: {nalkaCartCount} items
                            </span>
                            <button
                              onClick={() => alert("Simulation: A4 PDF Dispatch Invoice Generated via jsPDF engine!")}
                              className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                            >
                              Generate PDF Slip
                            </button>
                          </div>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Search catalog (e.g. Brass Aldrop, SS Hinges, Mortise Lock)..."
                            value={nalkaSearch}
                            onChange={(e) => setNalkaSearch(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                          />
                          <button
                            onClick={() => setNalkaCartCount((c) => c + 1)}
                            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:bg-white/10"
                          >
                            + Quick Add SKU
                          </button>
                        </div>

                        {/* Catalog Items Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs font-mono">
                            <thead className="bg-white/5 text-gray-400 uppercase text-[10px]">
                              <tr>
                                <th className="p-2.5">SKU Code</th>
                                <th className="p-2.5">Item Description</th>
                                <th className="p-2.5">Finish / Spec</th>
                                <th className="p-2.5">Stock Status</th>
                                <th className="p-2.5">Wholesale Rate</th>
                                <th className="p-2.5 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                              {[
                                { sku: "NLK-BR-102", name: "Premium Brass Aldrop 10\"", finish: "Antique Bronze", stock: "In Stock (420 pcs)", rate: "₹485.00" },
                                { sku: "NLK-SS-405", name: "SS 304 Heavy Duty Hinges", finish: "Matt Finish", stock: "In Stock (1,850 pcs)", rate: "₹125.00" },
                                { sku: "NLK-LK-701", name: "Zinc Alloy Mortise Handle Set", finish: "Black Nickel", stock: "Low Stock (45 pcs)", rate: "₹890.00" },
                                { sku: "NLK-TS-019", name: "Tower Bolt Stainless Steel 8\"", finish: "Glossy Polish", stock: "In Stock (960 pcs)", rate: "₹95.00" }
                              ]
                                .filter((item) =>
                                  nalkaSearch ? item.name.toLowerCase().includes(nalkaSearch.toLowerCase()) || item.sku.toLowerCase().includes(nalkaSearch.toLowerCase()) : true
                                )
                                .map((row) => (
                                  <tr key={row.sku} className="hover:bg-white/[0.02]">
                                    <td className="p-2.5 text-purple-400 font-semibold">{row.sku}</td>
                                    <td className="p-2.5 text-white font-medium">{row.name}</td>
                                    <td className="p-2.5 text-gray-400">{row.finish}</td>
                                    <td className="p-2.5">
                                      <span className="inline-flex items-center gap-1 text-emerald-400">
                                        <CheckCircle2 size={12} />
                                        {row.stock}
                                      </span>
                                    </td>
                                    <td className="p-2.5 text-white">{row.rate}</td>
                                    <td className="p-2.5 text-right">
                                      <button
                                        onClick={() => setNalkaCartCount((c) => c + 1)}
                                        className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-[11px]"
                                      >
                                        + Add to Cart
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* 2. AURA AI Assistant Simulator */}
                    {project.id === "aura-ai-assistant" && (
                      <div className="rounded-xl border border-white/15 bg-[#09090E] p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300">
                              <Terminal size={16} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">AURA Desktop Agent Console</h4>
                              <p className="text-[11px] font-mono text-gray-400">Multimodal Event Loop · Python Speech & Vision Engine</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              setAuraLogs([
                                "AURA Core v2.4 reset.",
                                "Awaiting voice or keyboard instruction..."
                              ])
                            }
                            className="p-1.5 rounded text-gray-400 hover:text-white"
                            title="Clear Logs"
                          >
                            <RotateCcw size={14} />
                          </button>
                        </div>

                        {/* Terminal Logs Output */}
                        <div className="h-56 p-4 rounded-lg bg-black/70 border border-white/10 font-mono text-xs text-gray-300 space-y-2 overflow-y-auto">
                          {auraLogs.map((log, i) => (
                            <div
                              key={i}
                              className={
                                log.startsWith("> User:")
                                  ? "text-blue-400 font-bold"
                                  : log.startsWith("[AURA")
                                  ? "text-emerald-400"
                                  : "text-gray-400"
                              }
                            >
                              {log}
                            </div>
                          ))}
                        </div>

                        {/* Command Input Form */}
                        <form onSubmit={handleAuraSend} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a voice command simulation (e.g. 'Analyze screen for objects', 'Calculate linear regression', 'Open hardware inventory')..."
                            value={auraInput}
                            onChange={(e) => setAuraInput(e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono transition-colors"
                          >
                            Send Command
                          </button>
                        </form>
                      </div>
                    )}

                    {/* 3. TB_3D_AI Tuberculosis Detection Simulator */}
                    {project.id === "tb-3d-ai" && (
                      <div className="rounded-xl border border-white/15 bg-[#0D0B12] p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-rose-600/30 border border-rose-500/40 flex items-center justify-center font-bold text-rose-300">
                              <Eye size={16} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">TBX11K Radiological Inference & Grad-CAM</h4>
                              <p className="text-[11px] font-mono text-gray-400">PyTorch U-Net · Classification & Lesion Segmentation</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setTbShowHeatmap(!tbShowHeatmap)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono border transition-colors ${
                                tbShowHeatmap
                                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                  : "bg-white/5 text-gray-400 border-white/10"
                              }`}
                            >
                              {tbShowHeatmap ? "Grad-CAM: ON" : "Grad-CAM: OFF"}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Radiograph & Heatmap Viewport */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-7 relative h-64 rounded-xl bg-black border border-white/15 overflow-hidden flex items-center justify-center">
                            {/* Stylized Chest X-Ray Simulator SVG */}
                            <svg className="w-48 h-56 text-gray-700" viewBox="0 0 200 240" fill="none">
                              {/* Rib cage outlines */}
                              <path d="M100 20 V220" stroke="currentColor" strokeWidth="3" />
                              <path d="M60 50 Q100 70 140 50" stroke="currentColor" strokeWidth="2" />
                              <path d="M40 80 Q100 110 160 80" stroke="currentColor" strokeWidth="2.5" />
                              <path d="M35 110 Q100 140 165 110" stroke="currentColor" strokeWidth="2.5" />
                              <path d="M40 140 Q100 170 160 140" stroke="currentColor" strokeWidth="2" />
                              <path d="M50 170 Q100 190 150 170" stroke="currentColor" strokeWidth="2" />
                              {/* Lung fields */}
                              <ellipse cx="65" cy="115" rx="35" ry="60" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
                              <ellipse cx="135" cy="115" rx="35" ry="60" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
                            </svg>

                            {/* Grad-CAM Heatmap Overlay */}
                            {tbShowHeatmap && (
                              <div
                                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                style={{ opacity: tbThreshold / 100 }}
                              >
                                <div className="absolute top-20 left-16 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500/50 via-rose-600/70 to-purple-600/50 blur-xl" />
                                <div className="absolute top-24 left-20 border-2 border-dashed border-rose-400 rounded-lg p-2 text-[9px] font-mono text-rose-200 bg-rose-950/60">
                                  Lesion [IoU: 0.78]
                                </div>
                              </div>
                            )}

                            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded">
                              Image: TBX11K_val_0842.png (CLAHE Enhanced)
                            </div>
                          </div>

                          {/* Controls & Metrics */}
                          <div className="md:col-span-5 space-y-4 text-xs font-mono">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                              <span className="text-gray-400">Diagnosis Confidence</span>
                              <div className="flex items-center justify-between text-white font-bold text-sm">
                                <span>Active Pulmonary TB</span>
                                <span className="text-rose-400">91.4%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 rounded-full w-[91.4%]" />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between text-gray-300 text-[11px]">
                                <span>Activation Threshold</span>
                                <span>{tbThreshold}%</span>
                              </div>
                              <input
                                type="range"
                                min="20"
                                max="100"
                                value={tbThreshold}
                                onChange={(e) => setTbThreshold(Number(e.target.value))}
                                className="w-full accent-rose-500"
                              />
                            </div>

                            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                              <strong>Clinical Note:</strong> Grad-CAM highlights unilateral apical infiltrates in the right upper lobe. U-Net mask predicts localized cavitary lesion.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. Stock Prediction Model Exploration Simulator */}
                    {project.id === "stock-prediction-experiments" && (
                      <div className="rounded-xl border border-white/15 bg-[#0D0B0A] p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center font-bold text-amber-300">
                              <Sliders size={16} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">Empirical Time-Series Model Benchmark</h4>
                              <p className="text-[11px] font-mono text-gray-400">Comparing ARIMA vs LSTM vs Random Forest on Stochastic Data</p>
                            </div>
                          </div>
                          {/* Model Switcher */}
                          <div className="flex gap-1.5">
                            {(["arima", "lstm", "rf"] as const).map((m) => (
                              <button
                                key={m}
                                onClick={() => setStockModelSelect(m)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase transition-colors ${
                                  stockModelSelect === m
                                    ? "bg-amber-500 text-black font-bold"
                                    : "bg-white/5 text-gray-400 hover:text-white"
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Forecasting Graph Simulation */}
                        <div className="p-4 rounded-lg bg-black/60 border border-white/10 space-y-4">
                          <div className="h-44 flex items-end gap-1.5 pt-4 px-2 border-b border-white/10">
                            {[42, 45, 43, 48, 52, 50, 56, 54, 59, 63, 61, 67, 65, 72, 70, 76, 74, 82, 80, 85].map((val, idx) => {
                              const predicted =
                                stockModelSelect === "arima"
                                  ? val + Math.sin(idx) * 3
                                  : stockModelSelect === "lstm"
                                  ? val + (Math.random() - 0.4) * 4
                                  : val + (Math.random() - 0.5) * 8;
                              return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                                  {/* Actual bar */}
                                  <div
                                    style={{ height: `${val * 1.5}px` }}
                                    className="w-full bg-blue-500/40 rounded-t group-hover:bg-blue-400 transition-colors"
                                  />
                                  {/* Model Prediction dot */}
                                  <div
                                    style={{ bottom: `${predicted * 1.5}px` }}
                                    className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                  />
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1.5 text-blue-400">
                                <span className="w-3 h-1 bg-blue-500 rounded" />
                                Actual Historical Price
                              </span>
                              <span className="flex items-center gap-1.5 text-amber-400">
                                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                                {stockModelSelect.toUpperCase()} Forecast
                              </span>
                            </div>
                            <span className="text-gray-400 text-[11px]">Walk-Forward Out-Of-Sample Test</span>
                          </div>
                        </div>

                        {/* Truthful Model Diagnostic Assessment */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-gray-400 text-[10px]">Test Set RMSE</span>
                            <p className="text-sm font-bold text-white mt-1">
                              {stockModelSelect === "arima" ? "4.12 USD" : stockModelSelect === "lstm" ? "3.28 USD" : "5.45 USD"}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-gray-400 text-[10px]">Directional Accuracy</span>
                            <p className="text-sm font-bold text-white mt-1">
                              {stockModelSelect === "arima" ? "52.3% (Noise floor)" : stockModelSelect === "lstm" ? "54.8% (Slight edge)" : "51.1% (Near coinflip)"}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-gray-400 text-[10px]">Empirical Insight</span>
                            <p className="text-[11px] text-amber-300 mt-1">
                              {stockModelSelect === "arima"
                                ? "Stationary autoregression fails on structural volatility shifts."
                                : stockModelSelect === "lstm"
                                ? "LSTM tends to predict t ≈ t-1 (one-step lag trap)."
                                : "Ensemble overfits to past regimes without orderflow data."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Generic High-Fidelity Overview Card for remaining projects */}
                    {!["nalka-dealer-portal", "aura-ai-assistant", "tb-3d-ai", "stock-prediction-experiments"].includes(project.id) && (
                      <div className="p-8 rounded-xl border border-white/15 bg-white/[0.02] text-center space-y-4">
                        <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 text-blue-400">
                          <Code2 size={28} />
                        </div>
                        <h4 className="text-lg font-bold text-white">{project.title}</h4>
                        <p className="text-sm text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
                          {project.summary}
                        </p>
                        <div className="flex justify-center gap-3 pt-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-colors"
                          >
                            <GithubIcon size={14} />
                            <span>View Source Repository</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: THE 7 ENGINEERING QUESTIONS */}
            {activeTab === "story" && (
              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Engineering Breakdown: {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Answering the 7 questions of authentic technical building
                  </p>
                </div>

                {/* 1. What was the idea? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>01 · What was the idea?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light pl-3 border-l-2 border-blue-500/30">
                    {project.story.idea}
                  </p>
                </div>

                {/* 2. Why did Dheeraj build it? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span>02 · Why did Dheeraj build it?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light pl-3 border-l-2 border-purple-500/30">
                    {project.story.whyBuilt}
                  </p>
                </div>

                {/* 3. How does it work? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>03 · How does it work?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light pl-3 border-l-2 border-cyan-500/30">
                    {project.story.howItWorks}
                  </p>
                </div>

                {/* 4. What technologies were used? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>04 · What technologies were used?</span>
                  </div>
                  <div className="pl-3 border-l-2 border-emerald-500/30 flex flex-wrap gap-2 pt-1">
                    {project.story.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. What was difficult? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    <span>05 · What was difficult?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light pl-3 border-l-2 border-rose-500/30">
                    {project.story.challenges}
                  </p>
                </div>

                {/* 6. What did he learn? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>06 · What did he learn?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light pl-3 border-l-2 border-amber-500/30">
                    {project.story.learnings}
                  </p>
                </div>

                {/* 7. What would he improve? */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    <span>07 · What would he improve next?</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-light pl-3 border-l-2 border-indigo-500/30">
                    {project.story.improvements}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: ARCHITECTURE & SYSTEM FLOW */}
            {activeTab === "architecture" && (
              <div className="space-y-8 max-w-4xl mx-auto">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {project.architecture.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Component decomposition and pipeline execution flow
                  </p>
                </div>

                {/* Step-by-step Flow Pipeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    Pipeline Execution Stages
                  </h4>
                  <div className="space-y-2.5">
                    {project.architecture.flow.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-colors"
                      >
                        <span className="flex-shrink-0 h-6 w-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep Architectural Details */}
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
                    Engineering Principles & Constraints
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {project.architecture.details}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                {project.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                          {m.label}
                        </span>
                        <p className="text-base font-bold text-white font-mono mt-1">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CODE & TECH STACK */}
            {activeTab === "code" && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Repository & Implementation Details
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">
                    Direct access to public code, dependencies, and git configuration
                  </p>
                </div>

                {/* GitHub Card */}
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-purple-400">Open Source Repository</span>
                    <h4 className="text-base font-bold text-white font-mono">{project.githubUrl}</h4>
                    <p className="text-xs text-gray-400 font-light">
                      Contains full commit history, README setup instructions, and architecture assets.
                    </p>
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-gray-200 transition-colors"
                  >
                    <GithubIcon size={16} />
                    <span>Clone & Inspect Code</span>
                  </a>
                </div>

                {/* Technologies Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    Core Technologies & Libraries
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {project.tags.map((tag) => (
                      <div
                        key={tag}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Git Clone Snippet */}
                <div className="p-4 rounded-xl bg-black/80 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Quick Clone Command
                  </span>
                  <pre className="text-xs font-mono text-blue-300 overflow-x-auto p-2 bg-white/5 rounded">
                    git clone {project.githubUrl}.git
                  </pre>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
