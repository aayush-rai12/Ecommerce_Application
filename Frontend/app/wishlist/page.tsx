"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "../../context/WishlistContext";
import { getAllProducts } from "../../lib/api";
import { Product } from "../../lib/products";
import ProductCard from "../../components/home/ProductCard";
import { Icon } from "../../components/Icon";

export default function WishlistPage() {
  const { items } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((all) => {
        const filtered = all.filter((p) => items.includes(p.handle));
        setWishlistProducts(filtered);
      })
      .finally(() => setLoading(false));
  }, [items]);

  return (
    <div className="bg-[#f8f8f6] min-h-screen pb-20">
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <Link href="/products" className="absolute left-4 top-1/2 -translate-y-1/2 text-black hover:opacity-60 transition-opacity">
          <Icon name="arrowRight" className="w-5 h-5 rotate-180" />
        </Link>
        <h1 className="text-sm font-black uppercase tracking-[0.2em]">YOUR WISHLIST</h1>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 uppercase tracking-widest">
          {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
        </span>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8 md:px-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-200 h-80 rounded-sm animate-pulse" />
            ))}
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center mt-32 max-w-sm mx-auto">
            <div className="w-20 h-20 border-2 border-zinc-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="heart" className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-zinc-400 mb-10 leading-relaxed">
              Save items you love here and review them anytime.
            </p>
            <Link
              href="/products"
              className="inline-flex bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-colors"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
