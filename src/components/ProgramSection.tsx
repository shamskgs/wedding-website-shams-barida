"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
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
    <section id="program" className="editorial-section editorial-section--ivory">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <div className="editorial-label mb-5">
            {language === "bn" ? "অনুষ্ঠানসূচি" : "The Program"}
          </div>
          <h2
            className={`editorial-heading text-[clamp(3rem,6.5vw,6.2rem)] ${
              language === "bn" ? "font-bengali-serif font-semibold" : ""
            }`}
          >
            {t(content.title)}
          </h2>
          <div className="editorial-rule my-6 max-w-sm" />
          <p className="editorial-copy max-w-md">
            {language === "bn"
              ? "সময়, স্থান এবং যাত্রাপথটি এখানে একসঙ্গে রাখা হয়েছে, যাতে অতিথিরা সহজে অনুষ্ঠানটি অনুসরণ করতে পারেন।"
              : "Date, time, and venue are laid out with the same clarity and restraint as the rest of the invitation."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="max-w-3xl"
        >
          <div className="editorial-rule mb-6" />

          <div className="grid gap-8">
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[rgba(27,23,20,0.58)]">
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} className="text-gold" />
                {t(content.dateLabel)}
              </span>
              <span className="hidden sm:inline text-[rgba(27,23,20,0.28)]">/</span>
              <span className="inline-flex items-center gap-2">
                <Clock size={14} className="text-gold" />
                {t(content.timeLabel)}
              </span>
            </div>

            <div className="grid gap-5 rounded-none border-y border-[rgba(27,23,20,0.12)] py-6 md:grid-cols-[0.78fr_1.22fr] md:gap-10">
              <div>
                <h3 className="font-poppins text-[10px] uppercase tracking-[0.28em] text-[rgba(27,23,20,0.55)]">
                  {language === "bn" ? "স্থান" : "Venue"}
                </h3>
                <p className="mt-3 font-calligraphy text-[clamp(2.1rem,4vw,3.4rem)] leading-[0.95] text-peacock">
                  {t(content.venueName)}
                </p>
              </div>
              <div>
                <p className="editorial-copy">{t(content.address)}</p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    ref={viewDetailsButtonRef}
                    onClick={onOpenDetails}
                    className="editorial-button editorial-button--filled w-full sm:w-auto"
                  >
                    {language === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
                  </button>

                  <a
                    href={content.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-button editorial-button--ghost w-full sm:w-auto gap-2"
                  >
                    {t(content.openMapsCTA)}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
