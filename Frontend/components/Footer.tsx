import Image from "next/image";
import { Icon } from "./Icon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 pt-6 pb-10 md:pb-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="rounded-xl inline-flex items-center">
              <Image
                src="/branding/Logo_New.png"
                alt="shoprine Clothes"
                width={160}
                height={50}
                className="h-12 w-auto object-contain rounded-lg"
                style={{ width: "auto" }}
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-medium">
              Blessed With Modern Touch.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a className="w-10 h-10 flex items-center justify-center border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-white transition-all" href="#">
                <Icon name="globe" className="w-5 h-5" />
              </a>
              <a className="w-10 h-10 flex items-center justify-center border border-zinc-800 rounded-full text-zinc-400 hover:text-white hover:border-white transition-all" href="#">
                <Icon name="share" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-1 md:col-span-3 gap-8">
            <div className="flex flex-col gap-5">
              <span className="text-white font-bold text-xs uppercase tracking-widest">Shop</span>
              <nav className="flex flex-col gap-3">
                <a className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Collections</a>
                <a className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Latest Drop</a>
                <a className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Archive</a>
              </nav>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-white font-bold text-xs uppercase tracking-widest">Support</span>
              <nav className="flex flex-col gap-3">
                <a className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Size Guide</a>
                <a className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Shipping</a>
                <a className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Returns</a>
              </nav>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-white font-bold text-xs uppercase tracking-widest">Legal</span>
              <nav className="flex flex-col gap-3">
                <Link className="text-zinc-400 text-sm hover:text-white transition-colors" href="/policy">Privacy Policy</Link>
                <Link className="text-zinc-400 text-sm hover:text-white transition-colors" href="/blog">Blog</Link>
                <Link className="text-zinc-400 text-sm hover:text-white transition-colors" href="#">Contact Us</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-zinc-400 text-center text-xs font-medium uppercase tracking-wider"><span>&copy;</span> 2026 shoprine Clothes CO. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
