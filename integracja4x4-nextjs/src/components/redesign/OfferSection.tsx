"use client";

import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import { TranslationKey } from "@/lib/dictionaries";
import { motion, useReducedMotion } from "framer-motion";

export default function OfferSection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const cards = [
    {
      image: "/assets/indiv.webp",
      alt: "Indywidualne szkolenie jazdy terenowej 4x4",
      titleKey: "offer1Title" as TranslationKey,
      descKey: "offer1Desc" as TranslationKey,
      featureKeys: ["offer1F1","offer1F2","offer1F3","offer1F4","offer1F5","offer1F6","offer1F7"] as TranslationKey[],
      ctaKey: "offer1Cta" as TranslationKey,
    },
    {
      image: "/assets/team-training.webp",
      alt: "Eventy firmowe i team building 4x4",
      titleKey: "offer2Title" as TranslationKey,
      descKey: "offer2Desc" as TranslationKey,
      featureKeys: ["offer2F1","offer2F2","offer2F3","offer2F4","offer2F5","offer2F6"] as TranslationKey[],
      ctaKey: "offer2Cta" as TranslationKey,
    },
    {
      image: "/assets/coop.webp",
      alt: "Współpraca partnerska off-road",
      titleKey: "offer3Title" as TranslationKey,
      descKey: "offer3Desc" as TranslationKey,
      featureKeys: ["offer3F1","offer3F2","offer3F3","offer3F4","offer3F5","offer3F6","offer3F7"] as TranslationKey[],
      ctaKey: "offer3Cta" as TranslationKey,
    },
  ];

  return (
    <motion.section
      id="oferta"
      className="py-16 md:py-32 px-4 md:px-8 topo-bg bg-[#131313]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4 md:gap-8"
          variants={fadeUp}
        >
          <div className="space-y-4">
            <span className="text-primary-container font-headline uppercase tracking-[0.3em] text-sm font-bold">
              {t('offerSectionLabel')}
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">
              {t('offerSectionTitle')}
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.titleKey}
              className="group relative bg-surface-container overflow-hidden border border-outline-variant/10 hover:border-primary-container/30 transition-all duration-500 flex flex-col"
              style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: EASE },
                },
              }}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-75"
                  src={card.image}
                  alt={card.alt}
                  width={600}
                  height={450}
                />
              </div>
              <div className="px-6 md:px-8 pt-4 md:pt-5 pb-6 md:pb-8 space-y-3 md:space-y-4 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">{t(card.titleKey)}</h3>
                <p className="text-on-surface/60 text-sm leading-relaxed">{t(card.descKey)}</p>
                <ul className="space-y-1.5 md:space-y-2 flex-1">
                  {card.featureKeys.map((key) => (
                    <li key={key} className="flex items-center gap-2 text-on-surface/60 text-xs">
                      <span className="material-symbols-outlined text-primary-container flex-shrink-0" style={{ fontSize: "14px" }}>
                        check_circle
                      </span>
                      {t(key)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#kontakt"
                  className="btn-offroad-primary font-montserrat uppercase tracking-tight md:tracking-wide text-xs sm:text-sm md:text-base inline-flex w-full mt-4 md:mt-6 items-center justify-center gap-1.5 sm:gap-2 [@media(min-height:1000px)]:md:text-lg [@media(min-height:1000px)]:md:py-4 [@media(min-height:1000px)]:md:px-10 px-2 min-[380px]:px-4"
                >
                  {t(card.ctaKey)}{" "}
                  <span className="material-symbols-outlined !text-[12px] min-[380px]:!text-[14px] md:!text-[20px]">arrow_forward</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mt-12" variants={fadeUp}>
          <a
            href="#kontakt"
            className="btn-offroad-outline font-montserrat uppercase tracking-tight md:tracking-wide text-xs sm:text-sm md:text-base inline-flex items-center gap-1.5 sm:gap-2 [@media(min-height:1000px)]:md:text-lg [@media(min-height:1000px)]:md:py-4 [@media(min-height:1000px)]:md:px-10 px-4"
          >
            {t('offerCtaSpecial')}
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
