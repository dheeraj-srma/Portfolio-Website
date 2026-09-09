"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VERIFIED_STATS } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AnimatedStatNumberProps {
  value: string;
  isInView: boolean;
  delay?: number;
}

function AnimatedStatNumber({ value, isInView, delay = 0 }: AnimatedStatNumberProps) {
  const [current, setCurrent] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasPlus = value.includes("+");
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const isLarge = target > 100;

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    let startTime: number | null = null;
    // Tailor duration: large numbers have slightly longer trajectory, smaller counts resolve cleanly
    const duration = isLarge ? 1800 : 1200;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        // Exponential ease out for smooth, realistic landing
        const eased = progressRatio === 1 ? 1 : 1 - Math.pow(2, -10 * progressRatio);
        const nextVal = Math.round(eased * target);
        setCurrent(nextVal);

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
  }, [isInView, target, delay, isLarge, prefersReducedMotion]);

  const formattedValue = target >= 1000 ? current.toLocaleString("en-US") : current.toString();

  return (
    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
      {formattedValue}
      {hasPlus && <span className="text-blue-400 font-semibold">+</span>}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {VERIFIED_STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <SpotlightCard className="p-6 text-center space-y-2 border border-white/10 hover:border-blue-500/30 transition-all">
              <div>
                <AnimatedStatNumber
                  value={stat.value}
                  isInView={isInView}
                  delay={index * 0.1}
                />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {stat.label}
              </h4>
              <p className="text-[11px] font-mono text-gray-400 font-light">
                {stat.detail}
              </p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
