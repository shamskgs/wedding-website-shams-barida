"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";

export default function WeddingFooter() {
  const { t } = useLanguage();
  const content = weddingContent.footer;

  return (
    <footer className="editorial-section editorial-section--dark py-20">
      <div className="editorial-shell text-center">
        <div className="editorial-label justify-center mb-6 text-[rgba(246,239,230,0.64)]">
          {content.monogram}
        </div>
        <h3 className="editorial-heading editorial-heading--dark text-[clamp(2.6rem,5vw,4.8rem)]">
          {t(content.coupleNames)}
        </h3>
        <div className="editorial-rule editorial-rule--dark mx-auto my-6 max-w-sm" />
        <p className="font-poppins text-[10px] uppercase tracking-[0.28em] text-[rgba(246,239,230,0.58)]">
          {t(content.details)}
        </p>
        <p className="mt-4 font-poppins text-[10px] uppercase tracking-[0.28em] text-[rgba(246,239,230,0.7)]">
          {t(content.thankYou)}
        </p>
        <p className="mt-6 max-w-xl mx-auto editorial-copy editorial-copy--dark text-sm">
          {t(content.closingText)}
        </p>
      </div>
    </footer>
  );
}
