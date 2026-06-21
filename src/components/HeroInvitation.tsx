"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const content = weddingContent;
  const isBengali = language === "bn";
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.72]);

  const reveal = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section ref={heroRef} id="home" className="hero-cover">
      <span className="hero-edge-line hero-edge-line--left" aria-hidden="true" />
      <span className="hero-edge-line hero-edge-line--right" aria-hidden="true" />

      <motion.div
        className="hero-content"
        style={{ y: heroY, opacity: heroOpacity }}
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.16, delayChildren: 0.16 }}
      >
        <motion.p variants={reveal} className="hero-label">
          {isBengali ? "আপনি সাদর আমন্ত্রিত" : "You are cordially invited"}
        </motion.p>

        <h1 className={`hero-names ${isBengali ? "font-bengali-serif" : ""}`}>
          <span className="hero-name-mask">
            <motion.span variants={reveal} className="hero-name">{isBengali ? "শামস" : "Shams"}</motion.span>
          </span>
          <motion.span variants={reveal} className="hero-ampersand" aria-hidden="true">&amp;</motion.span>
          <span className="hero-name-mask">
            <motion.span variants={reveal} className="hero-name">{isBengali ? "বারিদা" : "Barida"}</motion.span>
          </span>
        </h1>

        <motion.div variants={reveal} className="hero-date">
          <span className="hero-rule" aria-hidden="true" />
          <p>{isBengali ? t(content.hero.date) : "11 · July · 2026"}</p>
          <span className="hero-rule" aria-hidden="true" />
        </motion.div>

        <motion.div variants={reveal} className="hero-program">
          <p>{t(content.program.title)}</p>
          <p>{t(content.program.timeLabel)}</p>
        </motion.div>

        <motion.button
          variants={reveal}
          onClick={onOpenDetails}
          className="editorial-button editorial-button--filled hero-cta"
        >
          {isBengali ? "অনুষ্ঠান দেখুন" : "View the Program"}
        </motion.button>

        <motion.a variants={reveal} href="#couple" className="hero-scroll-cue" aria-label="Scroll to the next section">
          <span>{isBengali ? "নিচে দেখুন" : "Scroll"}</span>
          <ArrowDown size={14} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
