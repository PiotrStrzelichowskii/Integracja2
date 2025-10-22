# Integracja 4x4 - Strona internetowa

Strona internetowa dla firmy Integracja 4x4 - specjalizującej się w szkoleniach off-road i wyprawach terenowych.

## Funkcjonalności

- Responsywna strona główna z sekcjami: Hero, O nas, Oferta, Galeria, Kontakt
- Formularz kontaktowy z walidacją
- Wysyłanie emaili przez Resend API
- Model 3D Toyoty Land Cruiser
- Polityka prywatności

## Konfiguracja

### Zmienne środowiskowe

Aby włączyć funkcjonalność wysyłania emaili, utwórz plik `.env.local` w głównym katalogu projektu:

```bash
# Klucz API dla Resend (opcjonalny)
RESEND_API_KEY=re_your_resend_api_key_here
```

**Uwaga:** Jeśli nie ustawisz `RESEND_API_KEY`, formularz kontaktowy będzie zwracał błąd 503 "Usługa email nie jest skonfigurowana".

### Instalacja i uruchomienie

```bash
# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Budowanie dla produkcji
npm run build

# Uruchomienie wersji produkcyjnej
npm start
```

## Deployment na Vercel

1. Połącz repozytorium z Vercel
2. Dodaj zmienną środowiskową `RESEND_API_KEY` w ustawieniach projektu na Vercel
3. Wdróż aplikację

## Struktura projektu

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   └── globals.css     # Globalne style
├── components/         # Komponenty React
│   ├── ui/            # Komponenty UI (shadcn/ui)
│   └── ...            # Główne komponenty strony
├── hooks/             # Custom hooks
└── lib/               # Utilities
```

## Technologie

- **Next.js 15** - Framework React
- **TypeScript** - Typowanie
- **Tailwind CSS** - Stylowanie
- **shadcn/ui** - Komponenty UI
- **Resend** - Wysyłanie emaili
- **Three.js** - Model 3D
