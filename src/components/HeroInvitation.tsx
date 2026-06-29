"use client";

import { motion } from "framer-motion";
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
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease } },
  };

  const dividerReveal = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease } },
  };

  return (
    <section id="home" className="wedding-hero image-free-hero">
      <div className="hero-ambient" aria-hidden="true" />

      <motion.div
        className="wedding-hero__inner"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.14, delayChildren: 0.32 }}
      >
        <motion.p variants={reveal} className="wedding-hero__eyebrow">
          {isBengali ? t(content.hero.familyNotice) : "You are cordially invited"}
        </motion.p>

        <div className={`wedding-hero__names ${isBengali ? "font-bengali-serif" : ""}`}>
          <h1>
            <motion.span variants={reveal}>{t(content.hero.groomName)}</motion.span>
          </h1>
          <motion.span variants={reveal} className="wedding-hero__ampersand" aria-hidden="true">
              {content.hero.ampersand}
          </motion.span>
          <h1>
            <motion.span variants={reveal}>{t(content.hero.brideName)}</motion.span>
          </h1>
        </div>

        <motion.div className="wedding-hero__divider" variants={dividerReveal} aria-hidden="true" />

        <motion.div variants={reveal} className="wedding-hero__meta">
          <p className="wedding-hero__date">
            {isBengali ? t(content.hero.date) : "11 · July · 2026"}
          </p>
          <p className="wedding-hero__program">
            {t(content.program.title)} <span aria-hidden="true">·</span> {t(content.program.timeLabel)}
          </p>
          <p className="wedding-hero__venue">{t(content.program.venueName)}</p>
        </motion.div>

        <motion.button
          onClick={onOpenDetails}
          className="wedding-hero__button"
          variants={reveal}
        >
          {isBengali ? "বিস্তারিত দেখুন" : "View Details"}
        </motion.button>
      </motion.div>

      <motion.div
        className="wedding-hero__scroll"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.85, delay: 1.35, ease }}
        aria-hidden="true"
      />
    </section>
  );
}
