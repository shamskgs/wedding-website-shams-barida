"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";
import { weddingContent, ContactPerson } from "@/data/wedding-content";
import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const { language, t } = useLanguage();
  const contacts = weddingContent.contacts;
  const list = contacts.list || [];

  const isValidContact = (c: ContactPerson) => {
    if (!c.name || !c.phone) return false;
    if (c.name.includes("[") || c.name.includes("]")) return false;
    if (c.phone.includes("[") || c.phone.includes("]")) return false;
    return true;
  };

  const activeContacts = list.filter(isValidContact);
  if (activeContacts.length === 0) return null;

  return (
    <section id="contact" className="editorial-section editorial-section--ivory">
      <div className="editorial-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <div className="editorial-label mb-5">
            {language === "bn" ? "যোগাযোগ" : "Contact"}
          </div>
          <h2 className="editorial-heading text-[clamp(3rem,6.5vw,6rem)]">
            {t(contacts.title)}
          </h2>
          <div className="editorial-rule mt-6 max-w-md" />
        </motion.div>

        <div className="divide-y divide-[rgba(27,23,20,0.12)] border-y border-[rgba(27,23,20,0.12)]">
          {activeContacts.map((contact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: idx * 0.08 }}
              className="grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div>
                {contact.relation && (
                  <div className="editorial-label mb-4">
                    {t(contact.relation)}
                  </div>
                )}
                <h3 className="font-poppins text-[clamp(1.3rem,2vw,1.7rem)] uppercase tracking-[0.16em] text-peacock">
                  {contact.name}
                </h3>
                <p className="mt-3 font-poppins text-sm tracking-[0.16em] text-[rgba(27,23,20,0.62)]">
                  {contact.phone}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="editorial-button editorial-button--filled w-full sm:w-auto gap-2"
                  aria-label={`Call ${contact.name}`}
                >
                  <Phone size={13} />
                  {language === "bn" ? "কল করুন" : "Call"}
                </a>

                <a
                  href={`https://wa.me/${contact.whatsapp ? contact.whatsapp.replace(/[^0-9]/g, "") : contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-button editorial-button--ghost w-full sm:w-auto gap-2"
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
