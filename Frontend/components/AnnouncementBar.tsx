"use client";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#FF3F6C] text-white text-center py-2 px-4 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap inline-block">
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          🎉 Free shipping on orders above ₹999
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          |
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          🔥 Sale upto 30% OFF
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          |
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          ✨ New drop every Friday
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          |
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          🚀 Express delivery in 12-36 hours
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          |
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          🎉 Free shipping on orders above ₹999
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          |
        </span>
        <span className="text-[11px] font-semibold tracking-wide mx-8">
          🔥 Sale upto 30% OFF
        </span>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
