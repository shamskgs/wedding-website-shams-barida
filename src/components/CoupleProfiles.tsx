"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { motion } from "framer-motion";

interface ProfileSpreadProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  details?: string[];
  reverse?: boolean;
}

function ProfileSpread({ name, role, image, bio, details = [], reverse = false }: ProfileSpreadProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-8 lg:gap-12 items-center md:grid-cols-[0.95fr_1.05fr]"
    >
      <div className={`editorial-image-frame aspect-[4/5] md:aspect-[3/4] ${reverse ? "md:order-2" : ""}`}>
        {imageError || !image ? (
          <div className="flex h-full w-full items-center justify-center bg-[#e9e0d0] p-8 text-center">
            <span className="font-calligraphy text-3xl text-[rgba(27,23,20,0.55)]">
              {name}
            </span>
          </div>
        ) : (
          <Image
            src={image}
            alt={`${role} ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            priority
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className={`max-w-2xl ${reverse ? "md:order-1" : ""}`}>
        <div className="editorial-label mb-5">{role}</div>
        <h3 className="editorial-heading text-[clamp(2.8rem,5vw,5rem)]">{name}</h3>
        <div className="editorial-rule my-5" />
        <p className="editorial-copy max-w-xl">{bio}</p>

        {details.length > 0 && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {details.map((detail) => (
              <div
                key={detail}
                className="border-t border-[rgba(27,23,20,0.12)] pt-3 text-[10px] uppercase tracking-[0.22em] text-[rgba(27,23,20,0.62)]"
              >
                {detail}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function CoupleProfiles() {
  const { t } = useLanguage();
  const profiles = weddingContent.profiles;

  return (
    <section id="couple" className="editorial-section editorial-section--cream">
      <div className="editorial-shell">
        <div className="mb-12 md:mb-16">
          <div className="editorial-label mb-5">
            {t(profiles.subtitle)}
          </div>
          <h2 className="editorial-heading text-[clamp(3.2rem,7vw,6.4rem)]">
            {t(profiles.title)}
          </h2>
          <div className="editorial-rule mt-6 max-w-2xl" />
        </div>

        <div className="space-y-14 md:space-y-20">
          <ProfileSpread
            name={t(profiles.groom.name)}
            role={t(profiles.groom.role)}
            image={profiles.groom.image}
            bio={t(profiles.groom.bio)}
            details={profiles.groom.details?.map(t)}
          />

          <div className="editorial-rule max-w-5xl" />

          <ProfileSpread
            name={t(profiles.bride.name)}
            role={t(profiles.bride.role)}
            image={profiles.bride.image}
            bio={t(profiles.bride.bio)}
            details={profiles.bride.details?.map(t)}
            reverse
          />
        </div>
      </div>
    </section>
  );
}
