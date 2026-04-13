"use client";

import { useState, useEffect } from "react";
import { Menu, X, Facebook, Instagram, MessageCircle, Mail } from "lucide-react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "@/hooks/use-translations";

export default function NavBar() {
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
    trackEvent.navigationClick(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    trackEvent.navigationClick("home");
  };

  const navLinks = [
    { label: t('offer'), id: "oferta" },
    { label: t('about'), id: "o-nas" },
    { label: t('gallery'), id: "galeria" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled ? "bg-[#131313]/95 backdrop-blur-md" : "bg-transparent"
        }`}
        role="banner"
      aria-label="Główna nawigacja"
      id="main-header"
    >
      <div className="w-full px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Przejdź do strony głównej"
        >
          {/* Mobile */}
          <div className="lg:hidden w-14 h-14 relative rounded-full overflow-hidden">
            <Image src="/assets/logo-Photoroom.webp" alt="Integracja4x4 Logo" fill className="object-contain" sizes="56px" />
          </div>
          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="w-16 h-16 relative rounded-full overflow-hidden">
              <Image src="/assets/logo-Photoroom.webp" alt="Integracja4x4 Logo" fill className="object-contain" sizes="64px" />
            </div>
            <div className="font-staatliches text-3xl text-[#e5e2e1] tracking-wider">
              Integracja4X4
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-6" role="navigation" id="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-[#e5e2e1] hover:text-[#F16523] transition-colors font-montserrat font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("kontakt")}
              className="btn-offroad-outline font-montserrat uppercase tracking-wide inline-flex items-center gap-2 text-sm py-2 px-5"
            >
              {t('contact')}
            </button>
          </nav>
          <div className="ml-4 pl-4 border-l border-[#F16523]/20">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="scale-90 origin-right">
            <LanguageSwitcher />
          </div>
          <button
          className="lg:hidden w-14 h-14 flex items-center justify-center text-[#F16523] hover:text-[#F16523]/80 hover:bg-[#F16523]/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full h-[100dvh] transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 bg-black/40 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
        onClick={() => setIsMenuOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobilne"
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-0 w-[85vw] max-w-sm min-h-[60svh] flex flex-col rounded-l-3xl bg-[#131313] shadow-2xl py-12 drop-shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center gap-8 px-12" id="mobile-nav">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left text-[#e5e2e1] hover:text-[#F16523] transition-colors font-montserrat font-medium text-lg lg:text-xl"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("kontakt")}
              className="w-full text-left text-[#F16523] hover:text-[#F16523]/80 transition-colors font-montserrat font-medium text-lg lg:text-xl"
            >
              {t('contact')}
            </button>
          </nav>

          {/* Social */}
          <div className="px-8 mt-10 flex justify-center">
            <div className="flex items-center gap-5">
              <a
                  href="https://www.facebook.com/integracja4x4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5e2e1] hover:text-[#F16523] transition-colors"
                  aria-label="Facebook"
                  onClick={() => trackEvent.socialMediaClick("Facebook")}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://m.me/integracja4x4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5e2e1] hover:text-[#F16523] transition-colors"
                  aria-label="Messenger"
                  onClick={() => trackEvent.socialMediaClick("Messenger")}
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/integracja4x4.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e5e2e1] hover:text-[#F16523] transition-colors"
                  aria-label="Instagram"
                  onClick={() => trackEvent.socialMediaClick("Instagram")}
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:info@integracja4x4.pl"
                  className="text-[#e5e2e1] hover:text-[#F16523] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
