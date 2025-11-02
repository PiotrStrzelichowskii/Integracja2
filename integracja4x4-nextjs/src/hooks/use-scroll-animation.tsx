"use client";

import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // Po pierwszym pojawieniu się nie trzeba już obserwować
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1, // Animacja zacznie się gdy 10% elementu jest widoczne
        rootMargin: '0px 0px -50px 0px', // Zwiększa czułość animacji
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return { ref, isVisible };
};

