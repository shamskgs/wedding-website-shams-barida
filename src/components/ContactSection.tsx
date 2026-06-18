"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent, ContactPerson } from "@/data/wedding-content";
import { FloralDivider } from "./Ornaments";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const { language, t } = useLanguage();
  const contacts = weddingContent.contacts;
  const list = contacts.list || [];

  // Helper to validate if contact is a placeholder or has been replaced
  const isValidContact = (c: ContactPerson) => {
    if (!c.name || !c.phone) return false;
    // Check if it contains the placeholder template bracket strings
    if (c.name.includes("[") || c.name.includes("]")) return false;
    if (c.phone.includes("[") || c.phone.includes("]")) return false;
    return true;
  };

  // Filter out invalid/placeholder contacts
  const activeContacts = list.filter(isValidContact);

  // If no contact cards are configured, hide the section gracefully
  if (activeContacts.length === 0) return null;

  return (
    <section id="contact" className="bg-transparent py-24 px-6 border-b border-white/30 relative">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            {language === "bn" ? "জিজ্ঞাসা" : "Questions"}
          </span>
          <h2
            className={`text-peacock leading-tight ${
              language === "bn"
                ? "font-bengali-serif text-3xl font-semibold"
                : "font-calligraphy text-5xl font-medium"
            }`}
          >
            {t(contacts.title)}
          </h2>
          <FloralDivider />
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl justify-center">
          {activeContacts.map((contact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-[#FFF7ED]/70 border border-[#D99A24]/35 rounded-[1.25rem] p-6 shadow-[0_22px_70px_rgba(217,154,36,0.16)] flex flex-col items-center text-center relative backdrop-blur-md"
            >
              {/* Optional relation tag (Groom's Side / Bride's Side) */}
              {contact.relation && (
                <span className="text-[9px] uppercase tracking-widest text-gold bg-ivory/50 px-2 py-0.5 rounded border border-gold/10 font-semibold mb-3">
                  {t(contact.relation)}
                </span>
              )}

              {/* Name */}
              <h3 className="text-peacock font-semibold text-sm uppercase tracking-wider mb-1">
                {contact.name}
              </h3>

              {/* Phone text representation */}
              <p className="text-charcoal/60 text-xs tracking-widest mb-6 font-mono">
                {contact.phone}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                {/* Dial Call Button */}
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="flex-1 py-2.5 bg-ivory hover:bg-gold text-peacock hover:text-white rounded-full text-xs uppercase tracking-wider font-semibold border border-gold/25 flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none"
                  aria-label={`Call ${contact.name}`}
                >
                  <Phone size={13} />
                  {language === "bn" ? "কল করুন" : "Call"}
                </a>

                {/* WhatsApp Button (uses phone number directly or whatsapp custom parameter) */}
                <a
                  href={`https://wa.me/${contact.whatsapp ? contact.whatsapp.replace(/[^0-9]/g, "") : contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-full text-xs uppercase tracking-wider font-semibold border border-emerald-100 flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none"
                  aria-label={`Chat with ${contact.name} on WhatsApp`}
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
