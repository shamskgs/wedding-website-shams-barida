export type LocalizedText = {
  en: string;
  bn: string;
};

export interface Profile {
  name: LocalizedText;
  role: LocalizedText;
  image: string;
  bio: LocalizedText;
  details?: LocalizedText[];
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: LocalizedText;
  aspectRatio: "portrait" | "landscape" | "square";
}

export interface ContactPerson {
  name: string;
  phone: string;
  whatsapp?: string; // Optional WhatsApp number or link
  relation?: LocalizedText; // e.g. "Groom's Side" / "Bride's Side"
}

export const weddingContent = {
  seo: {
    title: {
      en: "Shams & Barida | Wedding Celebration",
      bn: "শামস ও বারিদা | বিবাহোৎসব"
    },
    description: {
      en: "Together with their families, Shams Tabraze Oly and Barida Ali Myth invite you to celebrate their wedding on 11 July 2026 in Dhaka.",
      bn: "পরিবারের সবার ভালোবাসা ও আশীর্বাদে, শামস তাবরেজ অলি ও বারিদা আলী মিথ তাঁদের বিবাহোৎসবে আপনাকে সাদর আমন্ত্রণ জানাচ্ছেন।"
    },
    url: "https://shams-weds-barida.vercel.app",
    previewImage: "/images/wedding-social-preview.jpg"
  },
  
  navigation: {
    monogram: "Shams × Barida",
    links: [
      { id: "home", label: { en: "Home", bn: "হোম" } },
      { id: "couple", label: { en: "Couple", bn: "বর-কনে" } },
      { id: "program", label: { en: "Program", bn: "অনুষ্ঠান" } },
      { id: "memories", label: { en: "Memories", bn: "স্মৃতিমালা" } },
      { id: "contact", label: { en: "Contact", bn: "যোগাযোগ" } }
    ]
  },

  hero: {
    familyNotice: {
      en: "Together with their families",
      bn: "পরিবারের সবার ভালোবাসা ও আশীর্বাদে"
    },
    groomName: {
      en: "Shams Tabraze Oly",
      bn: "শামস তাবরেজ অলি"
    },
    ampersand: "&",
    brideName: {
      en: "Barida Ali Myth",
      bn: "বারিদা আলী মিথ"
    },
    inviteText: {
      en: "Invite you to celebrate their wedding",
      bn: "তাঁদের বিবাহোৎসবে আপনাকে সাদর আমন্ত্রণ"
    },
    date: {
      en: "11 July 2026",
      bn: "১১ জুলাই ২০২৬"
    },
    time: {
      en: "7:00 PM",
      bn: "সন্ধ্যা ৭টা"
    },
    venue: {
      en: "SWID Convention Center",
      bn: "SWID Convention Center"
    },
    location: {
      en: "Dhaka",
      bn: "ঢাকা"
    },
    viewDetailsCTA: {
      en: "View Details",
      bn: "বিস্তারিত দেখুন"
    },
    uploadMemoriesCTA: {
      en: "Upload Your Memories",
      bn: "আপনার স্মৃতি আপলোড করুন"
    }
  },

  countdown: {
    targetDate: "2026-07-11T19:00:00+06:00", // Dhaka Time Zone (+06:00)
    completionMessage: {
      en: "Today, our forever begins.",
      bn: "আজ শুরু হচ্ছে আমাদের চিরদিনের পথচলা।"
    },
    labels: {
      days: { en: "Days", bn: "দিন" },
      hours: { en: "Hours", bn: "ঘণ্টা" },
      minutes: { en: "Minutes", bn: "মিনিট" },
      seconds: { en: "Seconds", bn: "সেকেন্ড" }
    }
  },

  profiles: {
    title: {
      en: "The Couple",
      bn: "বর ও কনে"
    },
    subtitle: {
      en: "Two hearts, one journey",
      bn: "দুটি মন, এক মোহনায়"
    },
    groom: {
      name: { en: "Shams Tabraze Oly", bn: "শামস তাবরেজ অলি" },
      role: { en: "The Groom", bn: "বর" },
      image: "/images/groom-placeholder.jpg",
      bio: {
        en: "Thoughtful, creative, and deeply connected to the people he loves, Shams begins this new chapter with gratitude, joy, and an open heart.",
        bn: "সৃজনশীল, যত্নশীল এবং প্রিয় মানুষদের প্রতি গভীরভাবে নিবেদিত শামস কৃতজ্ঞতা, আনন্দ ও ভালোবাসা নিয়ে জীবনের নতুন অধ্যায় শুরু করছেন।"
      },
      details: [
        { en: "Senior UI/UX Designer", bn: "সিনিয়র UI/UX ডিজাইনার" },
        { en: "BSc Engineer", bn: "বিএসসি ইঞ্জিনিয়ার" },
        { en: "Photographer", bn: "ফটোগ্রাফার" },
        { en: "Tabla Player", bn: "তবলা বাদক" }
      ]
    } as Profile,
    bride: {
      name: { en: "Barida Ali Myth", bn: "বারিদা আলী মিথ" },
      role: { en: "The Bride", bn: "কনে" },
      image: "/images/bride-placeholder.jpg",
      bio: {
        en: "Graceful, warm, and full of life, Barida brings kindness and joy into every moment as she steps into this beautiful new journey.",
        bn: "মার্জিত, প্রাণবন্ত ও উষ্ণ হৃদয়ের বারিদা তাঁর সদয়তা ও আনন্দ নিয়ে জীবনের এই সুন্দর নতুন যাত্রায় পা রাখছেন।"
      },
      details: [
        { en: "Executive, Cargo Reservation", bn: "এক্সিকিউটিভ, কার্গো রিজার্ভেশন" },
        { en: "Oman Air", bn: "Oman Air" },
        { en: "MA in English", bn: "ইংরেজিতে এমএ" },
        { en: "Makeup Enthusiast", bn: "মেকআপ এনথুজিয়াস্ট" }
      ]
    } as Profile
  },

  program: {
    title: {
      en: "The Program",
      bn: "অনুষ্ঠান"
    },
    dateLabel: {
      en: "Saturday, 11 July 2026",
      bn: "শনিবার, ১১ জুলাই ২০২৬"
    },
    timeLabel: {
      en: "7:00 PM – 11:00 PM",
      bn: "সন্ধ্যা ৭টা – রাত ১১টা"
    },
    venueName: {
      en: "SWID Convention Center",
      bn: "SWID Convention Center"
    },
    address: {
      en: "4/A, Swid Bhavan, Eskaton Garden Rd, Dhaka-1000",
      bn: "৪/এ, সুইড ভবন, ইস্কাটন গার্ডেন রোড, ঢাকা-১০০০"
    },
    googleMapsUrl: "https://www.google.com/maps/place/Swid+Convention+Center/@23.7466634,90.4008646,1046m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3755b891752849fb:0xd06cbfacc2599e0c!8m2!3d23.7466634!4d90.4008646!16s%2Fg%2F11f3x56tfk?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D",
    openMapsCTA: {
      en: "Open in Google Maps",
      bn: "গুগল ম্যাপে দেখুন"
    },
    addToCalendarCTA: {
      en: "Add to Calendar",
      bn: "ক্যালেন্ডারে যুক্ত করুন"
    }
  },

  upload: {
    title: {
      en: "Share Your Memories",
      bn: "আপনার স্মৃতিগুলো শেয়ার করুন"
    },
    description: {
      en: "Captured a beautiful moment from our celebration? Share your photos and videos with us so we can treasure the day through your eyes.",
      bn: "আমাদের অনুষ্ঠানের কোনো সুন্দর মুহূর্ত ক্যামেরাবন্দি করেছেন? আপনার ছবি ও ভিডিও আমাদের সঙ্গে শেয়ার করুন, যেন আপনার চোখে দেখা দিনটির স্মৃতিও আমরা ধরে রাখতে পারি।"
    },
    cta: {
      en: "Upload Photos & Videos",
      bn: "ছবি ও ভিডিও আপলোড করুন"
    },
    // Replace with the actual link when available
    googleDriveLink: "[PASTE SHARED GOOGLE DRIVE FOLDER LINK HERE]",
    fallbackMessage: {
      en: "Google Drive folder link is not configured yet.",
      bn: "গুগল ড্রাইভ ফোল্ডার লিংক এখনও কনফিগার করা হয়নি।"
    },
    privacyNote: {
      en: "Your uploads will be added to our shared wedding memories folder.",
      bn: "আপনার আপলোড করা ফাইল আমাদের শেয়ার করা বিবাহের স্মৃতি ফোল্ডারে যুক্ত হবে।"
    }
  },

  gallery: {
    title: {
      en: "Guest Memories",
      bn: "অতিথিদের স্মৃতি"
    },
    emptyState: {
      en: "Beautiful memories from the celebration will appear here.",
      bn: "অনুষ্ঠানের সুন্দর স্মৃতিগুলো এখানে দেখা যাবে।"
    },
    // Populate this array with approved memories
    // Aspect ratio can be: 'portrait', 'landscape', or 'square' for editorial masonry styling
    items: [
      // {
      //   id: "1",
      //   url: "/images/guest-gallery/memory-1.jpg",
      //   caption: { en: "The lovely couple", bn: "প্রিয় জুটি" },
      //   aspectRatio: "portrait"
      // }
    ] as GalleryItem[]
  },

  familyMessage: {
    title: {
      en: "With Love from Our Families",
      bn: "আমাদের পরিবারের ভালোবাসায়"
    },
    message: {
      en: "With joyful hearts, our families invite you to share in this cherished celebration. Your presence, love, and blessings will make the beginning of our new journey even more meaningful.",
      bn: "আনন্দভরা হৃদয়ে আমাদের পরিবার আপনাকে এই প্রিয় উদযাপনে অংশ নেওয়ার আমন্ত্রণ জানাচ্ছে। আপনার উপস্থিতি, ভালোবাসা ও আশীর্বাদ আমাদের নতুন পথচলার শুরুটিকে আরও অর্থবহ করে তুলবে।"
    }
  },

  contacts: {
    title: {
      en: "Need Help?",
      bn: "সহায়তা প্রয়োজন?"
    },
    list: [
      {
        name: "Sayeam",
        phone: "01775822428",
        whatsapp: "+8801775822428",
        relation: { en: "Groom's Family Representative", bn: "বরের পক্ষ থেকে" }
      },
      {
        name: "Talha",
        phone: "01715537406",
        whatsapp: "+8801715537406",
        relation: { en: "Bride's Family Representative", bn: "কনের পক্ষ থেকে" }
      }
    ] as ContactPerson[]
  },

  music: {
    youtubeVideoId: "Hf03SC8l-f4",
    youtubeUrl: "https://www.youtube.com/watch?v=Hf03SC8l-f4&list=RDHf03SC8l-f4&start_radio=1",
    // Set to true to show music control button in the Navbar
    // Set to false if there is no audio file or you wish to hide it
    enabled: true
  },

  footer: {
    monogram: "11.07.2026",
    coupleNames: {
      en: "Shams Tabraze Oly & Barida Ali Myth",
      bn: "শামস তাবরেজ অলি ও বারিদা আলী মিথ"
    },
    details: {
      en: "11 July 2026 · Dhaka",
      bn: "১১ জুলাই ২০২৬ · ঢাকা"
    },
    closingText: {
      en: "Made with love for a day to remember.",
      bn: "ভালোবাসায় তৈরি, স্মরণীয় একটি দিনের জন্য।"
    }
  }
};
