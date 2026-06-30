"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../../../components/Icon";

interface Character {
  name: string;
  image: string;
  category: string;
  description: string;
}

const CHARACTERS: Record<string, Character> = {
  "marvel-heroes": {
    name: "Marvel Heroes",
    image: "https://wallpapercave.com/wp/wp2599594.jpg",
    category: "Superhero",
    description: "Epic superhero collection",
  },
  joker: {
    name: "Joker",
    image: "https://wallpapercave.com/wp/wp9428816.jpg",
    category: "Villain",
    description: "Why so serious?",
  },
  goku: {
    name: "Goku",
    image: "https://wallpapercave.com/wp/wp4438936.jpg",
    category: "Anime",
    description: "Ultra instinct",
  },
  naruto: {
    name: "Naruto",
    image: "https://wallpapercave.com/wp/wp9764093.jpg",
    category: "Anime",
    description: "Ninja way apparel",
  },
  "dragon-ball": {
    name: "Dragon Ball",
    image: "https://wallpapercave.com/wp/wp7063696.jpg",
    category: "Anime",
    description: "Super Saiyan style",
  },
  batman: {
    name: "Batman",
    image: "https://wallpapercave.com/wp/wp6058937.jpg",
    category: "DC",
    description: "Dark knight collection",
  },
  "john-wick": {
    name: "John Wick",
    image: "https://wallpapercave.com/uwp/uwp4442047.jpeg",
    category: "Action",
    description: "Baba yaga style",
  },
  avengers: {
    name: "Avengers",
    image: "https://wallpapercave.com/wp/wp4056410.jpg",
    category: "Marvel",
    description: "Assemble your style",
  },
  "demon-slayer": {
    name: "Demon Slayer",
    image: "https://wallpapercave.com/wp/wp7441096.jpg",
    category: "Anime",
    description: "Hashira collection",
  },
};

export default function CharacterPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const character = CHARACTERS[name];

  if (!character) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Character Not Found</h1>
          <p className="text-gray-600 mb-8">
            The character you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen pt-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <Icon name="chevronRight" className="w-4 h-4" />
            <Link
              href="/#character-section"
              className="hover:text-black transition-colors"
            >
              Characters
            </Link>
            <Icon name="chevronRight" className="w-4 h-4" />
            <span className="text-black font-semibold">{character.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
            {/* Image */}
            <div className="relative h-96 md:h-150 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={character.image}
                alt={character.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-3">
                {character.category}
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                {character.name}
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {character.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Shop Collection
                  <Icon name="arrowRight" className="w-5 h-5" />
                </Link>

                <Link
                  href="/#collections"
                  className="inline-flex items-center justify-center gap-3 border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300"
                >
                  View All Collections
                  <Icon name="arrowRight" className="w-5 h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold mb-1">100+</p>
                  <p className="text-sm text-gray-600">Products Available</p>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">Premium</p>
                  <p className="text-sm text-gray-600">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Characters Section */}
      <section className="bg-white py-10 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-3">
              Explore More Characters
            </h2>
            <p className="text-gray-600">
              Discover other amazing character collections
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(CHARACTERS)
              .filter(([key]) => key !== name)
              .slice(0, 4)
              .map(([key, char]) => (
                <Link
                  key={key}
                  href={`/character/${key}`}
                  className="group relative overflow-hidden rounded-2xl h-80 block"
                >
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 pb-7 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                      {char.category}
                    </p>
                    <h3 className="text-white font-bold text-lg">{char.name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
