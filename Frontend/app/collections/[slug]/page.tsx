"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../../../components/Icon";
import { Product } from "../../../lib/products";
import ProductCard from "../../../components/home/ProductCard";
import { getHomepageData } from "../../../lib/api";
import { useState, useEffect } from "react";
import { COLLECTIONS_DATA, CollectionMeta } from "../../../lib/collections";

export default function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = COLLECTIONS_DATA[slug] as CollectionMeta | undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomepageData()
      .then((data) => {
        setProducts(data.featuredCollection?.products || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!collection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">
            Collection Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The collection you are looking for does not exist.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
          >
            View All Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="relative min-h-[70vh] pt-5 pb-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-12 text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <Icon name="chevronRight" className="w-4 h-4" />
            <Link href="/collections" className="hover:text-black transition">
              Collections
            </Link>
            <Icon name="chevronRight" className="w-4 h-4" />
            <span className="text-black font-medium">{collection.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* IMAGE */}
            <div className="relative h-96 md:h-[30rem] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover hover:scale-105 transition duration-500"
                priority
              />
            </div>

            {/* CONTENT */}
            <div>
              {collection.tag && (
                <span className="text-xs uppercase tracking-widest text-gray-500 mb-3 inline-block">
                  {collection.tag}
                </span>
              )}

              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                {collection.name}
              </h1>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {collection.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition"
                >
                  Shop Collection
                  <Icon name="arrowRight" className="w-5 h-5" />
                </Link>

                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-3 border border-gray-300 text-black px-8 py-4 rounded-full font-semibold hover:border-black transition"
                >
                  View All Collections
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold mb-1">150+</p>
                  <p className="text-sm text-gray-500">
                    Products in Collection
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1 text-black">
                    Fast
                  </p>
                  <p className="text-sm text-gray-500">
                    Worldwide Shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-3">
              Featured Items
            </h2>
            <p className="text-gray-600 text-lg">
              Discover the best pieces from {collection.name}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 h-64 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="hover:shadow-lg transition duration-300"
                >
                  <ProductCard
                    handle={product.handle}
                    images={product.images}
                    name={product.name}
                    color={product.color}
                    price={product.price}
                    mrp={product.mrp}
                    discount={product.discount}
                    rating={product.rating}
                    reviews={product.reviews}
                    inStock={product.inStock}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              No products available in this collection yet.
            </div>
          )}
        </div>
      </section>

      {/* RELATED COLLECTIONS */}
      <section className="py-20 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-3">
              Explore More Collections
            </h2>
            <p className="text-white/60 text-lg">
              Discover other curated selections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(COLLECTIONS_DATA)
              .filter((col) => col.slug !== slug)
              .map((col) => (
                <Link
                  key={col.slug}
                  href={`/collections/${col.slug}`}
                  className="group relative overflow-hidden rounded-2xl h-80 border border-white/10"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 p-6">
                    {col.tag && (
                      <p className="text-gray-300 text-xs uppercase tracking-widest mb-2">
                        {col.tag}
                      </p>
                    )}
                    <h3 className="text-white font-bold text-2xl">
                      {col.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}