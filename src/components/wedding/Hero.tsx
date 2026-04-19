"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronDown } from "lucide-react";

interface PetalProps {
  left: string;
  duration: string;
  delay: string;
  opacity: number;
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [petals, setPetals] = useState<PetalProps[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Generate random petal properties on client mount to avoid hydration mismatch
    const newPetals = [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 6}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.3 + Math.random() * 0.3,
    }));
    setPetals(newPetals);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coupleName1 = "Aisha";
  const coupleName2 = "Zaid";

  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-bg");

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 scale-110"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <Image
          src={heroImage?.imageUrl || ""}
          alt="Luxury Mosque"
          fill
          priority
          className="object-cover"
          data-ai-hint="mosque night"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/60 to-navy opacity-80" />
      </div>

      {/* Floating Petals */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {petals.map((p, i) => (
          <div
            key={i}
            className="absolute top-[-50px] animate-petal"
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#c9a84c">
              <path d="M10 0 C15 5 20 10 10 20 C0 10 5 5 10 0" />
            </svg>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-6 opacity-0 animate-[fade-in_1.5s_ease-out_forwards]">
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 mx-auto fill-gold opacity-80"
          >
            <path d="M50 20 L55 35 L70 40 L55 45 L50 60 L45 45 L30 40 L45 35 Z" />
          </svg>
        </div>

        <h1 className="flex justify-center space-x-4 md:space-x-8 mb-4">
          <span className="flex">
            {coupleName1.split("").map((char, i) => (
              <span
                key={i}
                className="font-headline text-6xl md:text-[110px] text-ivory inline-block opacity-0 scale-75 animate-[letter-reveal_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${0.5 + i * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          <span
            className="font-headline text-4xl md:text-7xl text-gold self-center opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards]"
          >
            &
          </span>
          <span className="flex">
            {coupleName2.split("").map((char, i) => (
              <span
                key={i}
                className="font-headline text-6xl md:text-[110px] text-ivory inline-block opacity-0 scale-75 animate-[letter-reveal_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${1 + i * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div className="space-y-4 opacity-0 animate-[fade-in_1s_ease-out_2s_forwards]">
          <p className="font-body text-ivory/70 text-sm md:text-base uppercase tracking-[0.5em]">
            The Wedding
          </p>
          <p className="font-headline text-xl md:text-2xl text-gold">
            15th November 2026
          </p>
          <div className="ornamental-divider !max-w-[200px]" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-[fade-in_1s_ease-out_3s_forwards]">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent animate-pulse" />
          <ChevronDown className="text-gold animate-bounce" size={20} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes letter-reveal {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
