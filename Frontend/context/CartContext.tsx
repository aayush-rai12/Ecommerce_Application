"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  handle: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const savedCart = localStorage.getItem("shoprine-cart");
      if (!savedCart) return [];
      const parsedItems = JSON.parse(savedCart);
      if (!Array.isArray(parsedItems)) return [];
      return parsedItems.map((item: unknown) => {
        const it = item as Record<string, unknown>;
        return {
          id: String(it.id ?? ""),
          name: String(it.name ?? ""),
          price: Number(it.price as unknown as number) || 0,
          size: String(it.size ?? ""),
          quantity: Number(it.quantity as unknown as number) || 1,
          image: String(it.image ?? ""),
          handle: String(it.handle ?? ""),
        };
      });
    } catch {
      return [];
    }
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('shoprine-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
