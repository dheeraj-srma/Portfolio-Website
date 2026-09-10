"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate, type PanInfo } from "framer-motion";
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
  const [pillReady, setPillReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const pillX = useMotionValue(0);
  const pillWidth = useMotionValue(0);

  const isManualNavRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const manualNavTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navTrackRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Record<string, HTMLElement | null>>({});

  const getSectionTargetTop = useCallback((targetId: string): number => {
    if (targetId === "hero") return 0;
    const element = document.getElementById(targetId);
    if (!element) return 0;
    const contentTarget = (element.firstElementChild as HTMLElement) || element;
    const targetTop = contentTarget.getBoundingClientRect().top + window.pageYOffset;
    return Math.max(0, targetTop - 76);
  }, []);

  const syncPillToSection = useCallback((sectionId: string, smooth = true) => {
    const targetEl = navItemRefs.current[sectionId];
    if (targetEl) {
      const targetX = targetEl.offsetLeft;
      const targetW = targetEl.offsetWidth;
      if (!smooth || !pillReady) {
        pillX.set(targetX);
        pillWidth.set(targetW);
        setPillReady(true);
      } else {
        animate(pillX, targetX, {
          type: "spring",
          stiffness: 240,
          damping: 25,
          mass: 0.7
        });
        animate(pillWidth, targetW, {
          type: "spring",
          stiffness: 240,
          damping: 25,
          mass: 0.7
        });
      }
    }
  }, [pillReady, pillX, pillWidth]);

  useEffect(() => {
    if (!isDraggingRef.current) {
      syncPillToSection(activeSection, true);
    }
  }, [activeSection, syncPillToSection]);

  const updateBoundsAndPos = useCallback(() => {
    if (!isDraggingRef.current) {
      syncPillToSection(activeSection, false);
    }
  }, [activeSection, syncPillToSection]);

  useEffect(() => {
    updateBoundsAndPos();
    const raf = requestAnimationFrame(updateBoundsAndPos);
    window.addEventListener("resize", updateBoundsAndPos);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateBoundsAndPos);
    };
  }, [updateBoundsAndPos]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      if (isManualNavRef.current) {
        if (manualNavTimerRef.current) {
          clearTimeout(manualNavTimerRef.current);
        }
        manualNavTimerRef.current = setTimeout(() => {
          isManualNavRef.current = false;
        }, 120);
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
        return;
      }

      if (scrollY < 160) {
        setActiveSection("about");
        return;
      }

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = scrollY + Math.min(window.innerHeight * 0.35, 240);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const contentTarget = (el.firstElementChild as HTMLElement) || el;
          const targetTop = contentTarget.getBoundingClientRect().top + scrollY;
          if (scrollPosition >= targetTop) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("about");
    };

    const cancelManualNav = () => {
      if (!isDraggingRef.current && isManualNavRef.current) {
        isManualNavRef.current = false;
        if (manualNavTimerRef.current) {
          clearTimeout(manualNavTimerRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", cancelManualNav, { passive: true });
    window.addEventListener("touchmove", cancelManualNav, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", cancelManualNav);
      window.removeEventListener("touchmove", cancelManualNav);
      if (manualNavTimerRef.current) {
        clearTimeout(manualNavTimerRef.current);
      }
    };
  }, []);

  const scrubFromPointerX = useCallback((clientX: number) => {
    const trackEl = navTrackRef.current;
    if (!trackEl) return;

    const trackRect = trackEl.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(trackRect.width, clientX - trackRect.left));

    const sections = NAV_ITEMS.map((item) => item.href.substring(1));
    const items = sections.map((id) => {
      const el = navItemRefs.current[id];
      const left = el ? el.offsetLeft : 0;
      const width = el ? el.offsetWidth : 60;
      return {
        id,
        left,
        width,
        center: left + width / 2
      };
    });

    if (items.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    for (let i = 0; i < items.length; i++) {
      const dist = Math.abs(relativeX - items[i].center);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    const currentItem = items[closestIndex];
    if (activeSection !== currentItem.id) {
      setActiveSection(currentItem.id);
    }

    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const pillW = currentItem.width;
    const clampedX = Math.max(
      firstItem.left,
      Math.min(lastItem.left + lastItem.width - pillW, relativeX - pillW / 2)
    );

    pillX.set(clampedX);
    pillWidth.set(pillW);

    let scrubScrollY = 0;
    if (relativeX <= items[0].center) {
      scrubScrollY = getSectionTargetTop(items[0].id);
    } else if (relativeX >= items[items.length - 1].center) {
      scrubScrollY = getSectionTargetTop(items[items.length - 1].id);
    } else {
      for (let i = 0; i < items.length - 1; i++) {
        if (relativeX >= items[i].center && relativeX <= items[i + 1].center) {
          const span = items[i + 1].center - items[i].center;
          const ratio = span > 0 ? (relativeX - items[i].center) / span : 0;
          const topA = getSectionTargetTop(items[i].id);
          const topB = getSectionTargetTop(items[i + 1].id);
          scrubScrollY = topA + ratio * (topB - topA);
          break;
        }
      }
    }

    window.scrollTo(0, Math.max(0, scrubScrollY));
  }, [activeSection, getSectionTargetTop, pillWidth, pillX]);

  const endScrubFromPointerX = useCallback((clientX: number) => {
    const trackEl = navTrackRef.current;
    if (!trackEl) return;

    const trackRect = trackEl.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(trackRect.width, clientX - trackRect.left));

    const sections = NAV_ITEMS.map((item) => item.href.substring(1));
    let closestId = sections[0];
    let minDistance = Infinity;

    sections.forEach((id) => {
      const el = navItemRefs.current[id];
      if (el) {
        const center = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(relativeX - center);
        if (dist < minDistance) {
          minDistance = dist;
          closestId = id;
        }
      }
    });

    setActiveSection(closestId);

    const targetEl = navItemRefs.current[closestId];
    if (targetEl) {
      animate(pillX, targetEl.offsetLeft, {
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.6
      });
      animate(pillWidth, targetEl.offsetWidth, {
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.6
      });
    }

    const finalTop = getSectionTargetTop(closestId);
    window.scrollTo({
      top: finalTop,
      behavior: "smooth"
    });

    manualNavTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 700);
  }, [getSectionTargetTop, pillWidth, pillX]);

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    pointerStartXRef.current = e.clientX;
    isManualNavRef.current = true;

    if (manualNavTimerRef.current) {
      clearTimeout(manualNavTimerRef.current);
    }
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = Math.abs(e.clientX - pointerStartXRef.current);
    if (deltaX > 4) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }

    if (hasDraggedRef.current) {
      scrubFromPointerX(e.clientX);
    }
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    const didDrag = hasDraggedRef.current;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (didDrag) {
      endScrubFromPointerX(e.clientX);
    } else {
      manualNavTimerRef.current = setTimeout(() => {
        isManualNavRef.current = false;
      }, 500);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");

    setActiveSection(targetId);
    isManualNavRef.current = true;

    if (manualNavTimerRef.current) {
      clearTimeout(manualNavTimerRef.current);
    }
    manualNavTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1000);

    const element = document.getElementById(targetId);
    if (element) {
      if (targetId === "hero") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }

      const contentTarget = (element.firstElementChild as HTMLElement) || element;
      const targetTop = contentTarget.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, targetTop - 76),
        behavior: "smooth"
      });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (hasDraggedRef.current) return;
    scrollToSection(e, href);
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

          {/* Desktop Navigation Links with continuous ultra-smooth sliding & draggable highlight */}
          <div
            ref={navTrackRef}
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}
            onPointerCancel={handleTrackPointerUp}
            className={cn(
              "relative hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5 select-none touch-none",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            title="Drag the highlight or click to scrub through sections"
          >
            {/* Single Persistent Smooth Floating Highlight Pill (Draggable Scrubber) */}
            {pillReady && (
              <motion.div
                style={{
                  x: pillX,
                  width: pillWidth
                }}
                className={cn(
                  "absolute left-0 top-1.5 bottom-1.5 rounded-full border pointer-events-none z-0 select-none transition-all duration-200",
                  isDragging
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-white/40 shadow-[0_0_24px_rgba(99,102,241,0.7)] scale-[1.04]"
                    : "bg-gradient-to-r from-blue-600/85 via-indigo-600/85 to-purple-600/85 border-white/25 shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                )}
              >
                {/* Subtle Micro-Grip Handle Dots */}
                <div className="absolute inset-y-0 right-2 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-90 transition-opacity">
                  <div className="flex gap-[2px]">
                    <span className="w-[2px] h-2.5 rounded-full bg-white/80" />
                    <span className="w-[2px] h-2.5 rounded-full bg-white/80" />
                  </div>
                </div>
              </motion.div>
            )}

            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  ref={(el) => {
                    navItemRefs.current[sectionId] = el;
                  }}
                  href={item.href}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={cn(
                    "relative z-10 px-3.5 py-1.5 text-xs font-medium rounded-full select-none transition-colors duration-200 cursor-pointer",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <span className="relative z-10 block transition-transform duration-150 active:scale-95 pointer-events-none">
                    {item.name}
                  </span>
                </a>
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

