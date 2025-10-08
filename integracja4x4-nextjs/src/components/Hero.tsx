"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import Model3D from './Model3D';

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
          src="/heropicture.png"
          alt="Toyota Land Cruiser 70 offroad training"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient-overlay"></div>
        
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full px-4 mt-16 sm:mt-18 md:mt-20 lg:mt-22 xl:-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center px-8 lg:px-16 xl:px-24">
          {/* Left Column - Text Content */}
          <div className="text-left lg:text-left animate-fade-in-up lg:col-span-2">
            <h1 className="font-staatliches text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-sand-light mb-6 text-shadow-soft leading-tight">
            TAM, GDZIE KOŃCZY SIĘ ASFALT
              <br />
              <span className="text-rust-orange">ZACZYNA SIĘ PRZYGODA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl font-roboto-slab leading-relaxed">
              Profesjonalne szkolenia jazdy terenowej i eventy firmowe. Samochody 4x4, quady ATV i niezapomniane przygody w trudnym terenie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <button 
                onClick={scrollToOffer}
                className="btn-offroad-primary font-roboto-slab flex items-center gap-2"
              >
                ZOBACZ OFERTĘ
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button 
                onClick={scrollToContact}
                className="btn-offroad-outline font-roboto-slab flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                SKONTAKTUJ SIĘ
              </button>
            </div>
          </div>

          {/* Right Column - 3D Model */}
          <div className="flex items-center justify-center lg:justify-center">
            <Model3D />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-15 mb-40">
        <div className="w-6 h-10 border-2 border-sand-light rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sand-light rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

