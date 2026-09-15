"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ProjectGlyphType =
  | "inventory"
  | "trading"
  | "assistant"
  | "vision"
  | "analytics"
  | "ml"
  | "erp"
  | "automation";

interface ProjectGlyphProps {
  type: ProjectGlyphType;
  className?: string;
  size?: number;
  glow?: boolean;
}

export function ProjectGlyph({
  type,
  className,
  size = 28,
  glow = true,
}: ProjectGlyphProps) {
  const strokeColor = "currentColor";

  const renderGlyph = () => {
    switch (type) {
      case "inventory":
        // Warehouse isometric grid & relational database node
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Top database cylinder / rack tier */}
            <ellipse cx="16" cy="7" rx="10" ry="3.5" />
            <path d="M6 7v6c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5V7" />
            <path d="M6 13v6c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5v-6" />
            {/* Vertical inventory coordinate grid lines */}
            <line x1="16" y1="10.5" x2="16" y2="26.5" strokeDasharray="1.5 1.5" />
            <line x1="11" y1="9.5" x2="11" y2="24.5" opacity="0.6" />
            <line x1="21" y1="9.5" x2="21" y2="24.5" opacity="0.6" />
            {/* Active stock marker */}
            <circle cx="16" cy="27" r="1.5" fill="currentColor" />
          </svg>
        );

      case "trading":
        // Financial candlestick with pulse signal vector and moving average
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Candlestick 1: Bearish */}
            <line x1="8" y1="6" x2="8" y2="9" />
            <rect x="6" y="9" width="4" height="8" rx="0.5" fill="currentColor" fillOpacity="0.2" />
            <line x1="8" y1="17" x2="8" y2="22" />
            {/* Candlestick 2: Bullish */}
            <line x1="16" y1="11" x2="16" y2="14" />
            <rect x="14" y="14" width="4" height="10" rx="0.5" fill="currentColor" fillOpacity="0.4" />
            <line x1="16" y1="24" x2="16" y2="27" />
            {/* Candlestick 3: Tall breakout */}
            <line x1="24" y1="5" x2="24" y2="8" />
            <rect x="22" y="8" width="4" height="11" rx="0.5" fill="currentColor" fillOpacity="0.3" />
            <line x1="24" y1="19" x2="24" y2="25" />
            {/* Signal vector / EMA curve */}
            <path
              d="M4 22 C 10 18, 14 16, 20 12 C 24 9, 26 7, 28 6"
              strokeWidth="1.5"
              strokeDasharray="2 1.5"
              className="text-amber-400"
            />
            {/* Signal impulse point */}
            <circle cx="28" cy="6" r="1.5" fill="currentColor" />
          </svg>
        );

      case "assistant":
        // Neural network node cluster with harmonic voice waveform
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Central node ring */}
            <circle cx="16" cy="16" r="4" fill="currentColor" fillOpacity="0.2" />
            {/* Peripheral satellite nodes */}
            <circle cx="7" cy="10" r="2" />
            <circle cx="25" cy="10" r="2" />
            <circle cx="8" cy="23" r="2" />
            <circle cx="24" cy="23" r="2" />
            {/* Neural synaptic vectors */}
            <line x1="8.8" y1="11.2" x2="13" y2="14" />
            <line x1="23.2" y1="11.2" x2="19" y2="14" />
            <line x1="9.8" y1="21.8" x2="13" y2="18" />
            <line x1="22.2" y1="21.8" x2="19" y2="18" />
            {/* Harmonic audio wave ribs through center */}
            <path d="M13 16h6" strokeWidth="1.5" />
            <path d="M14.5 13.5v5" />
            <path d="M17.5 13.5v5" />
            <path d="M16 11v10" strokeWidth="1.5" />
          </svg>
        );

      case "vision":
        // Camera aperture reticle with bounding box coordinate brackets
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Coordinate corner brackets */}
            <path d="M5 10V6a1 1 0 0 1 1-1h4" />
            <path d="M22 5h4a1 1 0 0 1 1 1v4" />
            <path d="M27 22v4a1 1 0 0 1-1 1h-4" />
            <path d="M10 27H6a1 1 0 0 1-1-1v-4" />
            {/* Aperture central ring */}
            <circle cx="16" cy="16" r="6" />
            <circle cx="16" cy="16" r="2.5" fill="currentColor" fillOpacity="0.4" />
            {/* Crosshair telemetry lines */}
            <line x1="16" y1="7" x2="16" y2="9.5" />
            <line x1="16" y1="22.5" x2="16" y2="25" />
            <line x1="7" y1="16" x2="9.5" y2="16" />
            <line x1="22.5" y1="16" x2="25" y2="16" />
            {/* Scanline ray */}
            <line x1="11" y1="14" x2="21" y2="14" strokeDasharray="1 1" opacity="0.6" />
          </svg>
        );

      case "analytics":
        // Scatter points with parametric regression curve & axis ticks
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Coordinate Axes */}
            <line x1="6" y1="6" x2="6" y2="26" />
            <line x1="6" y1="26" x2="27" y2="26" />
            {/* Axis Ticks */}
            <line x1="4.5" y1="16" x2="6" y2="16" />
            <line x1="16" y1="26" x2="16" y2="27.5" />
            {/* Scatter empirical points */}
            <circle cx="10" cy="20" r="1.5" fill="currentColor" />
            <circle cx="14" cy="17" r="1.5" fill="currentColor" />
            <circle cx="18" cy="18" r="1.5" fill="currentColor" />
            <circle cx="21" cy="11" r="1.5" fill="currentColor" />
            <circle cx="25" cy="8" r="1.5" fill="currentColor" />
            {/* Parametric regression curve */}
            <path
              d="M7 23 Q 16 18, 26 7"
              strokeWidth="1.5"
              className="text-cyan-400"
            />
          </svg>
        );

      case "ml":
        // Multilayer perceptron matrix with input/hidden/output nodes
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Input layer (3 nodes) */}
            <circle cx="7" cy="8" r="2" />
            <circle cx="7" cy="16" r="2" fill="currentColor" fillOpacity="0.3" />
            <circle cx="7" cy="24" r="2" />
            {/* Hidden layer (4 nodes) */}
            <circle cx="16" cy="6" r="2" />
            <circle cx="16" cy="12.5" r="2" fill="currentColor" fillOpacity="0.4" />
            <circle cx="16" cy="19.5" r="2" fill="currentColor" fillOpacity="0.4" />
            <circle cx="16" cy="26" r="2" />
            {/* Output layer (2 nodes) */}
            <circle cx="25" cy="11" r="2" />
            <circle cx="25" cy="21" r="2" fill="currentColor" fillOpacity="0.5" />
            {/* Forward weight synapses */}
            <line x1="9" y1="8" x2="14" y2="6" opacity="0.5" />
            <line x1="9" y1="8" x2="14" y2="12.5" opacity="0.7" />
            <line x1="9" y1="16" x2="14" y2="12.5" opacity="0.9" />
            <line x1="9" y1="16" x2="14" y2="19.5" opacity="0.9" />
            <line x1="9" y1="24" x2="14" y2="19.5" opacity="0.7" />
            <line x1="9" y1="24" x2="14" y2="26" opacity="0.5" />
            <line x1="18" y1="12.5" x2="23" y2="11" opacity="0.9" />
            <line x1="18" y1="12.5" x2="23" y2="21" opacity="0.6" />
            <line x1="18" y1="19.5" x2="23" y2="21" opacity="0.9" />
          </svg>
        );

      case "erp":
        // Connected enterprise modular schema & data exchange channels
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Central hub module */}
            <rect x="12" y="12" width="8" height="8" rx="1.5" fill="currentColor" fillOpacity="0.3" />
            {/* Top Inventory module */}
            <rect x="12" y="4" width="8" height="4.5" rx="1" />
            {/* Left Accounting module */}
            <rect x="4" y="13.5" width="4.5" height="5" rx="1" />
            {/* Right Dispatch module */}
            <rect x="23.5" y="13.5" width="4.5" height="5" rx="1" />
            {/* Bottom Ledger module */}
            <rect x="12" y="23.5" width="8" height="4.5" rx="1" />
            {/* Inter-module buses */}
            <line x1="16" y1="8.5" x2="16" y2="12" strokeWidth="1.5" />
            <line x1="8.5" y1="16" x2="12" y2="16" strokeWidth="1.5" />
            <line x1="20" y1="16" x2="23.5" y2="16" strokeWidth="1.5" />
            <line x1="16" y1="20" x2="16" y2="23.5" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
          </svg>
        );

      case "automation":
        // Directed acyclic pipeline flow with status nodes and gear arrows
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:scale-110"
          >
            {/* Pipeline Stage 1: Input ingestion */}
            <circle cx="6" cy="16" r="3" />
            {/* Pipeline Stage 2: Processing fork */}
            <circle cx="16" cy="9" r="2.5" fill="currentColor" fillOpacity="0.4" />
            <circle cx="16" cy="23" r="2.5" fill="currentColor" fillOpacity="0.4" />
            {/* Pipeline Stage 3: Aggregation sink */}
            <circle cx="26" cy="16" r="3" />
            <circle cx="26" cy="16" r="1" fill="currentColor" />
            {/* Flow conduits with arrowheads */}
            <path d="M8.8 14.5 L 13.5 10.5" />
            <path d="M8.8 17.5 L 13.5 21.5" />
            <path d="M18.5 10.5 L 23.2 14.5" />
            <path d="M18.5 21.5 L 23.2 17.5" />
            {/* Direct execution bypass */}
            <line x1="9" y1="16" x2="23" y2="16" strokeDasharray="2 1.5" opacity="0.6" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center p-1.5 rounded-lg border transition-all duration-300",
        "bg-white/[0.02] border-white/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/[0.04]",
        glow && "group-hover:shadow-[0_0_16px_rgba(6,182,212,0.25)]",
        className
      )}
    >
      {renderGlyph()}
    </div>
  );
}
