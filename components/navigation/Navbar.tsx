"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, User, Sparkles, FolderGit2, Mail, Menu, X, Compass, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { PERSONAL_INFO } from "@/lib/data";

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
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Active section detection with balanced midpoint offset
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = scrollY + 240;

      if (scrollY < 140) {
        setActiveSection("about");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("about");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    setActiveSection(targetId);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 85;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Desktop & Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 transition-all duration-500 ease-out">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex items-center justify-between gap-4 md:gap-6 rounded-full px-5 md:px-6 transition-all duration-500 ease-out border shadow-2xl backdrop-blur-xl w-full max-w-5xl",
            scrolled
              ? "py-2.5 bg-[#050505]/90 border-white/15 shadow-black/40"
              : "py-3.5 bg-[#08080c]/60 border-white/10 shadow-black/20"
          )}
        >
          {/* Logo / Initials or Scrolled Avatar */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="relative h-9 w-9">
              <AnimatePresence mode="wait">
                {!scrolled ? (
                  <motion.div
                    key="ds-monogram"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-[1px] transition-transform duration-300 group-hover:scale-105"
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#050505]">
                      <span className="font-bold text-xs tracking-tighter text-white">DS</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pfp-avatar"
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 10 }}
                    transition={{ type: "spring", stiffness: 380, damping: 26 }}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-emerald-400 p-[1.5px] shadow-lg group-hover:scale-105"
                  >
                    <img
                      src={PERSONAL_INFO.avatarUrl}
                      alt={PERSONAL_INFO.name}
                      className="h-full w-full rounded-full object-cover bg-[#050505]"
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#050505]" />
                  </motion.div>
                )}
              </AnimatePresence>
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

          {/* Desktop Navigation Links with subtle hover micro-interactions */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-medium rounded-full cursor-pointer select-none transition-colors duration-200",
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-gray-100"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-600/80 rounded-full border border-white/25 shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.8
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.a>
              );
            })}
          </div>

          {/* CTA Right Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <span className="px-4 py-1.5 transition-all ease-in duration-75 bg-[#0A0A0C] rounded-full group-hover:bg-transparent">
                Connect
              </span>
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </motion.nav>
      </header>

      {/* Mobile Floating Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop touch listener */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-20 z-50 lg:hidden rounded-2xl glass-panel p-4 border border-white/15 bg-[#0A0A0D]/95 shadow-2xl backdrop-blur-2xl"
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.2 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-sm font-medium transition-all active:scale-98",
                        isActive
                          ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-blue-500/50 text-white font-semibold"
                          : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                      )}
                    >
                      <Icon size={16} className={isActive ? "text-blue-400" : "text-gray-400"} />
                      <span>{item.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

