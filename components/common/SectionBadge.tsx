"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
  color?: "blue" | "purple" | "emerald" | "amber" | "pink";
  delay?: number; // delay in ms before animation begins
}

const COLOR_CLASSES: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  pink: "border-pink-500/30 bg-pink-500/10 text-pink-300",
};

export function SectionBadge({
  icon,
  text,
  className,
  color = "blue",
  delay = 0,
}: SectionBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const [phase, setPhase] = useState<"idle" | "pop" | "jitter" | "typing" | "done">("idle");
  const [displayedLength, setDisplayedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  // If reduced motion is preferred, render complete badge immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("done");
      setDisplayedLength(text.length);
      setShowCursor(false);
    }
  }, [prefersReducedMotion, text.length]);

  // Main animation orchestrator
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    let timeoutPop: NodeJS.Timeout;
    let timeoutJitter: NodeJS.Timeout;
    let timeoutTyping: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    let timeoutCursorFade: NodeJS.Timeout;

    // Step 1: Pop-up icon after initial delay
    timeoutPop = setTimeout(() => {
      setPhase("pop");
    }, delay);

    // Step 2: Jitter / pulse / blink icon at 380ms after pop
    timeoutJitter = setTimeout(() => {
      setPhase("jitter");
    }, delay + 380);

    // Step 3: Start typewriter command shell effect at 400ms after jitter
    timeoutTyping = setTimeout(() => {
      setPhase("typing");
      setShowCursor(true);

      let currentLen = 0;
      // Command shell typing cadence (~34ms per character)
      typingInterval = setInterval(() => {
        currentLen += 1;
        setDisplayedLength(currentLen);

        if (currentLen >= text.length) {
          clearInterval(typingInterval);
          setPhase("done");

          // Step 4: Keep cursor blinking for 1.2s post-typing then gracefully fade
          timeoutCursorFade = setTimeout(() => {
            setShowCursor(false);
          }, 1200);
        }
      }, 34);
    }, delay + 780);

    return () => {
      clearTimeout(timeoutPop);
      clearTimeout(timeoutJitter);
      clearTimeout(timeoutTyping);
      clearInterval(typingInterval);
      clearTimeout(timeoutCursorFade);
    };
  }, [isInView, delay, text, prefersReducedMotion]);

  // Color styling logic
  const colorClass = className || COLOR_CLASSES[color] || COLOR_CLASSES.blue;

  // Icon animation variants
  const iconVariants = {
    idle: {
      scale: prefersReducedMotion ? 1 : 0,
      opacity: prefersReducedMotion ? 1 : 0,
      rotate: 0,
    },
    pop: {
      scale: [0, 1.4, 0.92, 1.08, 1],
      opacity: [0, 1, 1, 1, 1],
      transition: {
        duration: 0.38,
        ease: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
      },
    },
    jitter: {
      scale: [1, 1.28, 0.94, 1.15, 1],
      rotate: [0, -12, 12, -7, 7, -3, 3, 0],
      filter: [
        "brightness(1) drop-shadow(0 0 0px transparent)",
        "brightness(1.8) drop-shadow(0 0 8px currentColor)",
        "brightness(1.2) drop-shadow(0 0 3px currentColor)",
        "brightness(1.6) drop-shadow(0 0 6px currentColor)",
        "brightness(1) drop-shadow(0 0 0px transparent)",
      ],
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
      },
    },
    typing: {
      scale: 1,
      rotate: 0,
      filter: "brightness(1) drop-shadow(0 0 0px transparent)",
    },
    done: {
      scale: 1,
      rotate: 0,
      filter: "brightness(1) drop-shadow(0 0 0px transparent)",
    },
  };

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest transition-all duration-300 select-none ${
        phase === "jitter" ? "ring-1 ring-current/40 shadow-[0_0_12px_currentColor]" : ""
      } ${colorClass}`}
      role="status"
      aria-label={text}
    >
      {/* Pop & Jitter/Pulsing Icon */}
      <motion.span
        className="inline-flex items-center justify-center shrink-0"
        variants={iconVariants}
        initial="idle"
        animate={phase}
      >
        {icon}
      </motion.span>

      {/* Accessible screen-reader text */}
      <span className="sr-only">{text}</span>

      {/* Visually animated shell typewriter text with zero-CLS placeholder */}
      <span className="relative inline-flex items-center" aria-hidden="true">
        {/* Invisible natural placeholder guaranteeing rock-solid width & zero layout shift */}
        <span className="invisible select-none pointer-events-none whitespace-nowrap">
          {text}
        </span>

        {/* Real-time typed letters with terminal cursor */}
        <span className="absolute left-0 top-0 bottom-0 whitespace-nowrap flex items-center">
          <span>{text.slice(0, displayedLength)}</span>
          {showCursor && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.65, ease: "linear" }}
              className="inline-block w-[5px] h-[12px] ml-1 bg-current rounded-[1px] align-middle shadow-[0_0_6px_currentColor]"
            />
          )}
        </span>
      </span>
    </motion.div>
  );
}
