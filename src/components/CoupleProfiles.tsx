"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";
import { FoliageCorner, FloralDivider } from "./Ornaments";
import { motion as m } from "framer-motion";

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  isBride?: boolean;
}

function ProfileCard({ name, role, image, bio, isBride = false }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="flex flex-col items-center text-center max-w-sm mx-auto group"
    >
      {/* Portrait Container */}
      <div className="relative w-64 h-80 mb-6 p-2 bg-white border border-gold/20 shadow-md transition-transform duration-500 group-hover:scale-[1.02] overflow-hidden">
        {/* Fine border outline inside frame */}
        <div className="absolute inset-3 border border-gold/10 pointer-events-none z-10" />

        {/* Foliage corner details */}
        <FoliageCorner position="top-left" className="top-1 left-1 scale-75" />
        <FoliageCorner position="bottom-right" className="bottom-1 right-1 scale-75" />

        {/* The Image */}
        <div className="w-full h-full relative bg-ivory overflow-hidden flex items-center justify-center">
          {imageError || !image ? (
            /* Elegant Fallback Graphic if image fails to load */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 border border-gold/10 text-gold/40">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" className="mb-2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12 6c-1.93 0-3.5 1.57-3.5 3.5 0 .95.38 1.81 1 2.44L12 18l2.5-6.06c.62-.63 1-1.49 1-2.44C15.5 7.57 13.93 6 12 6z" />
              </svg>
              <span className="font-calligraphy text-xl text-gold/60">{isBride ? "Barida" : "Shams"}</span>
              <span className="text-[9px] uppercase tracking-widest mt-1 text-charcoal/40 font-medium">Photo Placeholder</span>
            </div>
          ) : (
            <Image
              src={image}
              alt={`${role} ${name}`}
              fill
              sizes="(max-width: 768px) 256px, 256px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>

      {/* Role Tag */}
      <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold mb-2 block">
        {role}
      </span>

      {/* Name */}
      <h3 className="font-calligraphy text-3xl text-peacock font-medium mb-4">
        {name}
      </h3>

      {/* Bio Paragraph */}
      <p className="text-charcoal/80 text-xs leading-relaxed tracking-wider font-light max-w-[280px]">
        {bio}
      </p>
    </m.div>
  );
}

export default function CoupleProfiles() {
  const { language, t } = useLanguage();
  const profiles = weddingContent.profiles;

  return (
    <section id="couple" className="bg-ivory py-24 px-6 relative border-b border-gold/10">
      {/* Background soft details */}
      <div className="absolute top-10 left-10 text-sage/15 rotate-12 pointer-events-none hidden md:block">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 C60 20 70 30 100 50 C70 70 60 80 50 100 C40 80 30 70 0 50 C30 30 40 20 50 0 Z" className="opacity-10" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            {language === "bn" ? "পরিচয়" : "Introducing"}
          </span>
          <h2 className={`text-peacock leading-tight ${
            language === "bn" ? "font-bengali-serif text-3xl font-semibold" : "font-calligraphy text-5xl font-medium"
          }`}>
            {t(profiles.title)}
          </h2>
          <FloralDivider />
        </m.div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 w-full justify-center">
          {/* Groom Profile */}
          <ProfileCard
            name={t(profiles.groom.name)}
            role={t(profiles.groom.role)}
            image={profiles.groom.image}
            bio={t(profiles.groom.bio)}
          />

          {/* Bride Profile */}
          <ProfileCard
            name={t(profiles.bride.name)}
            role={t(profiles.bride.role)}
            image={profiles.bride.image}
            bio={t(profiles.bride.bio)}
            isBride={true}
          />
        </div>
      </div>
    </section>
  );
}
