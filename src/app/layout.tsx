import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://hayatplus.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hayat+ Heart Tonic | Nature's Daily Support for a Healthy Heart",
    template: "%s | Hayat+",
  },
  description:
    "Hayat+ Heart Tonic is a premium herbal blend of Ginger, Garlic, Lemon, Honey and Apple Cider Vinegar crafted to support heart health, healthy circulation, immune wellness and everyday vitality.",
  keywords: [
    "Hayat+",
    "Heart Tonic",
    "herbal wellness",
    "heart health supplement",
    "natural circulation support",
    "apple cider vinegar tonic",
  ],
  openGraph: {
    title: "Hayat+ Heart Tonic | Nature's Daily Support for a Healthy Heart",
    description:
      "A premium herbal blend crafted to support heart health, healthy circulation, immune wellness and everyday vitality.",
    url: siteUrl,
    siteName: "Hayat+",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayat+ Heart Tonic",
    description:
      "Nature's daily support for a healthy heart — a premium herbal formula.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="antialiased bg-primary text-ink">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
