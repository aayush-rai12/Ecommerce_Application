"use client";

import { useState } from "react";

import { Icon, IconName } from "../Icon";

interface AccordionItem {
  title: string;
  content: string;
  icon?: IconName;
}

interface Props {
  items: AccordionItem[];
}

export default function ProductAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 border-t border-zinc-100">
      {items.map((item, idx) => (
        <div key={idx} className="border-b border-zinc-100">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-between items-center py-6 px-4 md:px-0 hover:bg-zinc-50 transition-colors"
          >
            <div className="flex items-center gap-3 text-zinc-900 group-hover:text-black transition-colors">
              {item.icon && (
                <Icon name={item.icon} className="w-5 h-5" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-widest text-black">
                {item.title}
              </span>
            </div>
            <Icon
              name="chevronDown"
              className={`w-5 h-5 transition-transform duration-300 ${
                openIndex === idx ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === idx ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 md:px-0 text-xs leading-relaxed text-zinc-500 uppercase tracking-wider">
                {item.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
