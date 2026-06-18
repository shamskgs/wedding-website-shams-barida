"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { motion } from "framer-motion";

export default function FamilyMessage() {
  const { language, t } = useLanguage();
  const content = weddingContent.familyMessage;

  return (
    <section className="editorial-section editorial-section--dark">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-sm"
        >
          <div className="editorial-label text-[rgba(246,239,230,0.68)] mb-5">
            {language === "bn" ? "পরিবারের বার্তা" : "From Our Families"}
          </div>
          <h2
            className={`editorial-heading editorial-heading--dark text-[clamp(2.8rem,6vw,5.4rem)] ${
              language === "bn" ? "font-bengali-serif font-semibold" : ""
            }`}
          >
            {t(content.title)}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="max-w-3xl"
        >
          <div className="editorial-rule editorial-rule--dark mb-7" />
          <p
            className={`editorial-copy editorial-copy--dark max-w-2xl text-[clamp(1.05rem,1.6vw,1.25rem)] ${
              language === "bn" ? "font-bengali-sans" : ""
            }`}
          >
            {t(content.message)}
          </p>
          <div className="mt-10 editorial-rule editorial-rule--dark" />
        </motion.div>
      </div>
    </section>
  );
}
