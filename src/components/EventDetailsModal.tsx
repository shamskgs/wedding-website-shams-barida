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
      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

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
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[rgba(27,23,20,0.55)]"
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
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="w-full sm:max-w-md bg-[var(--paper-soft)] border border-[rgba(27,23,20,0.12)] rounded-t-3xl sm:rounded-none sm:rounded-[1.5rem] p-8 relative flex flex-col max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-[rgba(27,23,20,0.55)] hover:text-peacock hover:bg-[rgba(27,23,20,0.04)] transition-colors focus:outline-none focus:ring-2 focus:ring-peacock/20"
              aria-label="Close details modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8 mt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-1 block">
                {language === "bn" ? "নিমন্ত্রণ" : "Invitation"}
              </span>
              <h2
                id="modal-title"
                className={`text-peacock leading-none ${
                  language === "bn"
                    ? "font-bengali-serif text-2xl font-bold"
                    : "font-calligraphy text-2xl font-normal"
                }`}
              >
                {t(content.title)}
              </h2>
              <div className="editorial-rule mx-auto mt-4 max-w-[6rem]" />
            </div>

            {/* Modal Content / Description */}
            <div id="modal-description" className="space-y-6 text-charcoal/80 text-sm font-light tracking-wide">
              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[rgba(27,23,20,0.04)] text-gold mt-0.5">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.16em] text-peacock font-semibold mb-1">
                    {language === "bn" ? "তারিখ" : "Date"}
                  </h4>
                  <p className="font-medium">{t(content.dateLabel)}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[rgba(27,23,20,0.04)] text-gold mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.16em] text-peacock font-semibold mb-1">
                    {language === "bn" ? "সময়" : "Time"}
                  </h4>
                  <p className="font-medium">{t(content.timeLabel)}</p>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[rgba(27,23,20,0.04)] text-gold mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.16em] text-peacock font-semibold mb-1">
                    {language === "bn" ? "স্থান ও ঠিকানা" : "Venue & Address"}
                  </h4>
                  <p className="font-semibold text-peacock">{t(content.venueName)}</p>
                  <p className="text-xs text-charcoal/60 mt-1 leading-relaxed">{t(content.address)}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={content.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-button editorial-button--filled w-full gap-2"
              >
                {t(content.openMapsCTA)}
                <ExternalLink size={13} />
              </a>

              <button
                onClick={onClose}
                className="editorial-button editorial-button--ghost w-full"
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
