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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
            ? "bg-[rgba(247,241,231,0.96)] py-3 border-b border-[rgba(27,23,20,0.08)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="editorial-shell px-6 flex items-center justify-between gap-4">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "home")}
            className="flex items-center font-calligraphy text-lg md:text-2xl text-peacock transition-colors hover:text-gold"
          >
            {weddingContent.navigation.monogram}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className="text-[10px] uppercase tracking-[0.26em] font-medium text-[rgba(27,23,20,0.76)] hover:text-peacock transition-colors relative group py-1"
              >
                {t(link.label)}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-peacock transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Controls (Switcher, Audio) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="editorial-button editorial-button--ghost py-2 px-3 text-[10px]"
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
              className="md:hidden p-2 text-peacock hover:text-gold transition-colors focus:outline-none"
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
              className="md:hidden fixed inset-0 top-[4.25rem] bg-[rgba(246,240,229,0.96)] backdrop-blur-xl overflow-hidden"
            >
              <div className="flex min-h-full flex-col justify-center py-10 gap-6 px-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className="text-3xl font-display text-peacock transition-colors hover:text-wine py-2 w-full text-center"
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
