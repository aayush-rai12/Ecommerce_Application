import ProductCard from "./ProductCard";
import Link from "next/link";
import { getHomepageData } from "../../lib/api";
import { Icon } from "../Icon";

export default async function ProductGrid() {
  const data = await getHomepageData();
  const { featuredCollection } = data;

  if (!featuredCollection) return null;

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="section-container">
        <div className="flex justify-between items-center mb-5 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-[#282C3F]">
            Trending Now
          </h2>
          <Link
            className="text-[#FF3F6C] text-sm font-semibold flex items-center gap-1 hover:underline"
            href={`/collections/${featuredCollection.handle}`}
          >
            View All
            <Icon name="arrowRight" className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px] md:gap-3 bg-zinc-100 md:bg-transparent">
          {featuredCollection.products.map((product) => (
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
      </div>
    </section>
  );
}
