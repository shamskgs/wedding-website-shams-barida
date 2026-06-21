"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const cards = [
  {
    title: "Bride’s Invitation Card",
    titleBn: "কনের নিমন্ত্রণপত্র",
    src: "/cards/brides-invitation-card.png",
    download: "Shams-Barida-Brides-Invitation.png",
    button: "Download Bride’s Card",
    buttonBn: "কনের নিমন্ত্রণপত্র ডাউনলোড করুন",
  },
  {
    title: "Groom’s Invitation Card",
    titleBn: "বরের নিমন্ত্রণপত্র",
    src: "/cards/grooms-invitation-card.png",
    download: "Shams-Barida-Grooms-Invitation.png",
    button: "Download Groom’s Card",
    buttonBn: "বরের নিমন্ত্রণপত্র ডাউনলোড করুন",
  },
];

export default function InvitationCardsSection() {
  const { language } = useLanguage();

  return (
    <section id="invitations" className="editorial-section invitation-cards-section">
      <div className="editorial-shell">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <div className="editorial-label justify-center mb-5">
            {language === "bn" ? "নিমন্ত্রণ" : "The Invitation"}
          </div>
          <h2 className="editorial-heading text-[clamp(3.2rem,7vw,6.4rem)]">
            {language === "bn" ? "আমাদের নিমন্ত্রণপত্র" : "Our Invitation Cards"}
          </h2>
          <div className="ornamental-divider mx-auto my-6" aria-hidden="true"><span /></div>
          <p className="editorial-copy mx-auto max-w-xl">
            {language === "bn"
              ? "প্রতিটি পরিবারের জন্য প্রস্তুত করা নিমন্ত্রণপত্রটি বেছে নিন এবং ডাউনলোড করুন।"
              : "Choose and download the invitation prepared for each family."}
          </p>
        </motion.header>

        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-14">
          {cards.map((card, index) => (
            <motion.article
              key={card.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="invitation-card"
            >
              <h3 className="mb-5 font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-wine">
                {language === "bn" ? card.titleBn : card.title}
              </h3>
              <a href={card.src} target="_blank" rel="noopener noreferrer" className="invitation-card-preview">
                <Image
                  src={card.src}
                  alt={language === "bn" ? card.titleBn : card.title}
                  width={1200}
                  height={1697}
                  sizes="(max-width: 767px) 92vw, 44vw"
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
              </a>
              <a href={card.src} download={card.download} className="editorial-button editorial-button--filled mt-6 w-full gap-2">
                <Download size={15} aria-hidden="true" />
                {language === "bn" ? card.buttonBn : card.button}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
