import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-ivory text-charcoal flex flex-col font-poppins">
        {children}
      </body>
    </html>
  );
}
