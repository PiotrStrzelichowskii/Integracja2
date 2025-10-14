"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Model3D = dynamic(() => import('./Model3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-mud-dark/50 animate-pulse rounded-lg" />
});

const Hero = () => {
  const scrollToOffer = () => {
    const element = document.getElementById('offer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full aspect-[16/9] flex items-center justify-center z-20 mt-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="/heropicture.webp"
          alt="Toyota Land Cruiser 70 offroad training"
          fill
          className="object-cover"
          style={{ objectPosition: '40% center' }}
          priority
        />
        
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-4 mt-[10rem] sm:mt-[10rem] md:mt-80 lg:mt-12 xl:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start lg:items-center px-4 sm:px-8 lg:px-16 xl:px-24 h-full">
          {/* Left Column - Text Content */}
          <div className="text-left lg:text-left animate-fade-in-up lg:col-span-2 flex flex-col justify-center">
              <h1 className="font-staatliches text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-sand-light mb-3 sm:mb-4 leading-tight" style={{textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'}}>
              TAM, GDZIE KOŃCZY SIĘ ASFALT
                <br />
                <span className="text-rust-orange" style={{textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'}}>ZACZYNA SIĘ PRZYGODA</span>
              </h1>
              
              <p className="text-sm sm:text-md md:text-base text-gray-100 mb-4 sm:mb-6 max-w-lg font-roboto-slab leading-relaxed" style={{textShadow: '0 4px 8px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.7)'}}>
                Profesjonalne szkolenia jazdy terenowej i eventy firmowe. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie.
              </p>
              
              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 items-start">
                <button 
                  onClick={scrollToOffer}
                  className="btn-offroad-primary font-roboto-slab flex items-center gap-2 text-xs sm:text-sm md:text-base px-4 sm:px-4 md:px-6 py-3 sm:py-3 md:py-5"
                >
                  ZOBACZ OFERTĘ
                </button>
                
                <button 
                  onClick={scrollToContact}
                  className="btn-offroad-outline font-roboto-slab flex items-center gap-2 text-xs sm:text-sm md:text-base px-4 sm:px-4 md:px-6 py-3 sm:py-3 md:py-5"
                >
                  SKONTAKTUJ SIĘ
                </button>
              </div>
          </div>

          {/* Right Column - 3D Model */}
          <div className="flex items-center justify-center h-full">
            <Model3D />
          </div>
        </div>
      </div>

      {/* Scroll Indicator - tylko na XL+ */}
      <div className="hidden xl:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-15 mb-40">
        <div className="w-6 h-10 border-2 border-sand-light rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sand-light rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

