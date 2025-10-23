# 🌍 System Tłumaczeń PL/EN

## ✅ **ZREALIZOWANE FUNKCJE:**

### 1. **Struktura Słowników**
- ✅ **Osobne pliki** - `pl.ts` i `en.ts` w folderze `dictionaries/`
- ✅ **TypeScript** - pełne typowanie dla bezpieczeństwa
- ✅ **Centralny index** - `dictionaries/index.ts` do zarządzania

### 2. **Funkcjonalność**
- ✅ **Przełącznik języków** - działa w czasie rzeczywistym
- ✅ **localStorage** - zapamiętuje wybór języka
- ✅ **Hook useTranslations** - łatwe używanie w komponentach
- ✅ **Walidacja formularzy** - błędy w wybranym języku

### 3. **Zaktualizowane Komponenty**
- ✅ **Header** - nawigacja w obu językach
- ✅ **Hero** - tytuły i przyciski
- ✅ **Contact** - formularz z walidacją
- ✅ **LanguageSwitcher** - przełącznik z flagami

## 📁 **STRUKTURA PLIKÓW:**

```
src/
├── lib/
│   └── dictionaries/
│       ├── index.ts          # Główny plik słowników
│       ├── pl.ts            # Słownik polski
│       └── en.ts            # Słownik angielski
├── hooks/
│   ├── use-language.tsx     # Hook do zarządzania językiem
│   └── use-translations.tsx # Hook do tłumaczeń
└── components/
    ├── LanguageSwitcher.tsx # Przełącznik języków
    ├── Header.tsx          # Header z tłumaczeniami
    ├── Hero.tsx            # Hero z tłumaczeniami
    └── Contact.tsx         # Formularz z tłumaczeniami
```

## 🚀 **JAK UŻYWAĆ:**

### **1. W komponencie:**
```typescript
import { useTranslations } from '@/hooks/use-translations';

const MyComponent = () => {
  const { t } = useTranslations();
  
  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroDescription')}</p>
    </div>
  );
};
```

### **2. Dodawanie nowych tłumaczeń:**

**W `pl.ts`:**
```typescript
export const pl = {
  // ... istniejące tłumaczenia
  newKey: 'Nowy tekst po polsku'
} as const;
```

**W `en.ts`:**
```typescript
export const en = {
  // ... istniejące tłumaczenia
  newKey: 'New text in English'
} as const;
```

### **3. Sprawdzanie języka:**
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

## 📝 **DOSTĘPNE TŁUMACZENIA:**

### **Nawigacja:**
- `offer` - "Oferta" / "Offer"
- `about` - "O nas" / "About Us"
- `gallery` - "Galeria" / "Gallery"
- `contact` - "Kontakt" / "Contact"

### **Hero Section:**
- `heroTitle` - "TAM, GDZIE KOŃCZY SIĘ ASFALT" / "WHERE THE ASPHALT ENDS"
- `heroSubtitle` - "ZACZYNA SIĘ PRZYGODA" / "ADVENTURE BEGINS"
- `heroDescription` - Opis w obu językach
- `seeOffer` - "ZOBACZ OFERTĘ" / "SEE OFFER"
- `contactUs` - "SKONTAKTUJ SIĘ" / "CONTACT US"

### **Formularz Kontaktowy:**
- `sendMessage` - "Wyślij wiadomość" / "Send Message"
- `name` - "Imię" / "Name"
- `email` - "Email" / "Email"
- `subject` - "Temat" / "Subject"
- `message` - "Wiadomość" / "Message"
- `sendButton` - "Wyślij wiadomość" / "Send Message"
- `sending` - "Wysyłanie..." / "Sending..."
- `sent` - "Wysłano!" / "Sent!"

### **Walidacja:**
- `nameRequired` - "Imię jest wymagane" / "Name is required"
- `nameMinLength` - "Imię musi mieć co najmniej 2 znaki" / "Name must be at least 2 characters"
- `emailRequired` - "Email jest wymagany" / "Email is required"
- `emailInvalid` - "Nieprawidłowy format adresu email" / "Invalid email format"
- `messageRequired` - "Wiadomość jest wymagana" / "Message is required"
- `messageMinLength` - "Wiadomość musi mieć co najmniej 10 znaków" / "Message must be at least 10 characters"

### **Toast Messages:**
- `validationError` - "Proszę poprawić błędy w formularzu." / "Please fix the errors in the form."
- `messageSent` - "Wiadomość wysłana!" / "Message sent!"
- `messageSentDescription` - "Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin." / "Thank you for contacting us. We will respond within 24 hours."
- `sendError` - "Błąd wysyłania" / "Send Error"
- `sendErrorDescription` - "Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie." / "There was a problem sending the message. Please try again."

## 🎯 **PRZYKŁADY UŻYCIA:**

### **W Header:**
```typescript
<button onClick={() => scrollToSection('offer')}>
  {t('offer')}
</button>
```

### **W Hero:**
```typescript
<h1>{t('heroTitle')}</h1>
<p>{t('heroDescription')}</p>
<button>{t('seeOffer')}</button>
```

### **W Formularzu:**
```typescript
<Label>{t('name')} *</Label>
<Input placeholder={t('name')} />
{errors.name && <p>{errors.name}</p>}
```

## ✨ **FUNKCJE:**

- **Automatyczne przełączanie** - wszystkie teksty zmieniają się natychmiast
- **Type-safe** - TypeScript sprawdza poprawność kluczy
- **Responsive** - działa na wszystkich urządzeniach
- **Persistent** - zapamiętuje wybór w localStorage
- **Easy to extend** - łatwe dodawanie nowych języków

**System tłumaczeń jest w pełni funkcjonalny!** 🚀
