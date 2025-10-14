import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";

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
      <body className={`${staatliches.variable} ${robotoSlab.variable} overflow-x-hidden`}>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}

