"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const content = weddingContent;
  const isBengali = language === "bn";

  return (
    <section id="home" className="rg-hero">
      <div className="rg-hero__grain" aria-hidden="true" />

      <motion.a
        href="#home"
        className="rg-hero__brand"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.15 }}
      >
        S <span>&amp;</span> B
      </motion.a>

      <div className="rg-hero__layout">
        <motion.div
          className="rg-hero__date"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          {t(content.hero.date)}
        </motion.div>

        <motion.div
          className="rg-hero__flower rg-hero__flower--top"
          initial={{ opacity: 0, scale: 0.96, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 0.9, delay: 0.32 }}
          aria-hidden="true"
        />

        <motion.figure
          className="rg-hero__top-photo"
          initial={{ opacity: 0, y: -18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={content.seo.previewImage}
            alt={content.seo.title.en}
            fill
            sizes="(max-width: 767px) 82vw, 42vw"
            className="object-cover"
            priority
          />
        </motion.figure>

        <motion.div
          className="rg-invitation"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12, delayChildren: 0.32 }}
        >
          <motion.p variants={reveal} className="rg-invitation__kicker">
            {t(content.hero.familyNotice)}
          </motion.p>

          <h1 className={`rg-invitation__names ${isBengali ? "font-bengali-serif" : ""}`}>
            <motion.span variants={reveal}>{t(content.hero.groomName)}</motion.span>
            <motion.i variants={reveal} aria-hidden="true">
              {content.hero.ampersand}
            </motion.i>
            <motion.span variants={reveal}>{t(content.hero.brideName)}</motion.span>
          </h1>

          <motion.p variants={reveal} className="rg-invitation__copy">
            {t(content.hero.inviteText)}
          </motion.p>

          <motion.div variants={reveal} className="rg-invitation__actions">
            <button onClick={onOpenDetails} className="editorial-button editorial-button--filled">
              {t(content.hero.viewDetailsCTA)}
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
            <a href="#memories" className="editorial-button editorial-button--ghost">
              {t(content.hero.uploadMemoriesCTA)}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="rg-hero__flower rg-hero__flower--middle"
          initial={{ opacity: 0, scale: 0.92, rotate: 12 }}
          animate={{ opacity: 1, scale: 1, rotate: 12 }}
          transition={{ duration: 0.9, delay: 0.52 }}
          aria-hidden="true"
        />

        <div className="rg-hero__gallery" aria-label="Wedding portraits">
          <motion.figure
            className="rg-hero__portrait"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={content.profiles.groom.image}
              alt={t(content.profiles.groom.name)}
              fill
              sizes="(max-width: 767px) 30vw, 22vw"
              className="object-cover"
              priority
            />
          </motion.figure>

          <motion.figure
            className="rg-hero__portrait rg-hero__portrait--center"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={content.seo.previewImage}
              alt={content.seo.title.en}
              fill
              sizes="(max-width: 767px) 30vw, 22vw"
              className="object-cover"
              priority
            />
          </motion.figure>

          <motion.figure
            className="rg-hero__portrait"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.76, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={content.profiles.bride.image}
              alt={t(content.profiles.bride.name)}
              fill
              sizes="(max-width: 767px) 30vw, 22vw"
              className="object-cover"
              priority
            />
          </motion.figure>
        </div>

        <motion.figure
          className="rg-hero__venue"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.88 }}
        >
          <figcaption>{t(content.program.venueName)}</figcaption>
          <p>
            <MapPin size={14} aria-hidden="true" />
            {t(content.program.address)}
          </p>
        </motion.figure>
      </div>

      <motion.a
        href="#couple"
        className="rg-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 1.05 }}
        aria-label="Scroll to the couple section"
      >
        <span>{isBengali ? "নিচে দেখুন" : "Scroll"}</span>
        <ArrowDown size={14} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
