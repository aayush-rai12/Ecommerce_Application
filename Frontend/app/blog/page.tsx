"use client";

import { useState } from "react";

export default function BlogSection() {
  const [activeBlog, setActiveBlog] = useState<number | null>(null);

  const blogs = [
    {
      id: 1,
      category: "STYLE",
      title: "5 Essential Pieces Every Modern Wardrobe Needs",
      excerpt:
        "Build a timeless wardrobe with versatile essentials that work for every occasion.",
      image:
        "/products/oversized_tee.png",
      content: `
A great wardrobe doesn't need dozens of pieces. It needs the right pieces.

Start with a quality oversized t-shirt, a well-fitted pair of trousers, a versatile shirt, a lightweight jacket, and clean sneakers. These essentials can be mixed and matched for almost any casual occasion.

The goal is not to own more clothes but to own better clothes. Focus on comfort, fit, and timeless colors that never go out of style.
      `,
    },
    {
      id: 2,
      category: "FASHION",
      title: "Why Minimal Clothing Never Goes Out of Style",
      excerpt:
        "Discover how simplicity creates confidence and elevates everyday dressing.",
      image:
        "/products/minimalist_sweatshirt.png",
      content: `
Minimal fashion focuses on clean silhouettes, neutral colors, and timeless designs.

Instead of chasing trends every season, minimalist wardrobes emphasize quality and versatility. This makes styling easier while maintaining a refined appearance.

When clothing is simple, confidence becomes the statement.
      `,
    },
    {
      id: 3,
      category: "LIFESTYLE",
      title: "Comfort Meets Luxury In Everyday Wear",
      excerpt:
        "Explore the balance between premium fabrics, comfort and modern aesthetics.",
      image:
        "/products/cargo_pants.png",
      content: `
Modern menswear is no longer about sacrificing comfort for style.

Premium cotton fabrics, relaxed fits, and thoughtful construction create garments that feel as good as they look.

Luxury today means confidence, simplicity, and comfort in every moment.
      `,
    },
  ];

  return (
    <section className="bg-white py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#ff3f6c]">
            JOURNAL
          </span>

          <h2 className="mt-3 text-3xl md:text-5xl font-light text-black">
            Stories & Style Notes
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-500">
            Fashion insights, styling tips and inspiration curated for the
            modern wardrobe.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-[300px] w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#ff3f6c]">
                  {blog.category}
                </span>

                <h3 className="mt-3 text-xl font-medium text-black">
                  {blog.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {blog.excerpt}
                </p>

                <button
                  onClick={() =>
                    setActiveBlog(
                      activeBlog === blog.id ? null : blog.id
                    )
                  }
                  className="mt-5 text-sm font-medium text-black transition hover:text-[#ff3f6c]"
                >
                  {activeBlog === blog.id
                    ? "Show Less ↑"
                    : "Read More →"}
                </button>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeBlog === blog.id
                      ? "max-h-[500px] mt-5 border-t pt-5"
                      : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-7 text-neutral-600 whitespace-pre-line">
                    {blog.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}