import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const staatliches = localFont({
  src: "../../public/fonts/Staatliches/Staatliches-Regular.ttf",
  variable: "--font-staatliches",
  display: "swap",
});

const robotoSlab = localFont({
  src: "../../public/fonts/Roboto_Slab/RobotoSlab-VariableFont_wght.ttf",
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Integracja4x4 - Profesjonalne szkolenia offroad",
  description: "Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie.",
  keywords: "szkoła jazdy terenowej, offroad, 4x4, Toyota Land Cruiser, szkolenia, Kraków, Małopolska",
  authors: [{ name: "Integracja4x4" }],
  creator: "Integracja4x4",
  publisher: "Integracja4x4",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-navbutton-color': '#252525',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Integracja4x4',
  },
};

export const viewport: Viewport = {
  themeColor: '#252525', // Ciemny szary kolor odpowiadający bg-mud-dark
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <head>
        <title>Integracja4x4 - Profesjonalne szkolenia offroad</title>
        <meta name="language" content="pl" />
        <meta name="geo.region" content="PL-MA" />
        <meta name="geo.placename" content="Kraków" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className={`${staatliches.variable} ${robotoSlab.variable} overflow-x-hidden`}>
        <GoogleAnalytics />
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
            <CookieBanner />
          </TooltipProvider>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}



