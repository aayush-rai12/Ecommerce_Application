"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function MobileNav() {
  const pathname = usePathname();
  const { items: wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;

  const { items: cartItems } = useCart();
  const cartCount = cartItems.length;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200 flex justify-between items-center h-16">

      {/* HOME */}
      <Link
        href="/"
        className="flex-1 flex flex-col items-center justify-center text-black h-full"
      >
        <Icon name="grid" className="w-5 h-5 mb-1 text-black" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-black">
          Home
        </span>
      </Link>

      {/* PRODUCTS */}
      <Link
        href="/products"
        className="flex-1 flex flex-col items-center justify-center text-black h-full"
      >
        <Icon name="sparkles" className="w-5 h-5 mb-1 text-black" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-black">
          Products
        </span>
      </Link>

      {/* WISHLIST */}
      <Link
        href="/wishlist"
        className="flex-1 flex flex-col items-center justify-center text-black h-full"
      >
        <div className="relative">
          <Icon name="heart" className="w-5 h-5 mb-1 text-black" />

          {mounted && wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FF3F6C] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>

        <span className="text-[9px] font-bold uppercase tracking-widest text-black">
          Wishlist
        </span>
      </Link>

      {/* CART */}
      <Link
        href="/cart"
        className="flex-1 flex flex-col items-center justify-center text-black h-full"
      >
        <div className="relative">  
          <Icon name="bag" className="w-5 h-5 mb-1 text-black" />
          {mounted && cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#FF3F6C] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-black">
          Cart
        </span>
      </Link>

      {/* ACCOUNT */}
      <Link
        href="/account"
        className="flex-1 flex flex-col items-center justify-center text-black h-full"
      >
        <Icon name="user" className="w-5 h-5 mb-1 text-black" />
        <span className="text-[9px] font-bold uppercase tracking-widest text-black">
          Account
        </span>
      </Link>

    </nav>
  );
}