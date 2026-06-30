"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "../../components/Icon";

interface CollectionItem {
  name: string;
  slug: string;
  image: string;
  tag?: string;
  description?: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    name: "OVERSIZED DROP",
    slug: "oversized-drop",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO0_WVNDt5k5ojfwmbSRZnjYL9GjPCepeqq34IT3nVLNEzqvmH8wvZmG011P4qAOCzYYPKlZvLRg1SKxei7VBOS1wiPmHV32CQ9Z8B6i3OYhryFgkvz-1A7dIJAF7O78YGac8R0U9lQoHN053wcKosLxCofomhwIlYKKAvSsQoW0TXLfgET4EnWo11PvyJgH16164mzmjziLsefmTKZrKffWtDtrdGSPgt8MYfZ6Z-BnENimqgZ8yAekWj2tXXYs1efrgc5EIoB4w",
    tag: "EDITOR'S PICK",
    description: "Premium oversized silhouettes with cinematic appeal",
  },
  {
    name: "SUMMER CORE",
    slug: "summer-core",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWyGLJXQjVaO65bOrHnkjfP1vPA3iy-LYOn_ZxegpG-z-IkI53QATaO3EBt1Be1CEWbnew5EkYNmQZ8YwdMDS7XOpUdWdjkQ2QCYcQnXQvjJM1mMXcfWtZArAozgDdG01pbEebabFnDaaV7ojUGGhgeK5-QHkFbU2ldqLgEq0FNn6kYEtlrJ2RMNqDF3o9H3vH3e4mdoEreBeJiEetsAqx9OegzM1I6gHRlGmEab8GQmXCV1TfMT23GX82hu70tt_-9QRmiKtEnIA",
    tag: "NEW ERA",
    description: "Light, breathable pieces perfect for warm weather",
  },
  {
    name: "DARK AESTHETIC",
    slug: "dark-aesthetic",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAztTw5tws9VoPcOEYcN2t3xtkycMCvTffbKIjpIdr8e3kvSFAkQp9U4Clct45Hckv0jz8voQMISA5zuLU0zLCFEQAqG-uPN8-OVpFyhWfCg4sCRlPDDysGTQPkeFlHYdYyF8DNtpSNQnmXJkS1iYJbr6TWpKHqiKM6J7sNVGjQWFihbRhj8_vzcWFw_NK6NHxZA8rTS5UlWNtNK4EVErNKuwcGQs6ROUqwunlri7AFpMEc5ZIZvLJq10VOCGjWSp4dEaVuSQkLuYI",
    tag: "LIMITLESS",
    description: "Bold and moody pieces for the dark aesthetic enthusiast",
  },
];

export default function CollectionsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[10vh] bg-linear-to-b from-black to-[#1a1a1a] pt-10 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase text-white mb-6 leading-tight">
            Collections
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-white/70">
            Explore our cinematic streetwear collections inspired by anime, culture, darkness, and futuristic aesthetics
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-10">
        {/* Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 h-100 w-100 -translate-x-1/2 rounded-full bg-[#D4AF7A]/20 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COLLECTIONS.map((collection, idx) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] transition-all duration-500 hover:border-[#D4AF7A]/40 hover:shadow-[0_20px_60px_rgba(212,175,122,0.1)] block h-96"
              >
                {/* Image */}
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 bg-[#D4AF7A]/10 group-hover:opacity-100 transition duration-300" />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  {/* Tag */}
                  {collection.tag && (
                    <span className="mb-3 w-fit rounded-full border border-[#D4AF7A]/30 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF7A]">
                      {collection.tag}
                    </span>
                  )}

                  {/* Title */}
                  <h3 className="font-extrabold uppercase text-white leading-[0.95] text-2xl sm:text-3xl mb-2 transition-transform duration-500 group-hover:-translate-y-1">
                    {collection.name}
                  </h3>

                  {/* Description */}
                  {collection.description && (
                    <p className="text-white/60 text-sm mb-4 group-hover:text-white/80 transition-colors">
                      {collection.description}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-[#D4AF7A] transition-colors">
                    <span>Explore</span>
                    <Icon name="arrowRight" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Border */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 group-hover:ring-[#D4AF7A]/30 transition pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Why Choose Our Collections</h2>
            <p className="text-gray-600 text-lg">
              Curated with precision and style in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="sparkles" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
              <p className="text-gray-600">
                Hand-picked pieces that define modern streetwear culture
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="bolt" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials and impeccable craftsmanship
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="shield" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Secure</h3>
              <p className="text-gray-600">
                Safe shopping with secure payment and fast delivery
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
