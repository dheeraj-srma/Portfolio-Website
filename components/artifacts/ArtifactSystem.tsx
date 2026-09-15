"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralBrain } from "./NeuralBrain";
import { StarMap } from "./StarMap";
import { EngineeringDNA } from "./EngineeringDNA";
import { GitHubHeartbeat } from "./GitHubHeartbeat";
import { DigitalBackpack } from "./DigitalBackpack";
import { BuildModeToggle, BuildModeTag } from "./BuildMode";
import { useArtifacts } from "./context/ArtifactContext";

export function ArtifactSystem() {
  const { activeSection, isMobile, buildMode } = useArtifacts();

  return (
    <>
      {/* 1. Global Build Mode HUD Controls */}
      <BuildModeToggle />

      {/* =========================================================================
          ABOUT / PHILOSOPHY ZONE: Neural Brain & Engineering DNA
         ========================================================================= */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pointer-events-none z-20">
        {/* Neural Brain: Floating on Left Margin near About */}
        <div className="hidden 2xl:block absolute -left-28 top-[1050px] pointer-events-auto">
          <NeuralBrain />
        </div>

        {/* Engineering DNA: Floating on Right Margin near Philosophy */}
        {!isMobile && (
          <div className="hidden 2xl:block absolute -right-28 top-[1700px] pointer-events-auto">
            <EngineeringDNA />
          </div>
        )}
      </div>

      {/* =========================================================================
          WHAT I BUILD / SKILLS ZONE: Digital Backpack
         ========================================================================= */}
      {!isMobile && (
        <div className="relative w-full max-w-7xl mx-auto px-4 pointer-events-none z-20">
          <div className="hidden 2xl:block absolute -left-28 top-[2450px] pointer-events-auto">
            <DigitalBackpack />
          </div>
        </div>
      )}

      {/* =========================================================================
          PROJECTS & GITHUB ZONE: Star Map & GitHub Heartbeat
         ========================================================================= */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pointer-events-none z-20">
        {/* Star Map: Floating on Right Margin near Projects */}
        <div className="hidden 2xl:block absolute -right-28 top-[3200px] pointer-events-auto">
          <StarMap />
        </div>

        {/* GitHub Heartbeat: Floating on Left Margin near GitHub Section */}
        <div className="hidden 2xl:block absolute -left-28 top-[4100px] pointer-events-auto">
          <GitHubHeartbeat />
        </div>
      </div>

      {/* =========================================================================
          RESPONSIVE TABLET / MOBILE DISCOVERY STRIP
          For tablet and mobile screens where outer 2XL gutters don't fit:
          We provide a graceful, compact horizontal discovery dock at the
          end of the Hero / About transition so mobile visitors can freely explore.
         ========================================================================= */}
      <div className="2xl:hidden w-full max-w-5xl mx-auto px-4 py-8 z-20">
        <div className="text-center mb-6 space-y-1">
          <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 font-semibold block">
            INTERACTIVE ARTIFACTS
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Explore Dheeraj's Digital Ecosystem
          </h3>
          <p className="text-xs text-neutral-400 font-light max-w-md mx-auto">
            Interactive instruments representing intelligence, curiosity, and live development.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          <NeuralBrain className="scale-90 sm:scale-100" />
          <StarMap className="scale-90 sm:scale-100" />
          <GitHubHeartbeat className="scale-90 sm:scale-100" />
        </div>
      </div>
    </>
  );
}

export { NeuralBrain } from "./NeuralBrain";
export { StarMap } from "./StarMap";
export { EngineeringDNA } from "./EngineeringDNA";
export { GitHubHeartbeat } from "./GitHubHeartbeat";
export { DigitalBackpack } from "./DigitalBackpack";
export { BuildModeToggle, BuildModeTag } from "./BuildMode";
