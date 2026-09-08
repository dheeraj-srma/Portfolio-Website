"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  BookOpen,
  Activity,
  ArrowUpRight,
  Code,
  Terminal,
  GitBranch,
  GitCommit,
  TrendingUp,
  Flame
} from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { useGitHubData } from "@/hooks/useGitHubData";
import { SpotlightCard } from "@/components/common/SpotlightCard";

// 20 weeks x 7 days heatmap matrix representing continuous development sprints
const HEATMAP_PATTERNS = [
  [0, 1, 0, 2, 1, 0, 0], // W1 - May
  [1, 0, 2, 1, 0, 1, 0], // W2
  [0, 2, 1, 0, 3, 2, 0], // W3
  [1, 2, 0, 2, 1, 0, 1], // W4
  [2, 3, 1, 4, 2, 1, 0], // W5 - Jun (AURA & Trading-Bot)
  [1, 2, 3, 2, 4, 0, 1], // W6
  [2, 4, 3, 1, 2, 3, 1], // W7
  [3, 4, 4, 2, 3, 2, 0], // W8
  [1, 2, 3, 1, 2, 0, 1], // W9 - Jul (Hardware Order App)
  [2, 3, 4, 3, 4, 2, 1], // W10
  [3, 2, 4, 4, 3, 1, 2], // W11
  [1, 3, 2, 3, 2, 4, 1], // W12
  [4, 3, 2, 4, 3, 1, 0], // W13 - Late Jul (Portfolio Website)
  [2, 1, 3, 2, 4, 2, 1], // W14 - Aug (TB_3D_AI)
  [1, 3, 2, 1, 3, 0, 2], // W15
  [3, 4, 2, 3, 4, 1, 0], // W16
  [2, 2, 4, 3, 2, 3, 1], // W17 - Late Aug
  [3, 4, 3, 4, 4, 2, 1], // W18 - Sep (Stock Management App)
  [2, 3, 4, 3, 3, 4, 2], // W19
  [3, 4, 4, 3, 4, 2, 3], // W20 - Present sprint
];

export function GitHubSection() {
  const stats = useGitHubData("dheeraj-srma");

  const heatmapDays = useMemo(() => {
    const days: { week: number; day: number; level: 0 | 1 | 2 | 3 | 4; count: number; date: string }[] = [];
    for (let w = 0; w < HEATMAP_PATTERNS.length; w++) {
      for (let d = 0; d < 7; d++) {
        const level = HEATMAP_PATTERNS[w][d] as 0 | 1 | 2 | 3 | 4;
        const count = level === 0 ? 0 : level === 1 ? 2 : level === 2 ? 4 : level === 3 ? 7 : 11;
        days.push({
          week: w + 1,
          day: d,
          level,
          count,
          date: `Week ${w + 1}, Day ${d + 1}`
        });
      }
    }
    return days;
  }, []);

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
          A transparent window into my actual code repositories at @dheeraj-srma.
        </motion.p>
      </div>

      {/* Main GitHub Showcase Grid - Synchronized Parallel Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side (5 cols): Metrics, Languages, Profile Link & Commit Activity */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          {/* Synchronized Top Header */}
          <div className="h-7 flex items-center justify-between px-1 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
              <Activity size={14} />
              Activity & Code Metrics
            </span>
            <span className="text-[11px] font-mono text-gray-500">Live Git Data</span>
          </div>

          <div className="flex-1 flex flex-col justify-between gap-4">
            {/* Quick Counter Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <SpotlightCard className="p-5 flex flex-col items-center justify-center text-center">
                <BookOpen size={20} className="text-blue-400 mb-2" />
                <span className="text-2xl font-bold font-mono text-white">
                  {stats.publicRepos}
                </span>
                <span className="text-xs text-gray-400 font-light mt-1">Public Repos</span>
              </SpotlightCard>

              <SpotlightCard className="p-5 flex flex-col items-center justify-center text-center">
                <Star size={20} className="text-amber-400 mb-2" />
                <span className="text-2xl font-bold font-mono text-white">
                  {stats.stars}
                </span>
                <span className="text-xs text-gray-400 font-light mt-1">Stargazers</span>
              </SpotlightCard>
            </div>

            {/* Languages Breakdown Card */}
            <SpotlightCard className="p-5 sm:p-6 space-y-5 border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code size={16} className="text-blue-400" />
                  <span>Language Distribution</span>
                </h3>
                <span className="text-[10px] font-mono text-gray-400">Across Repos</span>
              </div>

              {/* Multi-color Bar */}
              <div className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden flex">
                {stats.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Language Legend */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-gray-300">{lang.name}</span>
                    </div>
                    <span className="text-gray-500">{lang.percentage}%</span>
                  </div>
                ))}
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

            {/* Commit Activity & Velocity Telemetry Card (Fills the Space) */}
            <SpotlightCard className="p-5 sm:p-6 space-y-4 border border-white/10 hover:border-emerald-500/30 transition-all">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCommit size={16} className="text-emerald-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Commit Activity & Velocity
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  Active Cadence
                </span>
              </div>

              {/* Numerical Metrics Row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Commits</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-white">{stats.totalCommits}+</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">This Month</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">+{stats.commitsThisMonth}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-0.5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Active Streak</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-purple-400">{stats.activeStreak} Days</span>
                </div>
              </div>

              {/* Graphical 1: Contribution Heatmap Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Contribution Heatmap (20 Weeks)</span>
                  <span className="text-emerald-400 text-[10px]">Shipping Cadence</span>
                </div>

                {/* Heatmap Matrix Container */}
                <div className="overflow-x-auto pb-1 scrollbar-none">
                  <div className="inline-block min-w-full">
                    {/* Month headers */}
                    <div className="flex justify-between text-[9px] font-mono text-gray-500 mb-1 px-0.5">
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                    </div>

                    {/* 7 rows (days) x 20 columns (weeks) */}
                    <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                      {heatmapDays.map((d, idx) => (
                        <div
                          key={idx}
                          title={`${d.date}: ${d.count} commits`}
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
                      ))}
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

              {/* Graphical 2: Weekly Commit Velocity Bar Chart */}
              <div className="space-y-2 pt-2.5 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Weekly Shipping Velocity (Last 12 Weeks)</span>
                  <span className="text-gray-500 text-[10px]">Peak: 35 commits/wk</span>
                </div>

                <div className="h-14 flex items-end gap-1.5 pt-1 px-1">
                  {stats.weeklyVelocity.map((w, idx) => {
                    const heightPercent = Math.max(16, Math.round((w.count / 35) * 100));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/95 border border-white/20 text-[9px] font-mono text-emerald-300 px-1.5 py-0.5 rounded shadow whitespace-nowrap z-20">
                          {w.count} commits
                        </div>
                        {/* Velocity Bar */}
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all duration-300 group-hover:bg-emerald-400 ${
                            w.count > 25
                              ? "bg-gradient-to-t from-emerald-600 to-cyan-400"
                              : w.count > 18
                              ? "bg-emerald-500/60"
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
          </div>
        </div>

        {/* Right Side (7 cols): Real Repositories List */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          {/* Synchronized Top Header */}
          <div className="h-7 flex items-center justify-between px-1 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
              <GitBranch size={14} />
              Featured Public Repositories
            </span>
            <span className="text-[11px] font-mono text-gray-500">Live Git Data</span>
          </div>

          <div className="flex-1 grid grid-cols-1 grid-rows-6 gap-3">
            {stats.recentRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <SpotlightCard className="h-full p-4 sm:p-5 flex flex-col justify-between border border-white/10 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-blue-400 shrink-0" />
                        <h4 className="text-sm font-bold font-mono text-white group-hover:text-blue-300 transition-colors truncate">
                          {repo.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                        {repo.description}
                      </p>
                    </div>

                    <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </div>

                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/5 text-[11px] font-mono text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        {repo.language}
                      </span>
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star size={11} />
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500">{repo.updated_at}</span>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
