"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "@/hooks/use-translations";
import { TranslationKey } from "@/lib/dictionaries";
import { motion, useReducedMotion } from "framer-motion";

const reels = [
  {
    src: "/assets/movies/filmiki_integracja 2(1).mp4",
    thumbTime: 49,
    labelKey: "reel1Label" as TranslationKey,
  },
  {
    src: "/assets/movies/filmiki_integracja_2 2(1).mp4",
    thumbTime: 9,
    labelKey: "reel2Label" as TranslationKey,
  },
  {
    src: "/assets/movies/filmiki_integracja_5.mp4",
    thumbTime: 9999,
    labelKey: "reel3Label" as TranslationKey,
  },
  {
    src: "/assets/movies/filmiki_integracja_6.mp4",
    thumbTime: 7,
    labelKey: "reel4Label" as TranslationKey,
  },
  {
    src: "/assets/movies/filmiki_integracja_7.mp4",
    thumbTime: 25,
    labelKey: "reel5Label" as TranslationKey,
  },
];

function ReelCard({ src, thumbTime, label, cornerLeft, cornerRight }: { src: string; thumbTime: number; label: string; cornerLeft?: boolean; cornerRight?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.requestFullscreen = () => Promise.resolve();
  }, [playing]);

  return (
    <div className="relative flex-none snap-center">
      {cornerLeft && (
        <span className="absolute -top-4 -left-4 w-12 h-12 pointer-events-none z-20">
          <span className="absolute top-0 left-0 w-full h-[3px] bg-[#F16523]" />
          <span className="absolute top-0 left-0 w-[3px] h-full bg-[#F16523]" />
        </span>
      )}
      {cornerRight && (
        <span className="absolute -bottom-4 -right-4 w-12 h-12 pointer-events-none z-20">
          <span className="absolute bottom-0 right-0 w-full h-[3px] bg-white" />
          <span className="absolute bottom-0 right-0 w-[3px] h-full bg-white" />
        </span>
      )}
    <div
      className="w-72 h-[480px] overflow-hidden group relative cursor-pointer bg-black"
      style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
    >
      {playing ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={src}
          controls
          autoPlay
          playsInline
          controlsList="nofullscreen"
          disablePictureInPicture
        />
      ) : (
        <>
          <video
            className="w-full h-full object-cover brightness-75"
            src={`${src}#t=${thumbTime}`}
            preload="metadata"
            playsInline
            muted
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={() => setPlaying(true)}
          >
            <span className="material-symbols-outlined text-7xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-200">
              play_circle
            </span>
          </div>
          <div className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            {label}
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default function ReelsSection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <motion.section
      className="py-24 bg-surface-container-lowest overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.div className="max-w-7xl mx-auto px-8 mb-12 text-center" variants={fadeUp}>
        <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">
          {t('reelsTitle')}
        </h2>
        <p className="text-on-surface/60">{t('reelsSubtitle')}</p>
      </motion.div>

      <motion.div className="flex gap-6 px-8 overflow-x-auto py-4 snap-x no-scrollbar lg:justify-center" variants={fadeUp}>
        {reels.map((reel, i) => (
          <ReelCard
            key={reel.src}
            src={reel.src}
            thumbTime={reel.thumbTime}
            label={t(reel.labelKey)}
            cornerLeft={i === 0}
            cornerRight={i === reels.length - 1}
          />
        ))}
      </motion.div>

      <motion.div className="flex items-center justify-center gap-6 mt-4 pb-4" variants={fadeUp}>
        <a
          href="https://www.facebook.com/integracja4x4"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-on-surface/60 hover:text-[#F16523] transition-colors font-montserrat text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="hidden sm:inline">Facebook</span>
        </a>
        <span className="w-px h-4 bg-on-surface/20" />
        <a
          href="https://www.instagram.com/integracja4x4.pl/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-on-surface/60 hover:text-[#F16523] transition-colors font-montserrat text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="hidden sm:inline">Instagram</span>
        </a>
        <span className="w-px h-4 bg-on-surface/20" />
        <a
          href="https://www.youtube.com/channel/UCJyTmHY9czMaXCd3HplVylQ"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-on-surface/60 hover:text-[#F16523] transition-colors font-montserrat text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span className="hidden sm:inline">YouTube</span>
        </a>
      </motion.div>
    </motion.section>
  );
}
