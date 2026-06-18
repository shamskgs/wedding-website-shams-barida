"use client";

import React, { useEffect, useRef, useState } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  targetRadius: number;
}

export default function AbstractWeddingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check system preferences for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Color definitions with very low opacity for subtle atmospheric blending
    const colors = [
      "rgba(169, 183, 164, 0.12)", // Soft Sage
      "rgba(201, 154, 159, 0.10)", // Dusty Rose
      "rgba(181, 139, 78, 0.08)",  // Antique Gold
      "rgba(23, 63, 58, 0.04)",    // Deep Peacock Green (very light)
    ];

    // Initialize floating organic blobs
    const blobs: Blob[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        vx: 0.15,
        vy: 0.1,
        radius: Math.min(width, height) * 0.35,
        color: colors[0],
        targetRadius: Math.min(width, height) * 0.35,
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        vx: -0.1,
        vy: 0.12,
        radius: Math.min(width, height) * 0.4,
        color: colors[1],
        targetRadius: Math.min(width, height) * 0.4,
      },
      {
        x: width * 0.35,
        y: height * 0.75,
        vx: 0.08,
        vy: -0.08,
        radius: Math.min(width, height) * 0.3,
        color: colors[2],
        targetRadius: Math.min(width, height) * 0.3,
      },
      {
        x: width * 0.7,
        y: height * 0.8,
        vx: -0.07,
        vy: -0.11,
        radius: Math.min(width, height) * 0.38,
        color: colors[3],
        targetRadius: Math.min(width, height) * 0.38,
      },
    ];

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      // Update radii based on new viewport size
      blobs.forEach((blob, idx) => {
        const factor = [0.35, 0.4, 0.3, 0.38][idx];
        blob.radius = blob.targetRadius = Math.min(width, height) * factor;
      });
    };

    window.addEventListener("resize", resize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Base background color (Warm Ivory fallback representation in canvas)
      ctx.fillStyle = "#F8F4EC";
      ctx.fillRect(0, 0, width, height);

      // Draw and animate each blob
      blobs.forEach((blob) => {
        // Create radial gradient for a soft, smoky, glowing blur effect
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(248, 244, 236, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();

        // If reduced motion is NOT enabled, animate positions
        if (!mediaQuery.matches) {
          blob.x += blob.vx;
          blob.y += blob.vy;

          // Boundary collision with graceful direction reversing
          if (blob.x - blob.radius < -100 || blob.x + blob.radius > width + 100) {
            blob.vx *= -1;
          }
          if (blob.y - blob.radius < -100 || blob.y + blob.radius > height + 100) {
            blob.vy *= -1;
          }

          // Subtle organic breathing animation of the radius
          const time = Date.now() * 0.0005;
          blob.radius = blob.targetRadius + Math.sin(time + blob.x) * 15;
        }
      });

      // Overlay an elegant fine mesh texture
      ctx.strokeStyle = "rgba(181, 139, 78, 0.025)"; // very faint gold lines
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none bg-ivory">
      {/* 2D Canvas for GPU-friendly abstract animations */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ filter: "blur(20px)" }} // Extra CSS blur filters for organic blending
      />
      {/* Subtle ivory gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ivory/30 to-ivory -z-10" />
    </div>
  );
}
