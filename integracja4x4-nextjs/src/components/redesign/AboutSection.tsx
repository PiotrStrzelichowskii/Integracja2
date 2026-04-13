"use client";

import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutSection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <motion.section
      id="o-nas"
      className="py-16 md:py-32 bg-[#131313]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div className="mb-8 md:mb-10 space-y-2 md:space-y-4" variants={fadeUp}>
          <span className="text-[#F16523] font-headline uppercase tracking-[0.3em] text-sm font-bold">
            {t('aboutSectionLabel')}
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">
            {t('aboutSectionTitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-start">
          <motion.div className="space-y-6 md:space-y-8" variants={fadeUp}>
            <div className="space-y-3 md:space-y-4 text-on-surface/70 leading-snug md:leading-relaxed">
              <p className="text-lg">{t('aboutDesc1')}</p>
              <p>{t('aboutDesc2')}</p>
              <p>{t('aboutDesc3')}</p>
            </div>

            <div className="p-4 md:p-6 bg-primary-container/10 rounded-xl border border-primary-container/20">
              <h3 className="font-headline text-lg text-primary-container mb-2 uppercase tracking-widest">
                {t('aboutMottoTitle')}
              </h3>
              <p className="text-on-surface/70 italic">{t('aboutMottoText')}</p>
            </div>
          </motion.div>

          <motion.div className="relative" variants={fadeUp}>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/10 blur-[100px]" />
            <div className="relative z-10 overflow-hidden shadow-2xl" style={{ clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))" }}>
              <Image
                src="/olddays.webp"
                alt="Mariusz Strzelichowski – założyciel Integracja4x4, lata 1999"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-[#F16523]/30 text-[#e5e2e1] px-3 py-1.5 text-xs font-montserrat uppercase tracking-widest"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F16523] flex-shrink-0" />
                {t('aboutCaption')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
