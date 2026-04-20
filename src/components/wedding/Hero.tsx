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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Generate random petal properties only on the client
    const newPetals = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
      opacity: 0.2 + Math.random() * 0.4,
    }));
    setPetals(newPetals);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coupleName1 = "Aisha";
  const coupleName2 = "Zaid";
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-bg");

  if (!mounted) {
    return (
      <section className="relative h-screen w-full bg-navy flex items-center justify-center">
        <div className="absolute inset-0 bg-navy" />
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 scale-110"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <Image
          src={heroImage?.imageUrl || ""}
          alt="Luxury Mosque"
          fill
          priority
          className="object-cover transition-opacity duration-1000"
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
            <svg width="24" height="24" viewBox="0 0 20 20" fill="#c9a84c" className="blur-[1px]">
              <path d="M10 0 C15 5 20 10 10 20 C0 10 5 5 10 0" />
            </svg>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div 
        className="relative z-10 text-center px-4 max-w-4xl"
        style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
      >
        <div className="mb-8 opacity-0 animate-[fade-in_2s_ease-out_forwards]">
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 mx-auto fill-gold opacity-80 animate-pulse"
          >
            <path d="M50 20 L55 35 L70 40 L55 45 L50 60 L45 45 L30 40 L45 35 Z" />
          </svg>
        </div>

        <h1 className="flex justify-center space-x-4 md:space-x-8 mb-6 animate-title-glow">
          <span className="flex">
            {coupleName1.split("").map((char, i) => (
              <span
                key={i}
                className="font-headline text-6xl md:text-[120px] text-ivory inline-block opacity-0 scale-75 animate-[letter-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                style={{ animationDelay: `${0.8 + i * 0.08}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          <span
            className="font-headline text-4xl md:text-8xl text-gold self-center opacity-0 animate-[fade-in_1.5s_ease-out_1.5s_forwards]"
          >
            &
          </span>
          <span className="flex">
            {coupleName2.split("").map((char, i) => (
              <span
                key={i}
                className="font-headline text-6xl md:text-[120px] text-ivory inline-block opacity-0 scale-75 animate-[letter-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                style={{ animationDelay: `${1.2 + i * 0.08}s` }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div className="space-y-6 opacity-0 animate-[fade-in_1.5s_ease-out_2.5s_forwards]">
          <p className="font-body text-ivory/60 text-sm md:text-base uppercase tracking-[0.6em] mb-2">
            Together with our families
          </p>
          <p className="font-headline text-2xl md:text-3xl text-gold italic">
            15th November 2026
          </p>
          <div className="ornamental-divider !max-w-[240px] opacity-30" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-[fade-in_1.5s_ease-out_3.5s_forwards]">
        <div className="flex flex-col items-center space-y-4">
          <p className="font-body text-[10px] text-gold/60 uppercase tracking-[0.4em] rotate-90 translate-y-[-20px]">Scroll</p>
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold via-gold/50 to-transparent animate-[shimmer-sweep_2s_linear_infinite]" />
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