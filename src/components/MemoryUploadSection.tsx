"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { Upload, ExternalLink, Image as ImageIcon, Video } from "lucide-react";
import { motion } from "framer-motion";

export default function MemoryUploadSection() {
  const { language, t } = useLanguage();
  const content = weddingContent.upload;

  const handleUploadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (content.googleDriveLink.includes("[PASTE")) {
      e.preventDefault();
      alert(t(content.fallbackMessage));
    }
  };

  return (
    <section id="memories" className="editorial-section editorial-section--cream">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="editorial-label mb-5">
            {language === "bn" ? "স্মৃতি ভাগ করুন" : "Share Memories"}
          </div>
          <h2
            className={`editorial-heading text-[clamp(2.8rem,6vw,5.8rem)] ${
              language === "bn" ? "font-bengali-serif font-semibold" : ""
            }`}
          >
            {t(content.title)}
          </h2>
          <div className="editorial-rule my-6 max-w-md" />
          <p className="editorial-copy max-w-xl">
            {t(content.description)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-8 text-[10px] uppercase tracking-[0.26em] text-[rgba(27,23,20,0.6)]">
            <span className="inline-flex items-center gap-2">
              <ImageIcon size={14} className="text-gold" />
              {language === "bn" ? "ছবি" : "Photos"}
            </span>
            <span className="inline-flex items-center gap-2">
              <Video size={14} className="text-gold" />
              {language === "bn" ? "ভিডিও" : "Videos"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="memory-upload-panel"
        >
          <div className="memory-upload-panel__body">
            <div className="editorial-label mb-4">
              {language === "bn" ? "আপলোড" : "Upload"}
            </div>
            <p className="editorial-copy max-w-xl">
              {t(content.privacyNote)}
            </p>
            <a
              href={content.googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleUploadClick}
              className="editorial-button editorial-button--filled mt-8 w-full gap-3 sm:w-auto"
            >
              <Upload size={14} />
              {t(content.cta)}
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
