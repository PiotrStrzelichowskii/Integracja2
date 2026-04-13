"use client";

import Image from "next/image";
import { useTranslations } from "@/hooks/use-translations";
import { motion, useReducedMotion } from "framer-motion";

const clip = (size: number) =>
  `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, ${size}px 100%, 0 calc(100% - ${size}px))`;

export default function GallerySection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <motion.section
      id="galeria"
      className="py-16 md:py-32 px-4 md:px-8 bg-[#131313]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <div className="max-w-screen-2xl mx-auto">
        <motion.div className="text-center mb-8 md:mb-16" variants={fadeUp}>
          <span className="text-primary-container font-headline uppercase tracking-[0.3em] text-sm font-bold">
            {t('gallerySectionLabel')}
          </span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter mt-4">
            {t('gallerySectionTitle')}
          </h2>
        </motion.div>

        <motion.div className="relative flex flex-col lg:flex-row gap-4 py-4" variants={fadeUp}>
          <span className="absolute -top-0 -left-4 w-12 h-12 pointer-events-none z-20">
            <span className="absolute top-0 left-0 w-full h-[3px] bg-[#F16523]" />
            <span className="absolute top-0 left-0 w-[3px] h-full bg-[#F16523]" />
          </span>
          <span className="absolute -bottom-0 -right-4 w-12 h-12 pointer-events-none z-20">
            <span className="absolute bottom-0 right-0 w-full h-[3px] bg-white" />
            <span className="absolute bottom-0 right-0 w-[3px] h-full bg-white" />
          </span>

          {/* LEWA POŁOWA — cols 1-6 */}
          <div className="flex-1 grid grid-cols-6 gap-4 gallery-half">

            {/* wide 4×2 */}
            <div className="col-start-1 col-span-4 row-start-1 row-span-2 overflow-hidden group relative" style={{ clipPath: clip(14) }}>
              <Image src="/assets/toyota6.webp" alt="Toyota Land Cruiser pokonuje błotnistą drogę terenową podczas szkolenia Integracja4x4" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" sizes="50vw" />
            </div>

            {/* square 2×2 */}
            <div className="col-start-5 col-span-2 row-start-1 row-span-2 overflow-hidden group relative" style={{ clipPath: clip(12) }}>
              <Image src="/assets/wykrzyz.webp" alt="Uczestnicy integracji firmowej 4x4 na skrzyżowaniu dróg terenowych" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* portrait 2×4 */}
            <div className="col-start-1 col-span-2 row-start-3 row-span-4 overflow-hidden group relative" style={{ clipPath: clip(12) }}>
              <Image src="/assets/IMG_3318.webp" alt="Quad ATV podczas szkolenia offroad – widok z trasy terenowej" fill className="object-cover object-[center_60%] group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* large 4×4 */}
            <div className="col-start-3 col-span-4 row-start-3 row-span-4 overflow-hidden group relative" style={{ clipPath: clip(16) }}>
              <Image src="/assets/toyota7.webp" alt="Pojazd 4x4 pokonuje strome podejście podczas szkolenia jazdy terenowej Integracja4x4" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" sizes="33vw" />
            </div>

          </div>

          {/* PRAWA POŁOWA — cols 7-12 */}
          <div className="flex-1 grid grid-cols-6 gap-4 gallery-half">

            {/* portrait 2×4 */}
            <div className="col-start-1 col-span-2 row-start-1 row-span-4 overflow-hidden group relative" style={{ clipPath: clip(12) }}>
              <Image src="/assets/IMG_3344.png" alt="Instruktor Integracja4x4 prowadzi grupę podczas eventu firmowego off-road" fill className="object-cover object-[30%_center] group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* portrait 2×4 */}
            <div className="col-start-3 col-span-2 row-start-1 row-span-4 overflow-hidden group relative" style={{ clipPath: clip(12) }}>
              <Image src="/assets/img8.webp" alt="Uczestnicy szkolenia offroad pokonują przeszkody terenowe podczas eventu firmowego" fill className="object-cover object-[70%_center] group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* square 2×2 */}
            <div className="col-start-5 col-span-2 row-start-1 row-span-2 overflow-hidden group relative" style={{ clipPath: clip(10) }}>
              <Image src="/assets/IMG_3401.webp" alt="Pojazdy terenowe 4x4 podczas akcji off-road – szkolenie Integracja4x4" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* square 2×2 */}
            <div className="col-start-5 col-span-2 row-start-3 row-span-2 overflow-hidden group relative" style={{ clipPath: clip(10) }}>
              <Image src="/assets/wyciagarka.webp" alt="Instruktor pokazuje obsługę wyciągarki pojazdu terenowego podczas szkolenia offroad" fill className="object-cover object-[0%_center] group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* square 2×2 */}
            <div className="col-start-1 col-span-2 row-start-5 row-span-2 overflow-hidden group relative" style={{ clipPath: clip(10) }}>
              <Image src="/assets/img11.webp" alt="Grupa uczestników integracji firmowej podczas wyprawy terenowej 4x4 w terenie" fill className="object-cover object-[10%_center] group-hover:scale-110 transition-transform duration-1000" sizes="17vw" />
            </div>

            {/* wide 4×2 */}
            <div className="col-start-3 col-span-4 row-start-5 row-span-2 overflow-hidden group relative" style={{ clipPath: clip(14) }}>
              <Image src="/assets/IMG_3368.png" alt="Pojazdy terenowe partnerów Integracja4x4 – współpraca eventowa off-road" fill className="object-cover object-[0%_60%] group-hover:scale-110 transition-transform duration-1000" sizes="33vw" />
            </div>

          </div>

        </motion.div>
      </div>
    </motion.section>
  );
}
