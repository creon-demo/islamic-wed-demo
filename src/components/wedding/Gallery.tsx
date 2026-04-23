"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import ScrollReveal from "./ScrollReveal";

const galleryImages = [
  { id: "couple1", span: "row-span-2" },
  { id: "floral1", span: "row-span-1" },
  { id: "couple2", span: "col-span-1" },
  { id: "mosque1", span: "row-span-2" },
  { id: "floral2", span: "row-span-1" },
  { id: "venue1", span: "col-span-1" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-navy-lighter/20">
      <div className="max-w-[1100px] mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <h2 className="font-headline text-4xl md:text-5xl text-ivory mb-6 italic">
            Moments We Cherish
          </h2>
          <div className="ornamental-divider" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[350px]">
          {galleryImages.map((item, i) => {
            const imgData = PlaceHolderImages.find((img) => img.id === item.id);
            return (
              <ScrollReveal 
                key={i} 
                delay={i * 150}
                variant="fade-up"
                className={item.span}
              >
                <div className="group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer shadow-xl transition-all duration-500 hover:shadow-gold/20">
                  <Image
                    src={imgData?.imageUrl || ""}
                    alt={imgData?.description || "Gallery Photo"}
                    fill
                    className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-105"
                    data-ai-hint={imgData?.imageHint}
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/20" />
                  
                  {/* Ornate Inner Frame */}
                  <div className="absolute inset-4 border border-gold/0 transition-all duration-700 group-hover:border-gold/20 rounded-xl pointer-events-none" />
                  
                  {/* Gradient Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-headline text-2xl text-ivory italic mb-1">
                      {imgData?.description || "Wedding Moment"}
                    </p>
                    <div className="w-10 h-[1px] bg-gold" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}