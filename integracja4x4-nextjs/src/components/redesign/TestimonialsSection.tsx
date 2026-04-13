"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/hooks/use-translations";
import { TranslationKey } from "@/lib/dictionaries";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const testimonialKeys: { quoteKey: TranslationKey; nameKey: TranslationKey; role: "female" | "male" }[] = [
  { quoteKey: "t1quote", nameKey: "t1name", role: "female" },
  { quoteKey: "t2quote", nameKey: "t2name", role: "female" },
  { quoteKey: "t3quote", nameKey: "t3name", role: "female" },
  { quoteKey: "t4quote", nameKey: "t4name", role: "male" },
  { quoteKey: "t5quote", nameKey: "t5name", role: "female" },
];

const Stars = () => (
  <div className="flex text-primary-container mb-6">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        star
      </span>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const { t } = useTranslations();
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialKeys.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const total = testimonialKeys.length;
  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  return (
    <motion.section
      className="py-16 md:py-32 bg-surface-container-lowest overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-headline font-bold text-center mb-4 text-on-surface"
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
        >
          {t('testimonialsFullTitle')}
        </motion.h2>
        <motion.p
          className="text-center text-on-surface/60 mb-10 md:mb-20"
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.05, ease: EASE } },
          }}
        >
          {t('testimonialsSubtitle')}
        </motion.p>

        <motion.div
          className="flex items-center gap-6"
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
            show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
          }}
        >
          {/* Prev */}
          <div
            className="hidden md:block flex-none w-72 opacity-30 scale-95 cursor-pointer transition-all duration-500 select-none"
            onClick={() => setCurrent(prev)}
          >
            <div
              className="bg-[#131313] p-8 border border-outline-variant/10"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
            >
              <Stars />
              <p className="text-on-surface/70 italic leading-relaxed text-sm line-clamp-4">
                "{t(testimonialKeys[prev].quoteKey)}"
              </p>
              <div className="mt-6">
                <div className="font-bold text-on-surface text-sm">{t(testimonialKeys[prev].nameKey)}</div>
                <div className="text-[10px] uppercase text-primary-container tracking-widest font-bold">{t(testimonialKeys[prev].role === "female" ? "testimonialRoleFemale" : "testimonialRoleMale")}</div>
              </div>
            </div>
          </div>

          {/* Current */}
          <div className="flex-1 transition-all duration-500">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                className="bg-[#131313] p-6 md:p-10 border border-outline-variant/10 relative"
                style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className="material-symbols-outlined absolute top-6 md:top-10 right-6 md:right-10 text-primary-container/20 text-4xl md:text-6xl">
                  format_quote
                </span>
                <Stars />
                <p className="text-on-surface/70 italic leading-relaxed mb-6 md:mb-8 text-base md:text-lg min-h-[240px] sm:min-h-[180px] md:min-h-[140px] lg:min-h-[120px]">
                  "{t(testimonialKeys[current].quoteKey)}"
                </p>
                <div>
                  <div className="font-bold text-on-surface">{t(testimonialKeys[current].nameKey)}</div>
                  <div className="text-[10px] uppercase text-primary-container tracking-widest font-bold mt-1">
                    {t(testimonialKeys[current].role === "female" ? "testimonialRoleFemale" : "testimonialRoleMale")}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <div
            className="hidden md:block flex-none w-72 opacity-30 scale-95 cursor-pointer transition-all duration-500 select-none"
            onClick={() => setCurrent(next)}
          >
            <div
              className="bg-[#131313] p-8 border border-outline-variant/10"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
            >
              <Stars />
              <p className="text-on-surface/70 italic leading-relaxed text-sm line-clamp-4">
                "{t(testimonialKeys[next].quoteKey)}"
              </p>
              <div className="mt-6">
                <div className="font-bold text-on-surface text-sm">{t(testimonialKeys[next].nameKey)}</div>
                <div className="text-[10px] uppercase text-primary-container tracking-widest font-bold">{t(testimonialKeys[next].role === "female" ? "testimonialRoleFemale" : "testimonialRoleMale")}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dots */}
        <motion.div
          className="flex justify-center gap-3 mt-10"
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
        >
          {testimonialKeys.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#F16523]" : "w-4 bg-on-surface/20 hover:bg-on-surface/40"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
