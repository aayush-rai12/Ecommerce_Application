"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "../Icon";
import { useWishlist } from "@/context/WishlistContext";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";

export interface ProductProps {
  handle: string;
  images: string[];
  name: string;
  color: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviews: number;
  brand?: string;
  inStock: boolean;
}

export default function ProductCard({
  handle,
  images,
  name,
  color,
  price,
  mrp,
  discount,
  rating,
  reviews,
  brand = "SHOPRINE",
  inStock,
}: ProductProps) {
  const { toggle, has } = useWishlist();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  const isWishlisted = mounted ? has(handle) : false;
  const mainImage = images[0] || "/products/oversized_tee.png";

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(handle);
  };

  return (
    <Link href={`/products/${handle}`} className="group cursor-pointer block bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-card-bg aspect-3/4">
        <Image
          alt={name}
          src={mainImage}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Discount Badge - Top Left */}
        {discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#FF3F6C] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            {discount}% OFF
          </div>
        )}

        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm cursor-pointer ${
            isWishlisted ? "animate-wishlist-pop" : ""
          }`}
        >
          <Icon
            name={isWishlisted ? "heartFilled" : "heart"}
            className={`w-4 h-4 ${isWishlisted ? "text-primary" : "text-on-surface"}`}
          />
        </button>

        {/* Quick Add on Hover (Desktop) */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-2.5 text-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Quick Add +
          </span>
        </div>

        {/* Stock Badge */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-on-surface font-bold text-xs uppercase tracking-wider bg-white px-4 py-2 rounded-sm shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2.5 md:p-3 space-y-1">
        {/* Brand */}
        <p className="text-[11px] font-bold text-secondary uppercase tracking-wide">{brand}</p>

        {/* Product Name */}
        <h3 className="text-[13px] font-medium text-on-surface leading-tight line-clamp-1 group-hover:text-[#FF3F6C] transition-colors">
          {name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[13px] font-bold text-on-surface">₹{formatPrice(price)}</span>
          {mrp > price && (
            <>
              <span className="text-[11px] text-secondary line-through">₹{formatPrice(mrp)}</span>
              <span className="text-[11px] font-semibold text-myntra-orange">{discount}% off</span>
            </>
          )}
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex items-center bg-[#03A685] text-white rounded-sm px-1.5 py-px gap-0.5">
            <span className="text-[10px] font-bold">{rating.toFixed(1)}</span>
            <Icon name="starFilled" className="w-2.5 h-2.5" />
          </div>
          <span className="text-[11px] text-secondary">({reviews})</span>
        </div>
      </div>

      <style>{`
        @keyframes wishlist-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .animate-wishlist-pop {
          animation: wishlist-pop 0.3s ease-out;
        }
      `}</style>
    </Link>
  );
}
