"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { weddingContent } from "@/data/wedding-content";

interface HeroInvitationProps {
  onOpenDetails: () => void;
}

const demoImages = [
  {
    id: "01",
    src: "/demo/demo-01-bride.jpg",
    fallback: "/demo/demo-01-bride-placeholder.svg",
    alt: "Demo 01 bride editorial portrait",
    depth: 0.45,
  },
  {
    id: "02",
    src: "/demo/demo-02-groom.jpg",
    fallback: "/demo/demo-02-groom-placeholder.svg",
    alt: "Demo 02 groom editorial portrait",
    depth: -0.34,
  },
  {
    id: "03",
    src: "/demo/demo-03-couple.jpg",
    fallback: "/demo/demo-03-couple-placeholder.svg",
    alt: "Demo 03 couple portrait",
    depth: 0.28,
  },
  {
    id: "04",
    src: "/demo/demo-04-flowers.jpg",
    fallback: "/demo/demo-04-flowers-placeholder.svg",
    alt: "Demo 04 flowers detail",
    depth: -0.22,
  },
  {
    id: "05",
    src: "/demo/demo-05-wedding-detail.jpg",
    fallback: "/demo/demo-05-detail-placeholder.svg",
    alt: "Demo 05 wedding detail",
    depth: 0.38,
  },
  {
    id: "06",
    src: "/demo/demo-06-venue.jpg",
    fallback: "/demo/demo-06-venue-placeholder.svg",
    alt: "Demo 06 venue atmosphere",
    depth: -0.18,
  },
];

function FloatingImage({ image, index }: { image: (typeof demoImages)[number]; index: number }) {
  const [src, setSrc] = useState(image.src);

  return (
    <motion.figure
      className={`hero-float hero-float--${image.id}`}
      data-hero-float
      data-depth={image.depth}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.78 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-float__inner">
        <Image
          src={src}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 34vw, (max-width: 1100px) 22vw, 15vw"
          className="object-cover"
          priority={index < 3}
          onError={() => setSrc(image.fallback)}
        />
      </div>
    </motion.figure>
  );
}

export default function HeroInvitation({ onOpenDetails }: HeroInvitationProps) {
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const isBengali = language === "bn";
  const content = weddingContent;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchWidth = window.matchMedia("(max-width: 767px)").matches;
    if (reduceMotion || isTouchWidth) return;

    const layers = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-float]"));
    let pointerX = 0;
    let pointerY = 0;
    let scrollY = window.scrollY;
    let frame: number | null = null;

    const render = () => {
      frame = null;
      const scrollDrift = Math.max(-10, Math.min(10, scrollY * 0.018));
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0.2);
        const x = pointerX * depth;
        const y = pointerY * depth + scrollDrift * Math.abs(depth);
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const requestRender = () => {
      if (frame === null) frame = window.requestAnimationFrame(render);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 26;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
      requestRender();
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      requestRender();
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      requestRender();
    };

    hero.addEventListener("pointermove", handlePointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      hero.removeEventListener("pointermove", handlePointer);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
      layers.forEach((layer) => {
        layer.style.transform = "";
      });
    };
  }, []);

  const reveal = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section ref={heroRef} id="home" className="editorial-hero">
      <div className="hero-shadow hero-shadow--one" aria-hidden="true" />
      <div className="hero-shadow hero-shadow--two" aria-hidden="true" />

      <motion.a
        href="#home"
        className="hero-mark"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        SHAMS <span>×</span> BARIDA
      </motion.a>

      <div className="hero-image-field" aria-label="Replaceable numbered wedding demo images">
        {demoImages.map((image, index) => (
          <FloatingImage key={image.id} image={image} index={index} />
        ))}
      </div>

      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.44 }}
      >
        <motion.p variants={reveal} className="hero-kicker">
          {t(content.hero.familyNotice)}
        </motion.p>
        <h1 className={`hero-title ${isBengali ? "font-bengali-serif" : ""}`}>
          <span className="hero-title__line">
            <motion.span variants={reveal}>{t(content.hero.groomName)}</motion.span>
          </span>
          <motion.i variants={reveal} aria-hidden="true">
            {content.hero.ampersand}
          </motion.i>
          <span className="hero-title__line">
            <motion.span variants={reveal}>{t(content.hero.brideName)}</motion.span>
          </span>
        </h1>
        <motion.p variants={reveal} className="hero-invite">
          {t(content.hero.inviteText)}
        </motion.p>
      </motion.div>

      <motion.aside
        className="hero-details"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>{t(content.hero.date)}</p>
        <div aria-hidden="true" />
        <p>{t(content.program.title)}</p>
        <p>{t(content.program.timeLabel)}</p>
        <p className="hero-details__venue">{t(content.program.venueName)}</p>
      </motion.aside>

      <motion.button
        onClick={onOpenDetails}
        className="hero-action"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {isBengali ? "উদযাপন দেখুন" : "Explore the Celebration"}
        <ArrowUpRight size={15} aria-hidden="true" />
      </motion.button>

      <motion.a
        href="#couple"
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 1.34 }}
        aria-label="Scroll to the couple section"
      >
        <span>{isBengali ? "নিচে দেখুন" : "Scroll"}</span>
        <ArrowDown size={14} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
