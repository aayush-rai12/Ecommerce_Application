"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { image: "/products/Shoprine Batman1.jpg" },
  { image: "/products/Shoprine Batman2.jpg" },
  { image: "/products/Shoprine Batman3.jpg" },
];
const words = ["Identity.", "Strength.", "Comfort.", "Style.", "You."];

export default function HeroResponsive() {
  const [current, setCurrent] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordShow, setWordShow] = useState(true);
  const [imgVisible, setImgVisible] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setImgVisible(true);
        setImageError(false); // reset error on slide change
      }, 500);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordShow(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setWordShow(true);
      }, 350);
    }, 1800);
    return () => clearInterval(wordTimer);
  }, []);

  const handleSlideChange = (index: number) => {
    setImgVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setImgVisible(true);
      setImageError(false);
    }, 400);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=DM+Sans:wght@300;400&display=swap');
        .fc { font-family: 'Cormorant Garamond', serif; }
        .fd { font-family: 'DM Sans', sans-serif; }
        @keyframes prog {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes wIn {
          from { opacity: 0; transform: translateY(12px); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes wOut {
          from { opacity: 1; transform: translateY(0); filter: blur(0); }
          to { opacity: 0; transform: translateY(-10px); filter: blur(4px); }
        }
        .w-in { animation: wIn 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards; }
        .w-out { animation: wOut 0.25s ease-out forwards; }
      `}</style>

      <div className="relative w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl">
        <div className="fd w-full">
          <div className="flex flex-col md:flex-row h-full">
            {/* TEXT SECTION - centered */}
            <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 md:p-10 flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-2 mb-5">
                <span className="w-6 h-[1px] bg-white/40" />
                <span className="text-white/50 uppercase tracking-[0.25em] font-light text-[9px] sm:text-[10px] fd">
                  Shoprine Essentials
                </span>
                <span className="w-6 h-[1px] bg-white/40" />
              </div>

              <div className="space-y-1">
                <div className="fc font-light text-white leading-[1.2] text-[clamp(22px,4vw,42px)]">
                  <div>Fashion is not what</div>
                  <div>you wear</div>
                  <div>it&apos;s</div>
                </div>

                <div className="h-[clamp(46px,7vw,70px)] flex items-center justify-center">
                  <span
                    key={wordIndex}
                    className={`fc italic font-light text-[#ff3f6c] leading-tight text-[clamp(36px,6vw,64px)] ${wordShow ? "w-in" : "w-out"
                      }`}
                    style={{ lineHeight: 1.1 }}
                  >
                    {words[wordIndex]}
                  </span>
                </div>
              </div>

              <p className="fd font-light text-white/50 mt-3 text-[clamp(10px,1.5vw,12px)] tracking-wide max-w-[280px] leading-relaxed mx-auto">
                Minimal menswear for everyday confidence.
              </p>

              <Link
                href="/products"
                className="fd inline-flex items-center justify-center gap-2 mt-6 bg-white text-black rounded-full font-medium uppercase tracking-wider hover:bg-[#ff3f6c] hover:text-white transition-all duration-300 text-[10px] sm:text-[11px] px-6 py-2.5 sm:px-7 sm:py-3"
              >
                Explore Collection
                <span className="text-sm">→</span>
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            key={current}
            className="absolute bottom-0 left-0 h-[2px] z-30"
            style={{
              background: "linear-gradient(90deg, #ff3f6c, #ff8fab)",
              animation: "prog 4.5s linear forwards",
            }}
          />
        </div>
      </div>
    </>
  );
}