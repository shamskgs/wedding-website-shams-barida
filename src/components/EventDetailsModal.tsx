"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { X, Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  triggerRef,
}: EventDetailsModalProps) {
  const { language, t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const content = weddingContent.program;

  // Prevent background scrolling and trap focus
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore focus on close
    const previousActiveElement = document.activeElement as HTMLElement;
    const triggerElement = triggerRef.current;

    // Disable body scroll
    document.body.style.overflow = "hidden";

    // Focus trapping logic
    const focusableElementsString =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = Array.from(
      modal.querySelectorAll<HTMLElement>(focusableElementsString)
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (firstFocusableElement) {
      // Small delay to let animations complete
      setTimeout(() => firstFocusableElement.focus(), 100);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement?.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus
      const focusTarget = triggerElement ?? previousActiveElement;
      focusTarget?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(7,8,11,0.72)] px-0 py-0 sm:items-center sm:p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass modal-panel relative flex max-h-[92vh] w-full flex-col overflow-y-auto border border-[rgba(255,255,255,0.12)] bg-[rgba(20,22,30,0.88)] p-6 text-[var(--text-primary)] sm:max-w-2xl sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--champagne)] focus:outline-none focus:ring-2 focus:ring-[rgba(211,186,134,0.28)]"
              aria-label="Close details modal"
            >
              <X size={20} />
            </button>

            <div className="mb-8 mt-2 text-center">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--champagne)]">
                {language === "bn" ? "নিমন্ত্রণ" : "Invitation"}
              </span>
              <h2
                id="modal-title"
                className={`leading-none text-[var(--text-primary)] ${
                  language === "bn"
                    ? "font-bengali-serif text-[clamp(2rem,4vw,3rem)] font-semibold"
                    : "font-display text-[clamp(2.8rem,5vw,4.8rem)] font-medium"
                }`}
              >
                {t(content.title)}
              </h2>
              <div className="mx-auto mt-4 h-px w-24 bg-[rgba(211,186,134,0.42)]" />
            </div>

            <div id="modal-description" className="space-y-5 text-sm tracking-wide text-[var(--text-secondary)]">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-full border border-[rgba(211,186,134,0.28)] p-2 text-[var(--champagne)]">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--champagne)]">
                    {language === "bn" ? "তারিখ" : "Date"}
                  </h4>
                  <p className="font-medium text-[var(--text-primary)]">{t(content.dateLabel)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-full border border-[rgba(211,186,134,0.28)] p-2 text-[var(--champagne)]">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--champagne)]">
                    {language === "bn" ? "সময়" : "Time"}
                  </h4>
                  <p className="font-medium text-[var(--text-primary)]">{t(content.timeLabel)}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-full border border-[rgba(211,186,134,0.28)] p-2 text-[var(--champagne)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--champagne)]">
                    {language === "bn" ? "স্থান ও ঠিকানা" : "Venue & Address"}
                  </h4>
                  <p className="font-display text-[clamp(1.8rem,3.2vw,3rem)] font-medium leading-none text-[var(--text-primary)]">
                    {t(content.venueName)}
                  </p>
                  <p className="mt-2 max-w-xl text-xs leading-relaxed text-[var(--text-secondary)]">
                    {t(content.address)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={content.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-button editorial-button--filled w-full gap-2 sm:w-auto"
              >
                {t(content.openMapsCTA)}
                <ExternalLink size={13} />
              </a>

              <button
                onClick={onClose}
                className="editorial-button editorial-button--ghost w-full sm:w-auto"
              >
                {language === "bn" ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
