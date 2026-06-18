"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin } from "lucide-react";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const content = weddingContent.hero;
  const profiles = weddingContent.profiles;

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
      className="editorial-section editorial-section--cream editorial-section--hero relative flex items-center overflow-hidden px-4 md:px-6"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(27,23,20,0.04),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(181,139,78,0.07),transparent_34%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="editorial-shell grid w-full items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 z-10"
      >
        <div className="order-2 lg:order-1">
          <motion.div variants={itemVariants} className="mb-6">
            <div className="editorial-label mb-5">{t(content.familyNotice)}</div>
            <div className="max-w-[34rem]">
              <h1
                className={`editorial-heading ${
                  language === "bn"
                    ? "font-bengali-serif text-[clamp(3rem,7vw,5.6rem)] font-semibold"
                    : ""
                }`}
              >
                {t(content.groomName)}
              </h1>
              <div className="my-4 h-px w-20 bg-[rgba(27,23,20,0.2)]" />
              <h1
                className={`editorial-heading ${
                  language === "bn"
                    ? "font-bengali-serif text-[clamp(3rem,7vw,5.6rem)] font-semibold"
                    : ""
                }`}
              >
                {t(content.brideName)}
              </h1>
            </div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className={`editorial-copy mb-8 max-w-[34rem] ${
              language === "bn" ? "font-bengali-sans" : ""
            }`}
          >
            {t(content.inviteText)}
          </motion.p>

          <motion.div variants={itemVariants} className="mb-8 space-y-4">
            <div className="editorial-rule" />
            <div className="grid gap-4 text-sm uppercase tracking-[0.22em] text-[rgba(27,23,20,0.72)] sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-gold" />
                <span>{t(content.date)}</span>
                <span className="text-[rgba(27,23,20,0.38)]">·</span>
                <span>{t(content.time)}</span>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <MapPin size={15} className="text-gold" />
                <span>{t(content.venue)}</span>
                <span className="text-[rgba(27,23,20,0.38)]">·</span>
                <span>{t(content.location)}</span>
              </div>
            </div>
            <div className="editorial-rule" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={onOpenDetails}
              className="editorial-button editorial-button--filled w-full sm:w-auto"
            >
              {t(content.viewDetailsCTA)}
            </button>
            <a
              href={weddingContent.upload.googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleUploadClick}
              className="editorial-button editorial-button--ghost w-full sm:w-auto gap-2"
            >
              {t(content.uploadMemoriesCTA)}
              <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-[42rem] lg:max-w-none">
            <div className="grid grid-cols-12 gap-4 md:gap-5">
              <div className="col-span-8 md:col-span-7 lg:col-span-8">
                <div className="editorial-image-frame aspect-[4/5]">
                  <Image
                    src={profiles?.groom?.image ?? "/images/groom-placeholder.jpg"}
                    alt={t(content.groomName)}
                    fill
                    sizes="(max-width: 768px) 70vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="col-span-4 md:col-span-5 lg:col-span-4 self-end">
                <div className="editorial-image-frame aspect-[3/4] translate-y-6 md:translate-y-10">
                  <Image
                    src={profiles?.bride?.image ?? "/images/bride-placeholder.jpg"}
                    alt={t(content.brideName)}
                    fill
                    sizes="(max-width: 768px) 28vw, 22vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[rgba(27,23,20,0.55)]">
              <span>{t(content.date)}</span>
              <span className="hidden sm:inline">Scroll</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
