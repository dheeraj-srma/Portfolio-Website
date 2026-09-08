"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        {/* Left info */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-white tracking-tight">{PERSONAL_INFO.name}</span>
          <span className="text-gray-600">•</span>
          <span className="font-mono">Engineering student & AI builder</span>
        </div>

        {/* Middle Note */}
        <div className="font-mono text-gray-500 text-center">
          Built with curiosity, Next.js, TypeScript & Tailwind CSS
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/25 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
