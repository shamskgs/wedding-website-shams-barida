"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { weddingContent } from "@/data/wedding-content";

declare global {
  interface Window {
    YT?: {
      Player: any;
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
  const playerRef = useRef<any>(null);
  const readyRef = useRef(false);
  const audioEnabled = !!(
    weddingContent.music &&
    weddingContent.music.enabled &&
    weddingContent.music.youtubeVideoId
  );
  const videoId = weddingContent.music?.youtubeVideoId || "";

  useEffect(() => {
    if (!audioEnabled || !videoId) return;

    let cancelled = false;

    const init = async () => {
      await loadYouTubeApi();
      if (cancelled || !window.YT?.Player) return;

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
        },
        events: {
          onReady: (event: any) => {
            readyRef.current = true;
            event.target.setVolume(35);

            const sessionPlayback = sessionStorage.getItem(SESSION_KEY);
            if (sessionPlayback === "true") {
              try {
                event.target.playVideo();
              } catch {
                setIsPlaying(false);
              }
            }
          },
          onStateChange: (event: any) => {
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
    };

    init();

    return () => {
      cancelled = true;
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
      playerRef.current = null;
      readyRef.current = false;
    };
  }, [audioEnabled, videoId]);

  const togglePlay = () => {
    const player = playerRef.current;
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
