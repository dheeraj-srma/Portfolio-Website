"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
  color?: "blue" | "purple" | "emerald" | "amber" | "pink";
  delay?: number; // delay in ms before entrance animation starts
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

  const [displayedLength, setDisplayedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);

  // Reduced motion: show full text immediately without delays
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(text.length);
      setShowCursor(false);
      setHasPopped(true);
    }
  }, [prefersReducedMotion, text.length]);

  // Command shell typewriter orchestrator
  useEffect(() => {
    if (prefersReducedMotion || !isInView) return;

    let popTimer: NodeJS.Timeout;
    let typingStartTimer: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    let cursorFadeTimer: NodeJS.Timeout;

    // Pop the icon in after initial delay
    popTimer = setTimeout(() => {
      setHasPopped(true);
    }, delay);

    // Start typing letters at command shell cadence (~34ms)
    typingStartTimer = setTimeout(() => {
      setShowCursor(true);

      let currentLen = 0;
      typingInterval = setInterval(() => {
        currentLen += 1;
        setDisplayedLength(currentLen);

        if (currentLen >= text.length) {
          clearInterval(typingInterval);

          // Cursor blinks for 1.2s post-typing then smoothly fades
          cursorFadeTimer = setTimeout(() => {
            setShowCursor(false);
          }, 1200);
        }
      }, 34);
    }, delay + 250);

    return () => {
      clearTimeout(popTimer);
      clearTimeout(typingStartTimer);
      clearInterval(typingInterval);
      clearTimeout(cursorFadeTimer);
    };
  }, [isInView, delay, text, prefersReducedMotion]);

  const colorClass = className || COLOR_CLASSES[color] || COLOR_CLASSES.blue;

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest select-none transition-all duration-300 ${colorClass}`}
      role="status"
      aria-label={text}
    >
      {/* 
        The Normal Icon:
        - Pops up cleanly with a spring when scrolled into view
        - Remains permanently visible as a normal, clean icon (no post-loading jitter/pulse)
      */}
      <motion.span
        className="inline-flex items-center justify-center shrink-0"
        initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={
          prefersReducedMotion || hasPopped
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 420,
                damping: 22,
              }
        }
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

        {/* Real-time typed letters with glowing cyber block cursor */}
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
