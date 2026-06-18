"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import AbstractWeddingBackground from "./AbstractWeddingBackground";
import { WeddingMonogram } from "./Ornaments";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin, ChevronDown } from "lucide-react";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const content = weddingContent.hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: "easeOut" as const },
    },
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const driveLink = weddingContent.upload.googleDriveLink;
    if (driveLink.includes("[PASTE")) {
      e.preventDefault();
      alert(t(weddingContent.upload.fallbackMessage));
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden px-4 md:px-6"
    >
      {/* Abstract Animated Background */}
      <AbstractWeddingBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center flex flex-col items-center z-10"
      >
        {/* Monogram ornament at top */}
        <motion.div variants={itemVariants} className="mb-6 opacity-80">
          <WeddingMonogram />
        </motion.div>

        {/* Intro Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.3em] text-peacock font-semibold mb-5 max-w-md"
        >
          {t(content.familyNotice)}
        </motion.p>

        {/* Names Stack - Caligraphy for English, Elegant Noto Serif for Bengali */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-1 md:gap-3 mb-6"
        >
          <h1
            className={`text-peacock leading-none select-none transition-all duration-300 ${
              language === "bn"
                ? "font-bengali-serif text-3xl md:text-5xl font-semibold py-1"
                : "font-calligraphy text-6xl md:text-8xl font-normal"
            }`}
          >
            {t(content.groomName)}
          </h1>
          
          <span className="font-calligraphy text-3xl md:text-4xl text-gold/80 italic my-1 font-light">
            {content.ampersand}
          </span>
          
          <h1
            className={`text-peacock leading-none select-none transition-all duration-300 ${
              language === "bn"
                ? "font-bengali-serif text-3xl md:text-5xl font-semibold py-1"
                : "font-calligraphy text-6xl md:text-8xl font-normal"
            }`}
          >
            {t(content.brideName)}
          </h1>
        </motion.div>

        {/* Invitation Message */}
        <motion.p
          variants={itemVariants}
          className={`text-charcoal/80 text-sm tracking-widest max-w-lg mb-8 uppercase ${
            language === "bn" ? "font-bengali-sans font-medium" : "font-light"
          }`}
        >
          {t(content.inviteText)}
        </motion.p>

        {/* Quick Details (Date, Venue) */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-peacock/90 text-[13px] tracking-wider uppercase font-medium mb-12 bg-ivory/42 backdrop-blur-xl rounded-full py-4 px-6 w-full max-w-2xl shadow-[0_22px_70px_rgba(23,63,58,0.12)] ${
            language === "bn" ? "font-bengali-sans" : "font-poppins"
          }`}
        >
          <span className="flex items-center gap-2">
            <Calendar size={15} className="text-gold" />
            {t(content.date)} · {t(content.time)}
          </span>
          <span className="hidden sm:inline text-gold/40">|</span>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-gold" />
            {t(content.venue)}, {t(content.location)}
          </span>
        </motion.div>

        {/* Action Buttons (CTAs) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row flex-wrap items-center justify-center gap-4 w-full px-4"
        >
          {/* Primary View Details CTA */}
          <button
            onClick={onOpenDetails}
            className="w-full sm:w-auto px-8 py-3.5 bg-peacock hover:bg-gold text-ivory font-medium text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
          >
            {t(content.viewDetailsCTA)}
          </button>

          {/* Secondary Upload Memories CTA */}
          <a
            href={weddingContent.upload.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleUploadClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-ivory/45 backdrop-blur-xl hover:bg-ivory/70 text-peacock hover:text-gold font-medium text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-peacock/20 cursor-pointer shadow-[0_14px_40px_rgba(23,63,58,0.08)]"
          >
            {t(content.uploadMemoriesCTA)}
            <ExternalLink size={12} className="opacity-80" />
          </a>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0], y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 2 }}
          className="absolute bottom-8 flex flex-col items-center cursor-pointer text-peacock/60 hover:text-gold transition-colors"
          onClick={() => {
            const nextEl = document.getElementById("couple");
            if (nextEl) nextEl.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium mb-1 hidden sm:inline">
            {language === "bn" ? "স্ক্রোল করুন" : "Scroll"}
          </span>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
