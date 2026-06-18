"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { weddingContent } from "@/data/wedding-content";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  audioEnabled: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const audioEnabled = !!(weddingContent.music && weddingContent.music.enabled && weddingContent.music.audioPath);
  const audioPath = weddingContent.music?.audioPath || "";

  useEffect(() => {
    if (!audioEnabled || !audioPath) return;

    // Create the audio element on mount (only client-side)
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.4; // Soft background volume
    audioRef.current = audio;

    // Check if the user previously turned on music in this session
    const sessionPlayback = sessionStorage.getItem("wedding-music-playing");
    if (sessionPlayback === "true") {
      // Browsers block autoplay until user interacts. We will try to play,
      // but if blocked, we handle the error gracefully.
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser. Keep isPlaying false.
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioEnabled, audioPath]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      sessionStorage.setItem("wedding-music-playing", "false");
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          sessionStorage.setItem("wedding-music-playing", "true");
        })
        .catch((err) => {
          console.error("Playback failed: ", err);
        });
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, audioEnabled }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
