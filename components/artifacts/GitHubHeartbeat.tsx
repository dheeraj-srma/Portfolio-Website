"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, GitCommit, FolderGit2, Star, ExternalLink, X, Flame } from "lucide-react";
import { useGitHubData } from "@/hooks/useGitHubData";
import { PERSONAL_INFO } from "@/lib/data";

export function GitHubHeartbeat({ className = "" }: { className?: string }) {
  const stats = useGitHubData("dheeraj-srma");
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live ECG Waveform Animation synced to real commit velocity
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    // Peak velocity factor controls ECG pulse height
    const velocityFactor = Math.min(1.8, Math.max(0.7, (stats.commitsThisMonth || 10) / 25));

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Grid background lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 16) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 12) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // ECG Waveform Path
      ctx.beginPath();
      ctx.lineWidth = isHovered ? 2 : 1.5;
      ctx.strokeStyle = stats.error ? "#F43F5E" : isHovered ? "#38BDF8" : "#3B82F6";

      offset = (offset + (isHovered ? 1.4 : 0.8)) % width;

      for (let x = 0; x < width; x++) {
        const cycle = ((x + offset) % 120);
        let y = midY;

        // Simulate cardiac QRS complex representing commit telemetry
        if (cycle > 45 && cycle < 52) {
          y = midY - 6 * velocityFactor; // small P wave
        } else if (cycle >= 52 && cycle < 56) {
          y = midY + 4 * velocityFactor; // Q dip
        } else if (cycle >= 56 && cycle < 62) {
          y = midY - 26 * velocityFactor; // High R spike
        } else if (cycle >= 62 && cycle < 68) {
          y = midY + 12 * velocityFactor; // S dip
        } else if (cycle >= 75 && cycle < 85) {
          y = midY - 8 * velocityFactor; // T wave
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Glowing scan head circle at current pulse offset
      const headX = (width - offset) % width;
      ctx.beginPath();
      ctx.arc(headX, midY, 3, 0, Math.PI * 2);
      ctx.fillStyle = stats.error ? "#F43F5E" : "#60A5FA";
      ctx.shadowColor = "#3B82F6";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [stats.commitsThisMonth, stats.error, isHovered]);

  const latestRepo = stats.recentRepos[0] || {
    name: "Portfolio-Website",
    updated_at: "Active",
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-72 sm:w-80 rounded-3xl p-4 backdrop-blur-xl bg-neutral-950/75 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] luminous-border group cursor-pointer select-none transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(59,130,246,0.2)] ${className}`}
        title="GitHub Heartbeat - Click for live commit telemetry"
        role="button"
        aria-label="GitHub Heartbeat Activity Monitor"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        {/* Top Header: Monitor status */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-blue-400 group-hover:animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-neutral-300 font-bold uppercase">
              DEV_HEARTBEAT
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                stats.error ? "bg-rose-500" : "bg-emerald-400 animate-pulse"
              }`}
            />
            <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-400">
              {stats.error ? "OFFLINE" : "CONNECTED"}
            </span>
          </div>
        </div>

        {/* ECG Waveform Canvas */}
        <div className="relative w-full h-16 rounded-xl bg-neutral-900/60 border border-white/10 overflow-hidden mb-3">
          <canvas
            ref={canvasRef}
            width={280}
            height={64}
            className="w-full h-full block"
          />
        </div>

        {/* Real GitHub Activity Readout */}
        <div className="space-y-1.5 text-left font-mono text-[10px]">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Active Repository:</span>
            <span className="text-blue-300 font-semibold truncate max-w-[140px]">
              {latestRepo.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1">
              <Flame size={11} className="text-amber-400" />
              Active Streak:
            </span>
            <span className="text-emerald-400 font-semibold">
              {stats.activeStreak} Days
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-400 border-t border-white/5 pt-1 mt-1">
            <span>Commits (Month):</span>
            <span className="text-purple-300 font-bold">
              {stats.commitsThisMonth} Commits
            </span>
          </div>
        </div>

        {/* Hover Cue */}
        <div className="mt-2 text-right">
          <span className="text-[9px] font-mono text-neutral-500 group-hover:text-blue-400 transition-colors">
            EXPAND TELEMETRY ↗
          </span>
        </div>
      </div>

      {/* Full GitHub Activity Telemetry Modal on Click */}
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
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-neutral-950/95 border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] luminous-border text-left space-y-5"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <FolderGit2 size={15} />
                  <span>Real-Time Git Telemetry</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  GitHub Open Source Activity
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Live telemetry retrieved directly from Dheeraj's GitHub profile (@{PERSONAL_INFO.username}).
                </p>
              </div>

              {/* Key Activity Counters */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                    Public Repos
                  </span>
                  <span className="text-xl font-bold font-mono text-white">
                    {stats.publicRepos}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                    Active Streak
                  </span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {stats.activeStreak}d
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                    Total Commits
                  </span>
                  <span className="text-xl font-bold font-mono text-blue-400">
                    {stats.totalCommits}
                  </span>
                </div>
              </div>

              {/* Recent Repositories */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">
                  RECENTLY UPDATED REPOSITORIES
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {stats.recentRepos.slice(0, 4).map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/10 transition-colors group/repo"
                    >
                      <div className="space-y-0.5 truncate">
                        <span className="text-xs font-mono font-bold text-white group-hover/repo:text-blue-300 transition-colors block truncate">
                          {repo.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 truncate block">
                          {repo.description}
                        </span>
                      </div>
                      <ExternalLink size={12} className="text-neutral-500 group-hover/repo:text-white shrink-0 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors"
                >
                  <span>Open GitHub Profile</span>
                  <ExternalLink size={13} />
                </a>
                <span className="text-[10px] font-mono text-neutral-500">
                  REAL-TIME API
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
