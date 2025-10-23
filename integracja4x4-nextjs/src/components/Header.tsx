"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
      // Track navigation
      trackEvent.navigationClick(sectionId);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled ? 'bg-mud-dark/95' : 'bg-transparent'
    }`} style={{ zIndex: 9999 }}>
      <div className="w-full px-8 pt-8 pb-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile logo - tylko zdjęcie, mniejsze */}
          <div className="md:hidden">
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Integracja4x4 Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Desktop logo - zdjęcie + tekst */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <Image
                src="/logo.webp"
                alt="Integracja4x4 Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="font-staatliches text-3xl text-foreground tracking-wider">
              Integracja4X4
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('offer')}
            className="text-foreground hover:text-accent transition-colors font-roboto-slab font-medium"
          >
            Oferta
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-accent transition-colors font-roboto-slab font-medium"
          >
            O nas
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="text-foreground hover:text-accent transition-colors font-roboto-slab font-medium"
          >
            Galeria
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-notched font-roboto-slab"
          >
            Kontakt
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-14 h-14 flex items-center justify-center text-accent hover:text-accent/80 hover:bg-accent/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation - Slide from Right */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full w-full transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 99999 }}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* Navbar Content */}
        <div 
          className="absolute top-[6rem] bottom-[4rem] right-0 w-80 max-w-[85vw] flex flex-col rounded-l-2xl overflow-hidden bg-mud-dark"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with logo */}
          <div className="flex items-center justify-center p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image
                  src="/logo.webp"
                  alt="Integracja4x4 Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-staatliches text-lg text-foreground tracking-wider">
                Integracja4X4
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-4">
            <button 
              onClick={() => scrollToSection('offer')}
              className="w-full text-left text-foreground hover:text-accent transition-colors font-roboto-slab font-medium py-4 text-lg"
            >
              Oferta
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="w-full text-left text-foreground hover:text-accent transition-colors font-roboto-slab font-medium py-4 text-lg"
            >
              O nas
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="w-full text-left text-foreground hover:text-accent transition-colors font-roboto-slab font-medium py-4 text-lg"
            >
              Galeria
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full text-left text-accent hover:text-accent/80 transition-colors font-roboto-slab font-medium py-4 text-lg"
            >
              Kontakt
            </button>
          </nav>

          {/* Social Media and Additional Elements */}
          <div className="p-6 border-t border-accent/20">
            <div className="flex items-center justify-between">
              {/* Toggle Switch */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-6 bg-accent/20 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-accent rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.instagram.com/integracja4x4.pl/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-accent transition-colors"
                  onClick={() => trackEvent.socialMediaClick('Instagram')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/integracja4x4" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-accent transition-colors"
                  onClick={() => trackEvent.socialMediaClick('Facebook')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

