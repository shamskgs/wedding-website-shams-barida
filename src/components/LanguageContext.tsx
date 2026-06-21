"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (localizedText: { en: string; bn: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  useEffect(() => {
    const savedLang = localStorage.getItem("wedding-lang") as Language;
    const initialLanguage = savedLang === "en" || savedLang === "bn" ? savedLang : "en";
    document.documentElement.setAttribute("lang", initialLanguage);
    const timer = window.setTimeout(() => setLanguageState(initialLanguage), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("wedding-lang", lang);
    document.documentElement.setAttribute("lang", lang);
  };

  const t = (localizedText: { en: string; bn: string }) => {
    if (!localizedText) return "";
    return language === "bn" ? localizedText.bn : localizedText.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
