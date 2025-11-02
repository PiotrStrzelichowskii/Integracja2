"use client";

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from '@/hooks/use-translations';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const Gallery = () => {
  const { t } = useTranslations();
  const { ref, isVisible } = useScrollAnimation(200);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (selectedImageIndex < galleryImages.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setSelectedImageIndex(null);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Gallery images with descriptions - using all available images
  const galleryImages = [
    {
      src: "/assets/img5.webp",
      alt: t('galleryImage1Alt'),
      title: t('galleryImage1Title'),
      description: t('galleryImage1Description')
    },
    {
      src: "/assets/img8.webp",
      alt: t('galleryImage2Alt'),
      title: t('galleryImage2Title'), 
      description: t('galleryImage2Description')
    },
    {
      src: "/assets/toyota7.jpg",
      alt: t('galleryImage3Alt'),
      title: t('galleryImage3Title'),
      description: t('galleryImage3Description')
    },
    {
      src: "/assets/toyota6.webp",
      alt: t('galleryImage4Alt'),
      title: t('galleryImage4Title'),
      description: t('galleryImage4Description')
    }
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-40 bg-background bg-offroad fade-in-up ${isVisible ? 'visible' : ''}`}
    >
      <div id="gallery" className="container mx-auto px-4 scroll-mt-[100px]">
        <div className="text-center mb-20">
                  <h2 className="font-staatliches text-3xl md:text-5xl text-foreground mb-8">
                    {t('galleryTitle')} <span className="text-accent">{t('galleryTitleAccent')}</span>
                  </h2>
                  
                  {/* SEO H2 - ukryty wizualnie ale widoczny dla robotów */}
                  <h2 className="sr-only">
                    Jazda off-road Toyota Land Cruiser | Szkolenia 4x4 | Jazda w terenie | Off-road Małopolska
                  </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-montserrat leading-relaxed">
            {t('galleryDescription')}
          </p>
        </div>

        {/* Mobile Gallery - Simple Stack */}
        <div className="md:hidden max-w-2xl mx-auto">
          <div className="space-y-4">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image 
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                {/* Overlay - always visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-staatliches text-lg text-white mb-1">
                      {image.title}
                    </h3>
                    <p className="text-sm text-white/90 font-montserrat">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Tap Icon */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground p-2 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Gallery - Original Layout */}
        <div className="hidden md:block max-w-7xl mx-auto">
          {/* Top Row - Main Asymmetric Layout */}
          <div className="grid grid-cols-3 gap-6 mb-6" style={{ aspectRatio: '6/2' }}>
            {/* Large image - top left (spans 2 columns) */}
            <div 
              className="col-span-2 relative group cursor-pointer overflow-hidden rounded-lg shadow-soft hover:shadow-strong transition-all duration-300"
              onClick={() => setSelectedImageIndex(0)}
            >
              <div className="aspect-[4/2] overflow-hidden">
                <Image 
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover object-[center_35%] group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-staatliches text-xl text-white mb-1">
                    {galleryImages[0].title}
                  </h3>
                  <p className="text-sm text-white/90 font-montserrat">
                    {galleryImages[0].description}
                  </p>
                </div>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>

            {/* Small image - top right */}
            <div 
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-soft hover:shadow-strong transition-all duration-300"
              onClick={() => setSelectedImageIndex(1)}
            >
              <div className="overflow-hidden">
                <Image 
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-staatliches text-lg text-white mb-1">
                    {galleryImages[1].title}
                  </h3>
                  <p className="text-sm text-white/90 font-montserrat">
                    {galleryImages[1].description}
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
          </div>

          {/* Bottom Row - Main Asymmetric Layout */}
          <div className="grid grid-cols-3 gap-6 mb-6" style={{ aspectRatio: '6/2' }}>
            {/* Small image - bottom left */}
            <div 
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-soft hover:shadow-strong transition-all duration-300"
              onClick={() => setSelectedImageIndex(2)}
            >
              <div className="overflow-hidden">
                <Image 
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  width={400} 
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-staatliches text-lg text-white mb-1">
                    {galleryImages[2].title}
                  </h3>
                  <p className="text-sm text-white/90 font-montserrat">
                    {galleryImages[2].description}
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

            {/* Large image - bottom right (spans 2 columns) */}
            <div 
              className="col-span-2 relative group cursor-pointer overflow-hidden rounded-lg shadow-soft hover:shadow-strong transition-all duration-300"
              onClick={() => setSelectedImageIndex(3)}
            >
              <div className="overflow-hidden">
                <Image 
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-staatliches text-xl text-white mb-1">
                    {galleryImages[3].title}
                  </h3>
                  <p className="text-sm text-white/90 font-montserrat">
                    {galleryImages[3].description}
                  </p>
                </div>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center mt-24">
          <div className="bg-muted/50 p-10 rounded-lg">
            <h3 className="font-staatliches text-2xl text-foreground mb-4">
              {t('wantToSeeMore')}
            </h3>
            <p className="text-muted-foreground font-montserrat mb-6">
              {t('visitSocialMedia')}
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8">
              <a 
                href="https://www.facebook.com/integracja4x4" 
                className="btn-offroad-primary font-montserrat px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-5 text-sm sm:text-sm md:text-base align-middle items-center"
              >
                Facebook
              </a>
              <a 
                href="https://www.instagram.com/integracja4x4.pl/" 
                className="btn-offroad-primary font-montserrat px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-5 text-sm sm:text-sm md:text-base align-middle items-center"
              >
                Instagram
              </a>
              <a 
                href="https://www.youtube.com/channel/UCJyTmHY9czMaXCd3HplVylQ" 
                className="btn-offroad-primary font-montserrat px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-5 text-sm sm:text-sm md:text-base align-middle items-center"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal with Navigation */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-[95vh] p-0 bg-black/95 border-none">
          {/* Hidden title for accessibility */}
          <DialogTitle className="sr-only">
            {selectedImageIndex !== null ? galleryImages[selectedImageIndex].title : t('imagePreview')}
          </DialogTitle>
          
          <div className="relative h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 z-50 bg-black/50 text-white hover:text-accent p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:text-accent p-3 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {selectedImageIndex !== null && selectedImageIndex < galleryImages.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 text-white hover:text-accent p-3 rounded-full transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-4">
              {selectedImageIndex !== null && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={galleryImages[selectedImageIndex].src}
                    alt={galleryImages[selectedImageIndex].alt}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                    style={{ maxHeight: 'calc(95vh - 120px)' }}
                  />
                </div>
              )}
            </div>

            {/* Image Info */}
            {selectedImageIndex !== null && (
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-2 rounded-lg">
                <h3 className="font-staatliches text-lg mb-1">
                  {galleryImages[selectedImageIndex].title}
                </h3>
                <p className="text-xs font-montserrat text-white/90">
                  {galleryImages[selectedImageIndex].description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-white/70">
                    {selectedImageIndex + 1} {t('of')} {galleryImages.length}
                  </span>
                  <span className="text-xs text-white/50">
                    {t('navigationHint')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;

