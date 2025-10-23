"use client";

import { useLanguage } from './use-language';
import { getDictionary, TranslationKey } from '@/lib/dictionaries';
import { useEffect, useState } from 'react';

export const useTranslations = () => {
  const { language } = useLanguage();
  const [dictionary, setDictionary] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(language);
      setDictionary(dict);
    };
    loadDictionary();
  }, [language]);
  
  const t = (key: TranslationKey): string => {
    return dictionary[key] || key;
  };

  return {
    t,
    language,
    dictionary
  };
};
