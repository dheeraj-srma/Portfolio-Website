"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, TargetAndTransition, Transition } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type IconAnimationType =
  | "twinkle"
  | "compass"
  | "flicker"
  | "float"
  | "jitter"
  | "heartbeat"
  | "sway"
  | "chime"
  | "brackets"
  | "pulse";

export interface SectionBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
  color?: "blue" | "purple" | "emerald" | "amber" | "pink";
  animationType?: IconAnimationType;
  delay?: number; // delay in ms before entrance animation starts
}

const COLOR_CLASSES: Record<string, string> = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  pink: "border-pink-500/30 bg-pink-500/10 text-pink-300",
};

// Signature looping animations tailored for each specific icon type
const ICON_ANIMATIONS: Record<
  IconAnimationType,
  {
    animate: TargetAndTransition;
    transition: Transition;
  }
> = {
  // Sparkles: Stellar twinkle, rotation shimmer & bright starburst pulses
  twinkle: {
    animate: {
      scale: [1, 1.28, 0.94, 1.22, 1],
      rotate: [0, 16, -14, 8, 0],
      filter: [
        "brightness(1) drop-shadow(0 0 0px transparent)",
        "brightness(1.7) drop-shadow(0 0 8px currentColor)",
        "brightness(1.2) drop-shadow(0 0 2px currentColor)",
        "brightness(1.8) drop-shadow(0 0 9px currentColor)",
        "brightness(1) drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.4,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.6,
    },
  },

  // Compass: Navigational needle sweep, magnetic seeking oscillation
  compass: {
    animate: {
      rotate: [0, -36, 42, -18, 16, 0],
      scale: [1, 1.16, 0.97, 1.12, 1],
      filter: [
        "drop-shadow(0 0 0px transparent)",
        "drop-shadow(0 0 7px currentColor)",
        "drop-shadow(0 0 2px currentColor)",
        "drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.8,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5,
    },
  },

  // Lightbulb: Filament idea ignite, neon electrical flicker & illumination surge
  flicker: {
    animate: {
      scale: [1, 1.2, 1.02, 1.16, 1],
      filter: [
        "brightness(1) drop-shadow(0 0 0px transparent)",
        "brightness(1.9) drop-shadow(0 0 10px currentColor)",
        "brightness(1.25) drop-shadow(0 0 3px currentColor)",
        "brightness(2) drop-shadow(0 0 12px currentColor)",
        "brightness(1.1) drop-shadow(0 0 1px currentColor)",
        "brightness(1.7) drop-shadow(0 0 8px currentColor)",
        "brightness(1) drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.7,
    },
  },

  // Layers: Floating stack, levitating depth shift
  float: {
    animate: {
      y: [0, -3.5, 0, 1.5, 0],
      scale: [1, 1.12, 1, 1.06, 1],
      filter: [
        "drop-shadow(0 0 0px transparent)",
        "drop-shadow(0 3px 6px currentColor)",
        "drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.4,
    },
  },

  // Terminal: Command prompt micro-jitter, cyber shell vibration & energetic ping
  jitter: {
    animate: {
      x: [0, -2, 2, -1.5, 1.5, -0.5, 0.5, 0],
      y: [0, 0.5, -0.5, 0],
      scale: [1, 1.2, 0.94, 1.14, 1],
      filter: [
        "brightness(1)",
        "brightness(1.8) drop-shadow(0 0 9px currentColor)",
        "brightness(1.2)",
        "brightness(1.6) drop-shadow(0 0 6px currentColor)",
        "brightness(1)",
      ],
    },
    transition: {
      duration: 2.0,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.6,
    },
  },

  // Github: Open-source telemetry heartbeat & subtle playful tilt
  heartbeat: {
    animate: {
      scale: [1, 1.25, 0.96, 1.18, 1],
      rotate: [0, -8, 8, -4, 4, 0],
      filter: [
        "drop-shadow(0 0 0px transparent)",
        "drop-shadow(0 0 8px currentColor)",
        "drop-shadow(0 0 2px currentColor)",
        "drop-shadow(0 0 6px currentColor)",
        "drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5,
    },
  },

  // Milestone: Waypoint flag sway, progression swing
  sway: {
    animate: {
      rotate: [0, -14, 14, -7, 7, -2, 2, 0],
      y: [0, -2.5, 0, 1, 0],
      scale: [1, 1.14, 1, 1.08, 1],
      filter: [
        "drop-shadow(0 0 0px transparent)",
        "drop-shadow(0 0 6px currentColor)",
        "drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5,
    },
  },

  // Mail: Incoming dispatch chime, floating notification ping
  chime: {
    animate: {
      y: [0, -4, 0, -1.5, 0],
      rotate: [0, -12, 12, -6, 6, 0],
      scale: [1, 1.22, 1, 1.1, 1],
      filter: [
        "drop-shadow(0 0 0px transparent)",
        "drop-shadow(0 0 8px currentColor)",
        "drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.3,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.7,
    },
  },

  // Code2 / Brackets: Syntax bracket breathing & expansion
  brackets: {
    animate: {
      scale: [1, 1.22, 0.94, 1.14, 1],
      x: [0, -2, 2, -1, 1, 0],
      filter: [
        "brightness(1)",
        "brightness(1.7) drop-shadow(0 0 7px currentColor)",
        "brightness(1)",
      ],
    },
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5,
    },
  },

  // Default rhythmic breathing pulse
  pulse: {
    animate: {
      scale: [1, 1.18, 0.96, 1.1, 1],
      filter: [
        "drop-shadow(0 0 0px transparent)",
        "drop-shadow(0 0 6px currentColor)",
        "drop-shadow(0 0 0px transparent)",
      ],
    },
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
      repeatDelay: 0.5,
    },
  },
};

function resolveAnimationType(
  animationType?: IconAnimationType,
  text?: string
): IconAnimationType {
  if (animationType) return animationType;
  const lower = (text || "").toLowerCase();
  if (lower.includes("real engineering") || lower.includes("sparkle")) return "twinkle";
  if (lower.includes("curiosity") || lower.includes("identity") || lower.includes("compass")) return "compass";
  if (lower.includes("principles") || lower.includes("philosophy") || lower.includes("lightbulb")) return "flicker";
  if (lower.includes("scope") || lower.includes("build") || lower.includes("layers")) return "float";
  if (lower.includes("workstation") || lower.includes("terminal") || lower.includes("currently")) return "jitter";
  if (lower.includes("open source") || lower.includes("github")) return "heartbeat";
  if (lower.includes("timeline") || lower.includes("journey") || lower.includes("background")) return "sway";
  if (lower.includes("touch") || lower.includes("contact") || lower.includes("mail")) return "chime";
  if (lower.includes("arsenal") || lower.includes("skill") || lower.includes("code")) return "brackets";
  return "pulse";
}

export function SectionBadge({
  icon,
  text,
  className,
  color = "blue",
  animationType,
  delay = 0,
}: SectionBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const [displayedLength, setDisplayedLength] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [hasPopped, setHasPopped] = useState(false);

  const resolvedAnimType = resolveAnimationType(animationType, text);
  const currentAnimation = ICON_ANIMATIONS[resolvedAnimType] || ICON_ANIMATIONS.pulse;

  // Reduced motion: show full text immediately without delays
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedLength(text.length);
      setShowCursor(false);
      setHasPopped(true);
    }
  }, [prefersReducedMotion, text.length]);

  // Main command shell typewriter orchestrator
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

          // Cursor continues blinking for 1.2s post-typing then smoothly fades
          cursorFadeTimer = setTimeout(() => {
            setShowCursor(false);
          }, 1200);
        }
      }, 34);
    }, delay + 360);

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
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.35 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-widest select-none transition-all duration-300 ${colorClass}`}
      role="status"
      aria-label={text}
    >
      {/* 
        The Icon Wrapper:
        - Outer motion.span: Controls the spring pop-up entrance (scales 0 -> 1 with opacity 1).
          Stays PERMANENTLY at scale: 1, opacity: 1 and NEVER disappears.
        - Inner motion.span: Executes the continuous, looping signature animation (twinkle, jitter, etc.).
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
                damping: 18,
              }
        }
      >
        <motion.span
          className="inline-flex items-center justify-center"
          animate={prefersReducedMotion || !hasPopped ? {} : currentAnimation.animate}
          transition={prefersReducedMotion || !hasPopped ? {} : currentAnimation.transition}
          whileHover={{ scale: 1.25, rotate: 8 }}
        >
          {icon}
        </motion.span>
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
