"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.15)",
  enableTilt = true,
  onClick,
  id,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
      setCanHover(hoverQuery.matches);
      const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
      hoverQuery.addEventListener("change", listener);
      return () => hoverQuery.removeEventListener("change", listener);
    }
  }, []);

  const shouldTilt = enableTilt && canHover && !prefersReducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);

    if (shouldTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rX = ((y - centerY) / centerY) * -4; // subtle 4 deg tilt
      const rY = ((x - centerX) / centerX) * 4;
      setRotateX(rX);
      setRotateY(rY);
    }
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setOpacity(0);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onClick={onClick}
      onMouseMove={canHover ? handleMouseMove : undefined}
      onMouseLeave={canHover ? handleMouseLeave : undefined}
      animate={{
        rotateX: shouldTilt ? rotateX : 0,
        rotateY: shouldTilt ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] transform-gpu",
        className
      )}
    >
      {/* Spotlight Radial Background Glow (desktop only) */}
      {canHover && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
