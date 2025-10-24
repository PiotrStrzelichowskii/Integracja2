import Header from '@/components/Header';
import Hero from '@/components/Hero';
import dynamic from 'next/dynamic';

// Lazy load komponenty, które nie są krytyczne dla pierwszego renderowania
const Offer = dynamic(() => import('@/components/Offer'), {
  loading: () => <div className="h-96 bg-mud-dark animate-pulse" />
});

const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="h-96 bg-mud-dark animate-pulse" />
});

const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <div className="h-96 bg-mud-dark animate-pulse" />
});

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-96 bg-mud-dark animate-pulse" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-32 bg-mud-dark animate-pulse" />
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-mud-dark overflow-x-hidden" id="app-root">
      <Header />
      <main 
        id="main-content" 
        className="bg-mud-dark overflow-x-hidden"
        role="main"
        aria-label="Główna zawartość strony"
        tabIndex={-1}
        aria-labelledby="main-content"
      >
        <Hero />
        <Offer />
        <About />
        <Gallery />
        <Contact />
        
        {/* SEO Keywords - ukryte dla robotów */}
        <div className="sr-only" aria-hidden="true">
          <h1>Szkoła jazdy terenowej 4x4 w Krakowie - Integracja4x4 | Najlepsza jazda off-road w Polsce</h1>
          <h2>Voucher off-road | Szkolenie offroad dla firm | Kurs jazdy w terenie | Jazda terenowa 4x4 Kraków</h2>
          <h3>Off-road Małopolska | Jazda terenowa w okolicach Krakowa | Terenówki Kraków | Jazda po bezdrożach Kraków</h3>
          <h4>Szkoła off-road Małopolska | Prezent off-road Kraków | Voucher jazda terenowa Kraków | Jazda terenowa Kryspinów</h4>
          <h5>Offroad Liszki | Przygoda 4x4 Kraków | Szkoła jazdy off-road Polska | Najlepsza szkoła offroad w Polsce</h5>
          <h6>Kurs offroad 4x4 | Jazda terenowa z instruktorem | Nauka jazdy terenowej 4x4 | Offroad ekstremalny</h6>
          <p>Szkolenie techniki jazdy 4x4 | Off-road prezent dla faceta | Kurs jazdy SUV w terenie | Jazda off-road dla początkujących</p>
          <p>Prezent dla fana motoryzacji Kraków | Ekstremalny prezent dla niego | Voucher offroad dla pary | Event firmowy off-road</p>
          <p>Integracja firmowa w terenie | Team building 4x4 | Off-road dla firm Kraków | Atrakcje motoryzacyjne Kraków</p>
          <p>Impreza integracyjna 4x4 | Godzinna jazda off-road 4x4 | Jazda off-road Toyota Land Cruiser | Jazda 4x4 z instruktorem</p>
          <p>Kurs bezpiecznej jazdy w terenie | Off-road weekend Kraków | Wyprawa 4x4 Polska | Szkolenie SUV off-road</p>
          <p>Jazda terenowa na prezent | Voucher jazda terenowa 4x4 | Szkolenia 4x4 | Jazda w terenie</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}