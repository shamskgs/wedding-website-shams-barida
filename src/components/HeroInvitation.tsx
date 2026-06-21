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
  { id: 1, src: "/demo/demo-01-bride.jpg", fallback: "/demo/demo-01-bride-placeholder.svg", alt: "Bride editorial portrait demo image", depth: 0.7 },
  { id: 2, src: "/demo/demo-02-groom.jpg", fallback: "/demo/demo-02-groom-placeholder.svg", alt: "Groom editorial portrait demo image", depth: 0.9 },
  { id: 3, src: "/demo/demo-03-couple-detail.jpg", fallback: "/demo/demo-03-couple-detail-placeholder.svg", alt: "Couple detail demo image", depth: 0.55 },
  { id: 4, src: "/demo/demo-04-flowers.jpg", fallback: "/demo/demo-04-flowers-placeholder.svg", alt: "Wedding flowers demo image", depth: 0.8 },
  { id: 5, src: "/demo/demo-05-wedding-detail.jpg", fallback: "/demo/demo-05-wedding-detail-placeholder.svg", alt: "Wedding detail demo image", depth: 0.45 },
  { id: 6, src: "/demo/demo-06-venue-detail.jpg", fallback: "/demo/demo-06-venue-detail-placeholder.svg", alt: "Venue architecture demo image", depth: 0.65 },
];

function FloatingImage({ image, index }: { image: (typeof demoImages)[number]; index: number }) {
  const [src, setSrc] = useState(image.src);

  return (
    <motion.figure
      className={`hero-floating-image hero-floating-image--${image.id}`}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.72 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hero-image-drift">
        <div className="hero-image-parallax" data-parallax-depth={image.depth}>
          <Image
            src={src}
            alt={image.alt}
            fill
            sizes="(max-width: 767px) 28vw, (max-width: 1100px) 18vw, 14vw"
            className="object-cover"
            priority={image.id <= 2}
            onError={() => setSrc(image.fallback)}
          />
        </div>
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
    if (!hero || window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(hero.querySelectorAll<HTMLElement>("[data-parallax-depth]"));
    let pointerX = 0;
    let pointerY = 0;
    let animationId: number | null = null;

    const render = () => {
      animationId = null;
      const scrollDrift = Math.max(-12, Math.min(12, window.scrollY * 0.018));
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.parallaxDepth ?? 0.5);
        layer.style.transform = `translate3d(${pointerX * depth}px, ${pointerY * depth + scrollDrift * depth}px, 0)`;
      });
    };

    const requestRender = () => {
      if (animationId === null) animationId = window.requestAnimationFrame(render);
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
      requestRender();
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      requestRender();
    };

    hero.addEventListener("pointermove", handlePointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", requestRender, { passive: true });

    return () => {
      hero.removeEventListener("pointermove", handlePointer);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", requestRender);
      if (animationId !== null) window.cancelAnimationFrame(animationId);
    };
  }, []);

  const reveal = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section ref={heroRef} id="home" className="fluid-hero">
      <motion.a
        href="#home"
        className="fluid-hero-mark"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        S <span>&amp;</span> B
      </motion.a>

      <div className="fluid-hero-images" aria-label="Replaceable wedding editorial demo images">
        {demoImages.map((image, index) => <FloatingImage key={image.id} image={image} index={index} />)}
      </div>

      <motion.div
        className="fluid-hero-copy"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.14, delayChildren: 0.32 }}
      >
        <motion.p variants={reveal} className="fluid-hero-eyebrow">{t(content.hero.familyNotice)}</motion.p>
        <h1 className={isBengali ? "font-bengali-serif" : ""}>
          <span className="fluid-name-mask"><motion.span variants={reveal}>{t(content.hero.groomName)}</motion.span></span>
          <motion.i variants={reveal} aria-hidden="true">&amp;</motion.i>
          <span className="fluid-name-mask"><motion.span variants={reveal}>{t(content.hero.brideName)}</motion.span></span>
        </h1>
        <motion.p variants={reveal} className="fluid-hero-invitation">{t(content.hero.inviteText)}</motion.p>
      </motion.div>

      <motion.div
        className="fluid-hero-details"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p>{t(content.hero.date)}</p>
        <span />
        <p>{t(content.program.title)}</p>
        <p>{t(content.program.timeLabel)}</p>
        <p>{t(content.program.venueName)}</p>
      </motion.div>

      <motion.button
        onClick={onOpenDetails}
        className="fluid-hero-action"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.18 }}
      >
        {isBengali ? "অনুষ্ঠান দেখুন" : "Explore the Program"}
        <ArrowUpRight size={15} aria-hidden="true" />
      </motion.button>

      <motion.a
        href="#couple"
        className="fluid-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.35 }}
        aria-label="Scroll to the couple section"
      >
        <span>{isBengali ? "নিচে দেখুন" : "Scroll"}</span>
        <ArrowDown size={14} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
