"use client";

import React, { useEffect, useRef } from "react";

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let prefersReduced = false;

    if (typeof window !== "undefined" && window.matchMedia) {
      prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cosmic starfield particles with 3D depth (z)
    const particleCount = Math.min(Math.floor(window.innerWidth / 14), 110);
    const particles: {
      x: number;
      y: number;
      z: number; // 3D depth layer factor (0.4 to 1.6)
      radius: number;
      baseAlpha: number;
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
      "rgba(254, 215, 170,"  // warm celestial
    ];

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 1.2 + 0.4;
      const baseAlpha = (Math.random() * 0.5 + 0.2) * (z > 1 ? 1 : 0.8);
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        radius: (Math.random() * 1.2 + 0.5) * (0.6 + z * 0.4),
        baseAlpha,
        alpha: baseAlpha,
        pulseSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.12 * z,
        vy: (Math.random() - 0.5) * 0.12 * z,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    let targetMouseX = canvas.width / 2;
    let targetMouseY = canvas.height / 2;
    let mouseX = targetMouseX;
    let mouseY = targetMouseY;
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let tick = 0;

    const render = () => {
      tick += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation (lerp)
      if (!prefersReduced) {
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;
      }

      // Mouse offset normalized (-0.5 to 0.5)
      const mouseOffsetX = (mouseX / canvas.width - 0.5) * 30;
      const mouseOffsetY = (mouseY / canvas.height - 0.5) * 30;

      // Subtle celestial orbit rings in background with gentle pulse
      const cx = canvas.width * 0.85 + (prefersReduced ? 0 : mouseOffsetX * 0.2);
      const cy = canvas.height * 0.2 + (prefersReduced ? 0 : mouseOffsetY * 0.2);
      const orbitPulse = prefersReduced ? 0 : Math.sin(tick * 0.4) * 5;

      ctx.save();
      ctx.strokeStyle = "rgba(168, 85, 247, 0.038)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);

      // Orbital ellipse 1
      ctx.beginPath();
      ctx.ellipse(cx, cy, 340 + orbitPulse, 180 + orbitPulse * 0.5, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital ellipse 2
      ctx.beginPath();
      ctx.ellipse(cx, cy, 520 - orbitPulse, 280 - orbitPulse * 0.5, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Lower left coordinate circle
      ctx.strokeStyle = "rgba(59, 130, 246, 0.028)";
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.1, canvas.height * 0.85, 400 + orbitPulse * 0.6, 220 + orbitPulse * 0.3, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Render stars with 3D depth & parallax
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReduced) {
          // Move according to velocity
          p.x += p.vx;
          p.y += p.vy;

          // Twinkle
          p.alpha += p.pulseSpeed;
          if (p.alpha > 0.85 || p.alpha < 0.1) {
            p.pulseSpeed = -p.pulseSpeed;
          }

          // Screen wrap
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        // Apply 3D parallax based on depth factor z and mouse/scroll
        const drawX = p.x + (prefersReduced ? 0 : mouseOffsetX * p.z);
        const drawY = p.y + (prefersReduced ? 0 : (mouseOffsetY * p.z - (scrollY * 0.03 * p.z) % canvas.height));

        // Draw star
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.08, p.alpha)})`;
        ctx.fill();

        // Connect nearby stars with faint cosmic filaments (only within same depth band)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (Math.abs(p.z - p2.z) > 0.6) continue;

          const p2DrawX = p2.x + (prefersReduced ? 0 : mouseOffsetX * p2.z);
          const p2DrawY = p2.y + (prefersReduced ? 0 : (mouseOffsetY * p2.z - (scrollY * 0.03 * p2.z) % canvas.height));

          const cdx = drawX - p2DrawX;
          const cdy = drawY - p2DrawY;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 90) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(p2DrawX, p2DrawY);
            const lineAlpha = (1 - cdist / 90) * 0.045 * Math.min(p.z, p2.z);
            ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base deep black */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Atmospheric Cosmic Gradients */}
      <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-blue-600/15 rounded-full blur-[150px] animate-blob-pulse" />
      <div className="absolute top-1/4 -right-36 w-[36rem] h-[36rem] bg-purple-600/12 rounded-full blur-[170px] animate-blob-pulse-delayed" />
      <div className="absolute -bottom-36 left-1/4 w-[38rem] h-[38rem] bg-indigo-600/10 rounded-full blur-[190px] animate-blob-pulse" />
      <div className="absolute top-2/3 right-1/4 w-[28rem] h-[28rem] bg-pink-600/08 rounded-full blur-[160px] animate-blob-pulse-delayed" />

      {/* Scientific Engineering Coordinate Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] opacity-70" />

      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

      {/* Canvas Layer: Starfield & Orbital Paths */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
}
