import Link from "next/link";
import { Icon } from "../Icon";

export default function BrandSection() {
  return (
    <section className="relative overflow-hidden bg-white py-5 sm:py-7 md:py-14">

      <div className="section-container relative max-w-5xl text-center">

        {/* Small Label */}
        <span
          className="
            mb-4 block
            text-[10px] sm:text-xm
            font-black uppercase
            tracking-[0.35em]
            text-[#FF3F6C]
          "
        >
          THE SHOPRINE PHILOSOPHY
        </span>

        {/* Main Heading */}
        <h2
          className="
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            font-extrabold uppercase
            leading-[0.9]
            tracking-tight
            text-[#282C3F]
          "
        >
          BORN
          <br />
          <span className="text-[#FF3F6C]">
            FROM
          </span>
          <br />
          OBSESSION
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-8 h-0.5 w-24 rounded-full bg-[#FF3F6C]" />

        {/* Sub Text */}
        <p
          className="
            mt-6
            text-[10px] sm:text-xs
            font-bold uppercase
            tracking-[0.45em]
            text-[#696879]
          "
        >
          Precision • Culture • Identity
        </p>

        {/* Description */}
        <p
          className="
            mx-auto mt-6
            max-w-3xl
            text-base sm:text-lg md:text-xl
            leading-relaxed
            text-[#696879]
          "
        >
          At SHOPRINE, we craft identity through cinematic streetwear inspired by anime, underground culture, and modern aesthetics.
        </p>

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="
              group flex items-center gap-3
              rounded-full border border-[#FF3F6C]/10
              bg-[#FF3F6C]/5 px-6 py-3
              text-[11px] font-bold uppercase
              tracking-[0.3em]
              text-[#282C3F]/80
              backdrop-blur-md
              transition-all duration-300
              hover:border-[#FF3F6C]/40
              hover:bg-[#FF3F6C]/10
              hover:text-[#FF3F6C]
            "
          >
            <div
              className="
                h-px w-8 bg-[#282C3F]/40
                transition-all duration-300
                group-hover:w-14
                group-hover:bg-[#FF3F6C]
              "
            />
            Explore The Universe
            {/* <Icon name="arrowRight" className="w-4 h-4 text-[#282C3F]/80 group-hover:text-[#FF3F6C] transition-colors" /> */}
            <div
              className="
                h-px w-8 bg-[#282C3F]/40
                transition-all duration-300
                group-hover:w-14
                group-hover:bg-[#FF3F6C]
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}