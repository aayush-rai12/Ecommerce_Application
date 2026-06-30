"use client";

interface Props {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
  error?: string;
}

export default function SizeSelector({ sizes, selectedSize, onSelect, error }: Props) {
  return (
    <div className="px-4 md:px-0 mt-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-black">SELECT SIZE</span>
        <button className="text-[10px] text-zinc-400 underline uppercase tracking-widest hover:text-black transition-colors">
          Size Guide
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`h-12 border flex items-center justify-center text-sm font-bold transition-colors ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-white text-black border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-2 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
}
