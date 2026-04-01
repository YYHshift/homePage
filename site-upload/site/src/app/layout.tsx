import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yuhe Yang · Personal Homepage",
  description:
    "Portfolio hub for Yuhe (Stewie) Yang — data & AI engineer focused on Next.js, FastAPI, and Supabase.",
  metadataBase: new URL("https://yuheyang.vercel.app"),
  openGraph: {
    title: "Yuhe Yang · Data & AI Engineer",
    description:
      "Showcase of projects, experience, and skills powered by a local SQLite data layer.",
    url: "https://yuheyang.vercel.app",
    siteName: "Yuhe Yang",
    images: [{ url: "/portrait.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuhe Yang · Personal Homepage",
    description:
      "End-to-end builder across clinical data platforms, LLM ETL, and product UX.",
    images: ["/portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
