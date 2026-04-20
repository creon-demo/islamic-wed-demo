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
    }, 2000);
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
          <p className="font-body text-ivory/60 mb-16 tracking-[0.15em] uppercase text-xs">
            Please honor us with your response by October 15th, 2026.
          </p>
        </ScrollReveal>

        {isSubmitted ? (
          <ScrollReveal variant="fade-up">
             <div className="glass-card p-16 rounded-[40px] animate-in fade-in zoom-in duration-1000">
                <div className="w-24 h-24 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-8 border border-gold/30">
                   <svg className="w-12 h-12 text-gold animate-[bounce_2s_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <h3 className="font-headline text-4xl text-ivory mb-6 italic">Shukran!</h3>
                <p className="font-body text-ivory/80 text-xl leading-relaxed">
                  We have received your response. <br />
                  <span className="text-gold italic">We can&apos;t wait to celebrate with you!</span>
                </p>
             </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={200} variant="fade-up">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-16 rounded-[40px] space-y-10 text-left relative group">
              {/* Animated corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/20 rounded-tl-3xl m-4 transition-all duration-500 group-hover:border-gold/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/20 rounded-br-3xl m-4 transition-all duration-500 group-hover:border-gold/50" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3 group/field">
                  <label className="font-body text-[10px] text-gold uppercase tracking-[0.3em] pl-1 transition-colors group-focus-within/field:text-ivory">Full Name</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Maryam Ali"
                    className="w-full bg-navy-lighter/20 border-b border-gold/20 p-4 focus:outline-none focus:border-gold focus:ring-0 transition-all rounded-t-xl hover:bg-navy-lighter/40"
                  />
                </div>
                <div className="space-y-3 group/field">
                  <label className="font-body text-[10px] text-gold uppercase tracking-[0.3em] pl-1 transition-colors group-focus-within/field:text-ivory">Email Address</label>
                  <input 
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-navy-lighter/20 border-b border-gold/20 p-4 focus:outline-none focus:border-gold focus:ring-0 transition-all rounded-t-xl hover:bg-navy-lighter/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3 group/field">
                  <label className="font-body text-[10px] text-gold uppercase tracking-[0.3em] pl-1">Number of Guests</label>
                  <div className="relative">
                    <select className="w-full bg-navy-lighter/20 border-b border-gold/20 p-4 focus:outline-none focus:border-gold transition-all rounded-t-xl appearance-none hover:bg-navy-lighter/40 cursor-pointer">
                      {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-navy">{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 9L1 4h10z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="font-body text-[10px] text-gold uppercase tracking-[0.3em] pl-1">Will You Attend?</label>
                  <div className="flex space-x-8 pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer group/radio">
                      <div className="relative flex items-center justify-center">
                        <input type="radio" name="attending" value="yes" required className="peer appearance-none w-5 h-5 border border-gold/40 rounded-full checked:border-gold transition-all" />
                        <div className="absolute w-2.5 h-2.5 bg-gold rounded-full scale-0 peer-checked:scale-100 transition-transform duration-300" />
                      </div>
                      <span className="font-body text-ivory/80 text-sm group-hover/radio:text-gold transition-colors">Accept with Joy</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group/radio">
                      <div className="relative flex items-center justify-center">
                        <input type="radio" name="attending" value="no" className="peer appearance-none w-5 h-5 border border-gold/40 rounded-full checked:border-gold transition-all" />
                        <div className="absolute w-2.5 h-2.5 bg-gold rounded-full scale-0 peer-checked:scale-100 transition-transform duration-300" />
                      </div>
                      <span className="font-body text-ivory/80 text-sm group-hover/radio:text-gold transition-colors">Regretfully Decline</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-3 group/field">
                <label className="font-body text-[10px] text-gold uppercase tracking-[0.3em] pl-1">A Special Wish</label>
                <textarea 
                  rows={4}
                  placeholder="Share a message for the couple..."
                  className="w-full bg-navy-lighter/20 border-b border-gold/20 p-4 focus:outline-none focus:border-gold focus:ring-0 transition-all rounded-t-xl resize-none hover:bg-navy-lighter/40"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "relative w-full py-5 rounded-full bg-gold text-navy font-body font-bold uppercase tracking-[0.4em] text-xs transition-all hover:scale-[1.01] shadow-xl overflow-hidden group/btn",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                <span className="relative z-10">{isSubmitting ? "Sending Your Response..." : "Send RSVP"}</span>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer-sweep_1.5s_infinite] transition-transform" />
              </button>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}