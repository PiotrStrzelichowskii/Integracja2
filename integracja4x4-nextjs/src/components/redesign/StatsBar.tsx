"use client";

import { useTranslations } from "@/hooks/use-translations";
import { motion, useReducedMotion } from "framer-motion";

export default function StatsBar() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const stats = [
    { value: "1000+", labelKey: "statsTrainings" as const },
    { value: "300+", labelKey: "statsEvents" as const },
    { value: "30+", labelKey: "statsYears" as const },
    { value: "100%", labelKey: "statsSatisfaction" as const },
  ];

  return (
    <motion.section
      className="bg-surface-container-lowest py-12 border-y border-outline-variant/10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.labelKey}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: EASE },
              },
            }}
          >
            <div className="text-4xl font-headline font-bold text-on-surface">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-primary-container mt-2">{t(stat.labelKey)}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
