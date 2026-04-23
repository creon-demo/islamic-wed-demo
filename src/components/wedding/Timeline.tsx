"use client";

import { useEffect, useRef, useState } from "react";
import { Infinity, Utensils, Camera, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

const events = [
  {
    title: "Nikah Ceremony",
    time: "10:00 AM",
    venue: "The Grand Mosque, Dubai",
    icon: Infinity,
  },
  {
    title: "Walima Lunch",
    time: "1:00 PM",
    venue: "Crystal Garden Palace",
    icon: Utensils,
  },
  {
    title: "Photography Session",
    time: "3:00 PM",
    venue: "Desert Rose Dunes",
    icon: Camera,
  },
  {
    title: "Grand Reception",
    time: "7:00 PM",
    venue: "Royal Grand Ballroom",
    icon: Sparkles,
  },
];

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setLineWidth(progress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="events" className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 islamic-watermark opacity-20" />
      
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <h2 className="font-headline text-4xl md:text-5xl text-ivory italic">
            Our Sacred Day
          </h2>
        </ScrollReveal>

        {/* Desktop Vertical/Horizontal Mix Timeline */}
        <div className="relative pt-12" ref={lineRef}>
          {/* Connecting Line Animation */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gold/10">
            <div 
              className="w-full bg-gold transition-all duration-700 ease-out shadow-[0_0_10px_rgba(201,168,76,0.5)]"
              style={{ height: `${lineWidth}%` }}
            />
          </div>

          <div className="space-y-24 lg:space-y-40">
            {events.map((event, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex flex-col lg:flex-row items-center justify-center text-center lg:text-left",
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse lg:text-right"
                )}
              >
                <div className="flex-1 px-8 mb-6 lg:mb-0">
                  <ScrollReveal delay={100} variant="fade-up">
                    <h3 className="font-headline text-2xl md:text-3xl text-ivory mb-2">
                      {event.title}
                    </h3>
                    <p className="font-body text-gold text-lg mb-1">{event.time}</p>
                    <p className="font-body text-ivory/60 text-sm tracking-widest">{event.venue}</p>
                  </ScrollReveal>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <ScrollReveal delay={200}>
                    <div className="w-16 h-16 md:w-20 md:h-20 glass-card rounded-full flex items-center justify-center border-gold border-2 shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-transform duration-500 hover:scale-110">
                      <event.icon className="text-gold" size={28} />
                    </div>
                  </ScrollReveal>
                </div>

                <div className="flex-1 px-8 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}