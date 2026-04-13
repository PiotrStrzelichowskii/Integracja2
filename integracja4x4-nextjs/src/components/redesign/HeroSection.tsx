"use client";

import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Subtelny parallax: w miarę przewijania hero treść lekko "ucieka" do góry
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -128]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.92]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.webp"
          alt="Toyota Land Cruiser Integracja4x4 w błocie w lesie"
          fill
          className="object-cover object-[63%_center] sm:object-center brightness-[0.4]"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(241,101,35,0.12) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#131313]/90 via-transparent to-transparent bg-[length:33%_100%] bg-no-repeat" style={{ background: 'linear-gradient(to right, rgba(19,19,19,0.9) 0%, transparent 33%)' }} />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-8 w-full -mt-24 will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="space-y-8">
          <h1 className="font-headline font-extrabold leading-none tracking-tighter text-on-surface uppercase">
            <span className="relative block w-max" style={{ fontSize: 'clamp(2rem, calc((100vw - 4rem) / 5.4), 9rem)' }}>
              <span className="absolute -top-0 -left-3 pointer-events-none z-20" style={{ width: 'clamp(1.5rem, 3vw, 4rem)', height: 'clamp(1.5rem, 3vw, 4rem)' }}>
                <span className="absolute top-0 left-0 w-full h-[3px] bg-[#F16523]" />
                <span className="absolute top-0 left-0 w-[3px] h-full bg-[#F16523]" />
              </span>
              {t('heroLine1')}
            </span>
            <span className="relative block w-max whitespace-nowrap" style={{ fontSize: 'clamp(2rem, calc((100vw - 4rem) / 7.5), 6.5rem)' }}>
              {t('heroLine2Start')} <span className="text-primary-container">{t('heroLine2Accent')}</span>
              <span className="absolute -bottom-0 -right-3 pointer-events-none z-20" style={{ width: 'clamp(1.5rem, 3vw, 4rem)', height: 'clamp(1.5rem, 3vw, 4rem)' }}>
                <span className="absolute bottom-0 right-0 w-full h-[3px] bg-white" />
                <span className="absolute bottom-0 right-0 w-[3px] h-full bg-white" />
              </span>
            </span>
          </h1>
          <p className="text-secondary-fixed opacity-90 max-w-2xl font-light" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.5rem)' }}>
            {t('heroDescription')}
          </p>
          <div className="flex flex-row gap-3 pt-4">
            <a
              href="#oferta"
              className="btn-offroad-primary font-montserrat uppercase tracking-wide inline-flex items-center gap-2 text-[clamp(0.6rem,3vw,0.875rem)] sm:text-sm md:text-base [@media(min-height:1000px)]:md:text-lg [@media(min-height:1000px)]:md:py-4 [@media(min-height:1000px)]:md:px-10 py-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(0.75rem,3vw,1.5rem)] sm:py-3 sm:px-6 whitespace-nowrap"
            >
              {t('seeOffer')}
            </a>
            <a
              href="#kontakt"
              className="btn-offroad-outline font-montserrat uppercase tracking-wide inline-flex items-center gap-2 text-[clamp(0.6rem,3vw,0.875rem)] sm:text-sm md:text-base [@media(min-height:1000px)]:md:text-lg [@media(min-height:1000px)]:md:py-4 [@media(min-height:1000px)]:md:px-10 py-[clamp(0.5rem,1.5vw,0.75rem)] px-[clamp(0.75rem,3vw,1.5rem)] sm:py-3 sm:px-6 whitespace-nowrap"
            >
              {t('contactUs')}
            </a>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
