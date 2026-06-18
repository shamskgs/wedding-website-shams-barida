"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";

export default function WeddingFooter() {
  const { t } = useLanguage();
  const content = weddingContent.footer;

  return (
    <footer className="bg-[linear-gradient(135deg,#173F3A_0%,#282421_58%,#1f2f2c_100%)] text-ivory py-16 px-6 relative overflow-hidden select-none">
      {/* Soft background line art */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(181,139,78,0.18),transparent_55%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <div className="mb-6 rounded-full bg-white/8 px-5 py-2 text-[10px] uppercase tracking-[0.32em] text-gold shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          {content.monogram}
        </div>

        {/* Names */}
        <h3 className="font-calligraphy text-2xl md:text-3xl text-gold mb-2">
          {t(content.coupleNames)}
        </h3>

        {/* Date and Location */}
        <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-6 font-medium">
          {t(content.details)}
        </p>

        {/* Short divider */}
        <div className="h-[1px] w-12 bg-gold/20 mb-6" />

        {/* Closing phrase */}
        <p className="text-white/50 text-[10px] md:text-xs italic tracking-wider font-light">
          {t(content.closingText)}
        </p>
      </div>
    </footer>
  );
}
