"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
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

interface NavMetric {
  id: string;
  tabLeft: number;
  tabWidth: number;
  tabCenter: number;
  targetScrollTop: number;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillReady, setPillReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTrackHovered, setIsTrackHovered] = useState(false);

  // Hardware-accelerated continuous motion values
  const pillX = useMotionValue(0);
  const pillWidth = useMotionValue(0);

  // Target values for continuous smooth interpolation
  const scrollTargetXRef = useRef(0);
  const scrollTargetWRef = useRef(0);
  const activeSectionRef = useRef("about");

  // Interaction mode flags
  const isManualNavRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const manualNavTimerRef = useRef<NodeJS.Timeout | null>(null);

  // DOM element references
  const navTrackRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<Record<string, HTMLElement | null>>({});

  // Cached layout metrics
  const navMetricsRef = useRef<NavMetric[]>([]);
  const trackBoundsRef = useRef<{ left: number; width: number }>({ left: 0, width: 0 });

  // Animation frame references
  const rafPillIdRef = useRef<number | null>(null);
  const rafScrubIdRef = useRef<number | null>(null);
  const currentScrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);

  // Measure exact pixel positions of all tabs and page sections
  const measureMetrics = useCallback(() => {
    const trackEl = navTrackRef.current;
    if (!trackEl) return;

    const trackRect = trackEl.getBoundingClientRect();
    trackBoundsRef.current = {
      left: trackRect.left,
      width: trackRect.width,
    };

    const metrics: NavMetric[] = [];
    const scrollY = window.pageYOffset || window.scrollY || 0;

    for (const item of NAV_ITEMS) {
      const id = item.href.substring(1);
      const tabEl = navItemRefs.current[id];
      const tabLeft = tabEl ? tabEl.offsetLeft : 0;
      const tabWidth = tabEl ? tabEl.offsetWidth : 60;

      let targetScrollTop = 0;
      const sectionEl = document.getElementById(id);
      if (sectionEl) {
        const contentTarget = (sectionEl.firstElementChild as HTMLElement) || sectionEl;
        const targetTop = contentTarget.getBoundingClientRect().top + scrollY;
        targetScrollTop = Math.max(0, targetTop - 76);
      }

      metrics.push({
        id,
        tabLeft,
        tabWidth,
        tabCenter: tabLeft + tabWidth / 2,
        targetScrollTop,
      });
    }

    navMetricsRef.current = metrics;
  }, []);

  // Sync pill to active section immediately or with spring
  const syncPillToSection = useCallback((sectionId: string, smooth = true) => {
    const metric = navMetricsRef.current.find((m) => m.id === sectionId);
    if (!metric) return;

    scrollTargetXRef.current = metric.tabLeft;
    scrollTargetWRef.current = metric.tabWidth;

    if (!smooth || !pillReady) {
      pillX.set(metric.tabLeft);
      pillWidth.set(metric.tabWidth);
      setPillReady(true);
    } else {
      animate(pillX, metric.tabLeft, {
        type: "spring",
        stiffness: 320,
        damping: 30,
        mass: 0.5,
      });
      animate(pillWidth, metric.tabWidth, {
        type: "spring",
        stiffness: 320,
        damping: 30,
        mass: 0.5,
      });
    }
  }, [pillReady, pillX, pillWidth]);

  // Initial mount & resize measurements
  useEffect(() => {
    const updateMetricsAndPosition = () => {
      measureMetrics();
      if (!isDraggingRef.current && !isManualNavRef.current) {
        syncPillToSection(activeSectionRef.current, false);
      }
    };

    updateMetricsAndPosition();
    const raf = requestAnimationFrame(updateMetricsAndPosition);
    const timer = setTimeout(updateMetricsAndPosition, 300);

    window.addEventListener("resize", updateMetricsAndPosition);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(updateMetricsAndPosition);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", updateMetricsAndPosition);
    };
  }, [measureMetrics, syncPillToSection]);

  // Persistent continuous RAF lerp loop for pill movement during page scrolling
  useEffect(() => {
    const tickPill = () => {
      // Only interpolate via RAF when not actively dragging
      if (!isDraggingRef.current) {
        const curX = pillX.get();
        const curW = pillWidth.get();
        const diffX = scrollTargetXRef.current - curX;
        const diffW = scrollTargetWRef.current - curW;

        if (Math.abs(diffX) > 0.1 || Math.abs(diffW) > 0.1) {
          pillX.set(curX + diffX * 0.28);
          pillWidth.set(curW + diffW * 0.28);
        }
      }
      rafPillIdRef.current = requestAnimationFrame(tickPill);
    };

    rafPillIdRef.current = requestAnimationFrame(tickPill);
    return () => {
      if (rafPillIdRef.current !== null) {
        cancelAnimationFrame(rafPillIdRef.current);
      }
    };
  }, [pillX, pillWidth]);

  // Continuous page scroll tracker: glides the highlight continuously between sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // If user is clicking a tab or dragging the scrubber, do not interfere
      if (isManualNavRef.current || isDraggingRef.current) {
        return;
      }

      const metrics = navMetricsRef.current;
      if (!metrics || metrics.length < 2) return;

      const first = metrics[0];
      const last = metrics[metrics.length - 1];

      // Reached or above first section
      if (scrollY <= first.targetScrollTop) {
        scrollTargetXRef.current = first.tabLeft;
        scrollTargetWRef.current = first.tabWidth;
        if (activeSectionRef.current !== first.id) {
          activeSectionRef.current = first.id;
          setActiveSection(first.id);
        }
        return;
      }

      // Reached or below last section (or bottom of page)
      if (
        scrollY >= last.targetScrollTop ||
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50
      ) {
        scrollTargetXRef.current = last.tabLeft;
        scrollTargetWRef.current = last.tabWidth;
        if (activeSectionRef.current !== last.id) {
          activeSectionRef.current = last.id;
          setActiveSection(last.id);
        }
        return;
      }

      // Continuously glide between adjacent sections based on scroll progress
      for (let i = 0; i < metrics.length - 1; i++) {
        const a = metrics[i];
        const b = metrics[i + 1];
        if (scrollY >= a.targetScrollTop && scrollY <= b.targetScrollTop) {
          const span = b.targetScrollTop - a.targetScrollTop;
          const t = span > 0 ? (scrollY - a.targetScrollTop) / span : 0;

          // Continuous linear interpolation for both X position and Width
          scrollTargetXRef.current = a.tabLeft + t * (b.tabLeft - a.tabLeft);
          scrollTargetWRef.current = a.tabWidth + t * (b.tabWidth - a.tabWidth);

          const closestId = t < 0.5 ? a.id : b.id;
          if (activeSectionRef.current !== closestId) {
            activeSectionRef.current = closestId;
            setActiveSection(closestId);
          }
          return;
        }
      }
    };

    // User manual interaction overrides programmatic scroll locks
    const releaseManualNav = () => {
      if (!isDraggingRef.current && isManualNavRef.current) {
        isManualNavRef.current = false;
        if (manualNavTimerRef.current) {
          clearTimeout(manualNavTimerRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", releaseManualNav, { passive: true });
    window.addEventListener("touchmove", releaseManualNav, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", releaseManualNav);
      window.removeEventListener("touchmove", releaseManualNav);
      if (manualNavTimerRef.current) {
        clearTimeout(manualNavTimerRef.current);
      }
    };
  }, []);

  // RAF loop for buttery-smooth page scrubbing during drag
  const startScrubLoop = () => {
    if (rafScrubIdRef.current !== null) cancelAnimationFrame(rafScrubIdRef.current);
    currentScrollYRef.current = window.scrollY;

    const tickScrub = () => {
      if (!isDraggingRef.current) {
        rafScrubIdRef.current = null;
        return;
      }

      // 1:1 Instant tracking of pill position to pointer during drag
      const track = trackBoundsRef.current;
      const metrics = navMetricsRef.current;

      if (metrics.length > 1 && track.width > 0) {
        const relativeX = Math.max(0, Math.min(track.width, dragCurrentXRef.current - track.left));
        const first = metrics[0];
        const last = metrics[metrics.length - 1];

        let targetPillX = first.tabLeft;
        let targetPillW = first.tabWidth;
        let targetScrollY = first.targetScrollTop;
        let closestId = first.id;

        if (relativeX <= first.tabCenter) {
          targetPillX = first.tabLeft;
          targetPillW = first.tabWidth;
          targetScrollY = first.targetScrollTop;
          closestId = first.id;
        } else if (relativeX >= last.tabCenter) {
          targetPillX = last.tabLeft;
          targetPillW = last.tabWidth;
          targetScrollY = last.targetScrollTop;
          closestId = last.id;
        } else {
          for (let i = 0; i < metrics.length - 1; i++) {
            const a = metrics[i];
            const b = metrics[i + 1];
            if (relativeX >= a.tabCenter && relativeX <= b.tabCenter) {
              const span = b.tabCenter - a.tabCenter;
              const t = span > 0 ? (relativeX - a.tabCenter) / span : 0;
              targetPillX = a.tabLeft + t * (b.tabLeft - a.tabLeft);
              targetPillW = a.tabWidth + t * (b.tabWidth - a.tabWidth);
              targetScrollY = a.targetScrollTop + t * (b.targetScrollTop - a.targetScrollTop);
              closestId = t < 0.5 ? a.id : b.id;
              break;
            }
          }
        }

        // Direct hardware transform for zero-latency follower feel
        pillX.set(targetPillX);
        pillWidth.set(targetPillW);
        scrollTargetXRef.current = targetPillX;
        scrollTargetWRef.current = targetPillW;

        if (activeSectionRef.current !== closestId) {
          activeSectionRef.current = closestId;
          setActiveSection(closestId);
        }

        targetScrollYRef.current = targetScrollY;
      }

      // Smooth exponential damping for page scrolling
      const diff = targetScrollYRef.current - currentScrollYRef.current;
      if (Math.abs(diff) > 0.5) {
        currentScrollYRef.current += diff * 0.24;
        window.scrollTo(0, currentScrollYRef.current);
      }

      rafScrubIdRef.current = requestAnimationFrame(tickScrub);
    };

    rafScrubIdRef.current = requestAnimationFrame(tickScrub);
  };

  const stopScrubLoop = () => {
    if (rafScrubIdRef.current !== null) {
      cancelAnimationFrame(rafScrubIdRef.current);
      rafScrubIdRef.current = null;
    }
  };

  // Pointer event handlers for draggable highlight scrubber
  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    measureMetrics();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Safe fallback if unsupported
    }

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragCurrentXRef.current = e.clientX;
    isManualNavRef.current = true;
    targetScrollYRef.current = window.scrollY;

    if (manualNavTimerRef.current) {
      clearTimeout(manualNavTimerRef.current);
    }
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    dragCurrentXRef.current = e.clientX;
    const deltaX = Math.abs(e.clientX - dragStartXRef.current);

    if (!hasDraggedRef.current && deltaX > 2) {
      hasDraggedRef.current = true;
      setIsDragging(true);
      startScrubLoop();
    }
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }

    const didDrag = hasDraggedRef.current;
    isDraggingRef.current = false;
    setIsDragging(false);
    stopScrubLoop();

    const track = trackBoundsRef.current;
    const metrics = navMetricsRef.current;
    const relativeX = Math.max(0, Math.min(track.width, e.clientX - track.left));

    // Find closest section
    let closestItem = metrics[0];
    let minDistance = Infinity;
    metrics.forEach((item) => {
      const dist = Math.abs(relativeX - item.tabCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestItem = item;
      }
    });

    if (didDrag) {
      activeSectionRef.current = closestItem.id;
      setActiveSection(closestItem.id);
      scrollTargetXRef.current = closestItem.tabLeft;
      scrollTargetWRef.current = closestItem.tabWidth;

      // Spring snap to docked section tab
      animate(pillX, closestItem.tabLeft, {
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.5,
      });
      animate(pillWidth, closestItem.tabWidth, {
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.5,
      });

      // Smooth scroll viewport to landing position with zero top margin
      window.scrollTo({
        top: closestItem.targetScrollTop,
        behavior: "smooth",
      });

      manualNavTimerRef.current = setTimeout(() => {
        isManualNavRef.current = false;
      }, 700);
    } else {
      // User tapped/clicked on track background rather than on link text
      const isAnchorClick = (e.target as HTMLElement)?.closest("a");
      if (!isAnchorClick && closestItem) {
        activeSectionRef.current = closestItem.id;
        setActiveSection(closestItem.id);
        scrollTargetXRef.current = closestItem.tabLeft;
        scrollTargetWRef.current = closestItem.tabWidth;

        animate(pillX, closestItem.tabLeft, {
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.5,
        });
        animate(pillWidth, closestItem.tabWidth, {
          type: "spring",
          stiffness: 320,
          damping: 28,
          mass: 0.5,
        });

        window.scrollTo({
          top: closestItem.targetScrollTop,
          behavior: "smooth",
        });

        manualNavTimerRef.current = setTimeout(() => {
          isManualNavRef.current = false;
        }, 700);
      } else {
        manualNavTimerRef.current = setTimeout(() => {
          isManualNavRef.current = false;
        }, 500);
      }
    }
  };

  // Programmatic smooth scroll to section on link click
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");

    activeSectionRef.current = targetId;
    setActiveSection(targetId);
    isManualNavRef.current = true;

    if (manualNavTimerRef.current) {
      clearTimeout(manualNavTimerRef.current);
    }
    manualNavTimerRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 900);

    const metric = navMetricsRef.current.find((m) => m.id === targetId);
    if (metric) {
      scrollTargetXRef.current = metric.tabLeft;
      scrollTargetWRef.current = metric.tabWidth;

      animate(pillX, metric.tabLeft, {
        type: "spring",
        stiffness: 320,
        damping: 28,
        mass: 0.5,
      });
      animate(pillWidth, metric.tabWidth, {
        type: "spring",
        stiffness: 320,
        damping: 28,
        mass: 0.5,
      });

      window.scrollTo({
        top: metric.targetScrollTop,
        behavior: "smooth",
      });
      return;
    }

    // Fallback if metric not found yet
    const element = document.getElementById(targetId);
    if (element) {
      if (targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const contentTarget = (element.firstElementChild as HTMLElement) || element;
      const targetTop = contentTarget.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, targetTop - 76),
        behavior: "smooth",
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
            "flex items-center justify-between gap-4 md:gap-6 rounded-full px-5 md:px-6 transition-all duration-500 ease-out border shadow-2xl backdrop-blur-xl w-full max-w-5xl cursor-default",
            scrolled
              ? "py-2.5 bg-[#050505]/90 border-white/15 shadow-black/40"
              : "py-3.5 bg-[#08080c]/60 border-white/10 shadow-black/20"
          )}
        >
          {/* Logo / Initials or Scrolled Avatar */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2.5 group cursor-default shrink-0"
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

          {/* Desktop Navigation Links with continuous fluid sliding & draggable highlight */}
          <div
            ref={navTrackRef}
            onPointerEnter={() => setIsTrackHovered(true)}
            onPointerLeave={() => setIsTrackHovered(false)}
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}
            onPointerCancel={handleTrackPointerUp}
            className="relative hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5 select-none touch-none cursor-default"
          >
            {/* Single Persistent Smooth Floating Highlight Pill (Draggable Scrubber) */}
            {pillReady && (
              <motion.div
                style={{
                  x: pillX,
                  width: pillWidth,
                }}
                animate={{
                  scale: isDragging ? 1.03 : isTrackHovered ? 1.02 : 1,
                }}
                transition={{
                  scale: { type: "spring", stiffness: 400, damping: 25 },
                }}
                className={cn(
                  "absolute left-0 top-1.5 bottom-1.5 rounded-full border pointer-events-none z-0 select-none will-change-transform overflow-hidden",
                  isDragging
                    ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 border-white/45 shadow-[0_0_26px_rgba(99,102,241,0.7)] transition-[box-shadow,border-color,background-color] duration-150"
                    : isTrackHovered
                    ? "bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-purple-500/90 border-white/35 shadow-[0_0_20px_rgba(129,140,248,0.5)] transition-[box-shadow,border-color,background-color] duration-200"
                    : "bg-gradient-to-r from-blue-600/85 via-indigo-600/85 to-purple-600/85 border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-[box-shadow,border-color,background-color] duration-300"
                )}
              >
                {/* Subtle radiant sheen & top specular gloss on hover or drag */}
                <AnimatePresence>
                  {(isTrackHovered || isDragging) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
                    >
                      {/* Sweeping diagonal light ray */}
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-y-0 w-2/3 -skew-x-20 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                      />
                      {/* Top specular glossy edge */}
                      <div className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    "relative z-10 px-3.5 py-1.5 text-xs font-medium rounded-full select-none transition-colors duration-200 cursor-default",
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
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 cursor-default"
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
