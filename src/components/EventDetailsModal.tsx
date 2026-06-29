"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const content = weddingContent.program;
  const contact =
    weddingContent.contacts.list.find((person) => person.name === "Sabbir") ??
    weddingContent.contacts.list[0];

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;
    const triggerElement = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusableElementsString =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusTimer = window.setTimeout(() => {
      modalRef.current
        ?.querySelector<HTMLElement>(focusableElementsString)
        ?.focus();
    }, shouldReduceMotion ? 0 : 120);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = Array.from(
        modal.querySelectorAll<HTMLElement>(focusableElementsString)
      ).filter((element) => element.offsetParent !== null);
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
      (triggerElement ?? previousActiveElement)?.focus();
    };
  }, [isOpen, onClose, shouldReduceMotion, triggerRef]);

  const portalRoot = typeof document === "undefined" ? null : document.body;
  if (!portalRoot) return null;

  const overlayMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  const panelMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 0, scale: 1 },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 18, scale: 0.98 },
      };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={onClose}
          {...overlayMotion}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            ref={modalRef}
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-modal-title"
            aria-describedby="details-modal-description"
            onClick={(event) => event.stopPropagation()}
            {...panelMotion}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              onClick={onClose}
              className="modal-close"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="details-modal__header">
              <p className="details-modal__eyebrow">
                {language === "bn" ? "অনুষ্ঠান" : "The Program"}
              </p>
              <h2
                id="details-modal-title"
                className={`modal-title ${
                  language === "bn" ? "font-bengali-serif font-semibold" : "font-display"
                }`}
              >
                {t(content.title)}
              </h2>
            </div>

            <div id="details-modal-description" className="modal-body">
              <section className="modal-group modal-group--two">
                <div>
                  <p className="modal-label">
                    <Calendar size={15} aria-hidden="true" />
                    {language === "bn" ? "তারিখ" : "Date"}
                  </p>
                  <p className="modal-strong">{t(content.dateLabel)}</p>
                </div>
                <div>
                  <p className="modal-label">
                    <Clock size={15} aria-hidden="true" />
                    {language === "bn" ? "সময়" : "Time"}
                  </p>
                  <p className="modal-strong">{t(content.timeLabel)}</p>
                </div>
              </section>

              <section className="modal-group">
                <p className="modal-label">
                  <MapPin size={15} aria-hidden="true" />
                  {language === "bn" ? "স্থান" : "Venue"}
                </p>
                <p
                  className={`modal-venue ${
                    language === "bn" ? "font-bengali-serif" : "font-display"
                  }`}
                >
                  {t(content.venueName)}
                </p>
                <address className="modal-address">
                  {language === "bn" ? (
                    t(content.address)
                  ) : (
                    <>
                      4/A, Swid Bhavan
                      <br />
                      Eskaton Garden Road
                      <br />
                      Dhaka 1000
                    </>
                  )}
                </address>
              </section>

              <section className="modal-group">
                <a
                  href={content.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-button modal-button--primary"
                >
                  {t(content.openMapsCTA)}
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </section>

              <section className="modal-group">
                <p className="modal-label">{language === "bn" ? "যোগাযোগ" : "Contact"}</p>
                <div className="modal-contact">
                  <div>
                    <p className="modal-contact__name">{contact.name}</p>
                    <a href={`tel:${contact.phone}`} className="modal-contact__phone">
                      {contact.phone}
                    </a>
                  </div>
                  <div className="modal-contact__actions">
                    <a href={`tel:${contact.phone}`} className="modal-button modal-button--secondary">
                      <Phone size={15} aria-hidden="true" />
                      {language === "bn" ? "কল করুন" : "Call"}
                    </a>
                    {contact.whatsapp && (
                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/^\+/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-button modal-button--secondary"
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </section>

              <section
                className="modal-group modal-group--actions"
                aria-label={language === "bn" ? "মডাল অ্যাকশন" : "Modal actions"}
              >
                <button onClick={onClose} className="modal-button modal-button--secondary">
                  {language === "bn" ? "বন্ধ করুন" : "Close"}
                </button>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
}
