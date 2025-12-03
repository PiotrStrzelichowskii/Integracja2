"use client";

import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from '@/hooks/use-translations';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

// Dynamic import for 3D Model
const Model3D = dynamic(() => import('./Model3D'), {
  ssr: false,
  loading: () => null // Silent loading as we have a background image now
});

const Hero = () => {
  const { t } = useTranslations();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    )
    .fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=1"
    )
    .fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section 
      id="hero-section"
      className="relative z-40 w-full h-screen overflow-hidden bg-neutral-950"
      aria-label="Sekcja główna - Szkoła jazdy terenowej 4x4"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/heropic.jpg"
          alt="Off-road terrain background"
          fill
          className="object-cover object-[63%_center] sm:object-center" 
          priority
          quality={90}
        />
      </div>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-black/60 sm:bg-black/50" />
      
      {/* Additional Gradient Overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* 3D Model Layer */}
      <div className="absolute inset-0 z-20 opacity-90 mix-blend-normal">
        <Model3D />
      </div>

      {/* Content Layer */}
      <div className="relative z-30 w-full h-full flex flex-col items-start justify-center px-4 sm:px-12 md:px-24 lg:px-32 pointer-events-none text-left">
        <h1 
          ref={titleRef}
          className="font-staatliches text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 leading-none tracking-wide drop-shadow-2xl opacity-0 translate-y-10"
        >
          {t('heroTitle')} <br />
          <span className="text-accent">{t('heroSubtitle')}</span>
        </h1>

        <p 
          ref={textRef}
          className="font-montserrat text-gray-200 text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed drop-shadow-lg opacity-0 translate-y-10 text-left"
        >
          {t('heroDescription')}
        </p>

        <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-start opacity-0 translate-y-10 pointer-events-auto">
          <button 
            onClick={scrollToOffer}
            className="btn-offroad-primary flex items-center gap-2 text-lg"
          >
            {t('seeOffer')}
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={scrollToContact}
            className="btn-offroad-outline flex items-center gap-2 text-lg"
          >
            {t('contactUs')}
          </button>
        </div>
          </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 animate-bounce pointer-events-none opacity-70">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
