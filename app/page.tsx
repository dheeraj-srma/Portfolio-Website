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

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Cosmic & Workstation Layered Background */}
      <BackgroundCanvas />

      {/* Floating Navigation */}
      <Navbar />

      {/* 1. Hero: Who is Dheeraj? */}
      <HeroSection />

      {/* 2. About: The genuine story & intellectual curiosity */}
      <AboutSection />

      {/* 3. Engineering Philosophy: 5 Core Tenets */}
      <PhilosophySection />

      {/* 4. What Dheeraj Builds: 6 Domains */}
      <WhatIBuildSection />

      {/* 5. Important Projects: Real Work & Interactive Modal */}
      <ProjectsSection />

      {/* 6. Currently Building & Continuous Learning */}
      <CurrentlyBuildingSection />

      {/* 7. GitHub Telemetry: Live Open-Source Activity */}
      <GitHubSection />

      {/* 8. Journey & Experience: Internship & Education */}
      <JourneySection />

      {/* 9. Grounded & Verified Metrics */}
      <StatsSection />

      {/* 10. Contact & Direct Channels */}
      <ContactSection />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
