import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MATDAAN — Nepal Digital Voting System 2025",
  description:
    "Official digital voting platform for the Nepal 2025 General Election. Secure, transparent, and accessible voting for every Nepalese citizen.",
  keywords: [
    "Nepal",
    "Digital Voting",
    "Election 2025",
    "Matdaan",
    "मतदान",
    "E-Voting",
    "Nepal Election Commission",
  ],
  authors: [{ name: "Election Commission of Nepal" }],
  robots: "noindex, nofollow", // Government demo - not for public indexing
};

import OfflineStatus from "@/components/common/OfflineStatus";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSansDevanagari.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-text-primary"
        style={{
          fontFamily: "var(--font-noto-devanagari), var(--font-inter), system-ui, sans-serif",
        }}
      >
        <OfflineStatus />
        {children}
      </body>
    </html>
  );
}
