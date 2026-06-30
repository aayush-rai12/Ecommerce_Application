"use client";

import { useMemo, useState } from "react";
import { Product } from "../../lib/products";
import ProductCard from "./ProductCard";
import { Icon } from "../Icon";

interface ProductSearchProps {
  products: Product[];
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) => {
      return [
        product.name,
        product.handle,
        product.color,
        product.category,
        product.description,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [products, query]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
       
        <div className="w-full md:max-w-xl">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <Icon name="search" className="w-5 h-5" />
            </span>
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for cores, hoodies, cargo, etc."
              className="w-full rounded-full border border-zinc-200 bg-white px-12 py-4 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-500">
          {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found
        </p>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-sm font-semibold uppercase tracking-widest text-black hover:text-zinc-700"
          >
            Clear search
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {filteredProducts.map((product) => (
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
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
          <p className="text-lg font-semibold text-zinc-900">No products matched your search.</p>
          <p className="mt-3 text-sm text-zinc-500">Try a different keyword like &quot;hoodie&quot;, &quot;cargo&quot;, or &quot;outerwear&quot;.</p>
        </div>
      )}
    </section>
  );
}
