"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

export default function RSVP() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <section id="rsvp" className="py-24 md:py-32 bg-navy-lighter/10 relative overflow-hidden">
      <div className="absolute inset-0 islamic-watermark opacity-20" />
      
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-headline text-4xl md:text-6xl text-ivory mb-6 italic">
            Will You Join Us?
          </h2>
          <p className="font-body text-ivory/60 mb-12 tracking-[0.1em]">
            Please honor us with your response by October 15th, 2026.
          </p>
        </ScrollReveal>

        {isSubmitted ? (
          <ScrollReveal>
             <div className="glass-card p-12 rounded-[30px] animate-in fade-in zoom-in duration-700">
                <div className="w-20 h-20 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-6">
                   <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <h3 className="font-headline text-3xl text-ivory mb-4 italic">Thank You!</h3>
                <p className="font-body text-ivory/80 text-lg">We can&apos;t wait to celebrate with you! ✨</p>
             </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={200}>
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 rounded-[30px] space-y-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-body text-xs text-gold uppercase tracking-widest pl-1">Name</label>
                  <input 
                    required
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full bg-navy-lighter/30 border-b border-gold/30 p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all rounded-t-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs text-gold uppercase tracking-widest pl-1">Email</label>
                  <input 
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-navy-lighter/30 border-b border-gold/30 p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all rounded-t-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-body text-xs text-gold uppercase tracking-widest pl-1">Guests</label>
                  <select className="w-full bg-navy-lighter/30 border-b border-gold/30 p-4 focus:outline-none focus:border-gold transition-all rounded-t-lg appearance-none">
                    {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-navy">{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="font-body text-xs text-gold uppercase tracking-widest pl-1">Attendance</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="radio" name="attending" value="yes" required className="accent-gold h-4 w-4" />
                      <span className="font-body text-ivory/80 text-sm group-hover:text-gold transition-colors">Joyfully Accept</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer group">
                      <input type="radio" name="attending" value="no" className="accent-gold h-4 w-4" />
                      <span className="font-body text-ivory/80 text-sm group-hover:text-gold transition-colors">Regretfully Decline</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-body text-xs text-gold uppercase tracking-widest pl-1">Message for the Couple</label>
                <textarea 
                  rows={4}
                  placeholder="Share a wish..."
                  className="w-full bg-navy-lighter/30 border-b border-gold/30 p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all rounded-t-lg resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-full bg-gold text-navy font-body font-bold uppercase tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(201,168,76,0.3)]",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
