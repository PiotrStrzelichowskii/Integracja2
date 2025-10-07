"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Car, Bike, Users, Target } from 'lucide-react';
import Image from 'next/image';

const Offer = () => {
  const offers = [
    {
      icon: Car,
      title: "Zajęcia Indywidualne",
      description: "Profesjonalne szkolenia z jazdy samochodami i quadami w terenie dla klientów indywidualnych oraz grup zorganizowanych.",
      features: [
        "Krótkie przejażdżki i dłuższe wycieczki",
        "Organizacja wieczorów panieńskich i kawalerskich", 
        "Profesjonalni instruktorzy i sprawdzony sprzęt",
        "Bezpieczne i niezapomniane przygody"
      ],
      image: "/assets/indiv.png"
    },
    {
      icon: Users,
      title: "Oferta dla Firm", 
      description: "Profesjonalna organizacja eventów firmowych na terenie całej Polski. Imprezy integracyjne, zloty i szkolenia na najwyższym poziomie.",
      features: [
        "Imprezy integracyjne i zloty",
        "Szkolenia i sympozja", 
        "Eventy okolicznościowe",
        "Współpraca z hotelami i ośrodkami"
      ],
      image: "/assets/team-training.webp"
    },
    {
      icon: Target,
      title: "Współpraca Partnerska",
      description: "Rozszerz ofertę swojego hotelu, pensjonatu lub ośrodka o nasze atrakcje. Obsługujemy grupy obcojęzyczne i tworzymy wyjątkowe programy.",
      features: [
        "Obsługa grup obcojęzycznych",
        "Rozszerzenie oferty hoteli i ośrodków", 
        "Ponad 700 zrealizowanych projektów",
        "Wyprawy terenowe w Polsce i Europie"
      ],
      image: "/assets/coop.webp"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="offer" className="py-40 bg-background bg-offroad z-10 -mt-32 sm:-mt-36 md:-mt-40 lg:-mt-44 xl:-mt-48">
      {/* SVG Filter for Liquid Glass Effect */}
      <svg style={{ display: 'none' }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div className="container mx-auto px-4 mt-20">
        <div className="text-center mb-16">
          <h2 className="font-staatliches text-3xl md:text-5xl text-foreground mb-6 mt-40">
            NASZA <span className="text-accent">OFERTA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-roboto-slab leading-relaxed">
            Ponad 700 zrealizowanych projektów w Polsce i Europie. Profesjonalny sprzęt, doświadczeni instruktorzy i niezapomniane przygody w terenie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const IconComponent = offer.icon;
            return (
              <div key={index} className="liquidGlass-wrapper relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-400 group">
                <div className="liquidGlass-effect absolute inset-0 z-0 backdrop-blur-[3px]" style={{filter: 'url(#glass-distortion)'}}></div>
                <div className="liquidGlass-tint absolute inset-0 z-[1] bg-white/20"></div>
                <div className="liquidGlass-shine absolute inset-0 z-[2]" style={{
                  boxShadow: 'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.25), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.25)'
                }}></div>
                <div className="liquidGlass-content relative z-[3]">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image 
                      src={offer.image}
                      alt={offer.title}
                      width={400}
                      height={300}
                      className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${
                        offer.title === "Współpraca Partnerska" ? "object-[center_35%]" : 
                        offer.title === "Oferta dla Firm" ? "object-[center_35%]" : ""
                      }`}
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <IconComponent size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-staatliches text-xl text-card-foreground mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 font-roboto-slab">
                      {offer.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {offer.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground font-roboto-slab">
                          <Target size={16} className="text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={scrollToContact}
                        className="btn-offroad-primary font-roboto-slab"
                      >
                        {offer.title === "Współpraca Partnerska" ? "Skontaktuj się" : "Zapytaj o cenę"}
                      </button>
                    </div>
                  </CardContent>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={scrollToContact}
            className="btn-offroad-outline font-roboto-slab"
          >
            Zapytaj o ofertę specjalną
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offer;

