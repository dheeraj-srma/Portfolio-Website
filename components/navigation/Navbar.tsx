"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, User, Code2, Sparkles, FolderGit2, Mail, Menu, X, Compass, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "About", href: "#about", icon: User },
  { name: "Philosophy", href: "#philosophy", icon: Compass },
  { name: "What I Build", href: "#what-i-build", icon: Layers },
  { name: "Projects", href: "#projects", icon: Sparkles },
  { name: "Building Now", href: "#currently-building", icon: Terminal },
  { name: "GitHub", href: "#github", icon: FolderGit2 },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop & Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex items-center justify-between gap-6 rounded-full px-6 transition-all duration-300 border border-white/10 shadow-2xl backdrop-blur-xl",
            scrolled
              ? "py-2.5 bg-[#050505]/80 w-full max-w-5xl border-white/15"
              : "py-4 bg-white/[0.03] w-full max-w-6xl border-white/10"
          )}
        >
          {/* Logo / Initials */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#050505]">
                <span className="font-bold text-xs tracking-tighter text-white">DS</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                Dheeraj Sharma
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                AI Builder · Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-medium transition-all duration-300 rounded-full cursor-pointer",
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-purple-600/60 rounded-full border border-white/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* CTA Right Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="px-4 py-1.5 transition-all ease-in duration-75 bg-[#0A0A0C] rounded-full group-hover:bg-transparent">
                Connect
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Floating Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-2xl glass-panel p-4 border border-white/15 bg-[#0A0A0D]/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/50 text-white"
                        : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    <Icon size={16} className={isActive ? "text-blue-400" : "text-gray-400"} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
