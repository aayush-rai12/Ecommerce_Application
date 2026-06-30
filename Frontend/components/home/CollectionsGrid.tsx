"use client";

import Image from "next/image";
import Link from "next/link";

interface CollectionItem {
  name: string;
  slug: string;
  image: string;
  tag?: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    name: "OVERSIZED\nDROP",
    slug: "oversized-drop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO0_WVNDt5k5ojfwmbSRZnjYL9GjPCepeqq34IT3nVLNEzqvmH8wvZmG011P4qAOCzYYPKlZvLRg1SKxei7VBOS1wiPmHV32CQ9Z8B6i3OYhryFgkvz-1A7dIJAF7O78YGac8R0U9lQoHN053wcKosLxCofomhwIlYKKAvSsQoW0TXLfgET4EnWo11PvyJgH16164mzmjziLsefmTKZrKffWtDtrdGSPgt8MYfZ6Z-BnENimqgZ8yAekWj2tXXYs1efrgc5EIoB4w",
    tag: "EDITOR'S PICK",
  },
  {
    name: "SUMMER CORE",
    slug: "summer-core",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWyGLJXQjVaO65bOrHnkjfP1vPA3iy-LYOn_ZxegpG-z-IkI53QATaO3EBt1Be1CEWbnew5EkYNmQZ8YwdMDS7XOpUdWdjkQ2QCYcQnXQvjJM1mMXcfWtZArAozgDdG01pbEebabFnDaaV7ojUGGhgeK5-QHkFbU2ldqLgEq0FNn6kYEtlrJ2RMNqDF3o9H3vH3e4mdoEreBeJiEetsAqx9OegzM1I6gHRlGmEab8GQmXCV1TfMT23GX82hu70tt_-9QRmiKtEnIA",
    tag: "NEW ERA",
  },
  {
    name: "DARK AESTHETIC",
    slug: "dark-aesthetic",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAztTw5tws9VoPcOEYcN2t3xtkycMCvTffbKIjpIdr8e3kvSFAkQp9U4Clct45Hckv0jz8voQMISA5zuLU0zLCFEQAqG-uPN8-OVpFyhWfCg4sCRlPDDysGTQPkeFlHYdYyF8DNtpSNQnmXJkS1iYJbr6TWpKHqiKM6J7sNVGjQWFihbRhj8_vzcWFw_NK6NHxZA8rTS5UlWNtNK4EVErNKuwcGQs6ROUqwunlri7AFpMEc5ZIZvLJq10VOCGjWSp4dEaVuSQkLuYI",
    tag: "LIMITLESS",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="relative overflow-hidden bg-[#f4f4f4] py-14 sm:py-16 md:py-20">
      
      {/* Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-[#FF3F6C]/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-360 px-4 sm:px-6 md:px-8">

        {/* Header */}
        <div className="mb-10 md:mb-14 text-center">
          <span className="mb-3 block text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#FF3F6C]">
            CURATED EDITS
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-[#282C3F] leading-none">
            COLLECTIONS
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#696879]">
            Explore cinematic streetwear drops inspired by anime, culture, darkness, and futuristic aesthetics.
          </p>
        </div>

        {/* GRID — SAME ON ALL SCREENS */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[290px]">

          {COLLECTIONS.map((col, idx) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className={`
                group relative overflow-hidden rounded-2xl border border-[#FF3F6C]/20
                bg-white

                transition-all duration-500
                hover:border-[#FF3F6C]/60
                hover:shadow-[0_20px_60px_rgba(255,63,108,0.15)]

                ${idx === 0 ? "row-span-2" : ""}
              `}
            >
              {/* Image */}
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 bg-[#FF3F6C]/10 group-hover:opacity-100 transition" />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 md:p-6">

                {/* Tag */}
                {col.tag && (
                  <span className="mb-2 w-fit rounded-full border border-[#FF3F6C]/30 bg-black/30 px-2 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF3F6C]">
                    {col.tag}
                  </span>
                )}

                {/* Title */}
                <h3 className={`
                  whitespace-pre-line font-extrabold uppercase text-white leading-[0.95]
                  ${idx === 0 ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl md:text-3xl"}
                  transition-transform duration-500 group-hover:-translate-y-1
                `}>
                  {col.name}
                </h3>

                {/* CTA */}
                <div className="mt-3 flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-[#FF3F6C]">
                  <span>Explore</span>
                  <div className="h-px w-6 bg-white/40 group-hover:w-12 group-hover:bg-[#FF3F6C] transition-all" />
                </div>

              </div>

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-[#D4AF7A]/30 transition" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}