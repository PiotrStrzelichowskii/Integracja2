'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

export default function GoogleAnalytics() {
  const { canUseAnalytics, isLoaded } = useCookieConsent();

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

  // Nie renderuj nic jeśli nie ma Measurement ID
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
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
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
