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
      const count = isSmallScreen ? 42 : 60;

      setSparkles(
        Array.from({ length: count }, (_, id) => {
          const sizePx = 0.9 + Math.random() * 1.8;
          const opacity = 0.14 + Math.random() * 0.42;

          return {
            id,
            left: `${(Math.random() * 100).toFixed(2)}%`,
            top: `${(Math.random() * (isSmallScreen ? 100 : 96)).toFixed(2)}%`,
            size: `${sizePx.toFixed(2)}px`,
            delay: `${(Math.random() * 10).toFixed(2)}s`,
            duration: `${(6 + Math.random() * 7).toFixed(2)}s`,
            opacity: Number(opacity.toFixed(2)),
            blur: `${(0.2 + Math.random() * 0.9).toFixed(2)}px`,
            drift: `${(-4 + Math.random() * 8).toFixed(1)}px`,
          };
        })
      );
    };

    buildSparkles();

    window.addEventListener("resize", buildSparkles);
    return () => window.removeEventListener("resize", buildSparkles);
  }, []);

  return (
    <div className="dreamy-sparkles fixed inset-0 pointer-events-none z-[7]" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="dreamy-sparkle"
          style={
            {
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
              "--sparkle-size": sparkle.size,
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
