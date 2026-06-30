
"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "../Icon";

const occasions = [
  { line1: "THE PERFECT", line2: "DATE", bg: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop" },
  { line1: "CAFE", line2: "HOPPING", bg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop" },
  { line1: "SUMMER", line2: "ESCAPE", bg: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=600&fit=crop" },
  { line1: "CONCERT", line2: "READY", bg: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop" },
  { line1: "STREET", line2: "STYLE", bg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop" },
];

export default function OccasionCarousel() {
  const items = [...occasions, ...occasions];

  return (
    <section className="bg-white py-10 overflow-hidden">

      {/* Header */}
      <div className="px-6 mb-6 text-center">
        <p className="text-xs tracking-[0.3em] text-zinc-400 uppercase">
          Shop The Vibe
        </p>

        {/* Thin Pink Line */}
        <div className="flex justify-center my-2">
          <span className="h-0.5 w-20 bg-pink-500 rounded-full" />
        </div>

        <h2 className="text-2xl font-semibold text-zinc-900">
          Dress For The Moment
        </h2>
      </div>
      {/* Carousel */}
      <div className="relative flex group"> {/* group added to parent */}
        <div className="flex gap-4 animate-scroll pause-on-hover">
          {items.map((item, i) => (
            <div
              key={i}
              className="relative cursor-pointer w-[220px] h-[320px] shrink-0 rounded-2xl overflow-hidden group transition-all duration-300"
            >
              <Image
                src={item.bg}
                alt={`${item.line1} ${item.line2}`}
                fill
                sizes="220px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-300" />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90%]">
                <div className="flex items-center justify-between gap-2 bg-black/20 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
                  <div className="leading-tight">
                    <p className="text-white text-[15px] font-medium tracking-wide">{item.line1}</p>
                    <p className="text-[#fe3e6b] text-[10px] font-bold tracking-wide">{item.line2}</p>
                  </div>
                  <Link
                    href={`/collections/${item.line2.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-1 bg-white/15 hover:bg-white/25 transition px-3 py-1 rounded-full text-white text-[11px] font-medium"
                  >
                    Shop
                    <Icon name="arrowRight" className="w-3 h-3 text-[#fe3e6b]" />
                  </Link>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll animation with pause-on-hover */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 22s linear infinite;
          display: flex;
          width: max-content;
        }

        /* pause animation when hovering parent group */
        .group:hover .pause-on-hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}