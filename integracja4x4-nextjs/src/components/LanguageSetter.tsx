"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

export default function LanguageSetter() {
  const { language } = useLanguage();

  useEffect(() => {
    // Ustaw język w elemencie HTML
    document.documentElement.lang = language;
    document.documentElement.setAttribute('lang', language);
    
    // Ustaw język w elemencie body
    document.body.lang = language;
    document.body.setAttribute('lang', language);
    
    // Ustaw język w elemencie __next
    const nextElement = document.getElementById('__next');
    if (nextElement) {
      nextElement.lang = language;
      nextElement.setAttribute('lang', language);
    }
  }, [language]);

  return null;
}
