"use client";

import React, { useState, useRef } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/components/LanguageContext";
import { AudioProvider } from "@/components/AudioContext";
import WeddingNavbar from "@/components/WeddingNavbar";
import HeroInvitation from "@/components/HeroInvitation";
import WeddingCountdown from "@/components/WeddingCountdown";
import CoupleProfiles from "@/components/CoupleProfiles";
import ProgramSection from "@/components/ProgramSection";
import InvitationCardsSection from "@/components/InvitationCardsSection";
import EventDetailsModal from "@/components/EventDetailsModal";
import MemoryUploadSection from "@/components/MemoryUploadSection";
import GuestGallery from "@/components/GuestGallery";
import FamilyMessage from "@/components/FamilyMessage";
import ContactSection from "@/components/ContactSection";
import WeddingFooter from "@/components/WeddingFooter";
import BotanicalShadowBackground from "@/components/BotanicalShadowBackground";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const detailsButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <LanguageProvider>
      <AudioProvider>
        <MotionConfig reducedMotion="user">
        <div className="relative min-h-screen editorial-story">
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <BotanicalShadowBackground />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col overflow-x-clip">
          {/* Global Navigation Bar */}
          <WeddingNavbar />

          <main className="relative z-10 flex-grow">
            {/* Sections */}
            <HeroInvitation onOpenDetails={() => setModalOpen(true)} />
            <WeddingCountdown />
            <CoupleProfiles />
            <ProgramSection 
              onOpenDetails={() => setModalOpen(true)} 
              viewDetailsButtonRef={detailsButtonRef}
            />
            <InvitationCardsSection />
            <MemoryUploadSection />
            <GuestGallery />
            <FamilyMessage />
            <ContactSection />
          </main>

          {/* Understated Footer */}
          <WeddingFooter />

          {/* Accessible Event Details Modal */}
          <EventDetailsModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            triggerRef={detailsButtonRef}
          />
          </div>
        </div>
        </MotionConfig>
      </AudioProvider>
    </LanguageProvider>
  );
}
