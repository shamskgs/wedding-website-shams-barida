# Shams & Barida Wedding Celebration Website

An elegant, premium, bilingual (English and Bangla) wedding website announcing the marriage of **Shams Tabraze Oly** and **Barida Ali Myth**. 

Features an abstract animated background, dynamic countdown, interactive program card with `.ics` calendar download, profiles, a photo/video upload call-to-action, a manually approved memories gallery with a responsive lightbox, family blessings, and help contacts.

---

## 🛠 Technology Stack

* **Core**: [Next.js](https://nextjs.org/) (App Router, React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Fonts**: `Great Vibes` (Calligraphy), `Poppins` (English body/UI), `Noto Serif Bengali` (Bangla Headings), and `Hind Siliguri` (Bangla Body).

---

## ⚙️ How to Run Locally

### 1. Environment Prerequisite
Node.js and npm are pre-configured locally inside the `.node-bin` folder in this workspace. To run any development command, you must append this folder to your session `PATH`.

### 2. Install Dependencies
Install packages using the local environment path (adding `--legacy-peer-deps` due to React 19 compatibility tags):
```bash
export PATH="$(pwd)/.node-bin/bin:$PATH"
npm install --legacy-peer-deps
```

### 3. Run the Development Server
Launch the local development server:
```bash
export PATH="$(pwd)/.node-bin/bin:$PATH"
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### 4. Build for Production
Verify typescript compile-checks and build optimizing packages:
```bash
export PATH="$(pwd)/.node-bin/bin:$PATH"
npm run build
```

---

## 📝 Customization Guide

All text, translations, dates, profile pictures, and links are managed inside a single file:

📍 `src/data/wedding-content.ts`

Owners can modify the website entirely by editing this file through GitHub; Vercel will automatically rebuild and redeploy the site on push.

### 1. Update Event Details
Locate `program` in `wedding-content.ts` and modify details:
```typescript
program: {
  dateLabel: { en: "Saturday, 11 July 2026", bn: "শনিবার, ১১ জুলাই ২০২৬" },
  timeLabel: { en: "7:00 PM – 11:00 PM", bn: "সন্ধ্যা ৭টা – রাত ১১টা" },
  venueName: { en: "SWID Convention Center", bn: "SWID Convention Center" },
  address: {
    en: "4/A, Swid Bhavan, Eskaton Garden Rd, Dhaka-1000",
    bn: "৪/এ, সুইড ভবন, ইস্কাটন গার্ডেন রোড, ঢাকা-১০০০"
  },
  googleMapsUrl: "https://www.google.com/maps/place/Swid+Convention+Center/..."
}
```

### 2. Configure the Countdown Target Date
Change the target ISO timestamp in `countdown.targetDate`. Make sure to maintain the offset `+06:00` for Dhaka, Bangladesh:
```typescript
countdown: {
  targetDate: "2026-07-11T19:00:00+06:00", // Year-Month-DayTHour:Minute:Second+Timezone
  // ...
}
```

### 3. Replace Profile Photographs
Place your new portraits inside the `public/images/` folder:
* Groom photo: `/public/images/groom-placeholder.jpg`
* Bride photo: `/public/images/bride-placeholder.jpg`

You can edit these image paths inside the `profiles` object:
```typescript
groom: {
  image: "/images/groom-placeholder.jpg",
  // ...
}
```

### 4. Edit Biographies & Texts
Update the biographical summaries in English (`en`) and Bangla (`bn`) within the `profiles` object:
```typescript
groom: {
  bio: {
    en: "Your English biography...",
    bn: "আপনার বাংলা জীবনী..."
  }
}
```

### 5. Link Google Drive Upload Folder
Paste your shared Google Drive link in `upload.googleDriveLink`. If left as the placeholder `[PASTE ...`, a friendly popup warning is shown:
```typescript
upload: {
  googleDriveLink: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID",
  // ...
}
```

### 6. Add Approved Images to the Guest Gallery
To add guest uploads to the public gallery:
1. Save the image in `public/images/guest-gallery/` (e.g. `memory-1.jpg`).
2. Add a new entry to the `gallery.items` array in `src/data/wedding-content.ts`:
```typescript
gallery: {
  items: [
    {
      id: "memory-1",
      url: "/images/guest-gallery/memory-1.jpg",
      caption: { en: "A beautiful moment", bn: "একটি সুন্দর মুহূর্ত" },
      aspectRatio: "portrait" // 'portrait' | 'landscape' | 'square'
    }
  ]
}
```
* The masonry layout is fully responsive and auto-aligns items based on their defined `aspectRatio`.

### 7. Background Music Configuration
* To add background music: Place an mp3 file at `/public/audio/wedding-theme.mp3`.
* Enable/Disable the toggle button: Adjust `music.enabled` (`true` to show controls in Navbar, `false` to hide them).
* **Browser Autoplay Compliance**: The music player will never autoplay with sound. Sound starts only after user interaction (clicking the toggle) and caches user mute choices for the current browser session.

### 8. Customize Abstract Animation
The animated fluid gradient backdrop is rendered by `src/components/AbstractWeddingBackground.tsx`.
* It uses low-opacity colors (`Warm Ivory`, `Soft Sage`, `Dusty Rose`, `Antique Gold`, `Deep Peacock Green`) drawn dynamically on an HTML5 canvas.
* Respects `prefers-reduced-motion` and pauses animations for users with sensory preferences, loading a graceful static ivory mesh instead.
* Uses `pointer-events: none` to prevent interference with page clicks.

### 9. Configure Help Contacts
Provide support contacts for guests in the `contacts.list` array:
```typescript
contacts: {
  list: [
    {
      name: "Contact Person Name",
      phone: "+880 1712-345678",
      relation: { en: "Groom's Family Representative", bn: "বরের পক্ষ থেকে" }
    }
  ]
}
```
* **Graceful Hiding**: If the contact name or phone remains set as the placeholder bracket string `[Contact Person Name]` or is empty, the card is automatically hidden. If all cards are empty, the entire support section is hidden from the UI.

---

## 🚀 Deployment to Vercel

The site is production-ready and configured to deploy directly to Vercel:

1. Push your codebase to a private/public **GitHub** repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select your GitHub repository.
4. Keep all build settings as default (Next.js preset). Vercel will automatically detect the configuration and build the site.
5. Click **Deploy**. Vercel will trigger a production compilation and serve the wedding website.
