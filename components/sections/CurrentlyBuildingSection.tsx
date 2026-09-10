"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, BookOpen } from "lucide-react";
import { CURRENTLY_BUILDING, CONTINUOUS_LEARNING } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface DonutProgressProps {
  progress: number;
  gradientId: string;
  delay?: number;
}

function DonutProgress({ progress, gradientId, delay = 0 }: DonutProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const size = 46;
  const strokeWidth = 3.2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (circumference * progress) / 100;

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplayValue(progress);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // 1.2s smooth count-up
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progressRatio, 3);
        setDisplayValue(Math.round(eased * progress));

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
  }, [isInView, progress, delay, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center shrink-0 group/donut"
      title={`Current build stage: ${progress}%`}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform overflow-visible"
        aria-label={`Progress: ${progress}%`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>

        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Animated donut loading progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: targetOffset } : { strokeDashoffset: circumference }}
          transition={{
            duration: 1.3,
            delay: delay,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="drop-shadow-[0_0_8px_rgba(245,158,11,0.45)]"
        />
      </svg>

      {/* Numerical percentage display inside the center of the donut */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-mono font-bold text-amber-300 tracking-tighter">
          {displayValue}%
        </span>
      </div>
    </div>
  );
}

export function CurrentlyBuildingSection() {
  return (
    <section id="currently-building" className="py-20 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 uppercase tracking-widest"
        >
          <Terminal size={14} />
          <span>Active Workstation</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Currently Building & Exploring
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg font-light"
        >
          A living snapshot of active software builds and areas of technical deep-dive. Not static certifications—active engineering.
        </motion.p>
      </div>

      {/* Synchronized Parallel Two-Panel Grid (Starts and Ends at Same Vertical Level) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column (7 cols): In Active Development (3 cards expanding to match exact height) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          {/* Synchronized Top Header */}
          <div className="h-7 flex items-center justify-between px-1 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              On The Workbench This Month
            </span>
            <span className="text-[11px] font-mono text-gray-500">Live Status</span>
          </div>

          {/* 3 Rows Grid evenly stretching to full height */}
          <div className="flex-1 grid grid-cols-1 grid-rows-3 gap-4">
            {CURRENTLY_BUILDING.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full flex flex-col"
              >
                <SpotlightCard className="h-full p-6 flex flex-col justify-between border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                          {item.domain}
                        </span>
                        <h3 className="text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
                    <div className="flex flex-wrap gap-1.5 pr-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-gray-400 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Donut Loading Style Progress */}
                    <DonutProgress
                      progress={item.progress}
                      gradientId={`workbench-donut-${index}`}
                      delay={index * 0.15}
                    />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Continuous Learning (4 cards evenly stretching to full height) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          {/* Synchronized Top Header */}
          <div className="h-7 flex items-center justify-between px-1 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-2">
              <BookOpen size={14} />
              Continuous Learning & Reading
            </span>
            <span className="text-[11px] font-mono text-gray-500">Core Foundations</span>
          </div>

          {/* 4 Rows Grid evenly stretching to full height */}
          <div className="flex-1 grid grid-cols-1 grid-rows-4 gap-4">
            {CONTINUOUS_LEARNING.map((item, index) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-full flex flex-col"
              >
                <SpotlightCard className="h-full p-4.5 sm:p-5 flex flex-col justify-between border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {item.topic}
                    </h4>

                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {item.focus}
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-gray-500 border-t border-white/5 mt-2">
                    <span className="text-gray-400">Sources:</span> {item.reading}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
