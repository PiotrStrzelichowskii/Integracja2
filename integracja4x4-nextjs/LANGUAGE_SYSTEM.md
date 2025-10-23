# 🌍 System Języków PL/EN

## ✅ **ZREALIZOWANE FUNKCJE:**

### 1. **Przełącznik Języków**
- ✅ **Desktop**: Obok navbara z ikoną globusa i flagami
- ✅ **Mobile**: W menu mobilnym z pełną listą języków
- ✅ **Dropdown**: Elegancki dropdown z flagami i nazwami języków
- ✅ **Animacje**: Smooth transitions i hover effects

### 2. **Zarządzanie Stanem**
- ✅ **localStorage**: Zapamiętuje wybór języka
- ✅ **React Hook**: `useLanguage()` do zarządzania stanem
- ✅ **TypeScript**: Pełne typowanie

### 3. **System Tłumaczeń**
- ✅ **Plik tłumaczeń**: `src/lib/translations.ts`
- ✅ **Hook**: `useTranslations()` do używania tłumaczeń
- ✅ **TypeScript**: Type-safe tłumaczenia

## 🚀 **JAK UŻYWAĆ:**

### **1. Dodawanie nowych tłumaczeń:**

```typescript
// src/lib/translations.ts
export const translations = {
  pl: {
    // ... istniejące tłumaczenia
    newKey: 'Nowy tekst po polsku'
  },
  en: {
    // ... istniejące tłumaczenia  
    newKey: 'New text in English'
  }
}
```

### **2. Używanie w komponentach:**

```typescript
import { useTranslations } from '@/hooks/use-translations';

const MyComponent = () => {
  const { t } = useTranslations();
  
  return (
    <div>
      <h1>{t('newKey')}</h1>
    </div>
  );
};
```

### **3. Sprawdzanie aktualnego języka:**

```typescript
import { useLanguage } from '@/hooks/use-language';

const MyComponent = () => {
  const { language, isPolish, isEnglish } = useLanguage();
  
  return (
    <div>
      <p>Aktualny język: {language}</p>
      {isPolish && <p>Witaj!</p>}
      {isEnglish && <p>Welcome!</p>}
    </div>
  );
};
```

## 📁 **STRUKTURA PLIKÓW:**

```
src/
├── hooks/
│   ├── use-language.tsx      # Hook do zarządzania językiem
│   └── use-translations.tsx  # Hook do tłumaczeń
├── lib/
│   └── translations.ts       # Plik z tłumaczeniami
└── components/
    ├── LanguageSwitcher.tsx  # Komponent przełącznika
    └── Header.tsx           # Header z przełącznikiem
```

## 🎨 **DESIGN:**

### **Desktop:**
- Przełącznik obok navbara
- Separator z linią
- Dropdown z flagami i nazwami

### **Mobile:**
- W menu mobilnym
- Pełna lista języków
- Centrowany layout

## 🔧 **KONFIGURACJA:**

### **Dodawanie nowego języka:**

1. **Dodaj do `translations.ts`:**
```typescript
export const translations = {
  pl: { /* ... */ },
  en: { /* ... */ },
  de: { /* ... */ } // Nowy język
}
```

2. **Zaktualizuj typy:**
```typescript
export type Language = 'pl' | 'en' | 'de';
```

3. **Dodaj do `LanguageSwitcher.tsx`:**
```typescript
const languages = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' } // Nowy język
];
```

## ✨ **FUNKCJE:**

- **Automatyczne zapisywanie** wyboru w localStorage
- **Type-safe** tłumaczenia z TypeScript
- **Responsywny design** dla desktop i mobile
- **Smooth animations** i transitions
- **Accessibility** - proper ARIA attributes
- **Easy to extend** - dodawanie nowych języków

## 🎯 **PRZYKŁADY UŻYCIA:**

### **W Header:**
```typescript
{t('offer')} // "Oferta" / "Offer"
{t('contact')} // "Kontakt" / "Contact"
```

### **W Hero:**
```typescript
{t('heroTitle')} // "TAM, GDZIE KOŃCZY SIĘ ASFALT" / "WHERE THE ASPHALT ENDS"
{t('seeOffer')} // "ZOBACZ OFERTĘ" / "SEE OFFER"
```

### **W Formularzu:**
```typescript
{t('sendMessage')} // "Wyślij wiadomość" / "Send Message"
{t('name')} // "Imię" / "Name"
```

**System jest gotowy do użycia!** 🚀
