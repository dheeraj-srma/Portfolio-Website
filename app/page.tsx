import React from "react";
import { BackgroundCanvas } from "@/components/common/BackgroundCanvas";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { WhatIBuildSection } from "@/components/sections/WhatIBuildSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CurrentlyBuildingSection } from "@/components/sections/CurrentlyBuildingSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

// Interactive Side-Artifact System
import { ArtifactProvider } from "@/components/artifacts/context/ArtifactContext";
import {
  BuildModeToggle,
  BuildModeTag,
  NeuralBrain,
  StarMap,
  EngineeringDNA,
  GitHubHeartbeat,
  DigitalBackpack,
} from "@/components/artifacts/ArtifactSystem";

export default function Home() {
  return (
    <ArtifactProvider>
      <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
        {/* Cosmic & Workstation Layered Background */}
        <BackgroundCanvas />

        {/* Floating Navigation */}
        <Navbar />

        {/* Global Secret Engineering HUD & Toggle */}
        <BuildModeToggle />

        {/* 1. Hero: Who is Dheeraj? */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 -mb-24 flex justify-between items-center">
            <BuildModeTag label="HERO_COMPONENT" spec="RUNTIME_V1" />
          </div>
          <HeroSection />
        </div>

        {/* 2. About: The genuine story & intellectual curiosity */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="ABOUT_MODULE" spec="COGNITIVE_STACK" />
          </div>

          {/* Desktop Left Gutter: Neural Brain */}
          <div className="hidden 2xl:block absolute -left-24 top-36 z-20 pointer-events-auto">
            <NeuralBrain />
          </div>

          <AboutSection />
        </div>

        {/* 3. Engineering Philosophy: 5 Core Tenets */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="PHILOSOPHY_AXIS" spec="TENETS_5" />
          </div>

          {/* Desktop Right Gutter: Engineering DNA Double Helix */}
          <div className="hidden 2xl:block absolute -right-24 top-28 z-20 pointer-events-auto">
            <EngineeringDNA />
          </div>

          <PhilosophySection />
        </div>

        {/* 4. What Dheeraj Builds: 6 Domains */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="DOMAINS_MATRIX" spec="DOMAINS_6" />
          </div>

          {/* Desktop Left Gutter: Digital Backpack */}
          <div className="hidden 2xl:block absolute -left-20 top-32 z-20 pointer-events-auto">
            <DigitalBackpack />
          </div>

          <WhatIBuildSection />
        </div>

        {/* 5. Important Projects: Real Work & Interactive Modal */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="PROJECT_GRAPH" spec="VERIFIED_WORK" />
          </div>

          {/* Desktop Right Gutter: Star Map Constellation */}
          <div className="hidden 2xl:block absolute -right-24 top-36 z-20 pointer-events-auto">
            <StarMap />
          </div>

          <ProjectsSection />
        </div>

        {/* 6. Currently Building & Continuous Learning */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="INCUBATOR_RUNTIME" spec="ACTIVE_LAB" />
          </div>
          <CurrentlyBuildingSection />
        </div>

        {/* 7. GitHub Telemetry: Live Open-Source Activity */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="GITHUB_TELEMETRY" spec="OCTOKIT_API" />
          </div>

          {/* Desktop Left Gutter: GitHub Heartbeat ECG Monitor */}
          <div className="hidden 2xl:block absolute -left-24 top-36 z-20 pointer-events-auto">
            <GitHubHeartbeat />
          </div>

          <GitHubSection />
        </div>

        {/* 8. Journey & Experience: Internship & Education */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="CAREER_TRAJECTORY" spec="MILESTONES" />
          </div>
          <JourneySection />
        </div>

        {/* 9. Grounded & Verified Metrics */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="SYSTEM_METRICS" spec="VERIFIED_DATA" />
          </div>
          <StatsSection />
        </div>

        {/* 10. Contact & Direct Channels */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 -mb-16 flex justify-between items-center">
            <BuildModeTag label="COMMUNICATION_GATEWAY" spec="DIRECT_IO" />
          </div>
          <ContactSection />
        </div>

        {/* 11. Footer */}
        <Footer />
      </main>
    </ArtifactProvider>
  );
}
