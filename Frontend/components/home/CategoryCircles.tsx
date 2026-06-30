import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS_DATA } from "../../lib/collections";
import type { CollectionMeta } from "../../lib/collections";

interface CategoryItem {
  name: string;
  handle: string;
  image?: string;
  tag?: string;
  isSale?: boolean;
}

const categories: CategoryItem[] = [
  // Sale banner
  { name: "Sale Up to 30% Off", handle: "sale", isSale: true },
  // Dynamic collection items
  ...Object.values(COLLECTIONS_DATA).map((col: CollectionMeta) => ({
    name: col.name,
    handle: col.slug,
    image: col.image,
    tag: col.tag,
  })),
];

export default function CategoryCircles() {
  return (
    <section className="bg-white py-4 md:py-6 border-b border-zinc-100 overflow-hidden">
      <div className="section-container text-center">
        <h2 className="text-lg md:text-xl font-bold text-on-surface mb-5">
          Shop by Category
        </h2>
        <div className="flex overflow-x-auto gap-4 md:gap-8 py-2 md:justify-center scrollbar-hide snap-x snap-mandatory">
          {categories.map((category) => (
            <Link
              key={category.handle}
              href={`/collections/${category.handle}`}
              className="flex flex-col items-center gap-3 group min-w-20 snap-start"
            >
              <div
                className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:ring-1 group-hover:ring-[#FF3F6C] group-hover:ring-offset-2 ${
                  category.isSale
                    ? "bg-white border-2 border-red-500 shadow-sm"
                    : "bg-zinc-100"
                }`}
              >
                {category.isSale ? (
                  <span className="text-red-500 font-bold text-[10px] leading-[1.1] text-center px-1 uppercase tracking-wider">
                    SALE<br />UP TO<br />30% OFF
                  </span>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={category.image!}
                      alt={category.name}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
              <span
                className={`text-[8px] md:text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap text-center ${
                  category.isSale ? "text-red-500" : "text-zinc-800"
                }`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}