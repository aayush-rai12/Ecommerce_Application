import Image from "next/image";
import Link from "next/link";
import { getHomepageData } from "../lib/api";
import { Icon } from "./Icon";

export default async function CTASection() {
  const data = await getHomepageData();
  const { archive } = data;

  return (
    <section className="relative h-150 flex items-center justify-center overflow-hidden">
      <Image
        alt="Archive background"
        src={archive.imageSrc}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 object-cover grayscale opacity-50"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-3xl md:text-[64px] font-extrabold uppercase tracking-widest mb-8 text-black">{archive.headline}</h2>
        <Link href={archive.ctaLink} className="group relative inline-flex items-center gap-4 bg-black text-white px-10 py-5 font-semibold tracking-wider text-sm hover:bg-zinc-800 transition-all duration-300 rounded-full shadow-2xl active:scale-95">
          {archive.ctaText}
          <Icon name="arrowRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
