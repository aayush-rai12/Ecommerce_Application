"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon, IconName } from "./Icon";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getAllProducts } from "../lib/api";
import type { Product } from "../lib/products";

const desktopNavLinks: { label: string; href: string }[] = [
  { label: "Men", href: "/products?category=men" },
  { label: "Women", href: "/products?category=women" },
  // { label: "Oversized", href: "/collections/oversized-drop" },
  { label: "Sale", href: "/products?sale=true" },
  { label: "Collections", href: "/collections" },
  { label: "Fit Guide", href: "/fit-guide" },
];

const mobileDrawerLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Men", href: "/products?category=men", icon: "user" },
  { label: "Women", href: "/products?category=women", icon: "user" },
  { label: "Sale", href: "/products?sale=true", icon: "tag" },
  { label: "Collections", href: "/products?collections", icon: "grid" },
  { label: "Fit Guide", href: "/fit-guide", icon: "scissors" },
  { label: "Blog", href: "/blog", icon: "document" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoadingProducts(false));
  }, []);

  const filteredProducts = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return products;

    return products.filter((product) =>
      [product.name, product.handle, product.color, product.category, product.description]
        .some((value) => value.toLowerCase().includes(normalized))
    );
  }, [products, searchQuery]);

  return (
    <>
      {/* --- Main Navbar --- */}
      <header className="sticky top-0 z-100 w-full bg-black border-b border-zinc-800 transition-all duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-12 grid grid-cols-3 items-center">

          {/* --- Left: Hamburger / Desktop Nav --- */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-transform duration-200 active:scale-90"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-6">
              {desktopNavLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    relative text-[11px] font-semibold uppercase tracking-[0.18em]
                    text-zinc-300 hover:text-white transition-colors duration-300
                    after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white
                    hover:after:w-full after:transition-all after:duration-300
                  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* --- Logo --- */}
          <div className="flex justify-center items-center">
            <Link
              href="/"
              className="scale-[1.03] transition-transform duration-300"
            >
              <Image
                src="/branding/Logo_New.png"
                alt="Shoprine Clothes"
                width={130}
                height={40}
                loading="eager"
                className="h-11 w-auto object-contain"
                style={{ width: "auto" }}
              />
            </Link>
          </div>

          {/* --- Right: Icons --- */}
          <div className="flex items-center justify-end gap-2 md:gap-5">
            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 hover:scale-110"
            >
              <Icon name="search" className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden md:flex relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 hover:scale-110"
            >
              <Icon name="heart" className="w-5 h-5 md:w-6 md:h-6" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center border border-black">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              aria-label="Account"
              className="hidden md:flex p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 hover:scale-110"
            >
              <Icon name="user" className="w-5 h-5 md:w-6 md:h-6" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 hover:scale-110"
            >
              <Icon name="bag" className="w-5 h-5 md:w-6 md:h-6" />
              {mounted && cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center border border-black">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* --- Search Overlay --- */}
      {searchOpen && (
        <div className="fixed inset-0 z-300 flex items-start justify-center overflow-y-auto bg-black/40 p-4 md:p-8">
          <div
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.15)] border border-zinc-100 overflow-hidden mt-4 md:mt-12">
            <div className="flex items-center gap-4 px-6 py-5 border-b border-zinc-100">
              <Icon name="search" className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Search for products, brands..."
                className="flex-1 text-base outline-none placeholder:text-zinc-400"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="p-2 text-zinc-400 hover:text-on-surface hover:bg-zinc-50 rounded-full transition-all duration-300"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <p className="text-xs text-zinc-400 mb-3">
                {loadingProducts
                  ? "Loading..."
                  : `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} found`}
              </p>

              <div className="space-y-2">
                {!loadingProducts && filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 8).map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden relative shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-zinc-400 uppercase tracking-wider">SHOPRINE</p>
                        <p className="text-sm font-medium text-zinc-900 truncate">{product.name}</p>
                        <p className="text-xs text-zinc-500">₹{product.price.toLocaleString("en-IN")}</p>
                      </div>
                    </Link>
                  ))
                ) : !loadingProducts && filteredProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-zinc-500">No results found</p>
                    <p className="text-xs text-zinc-400 mt-1">Try searching for &quot;hoodie&quot; or &quot;cargo&quot;</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Mobile Drawer Overlay --- */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-200 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        />
      )}

      {/* --- Mobile Drawer Panel --- */}
      <div
        className={`fixed top-0 left-0 h-full w-[80vw] max-w-[320px] z-201 bg-black flex flex-col transition-transform duration-300 ease-in-out md:hidden ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
          <Image
            src="/branding/Logo_New.png"
            alt="Shoprine Clothes"
            width={100}
            height={36}
            loading="eager"
            className="h-9 w-auto object-contain"
            style={{ width: "auto" }}
          />
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Search */}
        {/* <div className="px-4 py-3 border-b border-zinc-50">
          <button
            onClick={() => {
              setDrawerOpen(false);
              setTimeout(() => setSearchOpen(true), 200);
            }}
            className="w-full flex items-center gap-3 bg-zinc-50 rounded-lg px-4 py-3 text-sm text-zinc-400 hover:bg-zinc-100 transition-all"
          >
            <Icon name="search" className="w-4 h-4" />
            <span>Search for products...</span>
          </button>
        </div> */}

        {/* Drawer Links */}
        <nav className="flex flex-col flex-1 px-3 py-4 gap-0.5 overflow-y-auto">
          {mobileDrawerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 active:bg-zinc-700 transition-all duration-150 group"
            >
              <Icon name={link.icon} className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                {link.label}
              </span>
              <Icon name="chevronRight" className="w-4 h-4 text-zinc-300 ml-auto" />
            </Link>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-zinc-800">
          <p className="text-zinc-400 text-[10px] uppercase tracking-[0.18em] font-bold text-center">
            © 2025 Shoprine Clothes
          </p>
        </div>
      </div>
    </>
  );
}