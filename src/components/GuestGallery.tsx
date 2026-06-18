"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import GalleryLightbox from "./GalleryLightbox";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function GuestGallery() {
  const { language, t } = useLanguage();
  const gallery = weddingContent.gallery;
  const items = gallery.items || [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [brokenImageIds, setBrokenImageIds] = useState<string[]>([]);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleImageError = (id: string) => {
    setBrokenImageIds((prev) => [...prev, id]);
  };

  const visibleItems = items.filter((item) => !brokenImageIds.includes(item.id));

  return (
    <section id="gallery" className="editorial-section editorial-section--ivory">
      <div className="editorial-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <div className="editorial-label mb-5">
            {language === "bn" ? "স্মৃতির সংগ্রহ" : "Guest Memories"}
          </div>
          <h2 className="editorial-heading text-[clamp(3rem,6.5vw,6rem)]">
            {t(gallery.title)}
          </h2>
          <div className="editorial-rule mt-6 max-w-md" />
        </motion.div>

        {visibleItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl border-y border-[rgba(27,23,20,0.12)] py-14"
          >
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[rgba(27,23,20,0.55)]">
              <Camera size={14} className="text-gold" />
              {language === "bn" ? "অতিথি স্মৃতি" : "Guest Memories"}
            </div>
            <p className="editorial-copy mt-5 max-w-xl">
              {t(gallery.emptyState)}
            </p>
          </motion.div>
        ) : (
          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {visibleItems.map((item, index) => {
              const heightClass =
                item.aspectRatio === "portrait"
                  ? "aspect-[3/4]"
                  : item.aspectRatio === "square"
                  ? "aspect-square"
                  : "aspect-[4/3]";

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: (index % 3) * 0.08 }}
                  className="break-inside-avoid w-full text-left"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="group">
                    <div className={`editorial-image-frame ${heightClass}`}>
                      <Image
                        src={item.url}
                        alt={item.caption ? t(item.caption) : "Guest Memory"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                      />
                    </div>
                    {item.caption && (
                      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[rgba(27,23,20,0.55)]">
                        {t(item.caption)}
                      </p>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

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
