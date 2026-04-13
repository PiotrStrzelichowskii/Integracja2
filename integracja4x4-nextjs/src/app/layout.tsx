import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Manrope } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
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

const BASE_URL = "https://integracja4x4.pl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Integracja4x4 – Szkolenia Offroad 4x4 i Eventy Firmowe | Kraków",
    template: "%s | Integracja4x4",
  },
  description: "Profesjonalne szkolenia jazdy terenowej 4x4 i quadami ATV, eventy firmowe oraz team building off-road. Działamy od 1993 roku. Kraków i cała Polska.",
  keywords: [
    "szkolenia offroad", "jazda terenowa 4x4", "szkolenia 4x4 Kraków",
    "eventy firmowe off-road", "team building offroad", "quady ATV szkolenie",
    "Toyota Land Cruiser szkolenie", "integracja firmowa terenowa",
    "off-road Polska", "wynajem samochodów terenowych",
  ],
  authors: [{ name: "Integracja4x4", url: BASE_URL }],
  creator: "Integracja4x4",
  publisher: "Integracja4x4 – Mariusz Strzelichowski",
  category: "Sport & Recreation",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: '/assets/logo-Photoroom.webp',
    shortcut: '/assets/logo-Photoroom.webp',
    apple: '/assets/logo-Photoroom.webp',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Integracja4x4 – Szkolenia Offroad 4x4 i Eventy Firmowe",
    description: "Profesjonalne szkolenia jazdy terenowej 4x4 i quadami ATV, eventy firmowe oraz team building off-road. Od 1993 roku. Kraków i cała Polska.",
    url: BASE_URL,
    type: "website",
    locale: "pl_PL",
    siteName: "Integracja4x4",
    images: [
      {
        url: "/assets/og_integracja.webp",
        width: 1200,
        height: 630,
        alt: "Integracja4x4 – szkolenia offroad 4x4 i eventy firmowe w terenie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integracja4x4 – Szkolenia Offroad 4x4 i Eventy Firmowe",
    description: "Profesjonalne szkolenia jazdy terenowej 4x4 i quadami ATV, eventy firmowe oraz team building off-road. Od 1993 roku.",
    images: ["/assets/og_integracja.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    'msapplication-navbutton-color': '#252525',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Integracja4x4',
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'pl': '/',
      'en': '/?lang=en',
      'x-default': '/',
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
        <meta name="geo.region" content="PL-MA" />
        <meta name="geo.placename" content="Kraków" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://integracja4x4.pl/#business",
                  "name": "Integracja4x4",
                  "description": "Profesjonalne szkolenia jazdy terenowej 4x4 i quadami ATV, eventy firmowe oraz team building off-road. Działamy od 1993 roku.",
                  "url": "https://integracja4x4.pl",
                  "telephone": "+48501318521",
                  "email": "info@integracja4x4.pl",
                  "foundingDate": "1993",
                  "founder": { "@type": "Person", "name": "Mariusz Strzelichowski" },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "ul. Powstania Styczniowego",
                    "addressLocality": "Kraków",
                    "postalCode": "30-298",
                    "addressCountry": "PL",
                    "addressRegion": "Małopolska",
                  },
                  "areaServed": { "@type": "Country", "name": "Polska" },
                  "priceRange": "$$",
                  "image": "https://integracja4x4.pl/assets/og_integracja.webp",
                  "logo": "https://integracja4x4.pl/logo.webp",
                  "sameAs": [
                    "https://www.facebook.com/integracja4x4",
                    "https://www.instagram.com/integracja4x4.pl/",
                    "https://www.youtube.com/channel/UCJyTmHY9czMaXCd3HplVylQ",
                  ],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Oferta Integracja4x4",
                    "itemListElement": [
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Szkolenia indywidualne 4x4 i quady", "description": "Jazda 4x4 i quadami ATV w wymagającym terenie, dla początkujących i zaawansowanych." } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Eventy firmowe i integracje 4x4", "description": "Imprezy integracyjne i team building off-road dla firm." } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Współpraca partnerska off-road", "description": "Współpraca z agencjami, hotelami i markami przy organizacji eventów outdoorowych." } },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://integracja4x4.pl/#website",
                  "url": "https://integracja4x4.pl",
                  "name": "Integracja4x4",
                  "inLanguage": ["pl", "en"],
                  "publisher": { "@id": "https://integracja4x4.pl/#business" },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${staatliches.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${manrope.variable} overflow-x-hidden`} dir="ltr" style={{ touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
        <GoogleAnalytics />
        <Providers>
          <LanguageSetter />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div id="__next" role="application" aria-label="Aplikacja Integracja4x4">
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



