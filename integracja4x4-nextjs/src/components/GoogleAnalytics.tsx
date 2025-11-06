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
    if (isLoaded && canUseAnalytics() && typeof window !== 'undefined' && window.gtag) {
      // Włącz Google Analytics gdy użytkownik wyraził zgodę
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    } else if (isLoaded && !canUseAnalytics() && typeof window !== 'undefined' && window.gtag) {
      // Wyłącz Google Analytics gdy użytkownik nie wyraził zgody
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  }, [isLoaded, canUseAnalytics]);

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
