"use client";

import React, { useId, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function SparklesCore({
  id,
  className,
  background = "transparent",
  particleSize,
  minSize,
  maxSize,
  speed = 2.4,
  particleColor = "#B58B4E",
  particleDensity = 95,
}: SparklesCoreProps) {
  const generatedId = useId();

  const sizeMin = minSize ?? particleSize ?? 0.8;
  const sizeMax = maxSize ?? particleSize ?? 2.4;

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: background,
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 1,
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
        },
      },
      particles: {
        color: {
          value: particleColor,
        },
        links: {
          enable: false,
        },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: {
            default: "out" as const,
          },
          random: true,
          speed: {
            min: 0.08,
            max: 0.7,
          },
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 700,
            height: 700,
          },
          value: particleDensity,
        },
        opacity: {
          value: {
            min: 0.08,
            max: 0.55,
          },
          animation: {
            enable: true,
            speed,
            sync: false,
            startValue: "random" as const,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: sizeMin,
            max: sizeMax,
          },
        },
      },
      detectRetina: true,
    }),
    [background, particleColor, particleDensity, sizeMax, sizeMin, speed]
  );

  return (
    <ParticlesProvider init={async (engine: Engine) => loadSlim(engine)}>
      <div className={cx("pointer-events-none", className)}>
        <Particles
          id={id || generatedId}
          className="h-full w-full"
          options={options}
        />
      </div>
    </ParticlesProvider>
  );
}
