"use client";

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import Image from 'next/image';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gallery images with descriptions
  const galleryImages = [
    {
      src: "/assets/hero-offroad.jpg",
      alt: "Offroad adventure in challenging terrain",
      title: "Ekstremalne Wyzwania",
      description: "Pokonywanie najtrudniejszych przeszkód terenowych"
    },
    {
      src: "/assets/car-training.jpg",
      alt: "4x4 vehicle training session",
      title: "Szkolenie 4x4", 
      description: "Profesjonalne kursy jazdy samochodami terenowymi"
    },
    {
      src: "/assets/atv-training.jpg",
      alt: "ATV quad bike training",
      title: "Kursy ATV",
      description: "Nauka jazdy quadami w trudnym terenie"
    },
    {
      src: "/assets/team-training.jpg",
      alt: "Corporate team building event",
      title: "Eventy Firmowe",
      description: "Integracja zespołów przez wspólną przygodę"
    },
    {
      src: "/assets/hero-offroad.jpg",
      alt: "Advanced offroad techniques",
      title: "Zaawansowane Techniki",
      description: "Kursy dla doświadczonych kierowców"
    },
    {
      src: "/assets/car-training.jpg",
      alt: "Safety training session",
      title: "Bezpieczeństwo",
      description: "Najwyższe standardy bezpieczeństwa w każdym szkoleniu"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background bg-offroad">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-staatliches text-3xl md:text-5xl text-foreground mb-6">
            NASZA <span className="text-accent">GALERIA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-roboto-slab leading-relaxed">
            Zobacz jak wyglądają nasze szkolenia i przekonaj się o profesjonalnym poziomie naszych kursów
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-soft hover:shadow-strong transition-all duration-300"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image 
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-staatliches text-lg text-sand-light mb-1">
                    {image.title}
                  </h3>
                  <p className="text-sm text-sand-light/80 font-roboto-slab">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-muted/30 p-8 rounded-lg">
            <h3 className="font-staatliches text-2xl text-foreground mb-4">
              Chcesz zobaczyć więcej?
            </h3>
            <p className="text-muted-foreground font-roboto-slab mb-6">
              Odwiedź nasze media społecznościowe, aby zobaczyć najnowsze zdjęcia i filmy z naszych szkoleń
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-roboto-slab font-medium transition-colors inline-block"
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-roboto-slab font-medium transition-colors inline-block"
              >
                Instagram
              </a>
              <a 
                href="#" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-roboto-slab font-medium transition-colors inline-block"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent z-50"
            >
              <X size={32} />
            </button>
            {selectedImage && (
              <Image 
                src={selectedImage}
                alt="Gallery image"
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;

