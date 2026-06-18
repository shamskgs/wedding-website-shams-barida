"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import AudioPlayer from "./AudioPlayer";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeddingNavbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en");
  };

  const navLinks = weddingContent.navigation.links;

  // Handle smooth scroll for anchors
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-ivory/62 backdrop-blur-xl py-3 shadow-[0_12px_40px_rgba(23,63,58,0.09)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "home")}
            className="flex items-center text-peacock hover:text-gold transition-colors font-calligraphy text-xl md:text-2xl font-semibold tracking-wide"
          >
            {weddingContent.navigation.monogram}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal/80 hover:text-gold transition-colors relative group py-1"
              >
                {t(link.label)}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Controls (Switcher, Audio) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-[11px] font-semibold tracking-wider px-3 py-1.5 rounded-full bg-ivory/62 backdrop-blur-xl text-peacock hover:text-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-[0_8px_24px_rgba(23,63,58,0.06)]"
              aria-label={
                language === "en" ? "বাংলা ভাষায় পরিবর্তন করুন" : "Switch to English"
              }
            >
              {language === "en" ? "বাংলা" : "EN"}
            </button>

            {/* Audio Toggle */}
            <AudioPlayer />

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-peacock hover:text-gold transition-colors focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden absolute top-full left-0 right-0 bg-ivory/78 backdrop-blur-xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col items-center py-6 gap-5 px-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className="text-sm uppercase tracking-[0.15em] font-medium text-charcoal/90 hover:text-gold transition-colors py-2 w-full text-center border-b border-gold/5"
                  >
                    {t(link.label)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
