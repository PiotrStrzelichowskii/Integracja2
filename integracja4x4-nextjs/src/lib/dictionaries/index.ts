import { pl } from './pl';
import { en } from './en';

export const dictionaries = {
  pl,
  en,
} as const;

export type Language = keyof typeof dictionaries;
export type TranslationKey = keyof typeof pl;

export const getDictionary = (language: Language) => {
  return dictionaries[language];
};
