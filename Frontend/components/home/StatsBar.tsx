import { Icon, IconName } from "../Icon";

const stats: { icon: IconName; number: string; label: string }[] = [
  { icon: "users", number: "1,70,000+", label: "Shoprine Delivered" },
  { icon: "mapPin", number: "9,820+", label: "Pincodes Reached" },
  { icon: "bolt", number: "12 Hours", label: "Fast Shipping" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#F5F5F6] py-5 md:py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Icon name={stat.icon} className="w-5 h-5 md:w-6 md:h-6 text-[#282C3F]" />
              </div>
              <p className="text-xs md:text-sm font-bold text-[#282C3F]">{stat.number}</p>
              <p className="text-[10px] md:text-xs text-[#696879]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}