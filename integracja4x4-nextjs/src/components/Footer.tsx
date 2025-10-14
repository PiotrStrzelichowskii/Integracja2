import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-mud-dark text-sand-light">
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Company Info - Compact */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Image 
                src="/logo.webp" 
                alt="Integracja4x4 Logo" 
                width={32} 
                height={32}
                className="object-contain rounded-full"
              />
              <div className="font-staatliches text-lg tracking-[0.02em]">
                INTEGRACJA4X4
              </div>
            </div>
            <p className="text-sand-light/80 font-roboto-slab text-sm leading-relaxed mb-4">
              Profesjonalne szkolenia offroad, eventy firmowe i niezapomniane przygody w trudnym terenie.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.facebook.com/integracja4x4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sand-light/60 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://m.me/integracja4x4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sand-light/60 hover:text-accent transition-colors"
                aria-label="Messenger"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/integracja4x4.pl/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sand-light/60 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@integracja4x4.pl"
                className="text-sand-light/60 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links and Contact - Horizontal Layout */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-staatliches text-sm text-accent mb-2">Szybkie linki</h3>
              <ul className="space-y-1 font-roboto-slab text-sm">
                <li><a href="#offer" className="text-sand-light/80 hover:text-accent transition-colors">Oferta</a></li>
                <li><a href="#about" className="text-sand-light/80 hover:text-accent transition-colors">O nas</a></li>
                <li><a href="#gallery" className="text-sand-light/80 hover:text-accent transition-colors">Galeria</a></li>
                <li><a href="#contact" className="text-sand-light/80 hover:text-accent transition-colors">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-staatliches text-sm text-accent mb-2">Kontakt</h3>
              <div className="space-y-1 font-roboto-slab text-sm">
                <div className="flex items-center text-sand-light/80">
                  <Phone size={12} className="mr-2 text-accent flex-shrink-0" />
                  <span>+48 501 318 521</span>
                </div>
                <div className="flex items-center text-sand-light/80">
                  <Mail size={12} className="mr-2 text-accent flex-shrink-0" />
                  <a href="mailto:info@integracja4x4.pl" className="hover:text-accent transition-colors text-xs">
                    info@integracja4x4.pl
                  </a>
                </div>
                <div className="flex items-start text-sand-light/80">
                  <MapPin size={12} className="mr-2 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <div>ul. Powstania Styczniowego 12a</div>
                    <div>30-298 Kraków</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright - Compact */}
          <hr className="border-sand-light/20 my-4" />
          <div className="text-center text-sand-light/60 font-roboto-slab text-xs">
            <p className="mb-1">© 2025 Integracja4x4. Wszelkie prawa zastrzeżone.</p>
            <a href="/polityka-prywatnosci" className="hover:text-accent transition-colors">Polityka prywatności</a>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image 
                  src="/logo.webp" 
                  alt="Integracja4x4 Logo" 
                  width={48} 
                  height={48}
                  className="object-contain rounded-full"
                />
                <div className="font-staatliches text-xl tracking-[0.02em]">
                  INTEGRACJA4X4
                </div>
              </div>
              <p className="text-sand-light/80 font-roboto-slab leading-relaxed mb-6">
                Profesjonalne szkolenia offroad, eventy firmowe i niezapomniane przygody w trudnym terenie. 
                Ponad 30 lat doświadczenia w organizacji wypraw terenowych.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/integracja4x4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sand-light/60 hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://m.me/integracja4x4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sand-light/60 hover:text-accent transition-colors"
                  aria-label="Messenger"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.instagram.com/integracja4x4.pl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sand-light/60 hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="mailto:info@integracja4x4.pl"
                  className="text-sand-light/60 hover:text-accent transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-staatliches text-lg text-accent mb-4">Szybkie linki</h3>
              <ul className="space-y-3 font-roboto-slab">
                <li>
                  <a href="#offer" className="text-sand-light/80 hover:text-accent transition-colors">Oferta</a>
                </li>
                <li>
                  <a href="#about" className="text-sand-light/80 hover:text-accent transition-colors">O nas</a>
                </li>
                <li>
                  <a href="#gallery" className="text-sand-light/80 hover:text-accent transition-colors">Galeria</a>
                </li>
                <li>
                  <a href="#contact" className="text-sand-light/80 hover:text-accent transition-colors">Kontakt</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-staatliches text-lg text-accent mb-4">Kontakt</h3>
              <div className="space-y-3 font-roboto-slab">
                <div className="flex items-center text-sand-light/80">
                  <Phone size={16} className="mr-3 text-accent flex-shrink-0" />
                  <span>+48 501 318 521</span>
                </div>
                <div className="flex items-center text-sand-light/80">
                  <Mail size={16} className="mr-3 text-accent flex-shrink-0" />
                  <a href="mailto:info@integracja4x4.pl" className="hover:text-accent transition-colors">
                    info@integracja4x4.pl
                  </a>
                </div>
                <div className="flex items-start text-sand-light/80">
                  <MapPin size={16} className="mr-3 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <div>ul. Powstania Styczniowego 12a</div>
                    <div>30-298 Kraków</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-sand-light/20 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sand-light/60 font-roboto-slab text-sm">
            <p>© 2025 Integracja4x4. Wszelkie prawa zastrzeżone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/polityka-prywatnosci" className="hover:text-accent transition-colors">Polityka prywatności</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
