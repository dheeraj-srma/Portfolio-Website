"use client";

import React from "react";
import { motion } from "framer-motion";
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

export function GitHubSection() {
  const stats = useGitHubData("dheeraj-srma");

  return (
    <section id="github" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side (5 cols): Metrics, Languages, Activity & Velocity */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Header */}
          <div className="h-7 flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
              <Activity size={14} />
              Activity & Code Metrics
            </span>
            <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Feed
            </span>
          </div>

          {/* Quick Counter Stat Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            <SpotlightCard className="p-4 sm:p-5 flex flex-col items-center justify-center text-center border border-white/10">
              <BookOpen size={20} className="text-blue-400 mb-2" />
              <span className="text-2xl font-bold font-mono text-white">
                {stats.publicRepos}
              </span>
              <span className="text-xs text-gray-400 font-light mt-1">Public Repos</span>
            </SpotlightCard>

            <SpotlightCard className="p-4 sm:p-5 flex flex-col items-center justify-center text-center border border-white/10">
              <Star size={20} className="text-amber-400 mb-2" />
              <span className="text-2xl font-bold font-mono text-white">
                {stats.stars}
              </span>
              <span className="text-xs text-gray-400 font-light mt-1">Stargazers</span>
            </SpotlightCard>
          </div>

          {/* Languages Breakdown Card */}
          <SpotlightCard className="p-4 sm:p-5 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Code size={16} className="text-blue-400" />
                <span>Language Distribution</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400">Across Repos</span>
            </div>

            {/* Segmented bar */}
            <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-white/5 p-0.5 gap-0.5">
              {stats.topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color
                  }}
                  className="h-full rounded-full transition-all duration-500"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language Legend */}
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-gray-300 text-[11px] truncate">{lang.name}</span>
                  </div>
                  <span className="text-gray-400 text-[11px] font-semibold">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* Activity & Velocity Matrix */}
          <SpotlightCard className="p-4 sm:p-5 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Commit Activity & Velocity
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                Active Cadence
              </span>
            </div>

            {/* Numerical Metrics Row */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block truncate">Yearly Total</span>
                <span className="text-sm sm:text-base font-bold font-mono text-white">{stats.totalCommits}+</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block truncate">This Month</span>
                <span className="text-sm sm:text-base font-bold font-mono text-emerald-400">+{stats.commitsThisMonth}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block truncate">Active Streak</span>
                <span className="text-sm sm:text-base font-bold font-mono text-purple-400">{stats.activeStreak}d</span>
              </div>
            </div>

            {/* Graphical 1: Contribution Heatmap Grid (Real Data) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>Contribution Heatmap (20 Weeks)</span>
                <span className="text-emerald-400 text-[10px]">Shipping Cadence</span>
              </div>

              {/* Heatmap Matrix Container */}
              <div className="overflow-x-auto pb-1 scrollbar-none">
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
                          className={`h-2.5 w-2.5 rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${
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
                  <div className="flex items-center justify-between pt-2 text-[9px] font-mono text-gray-500">
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
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-400" />
                  Weekly Velocity (Last 12 Weeks)
                </span>
                <span className="text-gray-400 font-mono text-[10px]">Peak: {stats.peakWeeklyVelocity}/wk</span>
              </div>

              <div className="h-12 flex items-end gap-1.5 pt-1 px-1">
                {stats.weeklyVelocity.map((w, idx) => {
                  const maxPeak = Math.max(stats.peakWeeklyVelocity, 10);
                  const heightPercent = Math.max(14, Math.round((w.count / maxPeak) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Hover Tooltip */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/95 border border-white/20 text-[9px] font-mono text-emerald-300 px-1.5 py-0.5 rounded shadow whitespace-nowrap z-20">
                        {w.count} commit{w.count === 1 ? "" : "s"}
                      </div>
                      {/* Velocity Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t transition-all duration-300 group-hover:bg-emerald-400 ${
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
          <a
            href="https://github.com/dheeraj-srma"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-gray-200 hover:text-white font-mono text-xs transition-colors group"
          >
            <span>Visit @dheeraj-srma on GitHub</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Right Side (7 cols): Repositories Showcase in 2-Column Grid */}
        <div className="lg:col-span-7 space-y-4">
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

          {/* 2-Column Grid with bounded max-height to prevent distortion if repos increase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[640px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
            {stats.recentRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <SpotlightCard className="h-full p-4.5 rounded-xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.04]">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <BookOpen size={14} className="text-blue-400 shrink-0" />
                        <h4 className="text-sm font-bold font-mono text-white group-hover:text-blue-300 transition-colors truncate">
                          {repo.name}
                        </h4>
                      </div>
                      <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                      {repo.description || "Public open-source repository on GitHub."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-white/5 text-[11px] font-mono text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        {repo.language || "Code"}
                      </span>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star size={11} fill="currentColor" />
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
          <div className="pt-1 px-1 flex items-center justify-between text-[11px] font-mono text-gray-500">
            <span>Synchronized with GitHub REST & Contribution API</span>
            <span className="text-emerald-400/80">● Auto-updating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
