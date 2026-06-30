import ProductCard from "../home/ProductCard";

interface RelatedProduct {
  id: string;
  name: string;
  handle: string;
  price: number;
  category: string;
  image: string;
  color: string;
}

interface Props {
  products: RelatedProduct[];
}

function seededValue(seed: string, min: number, max: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
  const v = Math.abs(h) % 1000 / 1000;
  return Math.floor(min + v * (max - min + 1));
}

export default function RelatedProducts({ products }: Props) {
  return (
    <section className="mt-10 px-4 md:px-0 pb-10">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-xl font-black uppercase tracking-tighter">YOU MAY ALSO LIKE</h2>
        <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            handle={product.handle}
            name={product.name}
            price={product.price}
            mrp={Math.floor(product.price * 1.3)} // Mock mrp
            color={product.category}
            images={[product.image]}
            discount={seededValue(product.id + "d", 10, 40)}
            rating={Math.min(5, seededValue(product.id + "r", 30, 50) / 10)}
            reviews={seededValue(product.id + "v", 20, 250)}
            inStock={true}
          />
        ))}
      </div>
    </section>
  );
}
