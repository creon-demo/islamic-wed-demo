"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "clip" | "fade-up";
}

export default function ScrollReveal({ 
  children, 
  className, 
  delay = 0,
  variant = "clip" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '0px 0px 50px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      setIntersecting(true);
    }, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isIntersecting 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}