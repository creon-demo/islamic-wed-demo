"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { name: "Our Story", href: "#story" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Venue", href: "#venue" },
    { name: "RSVP", href: "#rsvp" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12",
          isScrolled
            ? "bg-navy/85 backdrop-blur-xl border-b border-gold/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <a
            href="#"
            className="font-headline text-2xl md:text-3xl text-gold tracking-widest hover:scale-105 transition-transform"
          >
            A & Z
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-[13px] text-ivory/80 uppercase tracking-[0.2em] hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gold p-2"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-navy transition-transform duration-700 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8",
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <button
          className="absolute top-6 right-6 text-gold p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="font-headline text-4xl text-ivory hover:text-gold transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="font-headline text-2xl text-gold tracking-widest pt-12">
          A & Z
        </div>
      </div>
    </>
  );
}
