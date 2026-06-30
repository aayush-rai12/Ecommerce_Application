"use client";

import { use, useState, useEffect } from "react";
import { getProductByHandle, getAllProducts } from "../../../lib/api";
import { Product } from "../../../lib/products";
import ProductImageGallery from "../../../components/product/ProductImageGallery";
import SizeSelector from "../../../components/product/SizeSelector";
import QuantitySelector from "../../../components/product/QuantitySelector";
import ProductAccordion from "../../../components/product/ProductAccordion";
import RelatedProducts from "../../../components/product/RelatedProducts";
import { useCart } from "../../../context/CartContext";
import { Icon, IconName } from "../../../components/Icon";
import { formatPrice } from "../../../lib/products";

export default function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const resolvedParams = use(params as any) as { handle: string };
  const { handle } = resolvedParams;
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  interface RelatedProduct {
    id: string;
    name: string;
    handle: string;
    price: number;
    category: string;
    image: string;
    color: string;
  }

  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

  //useEffect for data fetching
  useEffect(() => {
    const lookupHandle = decodeURIComponent(handle);
    getProductByHandle(lookupHandle).then((p) => {
      if (!p) {
        setLoading(false);
        return;
      }
      setProduct(p);
      getAllProducts().then((all) => {
        setRelated(
          all
            .filter((item) => item.handle !== handle)
            .slice(0, 4)
            .map((item) => ({
              id: item.id,
              name: item.name,
              handle: item.handle,
              price: item.price,
              category: item.category,
              image: item.images?.[0] ?? "",
              color: item.category,
            }))
        );
        setLoading(false);
      });
    });
  }, [handle]);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    setError("");
    if (!product) return;
    addItem({
      id: product!.id,
      name: product!.name,
      price: product!.price,
      size: selectedSize,
      quantity,
      image: product!.images[0],
      handle: product!.handle,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const accordionItems: { title: string; content: string; icon: IconName }[] = [
    {
      title: "PRODUCT DETAILS",
      content:
        "Crafted from 100% organic French Terry cotton. Heavyweight 450GSM fabric for a premium feel. Features dropped shoulders, oversized hood, and rib-knit cuffs. Machine wash cold, hang dry.",
      icon: "document",
    },
    {
      title: "SHIPPING & RETURNS",
      content:
        "Express worldwide shipping available. Orders processed within 24-48 hours. Returns accepted within 14 days for unworn items in original packaging.",
      icon: "truck",
    },
    {
      title: "SUSTAINABILITY",
      content:
        "Produced in limited quantities to reduce waste. All materials are ethically sourced and certified organic. Packaging is 100% recyclable and plastic-free.",
      icon: "globe",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 pb-20 flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left - Image skeleton */}
          <div className="w-full md:w-1/2 lg:w-3/5">
            <div className="w-full h-[20rem] md:h-[28rem] lg:h-[36rem] bg-zinc-100 animate-pulse md:rounded-xl" />
            {/* Thumbnails skeleton */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-zinc-100 animate-pulse shrink-0 md:rounded-lg" />
              ))}
            </div>
          </div>
          {/* Right - Text skeleton */}
          <div className="w-full md:w-1/2 lg:w-2/5 mt-8 md:mt-0 space-y-4">
            <div className="h-3 w-24 bg-zinc-100 animate-pulse" />
            <div className="h-10 w-full bg-zinc-100 animate-pulse" />
            <div className="h-6 w-20 bg-zinc-100 animate-pulse" />
            <div className="h-4 w-full bg-zinc-100 animate-pulse" />
            <div className="h-4 w-3/4 bg-zinc-100 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (!product) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto pt-20 px-4 text-center">
          <h1 className="text-2xl font-black uppercase">Product not found</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            This product does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      <main className="max-w-7xl mx-auto bg-white pb-0 md:pb-5 overflow-x-hidden pt-4 md:pt-12 px-0 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {/* Left Column - Images */}
          <div className="w-full md:w-1/2 lg:w-3/5">
            <ProductImageGallery images={product.images} />
          </div>

          {/* Right Column - Info */}
          <div className="w-full md:w-1/2 lg:w-2/5 md:sticky md:top-32 md:self-start transition-all duration-500 ease-in-out">
            <div className="px-4 md:px-0 mt-0 md:mt-0">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 block">
                {product.category.toUpperCase()} COLLECTION
              </span>
              <h1 className="text-xl lg:text-3xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                {product.name}
              </h1>
              <div className="flex items-end gap-3 mb-6">
                <p className="text-lg lg:text-xl font-bold text-black">₹{formatPrice(product.price)}</p>
                {product.mrp > product.price && (
                  <>
                    <p className="text-sm text-zinc-500 line-through mb-0.5">₹{formatPrice(product.mrp)}</p>
                    <p className="text-sm font-bold text-[#FF3F6C] mb-0.5">{product.discount}% OFF</p>
                  </>
                )}
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={(size) => {
                setSelectedSize(size);
                setError("");
              }}
              error={error}
            />

            {/* Quantity Selector */}
            <QuantitySelector quantity={quantity} onChange={setQuantity} />

            {/* Add to Bag */}
            <div className="px-4 md:px-0 mt-12">
              <button
                onClick={handleAddToBag}
                className="w-full bg-black text-white h-16 font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors text-sm flex items-center justify-center gap-3 group"
              >
                <Icon name="bag" className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>ADD TO BAG</span>
              </button>
            </div>

            {/* Accordion */}
            <ProductAccordion items={accordionItems} />
          </div>
        </div>

        {/* Related Products */}
        <div className="md:mt-16">
          <RelatedProducts products={related} />
        </div>
      </main>


      {/* Toast */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-300 transition-all duration-500 ${
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-2xl flex items-center gap-3 whitespace-nowrap">
          <span>Added to bag</span>
          <Icon name="check" className="w-4 h-4 text-green-400" />
        </div>
      </div>
    </div>
  );
}