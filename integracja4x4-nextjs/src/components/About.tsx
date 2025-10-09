'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

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
    <section className="py-40 bg-muted/30">
      <div className="container mx-auto px-4">
      <h2 id="about" className="font-staatliches text-3xl md:text-5xl text-foreground mb-16 text-center scroll-mt-[100px]">
              O <span className="text-accent">INTEGRACJA4X4</span>
            </h2>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            
            
            <div className="space-y-8 text-muted-foreground font-roboto-slab leading-relaxed">
              <p className="text-lg">
                Jesteśmy pionierami w organizacji profesjonalnych szkoleń offroad w Polsce. 
                Nasza firma została założona w 1993 roku przez Mariusza Strzelichowskiego – doświadczonego off-roadowca, uczestnika i organizatora rajdów terenowych.
              </p>
              
              <p>
                Przez lata zbudowaliśmy zespół profesjonalnych instruktorów, którzy uczą, jak pewnie i bezpiecznie poruszać się w trudnym terenie. Nasza pasja do motoryzacji i przyrody zaowocowała stworzeniem unikalnych programów szkoleniowych, które łączą naukę z niezapomnianą przygodą.
              </p>
              
              <p>
                Specjalizujemy się w szkoleniach indywidualnych oraz eventach firmowych, oferując kompleksową obsługę od podstaw jazdy terenowej po zaawansowane techniki pokonywania najtrudniejszych przeszkód. Działamy na terenie całej Polski i zrealizowaliśmy już ponad XXX imprez integracyjnych.
              </p>
            </div>

            <div className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20">
              <h3 className="font-staatliches text-xl text-accent mb-3">Nasze Motto</h3>
              <p className="text-muted-foreground font-roboto-slab italic">
                "Bezpieczeństwo, profesjonalizm i niezapomniane doświadczenia - 
                to podstawy naszej pracy z każdym klientem."
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <Image 
                src="/olddays.Webp"
                alt="Old days"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              
              {/* Author Overlay */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-muted-foreground px-3 py-2 rounded-lg text-sm font-roboto-slab">
                Mariusz Strzelichowski lata 2000
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">600+</div>
            <div className="text-muted-foreground font-roboto-slab">Ukończonych kursów</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">100+</div>
            <div className="text-muted-foreground font-roboto-slab">Eventów firmowych</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">30+</div>
            <div className="text-muted-foreground font-roboto-slab">Lat doświadczenia</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-staatliches text-accent mb-2">100%</div>
            <div className="text-muted-foreground font-roboto-slab">Zadowolenia</div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-40">
          <h2 className="font-staatliches text-3xl md:text-5xl text-center text-foreground mb-20">
            CO <span className="text-accent">MÓWIĄ</span> NASI KLIENCI
          </h2>
          
          <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
            {/* Cards */}
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="absolute w-full max-w-2xl transition-all duration-500 ease-out cursor-pointer"
                  style={getCardStyle(index)}
                  onClick={() => {
                    if (index !== currentIndex) {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-stone-900 border border-accent rounded-lg shadow-2xl p-8 md:p-12">
                    {/* Name */}
                    <div className="text-center mb-4">
                      <h3 className="font-staatliches text-2xl text-white">
                        {testimonial.name}
                      </h3>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-center text-slate-200 font-roboto-slab italic leading-relaxed text-lg">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 md:left-8 z-40 bg-accent hover:bg-accent/80 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-40 bg-accent hover:bg-accent/80 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
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
                onClick={() => setCurrentIndex(index)}
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

