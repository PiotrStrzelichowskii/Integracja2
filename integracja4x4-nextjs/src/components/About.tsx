'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const testimonials = [
  {
    name: "Katarzyna W.",
    rating: 5,
    quote: "Niezapomniane przeżycia, Mąż zadowolony z jazdy w terenie! W przyszłym roku wracamy nie na godzinkę, ale na dwie 😁 Super instruktor i luźna atmosfera ❤️ Polecamy z całego off road'owego serduszka! 🔥"
  },
  {
    name: "Anna N.",
    rating: 5,
    quote: "Mega wrażenia! ❤️ Super instruktor, Mąż zadowolony z prezentu! Na pewno wrócimy jeszcze nie jeden raz 😁"
  },
  {
    name: "Paulina B.",
    rating: 5,
    quote: "Genialna zabawa! Jazda 4x4 zakupiona dla męża na urodziny. Absolutnie polecam wszystkim kobietom - jeśli chcecie zrobić super prezent swojemu mężowi, narzeczonemu, chłopakowi, to jest to strzał w dziesiątkę! Dziękuję bardzo Mariuszowi za realizację niespodzianki 🙂 Było mega!"
  },
  {
    name: "Angela Z.",
    rating: 5,
    quote: "Bardzo polecamy! Mega profesjonalnie. Jednym słowem było czadowo. 💪🥰"
  },
  {
    name: "Robert Ś",
    rating: 5,
    quote: "Jazda samochodem terenowym super, duża wyrozumiałość. Trasy Bomba, dużo zjazdów jak i wjazdów czasem trzeba się nieźle nakombinować żeby wyjechać. Polecam każdemu kto nie był i tym co byli ;D warto wrócić i trochę poupalać terenówkę. Następnym razem biorę Quady 😉"
  }
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    // Zatrzymaj auto-play gdy użytkownik interweniuje
    setIsAutoPlaying(false);
    // Track navigation
    trackEvent.navigationClick('Previous Testimonial');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    // Zatrzymaj auto-play gdy użytkownik interweniuje
    setIsAutoPlaying(false);
    // Track navigation
    trackEvent.navigationClick('Next Testimonial');
  };

  // Automatyczne przewijanie co 3 sekundy
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Wznów auto-play po 10 sekundach nieaktywności użytkownika
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    
    if (diff === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 30,
        opacity: 1,
      };
    } else if (diff === 1 || diff === -(testimonials.length - 1)) {
      return {
        transform: 'translateX(30%) scale(0.85)',
        zIndex: 10,
        opacity: 0.6,
      };
    } else if (diff === -1 || diff === testimonials.length - 1) {
      return {
        transform: 'translateX(-30%) scale(0.85)',
        zIndex: 10,
        opacity: 0.6,
      };
    } else {
      return {
        transform: 'translateX(0) scale(0.7)',
        zIndex: 0,
        opacity: 0,
      };
    }
  };

  return (
    <section className="py-20 sm:py-32 md:py-40 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 id="about" className="font-staatliches text-2xl sm:text-3xl md:text-5xl text-foreground mb-8 sm:mb-12 md:mb-16 text-center scroll-mt-[100px]">
          O <span className="text-accent">INTEGRACJA4X4</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
          {/* Left Content */}
          <div>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-muted-foreground font-roboto-slab leading-relaxed">
              <p className="text-sm sm:text-base md:text-lg">
                Jesteśmy pionierami w organizacji profesjonalnych szkoleń offroad w Polsce. 
                Nasza firma została założona w 1993 roku przez Mariusza Strzelichowskiego – doświadczonego off-roadowca, uczestnika i organizatora rajdów terenowych.
              </p>
              
              <p className="text-sm sm:text-base">
                Przez lata zbudowaliśmy zespół profesjonalnych instruktorów, którzy uczą, jak pewnie i bezpiecznie poruszać się w trudnym terenie. Nasza pasja do motoryzacji i przyrody zaowocowała stworzeniem unikalnych programów szkoleniowych, które łączą naukę z niezapomnianą przygodą.
              </p>
              
              <p className="text-sm sm:text-base">
                Specjalizujemy się w szkoleniach indywidualnych oraz eventach firmowych, oferując kompleksową obsługę od podstaw jazdy terenowej po zaawansowane techniki pokonywania najtrudniejszych przeszkód. Działamy na terenie całej Polski i zrealizowaliśmy już ponad XXX imprez integracyjnych.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 md:mt-12 p-4 sm:p-6 bg-accent/10 rounded-lg border border-accent/20">
              <h3 className="font-staatliches text-lg sm:text-xl text-accent mb-2 sm:mb-3">Nasze Motto</h3>
              <p className="text-muted-foreground font-roboto-slab italic text-sm sm:text-base">
                "Bezpieczeństwo, profesjonalizm i niezapomniane doświadczenia - 
                to podstawy naszej pracy z każdym klientem."
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <Image 
                src="/olddays.webp"
                alt="Old days"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Author Overlay */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/70 text-muted-foreground px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-roboto-slab">
                Mariusz Strzelichowski lata 2000
              </div>
            </div>
          </div>
        </div>


        {/* Testimonials Carousel */}
        <div className="mt-20 sm:mt-32 md:mt-40">
          <h2 className="font-staatliches text-2xl sm:text-3xl md:text-5xl text-center text-foreground mb-12 sm:mb-16 md:mb-20">
            CO <span className="text-accent">MÓWIĄ</span> NASI KLIENCI
          </h2>
          
          <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
            {/* Cards */}
            <div className="relative w-full max-w-3xl h-full flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="absolute w-full max-w-xl transition-all duration-500 ease-out cursor-pointer"
                  style={getCardStyle(index)}
                  onClick={() => {
                    if (index !== currentIndex) {
                      setCurrentIndex(index);
                      // Zatrzymaj auto-play gdy użytkownik kliknie na kartę
                      setIsAutoPlaying(false);
                      // Track testimonial click
                      trackEvent.testimonialClick(index);
                    }
                  }}
                >
                  <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-stone-900 border border-accent rounded-lg shadow-2xl p-6 md:p-8">
                    {/* Name */}
                    <div className="text-center mb-3">
                      <h3 className="font-staatliches text-xl md:text-2xl text-white">
                        {testimonial.name}
                      </h3>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-center text-slate-200 font-roboto-slab italic leading-relaxed text-base md:text-lg">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-1 md:left-8 z-40 text-accent hover:text-accent/80 p-3 transition-all duration-200 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-1 md:right-8 z-40 text-accent hover:text-accent/80 p-3 transition-all duration-200 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  // Zatrzymaj auto-play gdy użytkownik kliknie na kropkę
                  setIsAutoPlaying(false);
                  // Track dot navigation
                  trackEvent.navigationClick(`Testimonial Dot ${index + 1}`);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

