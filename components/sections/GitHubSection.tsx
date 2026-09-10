"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star,
  BookOpen,
  Activity,
  ArrowUpRight,
  Code,
  GitBranch,
  Flame,
  TrendingUp
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { useGitHubData } from "@/hooks/useGitHubData";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  isInView: boolean;
  delay?: number;
}

function AnimatedCounter({ target, prefix = "", suffix = "", isInView, delay = 0 }: AnimatedCounterProps) {
  const [val, setVal] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setVal(target);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progressRatio, 3);
        setVal(Math.round(eased * target));

        if (progressRatio < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, target, delay, prefersReducedMotion]);

  return (
    <span>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

export function GitHubSection() {
  const stats = useGitHubData("dheeraj-srma");
  const telemetryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(telemetryRef, { once: true, amount: 0.2 });


  return (
    <section id="github" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 uppercase tracking-widest"
        >
          <GithubIcon size={14} />
          <span>Real Open Source Activity</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          GitHub Telemetry
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Live synchronization with my real-world GitHub activity and code repositories at @dheeraj-srma.
        </motion.p>
      </div>

      {/* Main GitHub Showcase Grid - Balanced & Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left Side (7 cols): Repositories Showcase in 2-Column Grid (4 rows x 2 = 8 repos) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
          {/* Top Header */}
          <div className="h-7 flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
              <GitBranch size={14} />
              Featured Public Repositories ({stats.recentRepos.length})
            </span>
            <a
              href="https://github.com/dheeraj-srma?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-gray-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <span>View all on GitHub</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* 4 rows x 2 columns = 8 repos grid, styled to fit perfectly alongside telemetry panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {stats.recentRepos.slice(0, 8).map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <SpotlightCard className="h-full p-3.5 rounded-xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.04]">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <BookOpen size={13} className="text-blue-400 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-bold font-mono text-white group-hover:text-blue-300 transition-colors truncate">
                          {repo.name}
                        </h4>
                      </div>
                      <ArrowUpRight size={13} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed line-clamp-2">
                      {repo.description || "Public open-source repository on GitHub."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-[10px] font-mono text-gray-400">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        {repo.language || "Code"}
                      </span>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star size={10} fill="currentColor" />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-500">{repo.updated_at}</span>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>

          {/* Bottom helper info */}
          <div className="h-5 px-1 flex items-center justify-between text-[11px] font-mono text-gray-500">
            <span>Synchronized with GitHub REST API</span>
            <span className="text-emerald-400/80">● Auto-updating</span>
          </div>
        </div>

        {/* Right Side (5 cols): Telemetry Panel (Metrics, Languages, Activity & Velocity) */}
        <div ref={telemetryRef} className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          {/* Top Header */}
          <div className="h-7 flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
              <Activity size={14} />
              Telemetry & Code Metrics
            </span>
            <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
            </span>
          </div>

          {/* Quick Counter Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <SpotlightCard className="p-3.5 flex flex-col items-center justify-center text-center border border-white/10 hover:border-blue-500/30 transition-colors">
              <BookOpen size={18} className="text-blue-400 mb-1.5" />
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                <AnimatedCounter target={stats.publicRepos} isInView={isInView} delay={0.1} />
              </span>
              <span className="text-xs text-gray-400 font-light mt-0.5">Public Repos</span>
            </SpotlightCard>

            <SpotlightCard className="p-3.5 flex flex-col items-center justify-center text-center border border-white/10 hover:border-amber-500/30 transition-colors">
              <Star size={18} className="text-amber-400 mb-1.5" />
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                <AnimatedCounter target={stats.stars} isInView={isInView} delay={0.2} />
              </span>
              <span className="text-xs text-gray-400 font-light mt-0.5">Stargazers</span>
            </SpotlightCard>
          </div>

          {/* Languages Breakdown Card */}
          <SpotlightCard className="p-3.5 space-y-3 border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code size={15} className="text-blue-400" />
                <span>Language Distribution</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400">Across Repos</span>
            </div>

            {/* Segmented bar */}
            <div className="h-2 w-full rounded-full overflow-hidden flex bg-white/5 p-0.5 gap-0.5">
              {stats.topLanguages.map((lang, lIdx) => (
                <motion.div
                  key={lang.name}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${lang.percentage}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + lIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    backgroundColor: lang.color
                  }}
                  className="h-full rounded-full"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language Legend */}
            <div className="grid grid-cols-2 gap-2 pt-0.5 font-mono text-xs">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between p-1 rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-gray-300 text-[11px] truncate">{lang.name}</span>
                  </div>
                  <span className="text-gray-400 text-[11px] font-semibold">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* Activity & Velocity Matrix Card */}
          <SpotlightCard className="p-3.5 space-y-3 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={15} className="text-amber-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Commit Activity & Velocity
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                Active Cadence
              </span>
            </div>

            {/* Numerical Metrics Row with Animated Counters */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block truncate">Yearly Total</span>
                <span className="text-sm font-bold font-mono text-white">
                  <AnimatedCounter target={stats.totalCommits} suffix="+" isInView={isInView} delay={0.15} />
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block truncate">This Month</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  <AnimatedCounter target={stats.commitsThisMonth} prefix="+" isInView={isInView} delay={0.25} />
                </span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block truncate">Active Streak</span>
                <span className="text-sm font-bold font-mono text-purple-400">
                  <AnimatedCounter target={stats.activeStreak} suffix="d" isInView={isInView} delay={0.35} />
                </span>
              </div>
            </div>

            {/* Graphical 1: Contribution Heatmap Grid (Real Data) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Contribution Heatmap (20 Weeks)</span>
                <span className="text-emerald-400 text-[10px]">Shipping Cadence</span>
              </div>

              {/* Heatmap Matrix Container */}
              <div className="overflow-x-auto pb-1 scrollbar-none touch-pan-x">
                <div className="inline-block min-w-full">
                  {/* Month headers */}
                  <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-1 px-0.5">
                    {stats.heatmapMonths.map((m, idx) => (
                      <span key={`${m}-${idx}`}>{m}</span>
                    ))}
                  </div>

                  {/* 7 rows (days) x 20 columns (weeks) */}
                  <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                    {stats.heatmapDays.map((d, idx) => {
                      let formattedDate = d.date;
                      try {
                        formattedDate = new Date(d.date + "T00:00:00").toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        });
                      } catch {
                        // fallback
                      }
                      return (
                        <div
                          key={`${d.date}-${idx}`}
                          title={`${formattedDate}: ${d.count} commit${d.count === 1 ? "" : "s"}`}
                          className={`h-2.5 w-2.5 rounded-[2px] transition-transform duration-200 hover:scale-125 cursor-pointer ${
                            d.level === 0
                              ? "bg-white/[0.04]"
                              : d.level === 1
                              ? "bg-emerald-950/70 border border-emerald-800/40"
                              : d.level === 2
                              ? "bg-emerald-700/70 border border-emerald-600/40"
                              : d.level === 3
                              ? "bg-emerald-500/80 border border-emerald-400/50"
                              : "bg-emerald-400 border border-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center justify-between pt-1.5 text-[9px] font-mono text-gray-500">
                    <span>Mon - Sun</span>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <span className="h-2 w-2 rounded-[1px] bg-white/[0.04]" />
                      <span className="h-2 w-2 rounded-[1px] bg-emerald-950/70" />
                      <span className="h-2 w-2 rounded-[1px] bg-emerald-700/70" />
                      <span className="h-2 w-2 rounded-[1px] bg-emerald-500/80" />
                      <span className="h-2 w-2 rounded-[1px] bg-emerald-400" />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphical 2: Real Weekly Commit Velocity Bar Chart */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-400" />
                  Weekly Velocity (Last 12 Weeks)
                </span>
                <span className="text-gray-400 font-mono text-[10px]">Peak: {stats.peakWeeklyVelocity}/wk</span>
              </div>

              <div className="h-11 flex items-end gap-1.5 pt-1 px-1">
                {stats.weeklyVelocity.map((w, idx) => {
                  const maxPeak = Math.max(stats.peakWeeklyVelocity, 10);
                  const heightPercent = Math.max(14, Math.round((w.count / maxPeak) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Hover Tooltip */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/95 border border-white/20 text-[9px] font-mono text-emerald-300 px-1.5 py-0.5 rounded shadow whitespace-nowrap z-20">
                        {w.count} commit{w.count === 1 ? "" : "s"}
                      </div>
                      {/* Animated Velocity Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: `${heightPercent}%` } : { height: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full rounded-t transition-colors duration-300 group-hover:bg-emerald-400 ${
                          w.count >= 25
                            ? "bg-gradient-to-t from-emerald-600 to-cyan-400"
                            : w.count >= 10
                            ? "bg-emerald-500/70"
                            : w.count > 0
                            ? "bg-emerald-600/40"
                            : "bg-white/10"
                        }`}
                      />
                      {/* Week Label */}
                      <span className="text-[8px] font-mono text-gray-500 group-hover:text-gray-300">
                        {w.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </SpotlightCard>

          {/* Profile Quick Link */}
          <motion.a
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            href="https://github.com/dheeraj-srma"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white font-mono text-xs transition-colors group"
          >
            <span>Visit @dheeraj-srma on GitHub</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
