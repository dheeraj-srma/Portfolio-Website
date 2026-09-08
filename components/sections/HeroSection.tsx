"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Terminal, Sparkles, Code2, Compass, Layers } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PERSONAL_INFO } from "@/lib/data";

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.heroRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left Column: Headline, True Positioning, Grounded Statement, CTAs */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-8 text-left">
          {/* Status Badge & GitHub Profile Photo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 sm:gap-5"
          >
            {/* GitHub Profile Photo */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group shrink-0 block cursor-pointer"
              title="Visit @dheeraj-srma on GitHub"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400 rounded-full blur-[4px] opacity-70 group-hover:opacity-100 transition duration-300" />
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-2 border-white/20 shadow-xl group-hover:scale-[1.02] transition-transform"
              />
              <span
                className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#090D16]"
                title="Active"
              />
            </a>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-gray-300 tracking-wide">
                  Currently building & exploring systems
                </span>
              </div>
              <div className="text-xs font-mono text-gray-400 flex items-center gap-2 pl-1">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  @dheeraj-srma
                </a>
                <span className="text-gray-600">·</span>
                <span className="text-gray-400">GitHub Verified</span>
              </div>
            </div>
          </motion.div>

          {/* Simple, Grounded Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              {PERSONAL_INFO.name}
            </h1>

            {/* True Positioning: Engineering student. AI builder. Software developer. */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-medium text-gray-300">
              <span className="text-blue-400 font-mono font-semibold">Engineering student.</span>
              <span className="text-gray-500">·</span>
              <span className="text-purple-400 font-mono font-semibold">AI builder.</span>
              <span className="text-gray-500">·</span>
              <span className="text-emerald-400 font-mono font-semibold">Software developer.</span>
            </div>
          </motion.div>

          {/* Grounded Persona Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-light"
          >
            I enjoy turning ideas into working systems—from machine-learning experiments and
            computer-vision pipelines to production business software and data-driven tools.
            I learn by going deeper than the surface: understanding the underlying mathematics
            and mechanics, not just importing library calls.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              onClick={() => scrollToSection("currently-building")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel glass-panel-hover text-gray-300 hover:text-white font-medium text-sm transition-all cursor-pointer"
            >
              <Terminal size={16} className="text-purple-400" />
              <span>What I'm Building Now</span>
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium text-sm transition-all"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Workstation Telemetry Widget */}
        <div className="lg:col-span-4 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl glass-panel p-6 border border-white/15 shadow-2xl space-y-5"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-gray-400 ml-2">dheeraj.workspace</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Quick telemetry lines */}
            <div className="space-y-3 font-mono text-xs text-gray-300">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">Focus Areas</span>
                <span className="text-blue-300">AI · ML · Systems</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">Curiosity</span>
                <span className="text-purple-300">Math · Physics · Space</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-gray-400">Philosophy</span>
                <span className="text-emerald-300">Learn Deeply · Build</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">Live Production</span>
                <span className="text-amber-300">3,681+ SKUs Managed</span>
              </div>
            </div>

            {/* Dynamic Console Output */}
            <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-gray-400 space-y-1">
              <div className="text-blue-400 font-semibold">$ dheeraj --status</div>
              <div>&gt; "Constantly learning, building, breaking things, and building them better."</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
