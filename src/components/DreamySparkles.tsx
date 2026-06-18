"use client";

import React, { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  blur: string;
  drift: string;
};

export default function DreamySparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const buildSparkles = () => {
      const isSmallScreen = window.innerWidth < 768;
      const count = isSmallScreen ? 30 : 38;

      setSparkles(
        Array.from({ length: count }, (_, id) => {
          const sizePx = 1.8 + Math.random() * 4.8;
          const opacity = 0.45 + Math.random() * 0.55;

          return {
            id,
            left: `${(Math.random() * 100).toFixed(2)}%`,
            top: `${(Math.random() * (isSmallScreen ? 100 : 96)).toFixed(2)}%`,
            size: `${sizePx.toFixed(2)}px`,
            delay: `${(Math.random() * 6).toFixed(2)}s`,
            duration: `${(4 + Math.random() * 5).toFixed(2)}s`,
            opacity: Number(opacity.toFixed(2)),
            blur: `${(Math.random() * 1.4).toFixed(2)}px`,
            drift: `${(-14 + Math.random() * 28).toFixed(1)}px`,
          };
        })
      );
    };

    buildSparkles();

    window.addEventListener("resize", buildSparkles);
    return () => window.removeEventListener("resize", buildSparkles);
  }, []);

  return (
    <div className="dreamy-sparkles fixed inset-0 pointer-events-none z-[6]" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          style={
            {
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
              opacity: sparkle.opacity,
              filter: `blur(${sparkle.blur})`,
              animationDelay: sparkle.delay,
              animationDuration: sparkle.duration,
              "--sparkle-drift": sparkle.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
