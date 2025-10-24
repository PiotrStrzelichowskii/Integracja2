'use client';

import { useState, useEffect } from 'react';

export type CookieConsent = 'accepted' | 'rejected' | 'custom' | null;

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sprawdź zapisane preferencje
    const savedConsent = localStorage.getItem('cookie-consent') as CookieConsent;
    const savedAnalyticsConsent = localStorage.getItem('analytics-consent') === 'true';
    
    setConsent(savedConsent);
    setAnalyticsConsent(savedAnalyticsConsent);
    setIsLoaded(true);
  }, []);

  const updateConsent = (newConsent: CookieConsent, analytics: boolean = false) => {
    setConsent(newConsent);
    setAnalyticsConsent(analytics);
    
    localStorage.setItem('cookie-consent', newConsent || '');
    localStorage.setItem('analytics-consent', analytics.toString());
  };

  const hasConsent = () => {
    return consent !== null;
  };

  const canUseAnalytics = () => {
    return consent === 'accepted' || (consent === 'custom' && analyticsConsent);
  };

  return {
    consent,
    analyticsConsent,
    isLoaded,
    updateConsent,
    hasConsent,
    canUseAnalytics,
  };
};



