"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Icon } from "../../components/Icon";

interface Props {
  images: string[];
}

export default function ProductImageGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images?.[activeIndex] ?? images?.[0] ?? "";
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, images.length]);

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div
        className="relative w-full h-[20rem] md:h-[28rem] lg:h-[36rem] bg-white overflow-hidden group flex items-center justify-center cursor-zoom-in"
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open image preview"
      >
        <Image
          src={activeImage}
          alt="Product Hero"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center transition-opacity duration-500"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-4 px-4 justify-center md:px-0 overflow-x-auto scrollbar-hide snap-x pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`snap-start shrink-0 w-20 h-20 lg:w-24 lg:h-24 bg-white p-1 overflow-hidden transition-transform duration-200 relative ${
              idx === activeIndex
                ? "border-2 border-black scale-105"
                : "border-2 border-transparent hover:border-zinc-300"
            }`}
            aria-label={`Select image ${idx + 1}`}
          >
            <div className="relative w-full h-full">
              <Image src={img} alt={`Thumb ${idx}`} fill sizes="80px" className="object-contain object-center" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative w-[90%] md:w-3/4 lg:w-2/3 max-h-[90vh]">
            <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] bg-black flex items-center justify-center">
              <Image
                src={activeImage}
                alt="Preview"
                fill
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 bg-white/90 rounded-full p-2 text-black hover:scale-105 cursor-pointer"
              aria-label="Close preview"
            >
              <Icon name="close" className="w-5 h-5" />

            </button>

            <button
              onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 text-black hover:scale-105"
              aria-label="Previous image"
            >
              <Icon name="chevronLeft" className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              className="absolute right-12 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 text-black hover:scale-105"
              aria-label="Next image"
            >
              <Icon name="chevronRight" className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
