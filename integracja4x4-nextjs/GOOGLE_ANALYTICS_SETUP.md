# Konfiguracja Google Analytics

## Krok 1: Utworzenie konta Google Analytics

1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Kliknij "Rozpocznij pomiar"
3. Utwórz konto i właściwość dla swojej strony
4. Wybierz "Strona internetowa" jako platformę
5. Wprowadź dane swojej strony:
   - Nazwa strony: `Integracja4x4`
   - URL strony: `https://twoja-domena.com`
   - Branża: `Sport i rekreacja`
   - Strefa czasowa: `Polska`

## Krok 2: Pobranie Measurement ID

1. Po utworzeniu właściwości, przejdź do "Administracja" (⚙️)
2. W sekcji "Właściwość" kliknij "Strumienie danych"
3. Kliknij na swój strumień danych
4. Skopiuj **Measurement ID** (format: `G-XXXXXXXXXX`)

## Krok 3: Konfiguracja zmiennych środowiskowych

### Lokalnie (development)
Utwórz plik `.env.local` w głównym katalogu projektu:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Na Vercel (production)
1. Przejdź do swojego projektu na [Vercel](https://vercel.com/)
2. Kliknij na zakładkę "Settings"
3. Przejdź do "Environment Variables"
4. Dodaj nową zmienną:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (twój Measurement ID)
   - **Environment**: Production, Preview, Development
5. Kliknij "Save"
6. Wdróż ponownie aplikację

## Krok 4: Weryfikacja

### Sprawdzenie w przeglądarce
1. Otwórz swoją stronę w przeglądarce
2. Otwórz Developer Tools (F12)
3. Przejdź do zakładki "Network"
4. Odśwież stronę
5. Szukaj requestów do `google-analytics.com` lub `googletagmanager.com`

### Sprawdzenie w Google Analytics
1. Przejdź do swojego raportu Google Analytics
2. W lewym menu kliknij "Rzeczywisty czas" > "Przegląd"
3. Odśwież swoją stronę - powinieneś zobaczyć aktywność

## Trackowane eventy

Aplikacja automatycznie śledzi następujące eventy:

### Formularz kontaktowy
- ✅ Wysłanie formularza (sukces)
- ❌ Błędy formularza

### Nawigacja
- 🧭 Kliknięcia w menu nawigacyjne
- 🧭 Nawigacja między sekcjami

### Testimonials
- 💬 Kliknięcia na opinie
- ⏭️ Nawigacja między opiniami
- 🔘 Kliknięcia na kropki nawigacji

### Social Media
- 📱 Kliknięcia na Instagram
- 📘 Kliknięcia na Facebook

## Dodatkowe eventy (do implementacji)

Możesz dodać tracking dla:
- Kliknięć na oferty w sekcji Offer
- Interakcji z modelem 3D
- Kliknięć na zdjęcia w galerii
- Kliknięć na numery telefonów/emaile

## Debugowanie

### Sprawdzenie czy GA jest załadowane
```javascript
// W konsoli przeglądarki
console.log(window.gtag);
console.log(window.dataLayer);
```

### Testowanie eventów
```javascript
// W konsoli przeglądarki
gtag('event', 'test_event', {
  event_category: 'Test',
  event_label: 'Manual Test'
});
```

## Prywatność i RODO

Pamiętaj o:
- Dodaniu informacji o Google Analytics do polityki prywatności
- Implementacji zgody na cookies (jeśli wymagane)
- Konfiguracji anonimizacji IP w Google Analytics

## Przydatne linki

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics Guide](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Vercel Analytics](https://vercel.com/analytics)




