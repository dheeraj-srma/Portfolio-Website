"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";
import { SpotlightCard } from "@/components/common/SpotlightCard";

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const incrementTime = 30;
    const totalSteps = Math.ceil(duration / incrementTime);
    const stepValue = end / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-mono">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section id="stats" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <SpotlightCard className="flex flex-col items-center justify-center p-6 text-center h-full hover:border-blue-500/40">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 block mb-2">
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs font-mono text-gray-400 tracking-tight whitespace-pre-line block">
                {stat.label.trim()}
              </span>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
