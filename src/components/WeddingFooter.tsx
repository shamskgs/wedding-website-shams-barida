"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { WeddingMonogram } from "./Ornaments";

export default function WeddingFooter() {
  const { t } = useLanguage();
  const content = weddingContent.footer;

  return (
    <footer className="bg-charcoal text-ivory py-16 px-6 relative overflow-hidden select-none">
      {/* Soft background line art */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(181,139,78,0.05),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Fine gold monogram */}
        <WeddingMonogram className="mb-6 opacity-40 scale-75" />

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
        <p className="text-white/40 text-[10px] md:text-xs italic tracking-wider font-light">
          {t(content.closingText)}
        </p>
      </div>
    </footer>
  );
}
