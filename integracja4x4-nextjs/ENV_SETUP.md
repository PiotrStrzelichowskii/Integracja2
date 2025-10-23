# Konfiguracja zmiennych środowiskowych

## Problem z formularzem kontaktowym

Jeśli widzisz błąd "Unexpected end of JSON input" przy wysyłaniu formularza kontaktowego, oznacza to, że brakuje konfiguracji API do wysyłania emaili.

## Rozwiązanie

### 1. Utwórz plik `.env.local`

W głównym katalogu projektu utwórz plik `.env.local` z następującą zawartością:

```bash
# Resend API Configuration
RESEND_API_KEY=your-resend-api-key-here
```

### 2. Skonfiguruj Resend API

1. Zarejestruj się na [https://resend.com](https://resend.com)
2. Utwórz nowy API key w dashboardzie
3. Skopiuj klucz API i zastąp `your-resend-api-key-here` w pliku `.env.local`

### 3. Przykład prawidłowej konfiguracji

```bash
RESEND_API_KEY=re_1234567890abcdef_1234567890abcdef
```

### 4. Restart serwera deweloperskiego

Po dodaniu pliku `.env.local` uruchom ponownie serwer:

```bash
npm run dev
```

## Uwagi bezpieczeństwa

- **NIGDY** nie commituj pliku `.env.local` do repozytorium Git
- Plik `.env.local` jest już dodany do `.gitignore`
- Używaj różnych kluczy API dla środowisk deweloperskiego i produkcyjnego

## Testowanie

Po skonfigurowaniu API key, formularz kontaktowy powinien działać poprawnie i wysyłać emaile na adres: `strzelistudio@gmail.com`
