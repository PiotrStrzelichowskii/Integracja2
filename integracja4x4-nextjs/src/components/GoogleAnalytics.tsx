'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

// Domyślny Measurement ID - G-FLRT9P6QZD
const DEFAULT_GA_MEASUREMENT_ID = 'G-FLRT9P6QZD';

export default function GoogleAnalytics() {
  const { canUseAnalytics, isLoaded } = useCookieConsent();

  // Użyj ID ze zmiennej środowiskowej lub domyślnego
  const measurementId = GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Gdy ładujemy skrypty dopiero po zgodzie, update consent
    // jest potrzebny tylko w sytuacji, kiedy gtag już istnieje.
    if (!isLoaded || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('consent', 'update', {
      analytics_storage: canUseAnalytics() ? 'granted' : 'denied',
    });
  }, [isLoaded, canUseAnalytics]);

  // Dla wydajności: nie ładuj gtag.js zanim użytkownik wyrazi zgodę
  if (!isLoaded || !canUseAnalytics()) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Ustaw domyślną zgodę na 'denied' - będzie zaktualizowana po załadowaniu preferencji
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
