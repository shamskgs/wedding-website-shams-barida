"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FloralDivider } from "./Ornaments";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
}

export default function WeddingCountdown() {
  const { language, t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
    isComplete: false,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date(weddingContent.countdown.targetDate).getTime();

    const calculateTimeLeft = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isComplete: true,
        });
        return true;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      // Pad with leading zeros
      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isComplete: false,
      });

      return false;
    };

    // Initial run
    const completed = calculateTimeLeft();
    if (completed) return;

    // Start tick interval
    const timer = setInterval(() => {
      const done = calculateTimeLeft();
      if (done) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (numStr: string) => {
    if (!isMounted || numStr === "--") return numStr;
    if (language === "en") return numStr;

    // Convert digits to Bengali
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return numStr
      .split("")
      .map((char) => {
        const digit = parseInt(char, 10);
        return isNaN(digit) ? char : bnDigits[digit];
      })
      .join("");
  };

  const labels = weddingContent.countdown.labels;

  return (
    <section className="py-10 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {timeLeft.isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h3 className="font-calligraphy text-peacock text-3xl md:text-5xl font-medium tracking-wide mb-3">
                {t(weddingContent.countdown.completionMessage)}
              </h3>
              <FloralDivider />
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center bg-ivory/36 backdrop-blur-xl rounded-[2rem] px-5 py-8 md:px-10 md:py-10 shadow-[0_28px_90px_rgba(23,63,58,0.12)]"
            >
              {/* Thin, elegant inline countdown cells */}
              <div className="flex items-center justify-center gap-3 md:gap-10 text-peacock select-none">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <span className="font-poppins text-4xl md:text-6xl font-light tracking-wide w-14 md:w-24 text-center">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-charcoal/60 mt-2 font-medium">
                    {t(labels.days)}
                  </span>
                </div>

                <div className="h-10 w-[1px] bg-gold/30" />

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <span className="font-poppins text-4xl md:text-6xl font-light tracking-wide w-14 md:w-24 text-center">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-charcoal/60 mt-2 font-medium">
                    {t(labels.hours)}
                  </span>
                </div>

                <div className="h-10 w-[1px] bg-gold/30" />

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <span className="font-poppins text-4xl md:text-6xl font-light tracking-wide w-14 md:w-24 text-center">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-charcoal/60 mt-2 font-medium">
                    {t(labels.minutes)}
                  </span>
                </div>

                <div className="h-10 w-[1px] bg-gold/30" />

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <span className="font-poppins text-4xl md:text-6xl font-light tracking-wide w-14 md:w-24 text-center text-gold">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold/75 mt-2 font-medium">
                    {t(labels.seconds)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
