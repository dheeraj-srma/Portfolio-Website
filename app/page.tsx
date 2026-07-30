import React from "react";
import { BackgroundCanvas } from "@/components/common/BackgroundCanvas";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { WhatIBuildSection } from "@/components/sections/WhatIBuildSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Dynamic Animated Layered Background */}
      <BackgroundCanvas />

      {/* Floating Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About / Identity Cards Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Featured Projects Section */}
      <ProjectsSection />

      {/* What I Build Section */}
      <WhatIBuildSection />

      {/* GitHub Live Telemetry Section */}
      <GitHubSection />

      {/* Journey / Roadmap Section */}
      <JourneySection />

      {/* Stats Counter Section */}
      <StatsSection />

      {/* Philosophy Quote Carousel Section */}
      <PhilosophySection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
