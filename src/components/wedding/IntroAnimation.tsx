"use client";

import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Completely remove component after 3 seconds (2s delay + 1s fade)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-opacity duration-1000 ease-in-out",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-gold stroke-[0.5] animate-mandala-draw"
          style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
        >
          {/* Detailed Ornate Mandala Paths */}
          <circle cx="50" cy="50" r="10" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="30" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(0 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(45 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(90 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(135 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(180 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(225 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(270 50 50)" />
          <path d="M50 10 Q60 30 50 50 Q40 30 50 10" transform="rotate(315 50 50)" />
          <path d="M50 20 L55 35 L70 40 L55 45 L50 60 L45 45 L30 40 L45 35 Z" fill="none" />
        </svg>
      </div>
      <div className="absolute bottom-12 text-gold font-headline text-lg tracking-[0.3em] uppercase opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        Bismillah ir-Rahman ir-Rahim
      </div>
    </div>
  );
}
