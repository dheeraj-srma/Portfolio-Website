"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";

export interface MouseState {
  x: number;
  y: number;
  normalizedX: number; // -1 (left) to 1 (right)
  normalizedY: number; // -1 (top) to 1 (bottom)
  velocityX: number;
  velocityY: number;
}

export interface ProximityData {
  distance: number;
  dx: number;
  dy: number;
  normalizedDistance: number; // 0 (right on cursor) to 1 (far away)
  angle: number; // radians
  isNearby: boolean;
}

interface ArtifactContextType {
  mouse: MouseState;
  buildMode: boolean;
  setBuildMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBuildMode: () => void;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  activeSection: string;
  getProximity: (rect: DOMRect | null, threshold?: number) => ProximityData;
}

const defaultMouseState: MouseState = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
  velocityX: 0,
  velocityY: 0,
};

const defaultProximity: ProximityData = {
  distance: 9999,
  dx: 0,
  dy: 0,
  normalizedDistance: 1,
  angle: 0,
  isNearby: false,
};

const ArtifactContext = createContext<ArtifactContextType>({
  mouse: defaultMouseState,
  buildMode: false,
  setBuildMode: () => {},
  toggleBuildMode: () => {},
  isMobile: false,
  prefersReducedMotion: false,
  activeSection: "hero",
  getProximity: () => defaultProximity,
});

export function ArtifactProvider({ children }: { children: ReactNode }) {
  const [mouse, setMouse] = useState<MouseState>(defaultMouseState);
  const [buildMode, setBuildMode] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const lastMouseRef = useRef<{ x: number; y: number; time: number }>({
    x: 0,
    y: 0,
    time: Date.now(),
  });
  const rafRef = useRef<number | null>(null);
  const targetMouseRef = useRef<MouseState>(defaultMouseState);

  // Toggle helper
  const toggleBuildMode = useCallback(() => {
    setBuildMode((prev) => !prev);
  }, []);

  // Detect responsive capabilities and reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmall = window.innerWidth < 1024;
      setIsMobile(isCoarse || isSmall);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  // Global smooth mouse tracking with single passive listener & requestAnimationFrame
  useEffect(() => {
    if (typeof window === "undefined" || isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastMouseRef.current.time);
      const vx = (e.clientX - lastMouseRef.current.x) / dt;
      const vy = (e.clientY - lastMouseRef.current.y) / dt;

      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };

      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;

      targetMouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        normalizedX: Math.max(-1, Math.min(1, nx)),
        normalizedY: Math.max(-1, Math.min(1, ny)),
        velocityX: vx,
        velocityY: vy,
      };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMouse(targetMouseRef.current);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, prefersReducedMotion]);

  // Track active section for scroll-dependent artifact migration
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds = [
      "hero",
      "about",
      "philosophy",
      "what-i-build",
      "projects",
      "currently-building",
      "github",
      "journey",
      "stats",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.25, 0.5], rootMargin: "-10% 0px -40% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Compute proximity to any element's bounding rect
  const getProximity = useCallback(
    (rect: DOMRect | null, threshold: number = 400): ProximityData => {
      if (!rect) return defaultProximity;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      const distance = Math.hypot(dx, dy);
      const normalizedDistance = Math.min(1, distance / threshold);
      const angle = Math.atan2(dy, dx);

      return {
        distance,
        dx,
        dy,
        normalizedDistance,
        angle,
        isNearby: distance < threshold,
      };
    },
    [mouse.x, mouse.y]
  );

  return (
    <ArtifactContext.Provider
      value={{
        mouse,
        buildMode,
        setBuildMode,
        toggleBuildMode,
        isMobile,
        prefersReducedMotion,
        activeSection,
        getProximity,
      }}
    >
      {children}
    </ArtifactContext.Provider>
  );
}

export function useArtifacts() {
  return useContext(ArtifactContext);
}
