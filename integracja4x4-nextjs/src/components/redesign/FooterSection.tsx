"use client";

import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, Settings } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function FooterSection() {
  const { t } = useTranslations();
  const currentYear = new Date().getFullYear();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const handleCookieSettings = () => {
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("analytics-consent");
    window.location.reload();
  };

  return (
    <motion.footer
      className="w-full bg-[#131313]"
      role="contentinfo"
      aria-label="Stopka strony"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="w-full px-6 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-12">
          {/* Brand */}
          <motion.div className="col-span-2 space-y-4 md:space-y-6" variants={fadeUp}>
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo-Photoroom.webp"
                alt="Integracja4x4 Logo"
                width={64}
                height={64}
                className="object-contain rounded-full"
              />
              <div className="font-headline text-xl font-black text-[#F16523] uppercase tracking-tighter">
                Integracja4x4
              </div>
            </div>
            <p className="font-body text-[#E8E2D9] text-sm opacity-60 leading-relaxed max-w-sm">
              {t('footerDescriptionDesktop')}
            </p>
            <div className="flex gap-8 md:gap-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/integracja4x4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-[#cbc6bd] hover:text-[#F16523] transition-colors border border-outline-variant/10"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://m.me/integracja4x4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-[#cbc6bd] hover:text-[#F16523] transition-colors border border-outline-variant/10"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/integracja4x4.pl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-[#cbc6bd] hover:text-[#F16523] transition-colors border border-outline-variant/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@integracja4x4.pl"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-[#cbc6bd] hover:text-[#F16523] transition-colors border border-outline-variant/10"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-headline font-bold text-[#F16523] uppercase tracking-widest text-xs mb-4 md:mb-8">
              {t('footerQuickLinks')}
            </h4>
            <ul className="space-y-4">
              {[
                { label: t('offer'), href: "#oferta" },
                { label: t('about'), href: "#o-nas" },
                { label: t('gallery'), href: "#galeria" },
                { label: t('contact'), href: "#kontakt" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-[#E8E2D9] text-sm opacity-60 hover:opacity-100 hover:text-[#F16523] transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="font-headline font-bold text-[#F16523] uppercase tracking-widest text-xs mb-4 md:mb-8">
              {t('contact')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#E8E2D9]/60">
                <Phone className="w-4 h-4 text-[#F16523] flex-shrink-0" />
                <span className="font-body text-sm">+48 501 318 521</span>
              </div>
              <div className="flex items-center gap-3 text-[#E8E2D9]/60">
                <Mail className="w-4 h-4 text-[#F16523] flex-shrink-0" />
                <a
                  href="mailto:info@integracja4x4.pl"
                  className="font-body text-sm hover:text-[#F16523] transition-colors"
                >
                  info@integracja4x4.pl
                </a>
              </div>
              <div className="flex items-start gap-3 text-[#E8E2D9]/60">
                <MapPin className="w-4 h-4 text-[#F16523] flex-shrink-0 mt-0.5" />
                <div className="font-body text-sm">
                  <div>ul. Powstania Styczniowego 12a</div>
                  <div>30-298 Kraków</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <hr className="border-outline-variant/10 my-8 md:my-12" />

        <motion.div className="flex flex-col md:flex-row justify-between items-center gap-6" variants={fadeUp}>
          <p className="font-body text-[#E8E2D9] text-sm opacity-40">
            © {currentYear} Integracja4x4. {t('footerCopyright')}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/polityka-prywatnosci"
              className="font-body text-[#E8E2D9] text-sm opacity-40 hover:opacity-80 hover:text-[#F16523] transition-all"
            >
              {t('footerPrivacyPolicy')}
            </a>
            <button
              onClick={handleCookieSettings}
              className="font-body text-[#E8E2D9] text-sm opacity-40 hover:opacity-80 hover:text-[#F16523] transition-all flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              {t('footerCookieSettings')}
            </button>
          </div>
        </motion.div>

        <motion.div className="text-center mt-6" variants={fadeUp}>
          <p className="font-body text-[#E8E2D9] text-xs opacity-30">
            {t('footerMadeBy')}{" "}
            <a
              href="https://www.s3elistudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F16523] hover:text-[#F16523]/80 transition-colors font-medium opacity-100"
            >
              S3eli
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
