"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookOpen, Activity, ArrowUpRight, Code, Users } from "lucide-react";
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 uppercase tracking-widest"
        >
          <GithubIcon size={14} />
          <span>Live Open Source Metrics</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          GitHub Telemetry & Activity
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          Real-time metrics fetched directly via GitHub REST API for @dheeraj-srma.
        </motion.p>
      </div>

      {/* Main GitHub Showcase Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side (8 cols): Top Stats + Languages Breakdown */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Counter Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SpotlightCard className="flex flex-col items-center justify-center p-5 text-center">
              <BookOpen size={20} className="text-blue-400 mb-2" />
              <span className="text-2xl font-bold font-mono text-white">
                {stats.publicRepos}
              </span>
              <span className="text-xs text-gray-400 font-light mt-1">Repositories</span>
            </SpotlightCard>

            <SpotlightCard className="flex flex-col items-center justify-center p-5 text-center">
              <Star size={20} className="text-amber-400 mb-2" />
              <span className="text-2xl font-bold font-mono text-white">
                {stats.stars}
              </span>
              <span className="text-xs text-gray-400 font-light mt-1">Total Stars</span>
            </SpotlightCard>

            <SpotlightCard className="flex flex-col items-center justify-center p-5 text-center">
              <Users size={20} className="text-purple-400 mb-2" />
              <span className="text-2xl font-bold font-mono text-white">
                {stats.followers}
              </span>
              <span className="text-xs text-gray-400 font-light mt-1">Followers</span>
            </SpotlightCard>

            <SpotlightCard className="flex flex-col items-center justify-center p-5 text-center">
              <Activity size={20} className="text-emerald-400 mb-2" />
              <span className="text-2xl font-bold font-mono text-emerald-400">
                Active
              </span>
              <span className="text-xs text-gray-400 font-light mt-1">Status</span>
            </SpotlightCard>
          </div>

          {/* Languages Breakdown Card */}
          <SpotlightCard className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Code size={18} className="text-blue-400" />
                <span>Primary Language Breakdown</span>
              </h3>
              <span className="text-xs font-mono text-gray-400">Calculated across public repos</span>
            </div>

            {/* Multi-color Bar */}
            <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden flex">
              {stats.topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  className="h-full transition-all duration-500"
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language Legend Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">{lang.name}</span>
                    <span className="text-[11px] font-mono text-gray-400">{lang.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Right Side (4 cols): Recent Repos Stream */}
        <div className="lg:col-span-4">
          <SpotlightCard className="h-full flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GithubIcon size={16} className="text-purple-400" />
                  <span>Recent Repositories</span>
                </h3>
                <a
                  href="https://github.com/dheeraj-srma?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              {/* Repos List */}
              <div className="space-y-3">
                {stats.recentRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {repo.name}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                        <Star size={12} />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-light">
                      {repo.description}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-gray-500">
                      <span className="text-blue-300">{repo.language}</span>
                      <span>Updated {repo.updated_at}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Profile CTA */}
            <a
              href="https://github.com/dheeraj-srma"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-xs font-medium text-white transition-all hover:bg-white/[0.08]"
            >
              <GithubIcon size={14} />
              <span>Visit @dheeraj-srma on GitHub</span>
            </a>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
