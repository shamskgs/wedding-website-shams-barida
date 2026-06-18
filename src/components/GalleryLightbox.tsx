"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/data/wedding-content";

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: GalleryLightboxProps) {
  const { language, t } = useLanguage();
  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(nextIndex);
  }, [currentIndex, items, onNavigate]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prevIndex);
  }, [currentIndex, items, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Touch Swipe handlers
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      handleNext(); // Swipe Left -> Next
    } else if (touchEndX - touchStartX > swipeThreshold) {
      handlePrev(); // Swipe Right -> Prev
    }
  };

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-md select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Backdrop Close Click */}
        <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label={language === "bn" ? "বন্ধ করুন" : "Close Lightbox"}
        >
          <X size={24} />
        </button>

        {/* Left Nav Button */}
        {items.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={language === "bn" ? "পূর্ববর্তী ছবি" : "Previous Image"}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Right Nav Button */}
        {items.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label={language === "bn" ? "পরবর্তী ছবি" : "Next Image"}
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Main Media Container */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[80vh] aspect-auto flex flex-col items-center z-10"
        >
          <div className="relative w-[85vw] sm:w-[70vw] md:w-[60vw] h-[65vh] max-h-[70vh]">
            <Image
              src={currentItem.url}
              alt={currentItem.caption ? t(currentItem.caption) : "Wedding memory"}
              fill
              sizes="85vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Caption Overlay */}
          {currentItem.caption && (
            <div className="text-center mt-4 max-w-xl px-6">
              <p className="text-white font-light text-sm tracking-wide">
                {t(currentItem.caption)}
              </p>
            </div>
          )}

          {/* Image index counter */}
          {items.length > 1 && (
            <span className="text-[10px] uppercase tracking-widest text-white/40 mt-2">
              {currentIndex + 1} / {items.length}
            </span>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
