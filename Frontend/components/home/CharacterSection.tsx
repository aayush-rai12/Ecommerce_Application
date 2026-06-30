"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Icon } from "../Icon";

interface Character {
  name: string;
  image: string;
  tag: string;
}

const CHARACTERS: Character[] = [
  {
    name: "Marvel Heroes",
    image: "https://wallpapercave.com/wp/wp2599594.jpg",
    tag: "Superhero",
  },
  {
    name: "Goku",
    image: "https://wallpapercave.com/wp/wp4438936.jpg",
    tag: "Anime",
  },
  {
    name: "Naruto",
    image: "https://wallpapercave.com/wp/wp9764093.jpg",
    tag: "Anime",
  },
  {
    name: "Batman",
    image: "https://wallpapercave.com/wp/wp6058937.jpg",
    tag: "DC",
  },
  {
    name: "Joker",
    image: "https://wallpapercave.com/wp/wp9428816.jpg",
    tag: "Villain",
  },
  {
    name: "Dragon Ball",
    image: "https://wallpapercave.com/wp/wp7063696.jpg",
    tag: "Anime",
  },
  {
    name: "Avengers",
    image: "https://wallpapercave.com/wp/wp4056410.jpg",
    tag: "Marvel",
  },
  {
    name: "Demon Slayer",
    image: "https://wallpapercave.com/wp/wp7441096.jpg",
    tag: "Anime",
  },
];

export default function CharacterSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white py-8 md:py-12 border-t border-zinc-100">
      <div className="section-container">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#282C3F]">
              Explore by Character
            </h2>
            <p className="text-xs text-[#696879] mt-0.5">
              Shop your favorite character collections
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-[#282C3F] hover:bg-zinc-50 transition-colors"
              aria-label="Scroll left"
            >
              <Icon name="chevronLeft" className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-[#282C3F] hover:bg-zinc-50 transition-colors"
              aria-label="Scroll right"
            >
              <Icon name="chevronRight" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 md:gap-4 pb-2 scrollbar-hide snap-x snap-mandatory"
        >
          {CHARACTERS.map((character, i) => (
            <Link
              key={i}
              href={`/character/${character.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative shrink-0 rounded-xl overflow-hidden cursor-pointer group w-40 md:w-52 aspect-[3/4] snap-start"
            >
              <Image
                src={character.image}
                alt={character.name}
                fill
                sizes="(max-width: 768px) 160px, 208px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 z-10">
                <span className="text-[9px] uppercase tracking-wider text-white/70 font-medium">
                  {character.tag}
                </span>
                <p className="text-white font-bold text-sm mt-0.5">
                  {character.name}
                </p>
              </div>

              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}