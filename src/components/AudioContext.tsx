"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { weddingContent } from "@/data/wedding-content";

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: YouTubePlayerOptions) => YouTubePlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
      ready?: Array<() => void>;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

interface YouTubePlayerOptions {
  videoId: string;
  playerVars: Record<string, string | number>;
  events: {
    onReady: (event: YouTubePlayerEvent) => void;
    onStateChange: (event: YouTubePlayerEvent) => void;
  };
}

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  audioEnabled: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const PLAYER_ID = "wedding-youtube-player";
const YT_SCRIPT_ID = "youtube-iframe-api";
const SESSION_KEY = "wedding-music-playing";

function loadYouTubeApi() {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.YT?.Player) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(YT_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve();
      };
      return;
    }

    const script = document.createElement("script");
    script.id = YT_SCRIPT_ID;
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const readyRef = useRef(false);
  const initPromiseRef = useRef<Promise<YouTubePlayer | null> | null>(null);
  const audioEnabled = !!(
    weddingContent.music &&
    weddingContent.music.enabled &&
    weddingContent.music.youtubeVideoId
  );
  const videoId = weddingContent.music?.youtubeVideoId || "";

  useEffect(() => {
    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
      playerRef.current = null;
      initPromiseRef.current = null;
      readyRef.current = false;
    };
  }, []);

  const initializePlayer = () => {
    if (!audioEnabled || !videoId) return Promise.resolve(null);
    if (playerRef.current && readyRef.current) return Promise.resolve(playerRef.current);
    if (initPromiseRef.current) return initPromiseRef.current;

    initPromiseRef.current = loadYouTubeApi().then(
      () =>
        new Promise<YouTubePlayer | null>((resolve) => {
          if (!window.YT?.Player) {
            resolve(null);
            return;
          }

          playerRef.current = new window.YT.Player(PLAYER_ID, {
            videoId,
            playerVars: {
              autoplay: 0,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              playsinline: 1,
              loop: 1,
              playlist: videoId,
              fs: 0,
              iv_load_policy: 3,
              disablekb: 1,
              origin: window.location.origin,
            },
            events: {
              onReady: (event: YouTubePlayerEvent) => {
                readyRef.current = true;
                event.target.setVolume(35);
                resolve(event.target);
              },
              onStateChange: (event: YouTubePlayerEvent) => {
                if (!window.YT?.PlayerState) return;
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  sessionStorage.setItem(SESSION_KEY, "true");
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  setIsPlaying(false);
                  sessionStorage.setItem(SESSION_KEY, "false");
                }
              },
            },
          });
        })
    );

    return initPromiseRef.current;
  };

  const togglePlay = async () => {
    const player = await initializePlayer();
    if (!player || !readyRef.current) return;

    if (isPlaying) {
      player.pauseVideo?.();
      setIsPlaying(false);
      sessionStorage.setItem(SESSION_KEY, "false");
    } else {
      player.playVideo?.();
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, audioEnabled }}>
      {children}
      {audioEnabled && videoId ? (
        <div
          id={PLAYER_ID}
          aria-hidden="true"
          className="fixed left-[-9999px] top-[-9999px] h-px w-px overflow-hidden opacity-0 pointer-events-none"
        />
      ) : null}
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
