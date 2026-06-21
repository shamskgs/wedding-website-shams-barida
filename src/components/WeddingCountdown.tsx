"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
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
    const initialTimer = window.setTimeout(() => {
      setIsMounted(true);
      calculateTimeLeft();
    }, 0);

    // Start tick interval
    const timer = window.setInterval(() => {
      const done = calculateTimeLeft();
      if (done) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
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
    <section className="editorial-section editorial-section--ivory py-20 md:py-24">
      <div className="editorial-shell flex flex-col items-center">
        <div className="editorial-label mb-6">
          {language === "bn" ? "গণনা" : "Countdown"}
        </div>
        <AnimatePresence mode="wait">
          {timeLeft.isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center max-w-3xl"
            >
              <h3 className="editorial-heading mb-4 text-[clamp(2.6rem,6vw,5rem)]">
                {t(weddingContent.countdown.completionMessage)}
              </h3>
              <div className="editorial-rule mx-auto max-w-md" />
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-5xl"
            >
              <div className="editorial-rule mb-8" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-10 text-peacock select-none">
                <div className="text-center">
                  <span className="block font-poppins text-[clamp(3rem,8vw,5.6rem)] font-light leading-none tracking-[-0.04em]">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="mt-3 block text-[10px] md:text-xs uppercase tracking-[0.22em] text-charcoal/60 font-medium">
                    {t(labels.days)}
                  </span>
                </div>

                <div className="text-center">
                  <span className="block font-poppins text-[clamp(3rem,8vw,5.6rem)] font-light leading-none tracking-[-0.04em]">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="mt-3 block text-[10px] md:text-xs uppercase tracking-[0.22em] text-charcoal/60 font-medium">
                    {t(labels.hours)}
                  </span>
                </div>

                <div className="text-center">
                  <span className="block font-poppins text-[clamp(3rem,8vw,5.6rem)] font-light leading-none tracking-[-0.04em]">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="mt-3 block text-[10px] md:text-xs uppercase tracking-[0.22em] text-charcoal/60 font-medium">
                    {t(labels.minutes)}
                  </span>
                </div>

                <div className="text-center">
                  <span className="block font-poppins text-[clamp(3rem,8vw,5.6rem)] font-light leading-none tracking-[-0.04em] text-gold">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="mt-3 block text-[10px] md:text-xs uppercase tracking-[0.22em] text-gold/75 font-medium">
                    {t(labels.seconds)}
                  </span>
                </div>
              </div>
              <div className="editorial-rule mt-8" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
