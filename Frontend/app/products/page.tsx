import ProductSearch from "@/components/home/ProductSearch";
import { getAllProducts } from "../../lib/api";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <main className="min-h-screen pt-6 md:pt-24 pb-14 md:pb-12 section-container">
      <div className="mb-4 md:mb-12">
        <div>
          <p className="text-sm uppercase text-center tracking-[0.3em] text-zinc-500 mb-2">Search Products</p>
          <h2 className="text-sm md:text- text-center font-bold tracking-tight">Search by product name, category, color, or handle.</h2>
        </div>
      </div>

      <ProductSearch products={products} />
    </main>
  );
}
