"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set demo date 3 months from now
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 3);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return (
    <section className="py-24 bg-navy h-[400px]" /> // Placeholder height to prevent jump
  );

  const FlipUnit = ({ value, label }: { value: number; label: string }) => {
    const displayValue = value.toString().padStart(2, "0");
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-24 md:w-32 md:h-40 perspective-1000 group">
          <div className="absolute inset-0 glass-card flex items-center justify-center overflow-hidden rounded-lg transition-all duration-500 group-hover:border-gold/60">
            <span className="font-headline text-4xl md:text-7xl text-gold transition-all duration-500 group-hover:scale-110">
              {displayValue}
            </span>
            <div className="absolute inset-x-0 h-[1px] top-1/2 bg-gold/30" />
          </div>
        </div>
        <span className="mt-4 font-body text-xs md:text-sm text-ivory/60 uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0 islamic-watermark opacity-20" />
      
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-headline text-3xl md:text-5xl text-ivory mb-16 tracking-wide italic">
            Mark Your Calendar
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 justify-center items-center">
          <ScrollReveal delay={100}><FlipUnit value={timeLeft.days} label="Days" /></ScrollReveal>
          <ScrollReveal delay={200}><FlipUnit value={timeLeft.hours} label="Hours" /></ScrollReveal>
          <ScrollReveal delay={300}><FlipUnit value={timeLeft.minutes} label="Minutes" /></ScrollReveal>
          <ScrollReveal delay={400}><FlipUnit value={timeLeft.seconds} label="Seconds" /></ScrollReveal>
        </div>

        <ScrollReveal delay={500} className="mt-20">
          <p className="font-headline text-xl md:text-2xl text-gold italic tracking-wide">
            Saturday, 15th November 2026 · 5:00 PM
          </p>
          <div className="h-10 mt-6 relative overflow-hidden">
             <div className="absolute inset-x-0 top-1/2 h-[1px] shimmer-gold animate-shimmer" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
