"use client";

import { Icon } from "../Icon";

interface Props {
  quantity: number;
  onChange: (qty: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: Props) {
  return (
    <div className="px-4 md:px-0 mt-8">
      <span className="text-[10px] font-bold uppercase tracking-widest text-black block mb-4">QUANTITY</span>
      <div className="flex items-center w-32 border border-zinc-200 h-12">
        <button
          onClick={() => onChange(Math.max(1, quantity - 1))}
          className="w-10 h-full flex items-center justify-center hover:bg-zinc-50 transition-colors text-zinc-500"
        >
          <Icon name="minus" className="w-4 h-4" />
        </button>
        
        <span className="flex-1 text-center font-bold text-sm">{quantity}</span>

        <button
          onClick={() => onChange(Math.min(10, quantity + 1))}
          className="w-10 h-full flex items-center justify-center hover:bg-zinc-50 transition-colors text-zinc-500"
        >
          <Icon name="plus" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
