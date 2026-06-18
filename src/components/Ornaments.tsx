"use client";

import React from "react";
import { motion } from "framer-motion";

interface OrnamentProps {
  className?: string;
  delay?: number;
}

// 1. Wedding date seal inside a delicate, thin organic wreath
export function WeddingMonogram({ className = "", delay = 0 }: OrnamentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center ${className}`}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        className="text-gold"
      >
        {/* Delicate Wreath Circle */}
        <path
          d="M 50 12 C 70 12 88 30 88 50 C 88 70 70 88 50 88 C 30 88 12 70 12 50 C 12 30 30 12 50 12"
          strokeWidth="0.75"
          strokeDasharray="4 2"
          className="opacity-60"
        />
        
        {/* Leaf 1 top left */}
        <path
          d="M 50 12 C 45 6 35 10 32 16 C 35 22 45 18 50 12 Z"
          fill="none"
          strokeWidth="0.75"
        />
        {/* Leaf 2 top right */}
        <path
          d="M 50 12 C 55 6 65 10 68 16 C 65 22 55 18 50 12 Z"
          fill="none"
          strokeWidth="0.75"
        />
        {/* Leaf 3 bottom left */}
        <path
          d="M 32 84 C 28 89 18 85 15 79 C 18 73 28 77 32 84 Z"
          fill="none"
          strokeWidth="0.75"
          transform="rotate(-20 32 84)"
        />
        {/* Leaf 4 bottom right */}
        <path
          d="M 68 84 C 72 89 82 85 85 79 C 82 73 72 77 68 84 Z"
          fill="none"
          strokeWidth="0.75"
          transform="rotate(20 68 84)"
        />

        {/* Peacock feather detail inside the wreath at the bottom center */}
        <path
          d="M 50 88 C 50 80 50 76 50 72 C 48 70 47 67 49 65 C 50 64 51 64 52 65 C 53 67 52 70 50 72"
          strokeWidth="0.75"
        />
        <circle cx="50" cy="67" r="1.5" strokeWidth="0.75" />

        {/* Date seal */}
        <text
          x="50"
          y="49"
          textAnchor="middle"
          fontFamily="var(--font-poppins), sans-serif"
          fontSize="13"
          fill="currentColor"
          stroke="none"
          className="font-semibold tracking-widest"
        >
          11·07
        </text>
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="var(--font-poppins), sans-serif"
          fontSize="7"
          fill="currentColor"
          stroke="none"
          className="opacity-70 font-medium tracking-[0.3em]"
        >
          2026
        </text>
      </svg>
    </motion.div>
  );
}

// 2. Elegant Floral Divider (horizontal divider with botanical line-art)
export function FloralDivider({ className = "" }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-4 py-6 text-gold ${className}`}>
      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold opacity-50" />
      <svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="opacity-80"
      >
        {/* Left leaf swirl */}
        <path d="M 30 10 C 22 10 18 16 12 10 C 18 4 22 10 30 10 Z" />
        <path d="M 20 10 C 18 6 14 6 12 10" strokeWidth="0.75" />
        
        {/* Center bud */}
        <circle cx="30" cy="10" r="2.5" className="fill-gold" />
        
        {/* Right leaf swirl */}
        <path d="M 30 10 C 38 10 42 16 48 10 C 42 4 38 10 30 10 Z" />
        <path d="M 40 10 C 42 6 46 6 48 10" strokeWidth="0.75" />
      </svg>
      <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold opacity-50" />
    </div>
  );
}

// 3. Subtle Peacock Feather Motif (used sparingly as romantic decorative accents)
export function PeacockFeather({ className = "", delay = 0.2 }: OrnamentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 0.25, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={`pointer-events-none select-none text-gold ${className}`}
    >
      <svg
        width="80"
        height="140"
        viewBox="0 0 80 140"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      >
        {/* Central stem */}
        <path d="M 40 130 C 40 90 40 50 40 10" strokeWidth="1" />
        
        {/* The Eye of the Feather */}
        <path d="M 40 10 C 25 15 20 30 40 45 C 60 30 55 15 40 10 Z" strokeWidth="1" />
        <path d="M 40 16 C 30 20 28 30 40 38 C 52 30 50 20 40 16 Z" fill="currentColor" className="fill-opacity-10" />
        <circle cx="40" cy="27" r="4.5" className="fill-gold" />

        {/* Barb elements (lines branching out) */}
        <path d="M 40 45 C 32 46 22 42 16 34" />
        <path d="M 40 45 C 48 46 58 42 64 34" />
        
        <path d="M 40 55 C 30 58 20 54 12 45" />
        <path d="M 40 55 C 50 58 60 54 68 45" />

        <path d="M 40 68 C 28 72 18 68 10 58" />
        <path d="M 40 68 C 52 72 62 68 70 58" />

        <path d="M 40 82 C 26 88 16 84 8 72" />
        <path d="M 40 82 C 54 88 64 84 72 72" />

        <path d="M 40 98 C 28 104 18 98 12 86" />
        <path d="M 40 98 C 52 104 62 98 68 86" />

        <path d="M 40 115 C 32 120 24 114 18 102" />
        <path d="M 40 115 C 48 120 56 114 62 102" />
      </svg>
    </motion.div>
  );
}

// 4. Subtle Foliage Corner Frame
export function FoliageCorner({ className = "", position = "top-left" }: { className?: string; position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotationClass = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-left": "-rotate-90",
    "bottom-right": "rotate-180",
  }[position];

  return (
    <div className={`absolute pointer-events-none select-none text-sage/40 ${rotationClass} ${className}`}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.75">
        {/* Main Swirl */}
        <path d="M 5 5 C 40 5 80 25 80 60 C 80 80 60 90 40 90" />
        
        {/* Leaves */}
        <path d="M 25 10 C 25 2 35 2 35 10 C 35 18 25 18 25 10 Z" fill="currentColor" className="fill-opacity-5" />
        <path d="M 50 18 C 52 10 62 12 62 20 C 62 28 52 26 50 18 Z" fill="currentColor" className="fill-opacity-5" />
        <path d="M 72 38 C 76 30 84 34 82 42 C 80 50 72 48 72 38 Z" fill="currentColor" className="fill-opacity-5" />
        <path d="M 76 65 C 82 65 82 75 74 75 C 66 75 68 65 76 65 Z" fill="currentColor" className="fill-opacity-5" />
      </svg>
    </div>
  );
}
