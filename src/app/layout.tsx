import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shams-weds-barida.vercel.app"),
  title: "Shams & Barida | Wedding Celebration",
  description: "Together with their families, Shams Tabraze Oly and Barida Ali Myth invite you to celebrate their wedding on 11 July 2026 in Dhaka.",
  openGraph: {
    title: "Shams & Barida | Wedding Celebration",
    description: "Together with their families, Shams Tabraze Oly and Barida Ali Myth invite you to celebrate their wedding on 11 July 2026 in Dhaka.",
    url: "https://shams-weds-barida.vercel.app",
    siteName: "Shams & Barida Wedding",
    images: [
      {
        url: "/images/wedding-social-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Shams & Barida Wedding Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shams & Barida | Wedding Celebration",
    description: "Together with their families, Shams Tabraze Oly and Barida Ali Myth invite you to celebrate their wedding on 11 July 2026 in Dhaka.",
    images: ["/images/wedding-social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-ivory text-charcoal flex flex-col font-poppins">
        {children}
      </body>
    </html>
  );
}
