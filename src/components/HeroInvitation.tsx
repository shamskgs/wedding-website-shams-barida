"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { motion } from "framer-motion";
import { ArrowDown, Calendar, ExternalLink } from "lucide-react";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const content = weddingContent.hero;

  const handleUploadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (weddingContent.upload.googleDriveLink.includes("[PASTE")) {
      e.preventDefault();
      alert(t(weddingContent.upload.fallbackMessage));
    }
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="home" className="hero-cover">
      <motion.div
        className="hero-frame"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        aria-hidden="true"
      />
      <div className="hero-botanical hero-botanical--left" aria-hidden="true" />
      <div className="hero-botanical hero-botanical--right" aria-hidden="true" />
      <span className="hero-rose hero-rose--one" aria-hidden="true" />
      <span className="hero-rose hero-rose--two" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.28, delayChildren: 0.45 }}
      >
        <motion.p variants={item} className="hero-kicker">
          {t(content.familyNotice)}
        </motion.p>

        <motion.div variants={item} className="hero-names">
          <h1 className={language === "bn" ? "font-bengali-serif font-semibold" : ""}>
            <span>{t(content.groomName)}</span>
            <b aria-hidden="true">{content.ampersand}</b>
            <span>{t(content.brideName)}</span>
          </h1>
        </motion.div>

        <motion.p variants={item} className="hero-invitation">
          {t(content.inviteText)}
        </motion.p>

        <motion.div variants={item} className="hero-date-block">
          <span className="hero-rule" aria-hidden="true" />
          <p>{t(content.date)}</p>
          <span aria-hidden="true">·</span>
          <p>{t(content.time)}</p>
          <span className="hero-rule" aria-hidden="true" />
        </motion.div>

        <motion.p variants={item} className="hero-venue">
          {t(content.venue)} <span>—</span> {t(content.location)}
        </motion.p>

        <motion.div variants={item} className="hero-actions">
          <button onClick={onOpenDetails} className="editorial-button editorial-button--filled">
            <Calendar size={14} aria-hidden="true" />
            {t(content.viewDetailsCTA)}
          </button>
          <a
            href={weddingContent.upload.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleUploadClick}
            className="editorial-button editorial-button--ghost"
          >
            {t(content.uploadMemoriesCTA)}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.a variants={item} href="#couple" className="hero-scroll" aria-label="Scroll to meet the couple">
          <span>{language === "bn" ? "নিচে দেখুন" : "Discover our story"}</span>
          <ArrowDown size={15} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
