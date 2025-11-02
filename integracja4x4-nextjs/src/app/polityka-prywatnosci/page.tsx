import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export const metadata = {
  title: 'Polityka Prywatności | Integracja4x4',
  description: 'Polityka prywatności i ochrony danych osobowych Integracja4x4',
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-mud-dark text-sand-light py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-accent mr-4" />
            <h1 className="font-staatliches text-4xl md:text-5xl text-center">
              POLITYKA PRYWATNOŚCI
            </h1>
          </div>
          <p className="text-center text-sand-light/80 font-montserrat max-w-2xl mx-auto">
            Ochrona Twoich danych osobowych jest dla nas priorytetem
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
              przekazanych przez Użytkowników w związku z korzystaniem przez nich ze strony internetowej 
              <strong className="text-foreground"> integracja4x4.pl</strong>
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed mt-4">
              <strong className="text-foreground">Data ostatniej aktualizacji:</strong> 9 października 2025
            </p>
          </CardContent>
        </Card>

        {/* Sekcja 1 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              1. ADMINISTRATOR DANYCH OSOBOWYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Administratorem danych osobowych zbieranych za pośrednictwem strony internetowej 
              integracja4x4.pl jest:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <p className="font-montserrat font-semibold text-foreground mb-4">
                PS Bikes Mariusz Strzelichowski
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div className="font-montserrat text-muted-foreground">
                    <div>ul. Powstania Styczniowego 12a</div>
                    <div>30-298 Kraków</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <span className="font-montserrat text-muted-foreground">+48 501 318 521</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <a href="mailto:info@integracja4x4.pl" className="font-montserrat text-accent hover:underline">
                    info@integracja4x4.pl
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sekcja 2 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              2. PODSTAWY PRAWNE PRZETWARZANIA DANYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Dane osobowe przetwarzane są zgodnie z przepisami:
            </p>
            <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
              <li>Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. 
              w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie 
              swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie 
              o ochronie danych) – <strong className="text-foreground">RODO</strong></li>
              <li>Ustawy z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U. 2018 poz. 1000)</li>
              <li>Ustawy z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. 2004 nr 171 poz. 1800)</li>
              <li>Ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych (Dz. U. 1994 Nr 24 poz. 83)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sekcja 3 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              3. RODZAJ PRZETWARZANYCH DANYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-staatliches text-xl text-foreground mb-3">
                3.1. Dane podane przez użytkownika
              </h3>
              <p className="font-montserrat text-muted-foreground leading-relaxed mb-3">
                Administrator przetwarza dane osobowe podane dobrowolnie przez Użytkownika, w tym:
              </p>
              <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
                <li>Imię i nazwisko</li>
                <li>Adres e-mail</li>
                <li>Numer telefonu</li>
                <li>Treść wiadomości przesłanej przez formularz kontaktowy</li>
                <li>Inne dane dobrowolnie podane w wiadomości</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-staatliches text-xl text-foreground mb-3">
                3.2. Dane zbierane automatycznie
              </h3>
              <p className="font-montserrat text-muted-foreground leading-relaxed mb-3">
                Podczas korzystania ze strony automatycznie zbierane są następujące dane:
              </p>
              <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
                <li>Adres IP</li>
                <li>Typ przeglądarki</li>
                <li>Rozdzielczość ekranu</li>
                <li>Przybliżona lokalizacja</li>
                <li>Otwierane podstrony serwisu</li>
                <li>Czas spędzony na stronie</li>
                <li>Typ systemu operacyjnego</li>
                <li>Adres poprzedniej podstrony</li>
                <li>Źródło wejścia na stronę</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Sekcja 4 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              4. CEL I ZAKRES PRZETWARZANIA DANYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Dane osobowe przetwarzane są w następujących celach:
            </p>
            
            <div className="space-y-4">
              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-staatliches text-lg text-foreground mb-2">
                  Obsługa formularza kontaktowego
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                  <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a) RODO (zgoda) oraz art. 6 ust. 1 lit. f) 
                  RODO (prawnie uzasadniony interes administratora polegający na komunikacji z użytkownikami)
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-staatliches text-lg text-foreground mb-2">
                  Analiza statystyk i zachowań użytkowników (Google Analytics)
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                  <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes 
                  administratora polegający na prowadzeniu analiz statystycznych w celu poprawy funkcjonalności strony)
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-staatliches text-lg text-foreground mb-2">
                  Marketing i promocja usług
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                  <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a) RODO (zgoda wyrażona poprzez 
                  dobrowolny kontakt)
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-staatliches text-lg text-foreground mb-2">
                  Realizacja umów i świadczenie usług
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                  <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b) RODO (wykonanie umowy)
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-staatliches text-lg text-foreground mb-2">
                  Dochodzenie roszczeń i obrona przed roszczeniami
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                  <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes 
                  administratora)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sekcja 5 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              5. OKRES PRZECHOWYWANIA DANYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Dane osobowe przechowywane są przez okres:
            </p>
            <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
              <li><strong className="text-foreground">Formularz kontaktowy:</strong> do czasu udzielenia odpowiedzi 
              na zapytanie lub do momentu wycofania zgody, nie dłużej jednak niż przez 3 lata od ostatniego kontaktu</li>
              <li><strong className="text-foreground">Wykonanie umowy:</strong> przez okres niezbędny do wykonania 
              umowy oraz przez okres wymagany przepisami prawa (np. przepisy podatkowe - 5 lat)</li>
              <li><strong className="text-foreground">Dane analityczne (Google Analytics):</strong> 26 miesięcy 
              od momentu zbierania</li>
              <li><strong className="text-foreground">Marketing:</strong> do momentu wycofania zgody lub wniesienia 
              sprzeciwu</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sekcja 6 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              6. UDOSTĘPNIANIE DANYCH OSOBOWYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Dane osobowe mogą być przekazywane następującym kategoriom odbiorców:
            </p>
            <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
              <li><strong className="text-foreground">Dostawcy usług IT:</strong> hosting, utrzymanie strony</li>
              <li><strong className="text-foreground">Google LLC:</strong> w zakresie korzystania z Google Analytics</li>
              <li><strong className="text-foreground">Podmioty świadczące usługi prawne i księgowe</strong></li>
              <li><strong className="text-foreground">Organy państwowe:</strong> w przypadkach przewidzianych prawem</li>
            </ul>
            <p className="font-montserrat text-muted-foreground leading-relaxed mt-4">
              Administrator nie przekazuje danych osobowych do państw trzecich (poza EOG), z wyjątkiem danych 
              przekazywanych do Google LLC (USA) w ramach Google Analytics, gdzie stosowane są odpowiednie 
              zabezpieczenia w postaci standardowych klauzul umownych zatwierdzonych przez Komisję Europejską.
            </p>
          </CardContent>
        </Card>

        {/* Sekcja 7 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              7. PRAWA UŻYTKOWNIKA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Każda osoba, której dane dotyczą, ma prawo do:
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo dostępu do danych
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz uzyskać informację, czy i jakie dane osobowe przetwarzamy oraz otrzymać kopię tych danych.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo do sprostowania danych
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz żądać poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo do usunięcia danych („prawo do bycia zapomnianym")
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz żądać usunięcia danych osobowych, jeśli nie ma podstawy prawnej do ich przetwarzania.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo do ograniczenia przetwarzania
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz żądać ograniczenia przetwarzania danych w określonych sytuacjach.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo do przenoszenia danych
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz otrzymać dane w ustrukturyzowanym formacie oraz przesłać je innemu administratorowi.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo sprzeciwu
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz wnieść sprzeciw wobec przetwarzania danych w celach marketingowych lub na podstawie 
                  prawnie uzasadnionego interesu.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo do cofnięcia zgody
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Możesz w każdej chwili wycofać zgodę na przetwarzanie danych osobowych.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h4 className="font-staatliches text-lg text-foreground">
                  Prawo do wniesienia skargi
                </h4>
                <p className="font-montserrat text-muted-foreground text-sm">
                  Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.
                </p>
              </div>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg mt-6">
              <p className="font-montserrat text-foreground font-semibold mb-2">
                Jak skorzystać z praw?
              </p>
              <p className="font-montserrat text-muted-foreground text-sm">
                W celu skorzystania z powyższych praw należy skontaktować się z Administratorem, 
                wysyłając wiadomość e-mail na adres: <a href="mailto:info@integracja4x4.pl" className="text-accent hover:underline font-semibold">info@integracja4x4.pl</a> lub 
                pisemnie na adres: ul. Powstania Styczniowego 12a, 30-298 Kraków.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sekcja 8 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              8. PLIKI COOKIES
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Strona internetowa używa plików cookies (tzw. „ciasteczek") w celach funkcjonalnych, 
              analitycznych i marketingowych.
            </p>

            <div>
              <h3 className="font-staatliches text-xl text-foreground mb-3">
                8.1. Czym są cookies?
              </h3>
              <p className="font-montserrat text-muted-foreground leading-relaxed">
                Cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas odwiedzania 
                strony internetowej. Cookies zawierają informacje niezbędne do prawidłowego funkcjonowania 
                strony oraz zbierania statystyk odwiedzin.
              </p>
            </div>

            <div>
              <h3 className="font-staatliches text-xl text-foreground mb-3">
                8.2. Rodzaje wykorzystywanych cookies
              </h3>
              <div className="space-y-3">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-staatliches text-lg text-foreground mb-2">
                    Cookies niezbędne
                  </h4>
                  <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                    Umożliwiają podstawowe funkcje strony, takie jak bezpieczeństwo, zarządzanie siecią 
                    i dostępność. Bez tych cookies strona nie może prawidłowo działać.
                  </p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-staatliches text-lg text-foreground mb-2">
                    Cookies analityczne (Google Analytics)
                  </h4>
                  <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                    Umożliwiają analizę sposobu korzystania ze strony przez użytkowników, co pozwala 
                    nam na ulepszanie jej funkcjonalności i zawartości. Dane zbierane są w formie 
                    zagregowanej i anonimowej.
                  </p>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-staatliches text-lg text-foreground mb-2">
                    Cookies funkcjonalne
                  </h4>
                  <p className="font-montserrat text-muted-foreground text-sm leading-relaxed">
                    Pozwalają na zapamiętanie wyborów użytkownika i personalizację doświadczeń.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-staatliches text-xl text-foreground mb-3">
                8.3. Zarządzanie cookies
              </h3>
              <p className="font-montserrat text-muted-foreground leading-relaxed mb-3">
                Użytkownik może w dowolnym momencie zmienić ustawienia dotyczące plików cookies 
                w swojej przeglądarce. Zablokowanie lub usunięcie cookies może jednak wpłynąć 
                na funkcjonalność strony.
              </p>
              <p className="font-montserrat text-muted-foreground leading-relaxed">
                Instrukcje zarządzania cookies w najpopularniejszych przeglądarkach:
              </p>
              <ul className="list-disc list-inside space-y-1 font-montserrat text-muted-foreground ml-4 mt-2">
                <li>Chrome: Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie</li>
                <li>Firefox: Ustawienia → Prywatność i bezpieczeństwo → Ciasteczka</li>
                <li>Safari: Preferencje → Prywatność → Zarządzaj danymi witryn</li>
                <li>Edge: Ustawienia → Pliki cookie i uprawnienia witryn</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Sekcja 9 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              9. GOOGLE ANALYTICS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Strona wykorzystuje Google Analytics – narzędzie analityczne Google LLC do analizy 
              sposobu korzystania z witryny przez użytkowników.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Google Analytics wykorzystuje pliki cookies do zbierania i analizowania informacji 
              o korzystaniu ze strony. Dane gromadzone przez Google Analytics obejmują m.in.:
            </p>
            <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
              <li>Liczbę odwiedzających stronę</li>
              <li>Źródła ruchu</li>
              <li>Odwiedzane podstrony</li>
              <li>Czas spędzony na stronie</li>
              <li>Informacje o urządzeniu i przeglądarce</li>
            </ul>
            <p className="font-montserrat text-muted-foreground leading-relaxed mt-4">
              Zebrane informacje są przekazywane i przechowywane przez Google na serwerach 
              w Stanach Zjednoczonych. Google będzie korzystał z tych informacji w celu oceny 
              korzystania przez użytkownika ze strony internetowej.
            </p>
            <div className="bg-accent/10 p-4 rounded-lg mt-4">
              <p className="font-montserrat text-foreground font-semibold mb-2">
                Jak zrezygnować z Google Analytics?
              </p>
              <p className="font-montserrat text-muted-foreground text-sm">
                Możesz zapobiec gromadzeniu danych przez Google Analytics, instalując dodatek 
                do przeglądarki dostępny pod adresem:{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-semibold"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sekcja 10 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              10. BEZPIECZEŃSTWO DANYCH
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające 
              bezpieczeństwo przetwarzanych danych osobowych, w szczególności zabezpiecza dane 
              przed ich udostępnieniem osobom nieupoważnionym, utratą, uszkodzeniem lub zniszczeniem.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Zastosowane środki bezpieczeństwa obejmują m.in.:
            </p>
            <ul className="list-disc list-inside space-y-2 font-montserrat text-muted-foreground ml-4">
              <li>Szyfrowanie transmisji danych (protokół SSL/TLS)</li>
              <li>Regularne tworzenie kopii zapasowych</li>
              <li>Ograniczenie dostępu do danych osobowych tylko dla upoważnionych osób</li>
              <li>Stosowanie bezpiecznych haseł i uwierzytelniania</li>
              <li>Monitoring i aktualizacje systemów bezpieczeństwa</li>
              <li>Szkolenia pracowników w zakresie ochrony danych osobowych</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sekcja 11 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              11. ZAUTOMATYZOWANE PODEJMOWANIE DECYZJI I PROFILOWANIE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Administrator nie podejmuje decyzji w sposób zautomatyzowany, w tym nie stosuje 
              profilowania w rozumieniu art. 22 RODO, które wywoływałoby wobec użytkownika skutki 
              prawne lub w podobny sposób istotnie na niego wpływało.
            </p>
          </CardContent>
        </Card>

        {/* Sekcja 12 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              12. ZMIANY POLITYKI PRYWATNOŚCI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce 
              Prywatności, które mogą wynikać ze zmiany przepisów prawa, rozwoju technologii 
              lub zmiany zakresu świadczonych usług.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              O wszelkich zmianach użytkownicy zostaną poinformowani poprzez publikację nowej 
              wersji Polityki Prywatności na stronie internetowej wraz z datą ostatniej aktualizacji.
            </p>
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              Zalecamy regularne przeglądanie treści Polityki Prywatności, aby być na bieżąco 
              z wprowadzanymi zmianami.
            </p>
          </CardContent>
        </Card>

        {/* Sekcja 13 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-staatliches text-2xl tracking-wide">
              13. KONTAKT
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-montserrat text-muted-foreground leading-relaxed">
              W przypadku pytań dotyczących przetwarzania danych osobowych lub niniejszej Polityki 
              Prywatności prosimy o kontakt:
            </p>
            <div className="bg-muted/30 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <a href="mailto:info@integracja4x4.pl" className="font-montserrat text-accent hover:underline font-semibold">
                    info@integracja4x4.pl
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  <span className="font-montserrat text-muted-foreground">+48 501 318 521</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div className="font-montserrat text-muted-foreground">
                    <div>ul. Powstania Styczniowego 12a</div>
                    <div>30-298 Kraków</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="font-montserrat text-muted-foreground text-sm">
            Ostatnia aktualizacja: <strong className="text-foreground">9 października 2025</strong>
          </p>
          <p className="font-montserrat text-muted-foreground text-sm mt-2">
            Niniejsza Polityka Prywatności jest zgodna z wymogami RODO i polskiego prawa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;











