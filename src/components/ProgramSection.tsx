"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FloralDivider } from "./Ornaments";
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from "lucide-react";
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

  // Generate and download an .ics file for offline/native calendar integration
  const downloadIcsFile = () => {
    // 11 July 2026 7:00 PM (19:00) Dhaka Time (UTC+6)
    // 7:00 PM in Dhaka (+06) is 1:00 PM (13:00) UTC
    // 11:00 PM in Dhaka (+06) is 5:00 PM (17:00) UTC
    const dtStart = "20260711T130000Z"; 
    const dtEnd = "20260711T170000Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Shams and Barida Wedding//NONSGML v1.0//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      "SUMMARY:" + (language === "bn" ? "শামস ও বারিদা এর বিবাহোৎসব" : "Shams & Barida Wedding Celebration"),
      "DESCRIPTION:" + (language === "bn" 
        ? "শামস তাবরেজ অলি ও বারিদা আলী মিথ এর বিবাহোৎসবে আপনার সাদর আমন্ত্রণ।" 
        : "Together with their families, Shams Tabraze Oly and Barida Ali Myth invite you to celebrate their wedding."),
      "LOCATION:SWID Convention Center, 4/A, Swid Bhavan, Eskaton Garden Rd, Dhaka-1000",
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shams_barida_wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="program" className="bg-transparent py-24 px-6 border-b border-white/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
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
          whileHover={{ y: -4 }}
          className="w-full max-w-2xl bg-ivory/72 border border-gold/35 rounded-[1.75rem] p-8 md:p-12 relative overflow-hidden shadow-[0_32px_95px_rgba(23,63,58,0.13)] backdrop-blur-md"
        >
          <motion.div
            aria-hidden="true"
            animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.22, 0.45, 0.22] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            className="absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent blur-2xl"
          />
          {/* Subtle Frame Outline */}
          <div className="absolute inset-4 rounded-[1.25rem] border border-gold/10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center md:text-left relative z-10">
            {/* Column 1: Date */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="p-3 rounded-full bg-ivory text-gold mb-4 shadow-sm border border-gold/10">
                <Calendar size={20} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-peacock font-bold mb-2">
                {language === "bn" ? "তারিখ" : "Date"}
              </h3>
              <p className="text-charcoal/90 text-sm font-medium tracking-wide">
                {t(content.dateLabel)}
              </p>
            </div>

            {/* Column 2: Time */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left border-y md:border-y-0 md:border-x border-gold/15 py-8 md:py-0 md:px-6">
              <div className="p-3 rounded-full bg-ivory text-gold mb-4 shadow-sm border border-gold/10">
                <Clock size={20} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-peacock font-bold mb-2">
                {language === "bn" ? "সময়" : "Time"}
              </h3>
              <p className="text-charcoal/90 text-sm font-medium tracking-wide">
                {t(content.timeLabel)}
              </p>
            </div>

            {/* Column 3: Venue */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="p-3 rounded-full bg-ivory text-gold mb-4 shadow-sm border border-gold/10">
                <MapPin size={20} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-peacock font-bold mb-2">
                {language === "bn" ? "স্থান" : "Venue"}
              </h3>
              <p className="text-charcoal/90 text-sm font-semibold text-peacock">
                {t(content.venueName)}
              </p>
              <p className="text-charcoal/60 text-xs mt-1 leading-relaxed max-w-[200px]">
                {t(content.address)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gold/10 pt-8 relative z-10">
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
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-peacock/20 hover:border-gold text-peacock hover:text-gold text-xs uppercase tracking-[0.15em] font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-peacock/10"
            >
              {t(content.openMapsCTA)}
              <ExternalLink size={12} />
            </a>

            {/* Add to Calendar CTA */}
            <button
              onClick={downloadIcsFile}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-gold/30 hover:border-gold text-charcoal hover:text-gold text-xs uppercase tracking-[0.15em] font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30"
            >
              {t(content.addToCalendarCTA)}
              <CalendarPlus size={12} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
