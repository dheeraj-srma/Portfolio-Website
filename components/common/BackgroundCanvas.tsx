"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let prefersReduced = false;
    let isMobile = false;

    if (typeof window !== "undefined") {
      if (window.matchMedia) {
        prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      isMobile = window.innerWidth < 768;
    }

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Lightweight starfield particle budget optimized for mobile 60fps
    const particleCount = isMobile
      ? Math.min(Math.floor(window.innerWidth / 20), 30)
      : Math.min(Math.floor(window.innerWidth / 16), 75);

    const particles: {
      x: number;
      y: number;
      z: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    const starColors = [
      "rgba(255, 255, 255,",
      "rgba(191, 219, 254,", // soft blue
      "rgba(233, 213, 255,", // soft purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 1.2 + 0.4;
      const baseAlpha = (Math.random() * 0.45 + 0.15) * (z > 1 ? 1 : 0.8);
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        radius: (Math.random() * 1.1 + 0.5) * (0.6 + z * 0.4),
        alpha: baseAlpha,
        pulseSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.08 * z,
        vy: (Math.random() - 0.5) * 0.08 * z,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    let targetMouseX = canvas.width / 2;
    let targetMouseY = canvas.height / 2;
    let mouseX = targetMouseX;
    let mouseY = targetMouseY;
    let scrollY = window.scrollY;
    let scrollTicking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced || isMobile) return;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          scrollY = window.scrollY;
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });

    let tick = 0;

    const render = () => {
      tick += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!prefersReduced && !isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
      }

      const mouseOffsetX = isMobile ? 0 : (mouseX / canvas.width - 0.5) * 24;
      const mouseOffsetY = isMobile ? 0 : (mouseY / canvas.height - 0.5) * 24;

      // Subtle celestial orbit rings (desktop only to save mobile draw calls)
      if (!isMobile) {
        const cx = canvas.width * 0.85 + (prefersReduced ? 0 : mouseOffsetX * 0.2);
        const cy = canvas.height * 0.2 + (prefersReduced ? 0 : mouseOffsetY * 0.2);
        const orbitPulse = prefersReduced ? 0 : Math.sin(tick * 0.4) * 5;

        ctx.save();
        ctx.strokeStyle = "rgba(168, 85, 247, 0.03)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 14]);

        ctx.beginPath();
        ctx.ellipse(cx, cy, 340 + orbitPulse, 180 + orbitPulse * 0.5, Math.PI / 6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      // Render stars with depth
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;

          p.alpha += p.pulseSpeed;
          if (p.alpha > 0.8 || p.alpha < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        const drawX = p.x + (prefersReduced || isMobile ? 0 : mouseOffsetX * p.z);
        const drawY = p.y + (prefersReduced ? 0 : isMobile ? 0 : (mouseOffsetY * p.z - (scrollY * 0.02 * p.z) % canvas.height));

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.08, p.alpha)})`;
        ctx.fill();

        // Connect only nearby stars on desktop for optimum performance
        if (!isMobile && particles.length < 80) {
          for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
            const p2 = particles[j];
            if (Math.abs(p.z - p2.z) > 0.5) continue;

            const p2DrawX = p2.x + mouseOffsetX * p2.z;
            const p2DrawY = p2.y + (mouseOffsetY * p2.z - (scrollY * 0.02 * p2.z) % canvas.height);

            const cdx = drawX - p2DrawX;
            const cdy = drawY - p2DrawY;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

            if (cdist < 80) {
              ctx.beginPath();
              ctx.moveTo(drawX, drawY);
              ctx.lineTo(p2DrawX, p2DrawY);
              const lineAlpha = (1 - cdist / 80) * 0.035;
              ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu will-change-transform">
      {/* Base deep black */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Atmospheric Cosmic Gradients with hardware transform */}
      <div className="absolute -top-32 -left-32 w-[22rem] sm:w-[34rem] h-[22rem] sm:h-[34rem] bg-blue-600/12 rounded-full blur-[80px] sm:blur-[140px] animate-blob-pulse" />
      <div className="absolute top-1/4 -right-36 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] bg-purple-600/10 rounded-full blur-[90px] sm:blur-[150px] animate-blob-pulse-delayed" />
      <div className="absolute -bottom-36 left-1/4 w-[24rem] sm:w-[38rem] h-[24rem] sm:h-[38rem] bg-indigo-600/08 rounded-full blur-[100px] sm:blur-[160px] animate-blob-pulse" />

      {/* Scientific Engineering Coordinate Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] sm:bg-[size:64px_64px] opacity-60" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />

      {/* Canvas Layer: Starfield & Celestial Points */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
}
