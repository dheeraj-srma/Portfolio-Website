"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Terminal, FileText, Send, ChevronDown } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.heroRoles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left Column: Headline, Role Switcher, Statement, CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-blue-300 tracking-wide uppercase">
              Available for AI Systems & Products
            </span>
          </motion.div>

          {/* Large Title & Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Hi, I'm <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Dynamic Role Switcher */}
            <div className="h-12 flex items-center gap-3 text-xl sm:text-3xl font-semibold text-gray-300">
              <span className="text-gray-500 font-normal">I am a</span>
              <div className="relative overflow-hidden inline-block h-10 w-72 sm:w-96">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-mono font-bold"
                  >
                    {PERSONAL_INFO.heroRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Personal Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-normal"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-medium text-sm shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Explore Featured Work</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/25 text-white font-medium text-sm backdrop-blur-md hover:bg-white/[0.08] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <Send size={16} className="text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>Contact Me</span>
            </a>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-white/15 text-gray-300 hover:text-white text-sm font-medium transition-all hover:scale-105"
            >
              <FileText size={16} className="text-gray-400" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Circular Profile Image + Floating Glow Ring */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Animated Background Blurred Circles */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-600/30 via-purple-600/30 to-pink-500/20 rounded-full blur-[90px] animate-blob-pulse pointer-events-none" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Outer Animated Gradient Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-md"
            />

            {/* Inner Glass Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-[#0A0A0E] border border-white/20 shadow-2xl backdrop-blur-2xl flex items-center justify-center overflow-hidden">
              <img
                src={PERSONAL_INFO.avatarUrl}
                alt={PERSONAL_INFO.name}
                className="w-full h-full object-cover rounded-full filter brightness-105 contrast-105 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Tech Badges around avatar */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl glass-panel border border-blue-500/30 text-xs font-mono text-blue-300 flex items-center gap-1.5 shadow-lg"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span>AI Architect</span>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl glass-panel border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-1.5 shadow-lg"
            >
              <Terminal size={14} className="text-purple-400" />
              <span>Deep Learning</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 text-xs font-mono"
      >
        <span>Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
