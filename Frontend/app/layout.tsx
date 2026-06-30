import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  DM_Sans,
} from "next/font/google";

import "./globals.css";

import Navbar from "../components/Navbar";
import AnnouncementBar from "../components/AnnouncementBar";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { AuthProvider } from "../context/AuthContext";

// Fonts
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400"],
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://joy-clothes.vercel.app"),

  title: "shoprine Clothes - Cinematic Streetwear",

  description:
    "Discover premium streetwear inspired by anime, underground culture, and modern aesthetics.",

  keywords: [
    "streetwear",
    "anime fashion",
    "oversized clothing",
    "casual wear",
  ],

  authors: [{ name: "shoprine Clothes" }],

  robots: "index, follow",

  openGraph: {
    title: "shoprine Clothes - Cinematic Streetwear",

    description:
      "Premium streetwear inspired by anime and modern culture",

    type: "website",

    url: "https://joy-clothes.vercel.app",

    images: [
      {
        url: "/branding/Logo_New.png",
        width: 1200,
        height: 630,
        alt: "shoprine Clothes",
      },
    ],
  },
};

// Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// CSP
const metaCSP = `
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' data: https://fonts.gstatic.com;
img-src 'self' https: data:;
connect-src 'self' https://vercel.live;
`.replace(/\s{2,}/g, " ").trim();

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${cormorant.variable}
        ${dmSans.variable}
        h-full antialiased
      `}
    >
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          httpEquiv="Content-Security-Policy"
          content={metaCSP}
        />

        <meta name="X-Content-Type-Options" content="nosniff" />
        <meta name="X-Frame-Options" content="DENY" />
        <meta name="X-XSS-Protection" content="1; mode=block" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="preconnect"
          href="https://lh3.googleusercontent.com"
        />

        <link
          rel="preconnect"
          href="https://images.unsplash.com"
        />

        <link
          rel="preconnect"
          href="https://wallpapercave.com"
        />
      </head>

      <body className="bg-surface text-on-surface min-h-full flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <Navbar />

              <AnnouncementBar />

              <main className="grow md:pb-0">
                {children}
              </main>

              <Footer />

              <MobileNav />
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}