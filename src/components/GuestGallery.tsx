"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FloralDivider } from "./Ornaments";
import GalleryLightbox from "./GalleryLightbox";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function GuestGallery() {
  const { language, t } = useLanguage();
  const gallery = weddingContent.gallery;
  const items = gallery.items || [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Store broken image IDs to filter them out instead of showing blank shapes
  const [brokenImageIds, setBrokenImageIds] = useState<string[]>([]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleImageError = (id: string) => {
    setBrokenImageIds((prev) => [...prev, id]);
  };

  // Filter out any images that failed to load
  const visibleItems = items.filter((item) => !brokenImageIds.includes(item.id));

  return (
    <section id="gallery" className="bg-transparent py-24 px-6 border-b border-white/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            {language === "bn" ? "ফটোগ্যালারি" : "Gallery"}
          </span>
          <h2
            className={`text-peacock leading-tight ${
              language === "bn"
                ? "font-bengali-serif text-3xl font-semibold"
                : "font-calligraphy text-5xl font-medium"
            }`}
          >
            {t(gallery.title)}
          </h2>
          <FloralDivider />
        </motion.div>

        {/* Masonry Layout or Empty State */}
        {visibleItems.length === 0 ? (
          /* Elegant Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl border border-dashed border-[#D94673]/35 rounded-[1.75rem] p-12 text-center flex flex-col items-center bg-[#FFF7ED]/65 shadow-[inset_0_0_60px_rgba(217,154,36,0.12),0_22px_70px_rgba(217,70,115,0.12)] backdrop-blur-md"
          >
            <div className="p-4 rounded-full bg-ivory text-gold/60 mb-4 border border-gold/10">
              <Camera size={32} />
            </div>
            <p className="text-charcoal/60 text-xs md:text-sm tracking-wider font-light max-w-xs leading-relaxed">
              {t(gallery.emptyState)}
            </p>
          </motion.div>
        ) : (
          /* Responsive Masonry Layout */
          <div className="w-full columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {visibleItems.map((item, index) => {
              // Map ratios to Tailwind class heights to prevent layout shifts
              const heightClass =
                item.aspectRatio === "portrait"
                  ? "aspect-[3/4]"
                  : item.aspectRatio === "square"
                  ? "aspect-square"
                  : "aspect-[4/3]";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                  whileHover={{ y: -5, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
                  className="break-inside-avoid relative overflow-hidden rounded-[1.25rem] border border-[#D99A24]/30 bg-[#FFF7ED]/65 p-2.5 shadow-[0_18px_50px_rgba(217,70,115,0.12)] group hover:shadow-[0_24px_70px_rgba(217,154,36,0.22)] transition-all duration-300 cursor-pointer backdrop-blur-md"
                  onClick={() => handleImageClick(index)}
                >
                  <div className={`relative w-full ${heightClass} bg-ivory overflow-hidden rounded-lg`}>
                    <Image
                      src={item.url}
                      alt={item.caption ? t(item.caption) : "Guest Memory"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={() => handleImageError(item.id)}
                      loading="lazy"
                    />

                    {/* Subtle Gold Hover Overlay */}
                    <div className="absolute inset-0 bg-peacock/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="p-2 rounded-full bg-white/95 text-peacock shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Camera size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Caption (only visible when provided) */}
                  {item.caption && (
                    <div className="mt-3 px-1 text-left">
                      <p className="text-charcoal/80 text-[11px] font-medium tracking-wide">
                        {t(item.caption)}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Lightbox Modal */}
        <GalleryLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          items={visibleItems}
          currentIndex={currentIndex}
          onNavigate={(idx) => setCurrentIndex(idx)}
        />
      </div>
    </section>
  );
}
