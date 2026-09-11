"use client";

import React, { useState, useRef, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number; // Delay in ms before appearing
  className?: string;
  shortcut?: string;
}

export function Tooltip({
  content,
  children,
  position = "top",
  delay = 120,
  className,
  shortcut,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Directional positioning classes
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Directional animation variants
  const motionVariants = {
    top: {
      initial: { opacity: 0, y: 4, scale: 0.94 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 2, scale: 0.96 },
    },
    bottom: {
      initial: { opacity: 0, y: -4, scale: 0.94 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -2, scale: 0.96 },
    },
    left: {
      initial: { opacity: 0, x: 4, scale: 0.94 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 2, scale: 0.96 },
    },
    right: {
      initial: { opacity: 0, x: -4, scale: 0.94 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -2, scale: 0.96 },
    },
  };

  // Directional caret arrow styling
  const caretClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-[5px] border-t-[#12141e] border-t-[5px] border-x-transparent border-x-[5px] border-b-0",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-[5px] border-b-[#12141e] border-b-[5px] border-x-transparent border-x-[5px] border-t-0",
    left: "left-full top-1/2 -translate-y-1/2 -ml-[5px] border-l-[#12141e] border-l-[5px] border-y-transparent border-y-[5px] border-r-0",
    right: "right-full top-1/2 -translate-y-1/2 -mr-[5px] border-r-[#12141e] border-r-[5px] border-y-transparent border-y-[5px] border-l-0",
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            aria-hidden={!isVisible}
            variants={motionVariants[position]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 26,
              mass: 0.5,
            }}
            className={cn(
              "absolute z-50 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
              "bg-[#0e101a]/95 backdrop-blur-md border border-white/15",
              "shadow-[0_10px_25px_-5px_rgba(0,0,0,0.7),0_0_12px_rgba(59,130,246,0.12)]",
              "text-[11px] font-mono text-gray-200 tracking-tight whitespace-nowrap select-none",
              positionClasses[position],
              className
            )}
          >
            {/* Minimalist content */}
            <span>{content}</span>

            {/* Optional keyboard shortcut / badge */}
            {shortcut && (
              <span className="px-1 py-0.2 rounded bg-white/10 text-[9px] font-mono text-gray-400 border border-white/10">
                {shortcut}
              </span>
            )}

            {/* Micro caret */}
            <div
              className={cn(
                "absolute w-0 h-0 pointer-events-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.08)]",
                caretClasses[position]
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
