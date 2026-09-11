"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
  color?: "blue" | "purple" | "emerald" | "amber" | "pink";
  delay?: number; // delay in ms before entrance animation starts
  sectionId?: string; // Optional explicit section ID (otherwise inferred from parent <section id="...">)
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
  sectionId,
}: SectionBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Track in-view state with repeatable triggering
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const [displayedLength, setDisplayedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);

  const popTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingStartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const cursorFadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wasInViewRef = useRef(false);

  // Core animation orchestrator: resets and types out fresh
  const runAnimation = useCallback(
    (initialDelay: number = 0) => {
      if (prefersReducedMotion) {
        setDisplayedLength(text.length);
        setShowCursor(false);
        setHasPopped(true);
        return;
      }

      // Clear any pending timers
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
      if (typingStartTimerRef.current) clearTimeout(typingStartTimerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (cursorFadeTimerRef.current) clearTimeout(cursorFadeTimerRef.current);

      // Clean reset
      setDisplayedLength(0);
      setShowCursor(false);
      setHasPopped(false);

      // Pop the icon in after initial delay
      popTimerRef.current = setTimeout(() => {
        setHasPopped(true);
      }, initialDelay);

      // Start typing letters at command shell cadence (~32ms per character)
      typingStartTimerRef.current = setTimeout(() => {
        setShowCursor(true);

        let currentLen = 0;
        typingIntervalRef.current = setInterval(() => {
          currentLen += 1;
          setDisplayedLength(currentLen);

          if (currentLen >= text.length) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

            // Cursor blinks for 1.2s post-typing then smoothly fades
            cursorFadeTimerRef.current = setTimeout(() => {
              setShowCursor(false);
            }, 1200);
          }
        }, 32);
      }, initialDelay + 220);
    },
    [text, prefersReducedMotion]
  );

  // Reduced motion: show full text immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(text.length);
      setShowCursor(false);
      setHasPopped(true);
    }
  }, [prefersReducedMotion, text.length]);

  // Viewport scroll entry / exit detection
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isInView && !wasInViewRef.current) {
      wasInViewRef.current = true;
      runAnimation(delay);
    } else if (!isInView && wasInViewRef.current) {
      wasInViewRef.current = false;
      // Reset when scrolled out of view so scrolling back triggers cleanly
      setDisplayedLength(0);
      setShowCursor(false);
      setHasPopped(false);
    }
  }, [isInView, delay, runAnimation, prefersReducedMotion]);

  // Navbar Button Click Explorer: Re-trigger badge whenever its section is navigated to
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleSectionNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      const targetId = customEvent.detail?.sectionId;
      const mySectionId = sectionId || containerRef.current?.closest("section")?.id;

      if (targetId && mySectionId && targetId === mySectionId) {
        // Smooth scroll takes ~200-350ms to arrive. Trigger badge entrance right on arrival!
        runAnimation(250);
      }
    };

    window.addEventListener("portfolio:section-navigate", handleSectionNavigate);
    return () => {
      window.removeEventListener("portfolio:section-navigate", handleSectionNavigate);
    };
  }, [sectionId, runAnimation, prefersReducedMotion]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
      if (typingStartTimerRef.current) clearTimeout(typingStartTimerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (cursorFadeTimerRef.current) clearTimeout(cursorFadeTimerRef.current);
    };
  }, []);

  const colorClass = className || COLOR_CLASSES[color] || COLOR_CLASSES.blue;

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.85, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest select-none transition-all duration-300 ${colorClass}`}
      role="status"
      aria-label={text}
    >
      {/* 
        The Icon:
        - Pops up cleanly with a spring when scrolled or navigated into view
        - Remains permanently visible with zero post-animation jitter
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
