"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  items: string[];
  add: (handle: string) => void;
  remove: (handle: string) => void;
  toggle: (handle: string) => void;
  has: (handle: string) => boolean;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = localStorage.getItem("shoprine-wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("shoprine-wishlist", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
  }, [items]);

  const add = (handle: string) => setItems((s) => (s.includes(handle) ? s : [...s, handle]));
  const remove = (handle: string) => setItems((s) => s.filter((h) => h !== handle));
  const toggle = (handle: string) => setItems((s) => (s.includes(handle) ? s.filter((h) => h !== handle) : [...s, handle]));
  const has = (handle: string) => items.includes(handle);
  const clear = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, add, remove, toggle, has, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
