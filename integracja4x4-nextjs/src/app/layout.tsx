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
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSetter from "@/components/LanguageSetter";

const staatliches = localFont({
  src: "../../public/fonts/Staatliches/Staatliches-Regular.ttf",
  variable: "--font-staatliches",
  display: "swap",
});

const montserrat = localFont({
  src: "../../public/fonts/Montserrat/Montserrat/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Integracja4x4 - Profesjonalne szkolenia offroad",
  description: "Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie.",
  keywords: "szkoła jazdy terenowej, offroad, 4x4, Toyota Land Cruiser, szkolenia, Kraków, Małopolska, off-road training, 4x4 driving school, Poland",
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
  openGraph: {
    title: "Integracja4x4 - Profesjonalne szkolenia offroad",
    description: "Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie.",
    type: "website",
    locale: "pl_PL",
    siteName: "Integracja4x4",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integracja4x4 - Profesjonalne szkolenia offroad",
    description: "Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie.",
  },
  other: {
    'msapplication-navbutton-color': '#252525',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Integracja4x4',
  },
  alternates: {
    languages: {
      'pl': '/',
      'en': '/?lang=en',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#252525', // Ciemny szary kolor odpowiadający bg-mud-dark
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="overflow-x-hidden" dir="ltr">
      <head>
        <title>Integracja4x4 - Profesjonalne szkolenia offroad</title>
        <meta name="description" content="Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie." />
        <meta name="keywords" content="szkoła jazdy terenowej, offroad, 4x4, Toyota Land Cruiser, szkolenia, Kraków, Małopolska, off-road training, 4x4 driving school, Poland" />
        <meta name="language" content="pl" />
        <meta name="geo.region" content="PL-MA" />
        <meta name="geo.placename" content="Kraków" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Integracja4x4 - Profesjonalne szkolenia offroad" />
        <meta property="og:description" content="Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Integracja4x4" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Integracja4x4 - Profesjonalne szkolenia offroad" />
        <meta name="twitter:description" content="Profesjonalne szkolenia jazdy terenowej. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="alternate" hrefLang="pl" href="/" />
        <link rel="alternate" hrefLang="en" href="/?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className={`${staatliches.variable} ${montserrat.variable} overflow-x-hidden`} lang="pl" dir="ltr" style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
        <GoogleAnalytics />
        <Providers>
          <LanguageSetter />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div id="__next" role="application" aria-label="Aplikacja Integracja4x4" lang="pl">
              {children}
            </div>
            <CookieBanner />
          </TooltipProvider>
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}



