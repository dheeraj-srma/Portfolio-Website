"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { PERSONAL_INFO } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Tooltip } from "@/components/common/Tooltip";

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll linked animation for seamless hero avatar -> top bar transition
  const { scrollY } = useScroll();
  const avatarOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const avatarScale = useTransform(scrollY, [0, 80], [1, 0.5]);
  const avatarY = useTransform(scrollY, [0, 80], [0, -45]);
  const avatarWidth = useTransform(scrollY, [0, 90], [96, 0]);
  const avatarMarginRight = useTransform(scrollY, [0, 90], [24, 0]);
  const avatarPointerEvents = useTransform(scrollY, (v) => (v > 60 ? "none" : "auto"));

  // Subtle 3D cursor parallax on telemetry panel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cardRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);
  const cardTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const cardTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const [isHoverDevice, setIsHoverDevice] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      setIsHoverDevice(mq.matches);
      const listener = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !isHoverDevice || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.heroRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const contentTarget = (el.firstElementChild as HTMLElement) || el;
      const targetTop = contentTarget.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, targetTop - 76),
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch w-full z-10">
        {/* Left Column: Headline, True Positioning, Grounded Statement, CTAs */}
        <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6 text-left">
          {/* Top Status Badge Row (starts at identical vertical level as right telemetry) */}
          <div className="h-8 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-gray-300 tracking-wide">
                Currently building & exploring systems
              </span>
            </motion.div>
          </div>

          {/* Unified Profile, Name & GitHub Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            {/* Round GitHub Profile Photo with Scroll Animation & Collapsing Width */}
            <motion.div
              style={{
                width: avatarWidth,
                marginRight: avatarMarginRight,
                opacity: avatarOpacity,
                pointerEvents: avatarPointerEvents
              }}
              className="relative shrink-0 overflow-visible flex items-center justify-start"
            >
              <Tooltip content="Visit @dheeraj-srma on GitHub" position="right" delay={150}>
                <motion.a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ scale: avatarScale, y: avatarY }}
                  className="relative group shrink-0 block cursor-pointer"
                  aria-label="Visit @dheeraj-srma on GitHub"
                >
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400 rounded-full blur-[4px] opacity-70 group-hover:opacity-100 transition duration-300" />
                  <img
                    src={PERSONAL_INFO.avatarUrl}
                    alt={PERSONAL_INFO.name}
                    className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-white/20 shadow-2xl group-hover:scale-105 transition-transform"
                  />
                  <span
                    className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#090D16]"
                    aria-label="Active status"
                  />
                </motion.a>
              </Tooltip>
            </motion.div>

            {/* Name, Handle & Roles */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors shadow-sm"
                >
                  <GithubIcon size={13} />
                  <span>@dheeraj-srma</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400 text-[11px]">GitHub</span>
                </a>
              </div>

              {/* True Positioning: Engineering student. AI builder. Software developer. */}
              <div className="flex flex-wrap items-center gap-2 text-base sm:text-xl font-medium text-gray-300">
                <span className="text-blue-400 font-mono font-semibold">Engineering student.</span>
                <span className="text-gray-600">·</span>
                <span className="text-purple-400 font-mono font-semibold">AI builder.</span>
                <span className="text-gray-600">·</span>
                <span className="text-emerald-400 font-mono font-semibold">Software developer.</span>
              </div>
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

          {/* CTA Action Buttons with micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowUpRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection("currently-building")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel glass-panel-hover text-gray-300 hover:text-white font-medium text-sm transition-colors cursor-pointer"
            >
              <Terminal size={16} className="text-purple-400" />
              <span>What I'm Building Now</span>
            </motion.button>

            <Tooltip content="Explore code & repositories on GitHub" position="top" delay={150}>
              <motion.a
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.98 }}
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium text-sm transition-colors"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </motion.a>
            </Tooltip>
          </motion.div>
        </div>

        {/* Right Column: Workstation Telemetry Widget (starts and ends at identical vertical bounds) */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
          {/* Synchronized Top Row */}
          <div className="h-8 flex items-center justify-between px-1">
            <Tooltip content="Live monitoring active" position="bottom" delay={150}>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2 cursor-default">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Runtime Telemetry
              </span>
            </Tooltip>
            <span className="text-[11px] font-mono text-gray-500">Active Node</span>
          </div>

          {/* Telemetry Card: 3D perspective & subtle spring parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              perspective: 1000,
              rotateX: !prefersReducedMotion && isHoverDevice ? cardRotateX : 0,
              rotateY: !prefersReducedMotion && isHoverDevice ? cardRotateY : 0,
              x: !prefersReducedMotion && isHoverDevice ? cardTranslateX : 0,
              y: !prefersReducedMotion && isHoverDevice ? cardTranslateY : 0,
            }}
            className="flex-1 rounded-2xl glass-panel p-6 border border-white/15 shadow-2xl flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-gray-400 ml-2">workspace.telemetry</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Quick telemetry lines */}
            <div className="space-y-3 font-mono text-xs text-gray-300 py-3">
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
              <div className="text-blue-400 font-semibold">$ dev --status</div>
              <div>&gt; "Constantly learning, building, breaking things, and building them better."</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

