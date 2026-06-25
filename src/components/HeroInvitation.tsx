"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const isBengali = language === "bn";
  const content = weddingContent;

  const reveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section id="home" className="editorial-hero image-free-hero">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-hairline hero-hairline--top" aria-hidden="true" />
      <div className="hero-hairline hero-hairline--bottom" aria-hidden="true" />

      <motion.a
        href="#home"
        className="hero-mark"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease }}
      >
        S <span>×</span> B
      </motion.a>

      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.13, delayChildren: 0.42 }}
      >
        <motion.p variants={reveal} className="hero-kicker hero-label">
          {isBengali ? t(content.hero.familyNotice) : "You are cordially invited"}
        </motion.p>

        <h1 className={`hero-title hero-name ${isBengali ? "font-bengali-serif" : ""}`}>
          <span className="hero-title__line">
            <motion.span variants={reveal}>{t(content.hero.groomName)}</motion.span>
          </span>
          <span className="hero-ampersand-wrap">
            <motion.i variants={reveal} className="hero-ampersand" aria-hidden="true">
              {content.hero.ampersand}
            </motion.i>
          </span>
          <span className="hero-title__line">
            <motion.span variants={reveal}>{t(content.hero.brideName)}</motion.span>
          </span>
        </h1>

        <motion.div variants={reveal} className="hero-date hero-meta">
          {isBengali ? t(content.hero.date) : "11 · 07 · 2026"}
        </motion.div>

        <motion.aside className="hero-details liquid-glass" variants={reveal}>
          <p>{t(content.program.title)}</p>
          <p>{t(content.program.timeLabel)}</p>
          <div aria-hidden="true" />
          <p className="hero-venue">{t(content.program.venueName)}</p>
        </motion.aside>

        <motion.button
          onClick={onOpenDetails}
          className="hero-action liquid-glass"
          variants={reveal}
        >
          {isBengali ? "উদযাপন দেখুন" : "Explore the Celebration"}
          <ArrowUpRight size={15} aria-hidden="true" />
        </motion.button>
      </motion.div>

    </section>
  );
}
