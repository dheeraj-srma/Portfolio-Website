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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cosmic starfield particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 14), 110);
    const particles: {
      x: number;
      y: number;
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
      const baseAlpha = Math.random() * 0.6 + 0.15;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.4,
        baseAlpha,
        alpha: baseAlpha,
        pulseSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let tick = 0;

    const render = () => {
      tick += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle celestial orbit rings in background
      const cx = canvas.width * 0.85;
      const cy = canvas.height * 0.2;

      ctx.save();
      ctx.strokeStyle = "rgba(168, 85, 247, 0.035)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);

      // Orbital ellipse 1
      ctx.beginPath();
      ctx.ellipse(cx, cy, 340, 180, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital ellipse 2
      ctx.beginPath();
      ctx.ellipse(cx, cy, 520, 280, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Lower left coordinate circle
      ctx.strokeStyle = "rgba(59, 130, 246, 0.025)";
      ctx.beginPath();
      ctx.ellipse(canvas.width * 0.1, canvas.height * 0.85, 400, 220, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Render stars & subtle dynamic constellation lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
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

        // Subtle reaction to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          p.x -= (dx / dist) * 0.25;
          p.y -= (dy / dist) * 0.25;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.alpha})`;
        ctx.fill();

        // Connect nearby stars with faint cosmic filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - cdist / 95) * 0.05;
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
