"use client";

import React from "react";
import { useAudio } from "./AudioContext";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const { isPlaying, togglePlay, audioEnabled } = useAudio();

  if (!audioEnabled) return null;

  return (
    <button
      onClick={togglePlay}
      className="relative flex items-center justify-center rounded-full border border-[rgba(27,23,20,0.14)] bg-[rgba(247,241,231,0.88)] p-2 text-peacock transition-colors duration-300 hover:border-peacock hover:text-peacock focus:outline-none focus-visible:ring-2 focus-visible:ring-peacock/20"
      aria-label={isPlaying ? "Mute background music" : "Play background music"}
      title={isPlaying ? "Mute Music" : "Play Music"}
    >
      {isPlaying ? (
        <div className="flex items-center gap-1">
          <Volume2 size={16} />
          {/* Animated sound wave bars for a premium look */}
          <div className="flex items-end gap-[2px] h-3 w-4 px-[2px]">
            <motion.div
              animate={{ height: ["20%", "100%", "20%"] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-[2px] bg-peacock rounded-full"
            />
            <motion.div
              animate={{ height: ["40%", "100%", "40%"] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="w-[2px] bg-peacock rounded-full"
            />
            <motion.div
              animate={{ height: ["10%", "100%", "10%"] }}
              transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut", delay: 0.4 }}
              className="w-[2px] bg-peacock rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <VolumeX size={16} className="text-charcoal/60" />
        </div>
      )}
    </button>
  );
}
