"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-8 pt-8 pb-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
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
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('offer')}
              className="text-left text-foreground hover:text-accent transition-colors font-roboto-slab font-medium py-2"
            >
              Oferta
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-left text-foreground hover:text-accent transition-colors font-roboto-slab font-medium py-2"
            >
              O nas
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-left text-foreground hover:text-accent transition-colors font-roboto-slab font-medium py-2"
            >
              Galeria
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-roboto-slab w-fit"
            >
              Kontakt
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

