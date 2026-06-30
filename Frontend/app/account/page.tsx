"use client";

// no react hooks needed here
import { Icon } from "../../components/Icon";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: "bag", title: "My Orders", subtitle: "Track, return, or buy again", href: "/account/orders" },
    { icon: "heart", title: "Wishlist", subtitle: "Items saved for later", href: "/wishlist" },
    { icon: "mapPin", title: "Addresses", subtitle: "Manage delivery addresses", href: "/account/addresses" },
    { icon: "creditCard", title: "Payments", subtitle: "Cards, UPI, Wallets", href: "/account/payments" },
    { icon: "bell", title: "Notifications", subtitle: "Stay updated with offers", href: "/account/notifications" },
    { icon: "star", title: "Shoprine Credits", subtitle: "Earn and redeem points", href: "/account/credits" },
    { icon: "questionMarkCircle", title: "Help Center", subtitle: "FAQs, chat support", href: "/contact" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-24">

      {/* HEADER */}
      <div className="bg-gray text-white flex flex-col items-center py-12 relative">

        {/* PROFILE IMAGE */}
        <div className="w-24 h-24 rounded-full overflow-hidden outline outline-gray-300 border-4 border-black/30 shadow-lg">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-[#fe3e6b]">
          Welcome to Shoprine
        </h1>

        <p className="text-sm sm:text-base text-black mt-1">
          Faith · Fashion · Comfort
        </p>

        {!user && (
          <div className="flex gap-3 mt-6">
            <Link href="/account/signin" className="px-6 py-2 bg-white text-black font-semibold rounded-full uppercase text-sm tracking-wider hover:scale-105 transform transition">Sign In</Link>
            <Link href="/account/signup" className="px-6 py-2 bg-black text-white font-semibold rounded-full uppercase text-sm tracking-wider hover:scale-105 transform transition">Sign Up</Link>
          </div>
        )}

        {user && (
          <div className="mt-6">
            <div className="text-sm text-gray-800">Signed in as <strong>{user.name}</strong></div>
            <button onClick={() => signOut()} className="mt-3 px-6 py-2 bg-white text-black font-semibold rounded-full">Sign out</button>
          </div>
        )}
      </div>

      {/* MENU */}
      <div className="mt-0 px-4 space-y-3">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#fe3e6b] flex items-center justify-center text-[#fe3e6b]">
                <Icon name={item.icon} className="w-6 h-6 text-black" />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">
                  {item.title}
                </span>
                <span className="text-gray-500 text-xs mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <Icon name="chevronRight" className="w-5 h-5 text-gray-300" />
          </Link>
        ))}
      </div>

    </div>
  );
}