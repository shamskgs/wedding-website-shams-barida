"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FloralDivider } from "./Ornaments";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ProgramSectionProps {
  onOpenDetails: () => void;
  viewDetailsButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export default function ProgramSection({
  onOpenDetails,
  viewDetailsButtonRef,
}: ProgramSectionProps) {
  const { language, t } = useLanguage();
  const content = weddingContent.program;

  return (
    <section id="program" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            {language === "bn" ? "তারিখ ও ভেন্যু" : "Details"}
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

        {/* Editorial Program Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="w-full max-w-3xl bg-ivory/34 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_30px_100px_rgba(23,63,58,0.13)]"
        >
          <div className="relative z-10 flex flex-col items-center text-center gap-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/36 px-5 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.16em] text-peacock shadow-[0_12px_34px_rgba(23,63,58,0.07)]">
                <Calendar size={17} className="text-gold" />
                {t(content.dateLabel)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/36 px-5 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.16em] text-peacock shadow-[0_12px_34px_rgba(23,63,58,0.07)]">
                <Clock size={17} className="text-gold" />
                {t(content.timeLabel)}
              </span>
            </div>

            <div className="flex max-w-xl flex-col items-center gap-3 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-peacock text-ivory shadow-[0_16px_36px_rgba(23,63,58,0.20)]">
                <MapPin size={20} />
              </span>
              <div>
                <h3 className="font-calligraphy text-3xl text-peacock">
                  {t(content.venueName)}
                </h3>
                <p className="mt-2 text-sm text-charcoal/70 leading-relaxed tracking-wide">
                  {t(content.address)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-4 relative z-10">
            {/* View Details CTA */}
            <button
              ref={viewDetailsButtonRef}
              onClick={onOpenDetails}
              className="w-full sm:w-auto px-6 py-3 bg-peacock hover:bg-gold text-ivory text-xs uppercase tracking-[0.15em] font-semibold rounded-full transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gold"
            >
              {language === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
            </button>

            {/* Google Maps CTA */}
            <a
              href={content.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-white/34 backdrop-blur-xl hover:bg-white/50 text-peacock hover:text-gold text-xs uppercase tracking-[0.15em] font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-peacock/10 shadow-[0_12px_34px_rgba(23,63,58,0.07)]"
            >
              {t(content.openMapsCTA)}
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
