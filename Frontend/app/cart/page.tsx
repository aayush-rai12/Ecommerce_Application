"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { Icon } from "../../components/Icon";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const freeShippingThreshold = 4999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  return (
    <div className="bg-[#f8f8f6] min-h-screen pb-20">

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <Link href="/products" className="absolute left-4 top-1/2 -translate-y-1/2 text-black hover:opacity-60 transition-opacity">
          <Icon name="arrowRight" className="w-5 h-5 rotate-180" />
        </Link>
        <h1 className="text-sm font-black uppercase tracking-[0.2em]">YOUR BAG</h1>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 uppercase tracking-widest">
          {items.length} {items.length === 1 ? "ITEM" : "ITEMS"}
        </span>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 md:px-8 lg:px-12">

        {items.length === 0 ? (
          /* ── Empty State ── */
          <div className="text-center mt-32 max-w-sm mx-auto">
            <div className="w-20 h-20 border-2 border-zinc-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Icon name="bag" className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-3">
              Your bag is empty
            </h2>
            <p className="text-sm text-zinc-400 mb-10 leading-relaxed">
              Looks like you have not added anything yet.
            </p>
            <Link
              href="/products"
              className="inline-flex bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (

          /* ── Filled Cart ── */
          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 xl:gap-16">

            {/* ── LEFT: Items ── */}
            <div>
              {/* Free Shipping Progress Bar */}
              {remainingForFreeShipping > 0 ? (
                <div className="bg-white border border-zinc-100 p-4 mb-6 rounded-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">
                    Add <span className="text-black">₹{remainingForFreeShipping.toFixed(0)}</span> more for free shipping
                  </p>
                  <div className="h-0.5 bg-zinc-100 w-full">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-black text-white p-4 flex items-center gap-3 mb-6">
                  <Icon name="truck" className="w-4 h-4 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    You have unlocked free shipping! 🎉
                  </span>
                </div>
              )}

              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="bg-white border border-zinc-100 p-4 md:p-6 flex gap-4 md:gap-6 group hover:border-zinc-300 transition-colors"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.handle}`}
                      className="w-24 h-24 md:w-28 md:h-28 bg-zinc-50 shrink-0 overflow-hidden relative"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <Link href={`/products/${item.handle}`}>
                            <h3 className="text-xs font-black uppercase tracking-wider text-black leading-tight hover:opacity-60 transition-opacity">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1 font-medium">
                            SIZE: {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-zinc-300 hover:text-black transition-colors shrink-0 mt-0.5"
                          aria-label="Remove item"
                        >
                          <Icon name="close" className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Qty + Price Row */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-zinc-200 h-9 w-22.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                            className="w-8 h-full flex items-center justify-center hover:bg-zinc-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Icon name="minus" className="w-3 h-3 text-zinc-500" />
                          </button>
                          <span className="flex-1 text-center font-black text-xs border-x border-zinc-200 h-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-zinc-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Icon name="plus" className="w-3 h-3 text-zinc-500" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm font-black tracking-wide">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-zinc-400 mt-0.5">
                              ₹{item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping — Desktop only */}
              <div className="hidden lg:block mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                >
                  <Icon name="arrowRight" className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-white border border-zinc-100 p-6 lg:sticky lg:top-24">

                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-black mb-6 pb-4 border-b border-zinc-100">
                  Order Summary
                </h2>

                {/* Summary Lines */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">
                      Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)
                    </span>
                    <span className="text-sm font-bold">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-medium">
                      Shipping
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest text-green-600">
                      {totalPrice >= freeShippingThreshold ? "FREE" : `₹${(199).toFixed(2)}`}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-zinc-200 pt-5 mb-8">
                  <span className="text-xs uppercase tracking-widest font-black">Total</span>
                  <span className="text-xl font-black tracking-tight">
                    ₹{(totalPrice >= freeShippingThreshold ? totalPrice : totalPrice + 199).toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white h-14 font-black uppercase tracking-widest text-[11px] hover:bg-zinc-800 transition-colors active:scale-[0.99] mb-3">
                  PROCEED TO CHECKOUT
                </button>

                {/* Continue Shopping — Mobile */}
                <Link
                  href="/products"
                  className="lg:hidden w-full border border-zinc-200 text-black h-12 font-bold uppercase tracking-widest text-[11px] hover:border-black transition-colors flex items-center justify-center"
                >
                  CONTINUE SHOPPING
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-zinc-100 grid grid-cols-3 gap-3 text-center">
                  {(
                    [
                      { icon: "lock" as const, label: "Secure\nPayment" },
                      { icon: "refresh" as const, label: "Easy\nReturns" },
                      { icon: "truck" as const, label: "Fast\nShipping" },
                    ] as const
                  ).map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center gap-1.5">
                      <Icon name={badge.icon} className="w-4 h-4 text-zinc-400" />
                      <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium leading-tight whitespace-pre-line text-center">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}