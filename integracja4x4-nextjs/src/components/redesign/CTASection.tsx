"use client";

import { useTranslations } from "@/hooks/use-translations";
import { motion, useReducedMotion } from "framer-motion";
export default function CTASection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <motion.section
      className="py-16 md:py-24 relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover object-[center_70%] brightness-[0.3]"
          src="/assets/sunset.webp"
          alt="Pojazdy terenowe 4x4 na szczycie wzgórza o zachodzie słońca – Integracja4x4"
        />
        <div className="absolute inset-0 bg-primary-container/10" />
      </div>

      <motion.div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 md:space-y-8" variants={fadeUp}>
        <motion.h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface tracking-tighter leading-none" variants={fadeUp}>
          {t('ctaTitle')} <span className="text-primary-container">{t('ctaAccent')}</span> {t('ctaTitleEnd')}
        </motion.h2>
        <motion.p className="text-lg md:text-xl text-on-surface/80" variants={fadeUp}>
          {t('ctaSubtitle')}
        </motion.p>
        <motion.div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-2 md:pt-4" variants={fadeUp}>
          <motion.a
            href="#kontakt"
            className="btn-offroad-outline font-montserrat uppercase tracking-wide inline-flex items-center gap-2 [@media(min-height:1000px)]:md:text-lg [@media(min-height:1000px)]:md:py-4 [@media(min-height:1000px)]:md:px-10"
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.2 }}
          >
            {t('ctaBtn2')}
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
