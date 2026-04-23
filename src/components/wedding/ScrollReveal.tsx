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
          setTimeout(() => {
            setIntersecting(true);
          }, delay);
        }
      },
      { 
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = variant === "clip" ? "clip-reveal" : "fade-up-reveal";

  return (
    <div
      ref={ref}
      className={cn(
        variantClass,
        isIntersecting && "active",
        className
      )}
    >
      {children}
    </div>
  );
}