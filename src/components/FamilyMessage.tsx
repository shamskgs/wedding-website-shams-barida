"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FloralDivider, FoliageCorner } from "./Ornaments";
import { motion } from "framer-motion";

export default function FamilyMessage() {
  const { language, t } = useLanguage();
  const content = weddingContent.familyMessage;

  return (
    <section className="bg-white py-24 px-6 border-b border-gold/10 relative overflow-hidden">
      {/* Decorative foliage detail corners */}
      <div className="absolute top-0 right-0 w-24 h-24 text-sage/15 rotate-90 pointer-events-none hidden md:block">
        <FoliageCorner position="top-right" className="scale-75" />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 text-sage/15 -rotate-90 pointer-events-none hidden md:block">
        <FoliageCorner position="bottom-left" className="scale-75" />
      </div>

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Editorial Frame Wrap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="w-full max-w-xl p-8 md:p-12 bg-ivory/25 border border-gold/15 rounded-2xl relative shadow-sm"
        >
          {/* Subtle inside line */}
          <div className="absolute inset-3 border border-gold/5 pointer-events-none" />

          {/* Heading */}
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-2 block">
            {language === "bn" ? "আশীর্বাদ" : "Blessings"}
          </span>
          <h2
            className={`text-peacock mb-4 leading-tight ${
              language === "bn"
                ? "font-bengali-serif text-2xl font-bold"
                : "font-poppins text-lg font-bold tracking-wide"
            }`}
          >
            {t(content.title)}
          </h2>

          <FloralDivider className="py-2" />

          {/* Emotional Message Body */}
          <p
            className={`text-charcoal/85 text-xs md:text-sm leading-relaxed tracking-wider font-light italic mt-6 max-w-md mx-auto ${
              language === "bn" ? "font-bengali-sans" : "font-poppins"
            }`}
          >
            &ldquo;{t(content.message)}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
