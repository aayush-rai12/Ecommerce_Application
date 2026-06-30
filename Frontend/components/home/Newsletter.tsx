"use client";

export default function JoinMovement() {
  return (
    <section className="w-full bg-black py-14 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6">
      
      {/* MAIN CONTAINER */}
      <div className="max-w-3xl mx-auto text-center">

        {/* TAGLINE */}
        <p className="uppercase tracking-[0.35em] text-[#ff3f6c] text-[10px] sm:text-[11px] font-medium mb-5 sm:mb-6">
          JOIN THE MOVEMENT
        </p>

        {/* HEADING */}
        <h2 className="text-white font-semibold leading-[1.05] text-[clamp(28px,5vw,60px)] mb-4 sm:mb-5">
          Wear your backbone.
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto max-w-2xl text-white/60 text-[11px] sm:text-base md:text-lg leading-relaxed mb-7 sm:mb-8 px-2 sm:px-0">
          Be among the first to wear Shoprine - where premium meets purpose.
        </p>

        {/* FORM WRAPPER */}
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">

          {/* INPUT */}
          <input
            type="email"
            placeholder="Enter your email"
            className="
              w-full
              h-12.5 sm:h-14
              px-4 sm:px-5
              bg-transparent
              border border-zinc-800
              text-white text-sm sm:text-base
              outline-none
              placeholder:text-white/35
              focus:border-zinc-600
              transition-all duration-300
              rounded-none sm:rounded-none
            "
          />

          {/* BUTTON */}
          <button
            className="
              w-full sm:w-auto
              h-12.5 sm:h-14
              px-6 sm:px-8
              bg-white
              text-black
              uppercase
              tracking-[0.25em]
              text-[10px] sm:text-xs
              font-semibold
              hover:bg-[#ff3f6c]
              hover:text-white
              transition-all duration-300
              whitespace-nowrap
              cursor-pointer
            "
          >
            GET EARLY ACCESS
          </button>

        </div>
      </div>
    </section>
  );
}