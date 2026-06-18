"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FloralDivider } from "./Ornaments";
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
    <section id="memories" className="bg-ivory py-24 px-6 border-b border-gold/10 relative">
      {/* Decorative leaf swirl background detail */}
      <div className="absolute bottom-6 right-10 text-sage/15 rotate-45 pointer-events-none hidden md:block">
        <svg width="180" height="180" viewBox="0 0 120 120" fill="currentColor">
          <path d="M 60 10 C 70 30 90 50 110 60 C 90 70 70 90 60 110 C 50 90 30 70 10 60 C 30 50 50 30 60 10 Z" className="opacity-10" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            {language === "bn" ? "শেয়ার করুন" : "Upload"}
          </span>
          <h2
            className={`text-peacock leading-tight ${
              language === "bn"
                ? "font-bengali-serif text-3xl font-semibold"
                : "font-calligraphy text-5xl font-medium"
            }`}
          >
            {t(content.title)}
          </h2>
          <FloralDivider />
        </motion.div>

        {/* Informative description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-charcoal/80 text-sm md:text-base leading-relaxed tracking-wider font-light max-w-xl mb-12"
        >
          {t(content.description)}
        </motion.p>

        {/* Media visual indicators */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center gap-12 mb-12 text-gold/80"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-full bg-white border border-gold/10 shadow-sm">
              <ImageIcon size={24} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal/50">
              {language === "bn" ? "ছবি" : "Photos"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="p-4 rounded-full bg-white border border-gold/10 shadow-sm">
              <Video size={24} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal/50">
              {language === "bn" ? "ভিডিও" : "Videos"}
            </span>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col items-center"
        >
          <a
            href={content.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleUploadClick}
            className="w-full sm:w-auto px-10 py-4 bg-peacock hover:bg-gold text-ivory font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Upload size={14} />
            {t(content.cta)}
            <ExternalLink size={12} className="opacity-80" />
          </a>

          {/* Privacy Note */}
          <span className="text-[10px] text-charcoal/50 tracking-wider mt-4 block italic">
            * {t(content.privacyNote)}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
