"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "@/components/CartBadge";
import WishlistBadge from "@/components/WishlistBagde";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", icon: "home" },
    { name: "Catalog", href: "/catalog", icon: "auto_awesome_motion" },
    { name: "About", href: "/about", icon: "auto_fix_high" },
  ];

  return (
    <>
      {/* 1. NAVBAR UTAMA */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl py-3 md:py-4 shadow-sm border-b border-pink-50"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 md:gap-3 relative z-[110]"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-xl bg-pink-50 p-1 transition-transform group-hover:rotate-12">
              <img
                src="/logo.png.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter transition-colors group-hover:text-pink-600">
              BEAUTY<span className="text-pink-600">VIBE</span>.
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-pink-600 ${
                  pathname === link.href ? "text-pink-600" : "text-slate-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Toggle */}
          <div className="flex items-center space-x-1 md:space-x-3 relative z-[110]">
            <Link
              href="/wishlist"
              className="relative p-2.5 text-slate-700 hover:text-pink-600 transition-colors"
            >
              <span className="material-icons-round text-xl md:text-2xl">
                favorite_border
              </span>
              <WishlistBadge />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 md:p-2.5 bg-slate-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-pink-600 transition-all shadow-lg shadow-slate-200"
            >
              <span className="material-icons-round text-xl md:text-2xl">
                shopping_bag
              </span>
              <CartBadge />
            </Link>
            <button
              className="md:hidden p-2.5 text-slate-900 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-icons-round text-[28px]">
                {isMobileMenuOpen ? "close" : "sort"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. SIDEBAR OVERLAY (Dikeluarkan dari tag <nav> agar z-index & background berdiri sendiri) */}
      <div
        className={`fixed inset-0 z-[120] md:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        {/* Backdrop (Hitam Transparan) */}
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel Sidebar (Putih Solid) */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[380px] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Tambahan Background Layer untuk memastikan warna Putih Solid */}
          <div className="absolute inset-0 bg-white z-[-1]" />

          <div className="relative flex flex-col h-full p-8 pt-24">
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 block mb-2">
                Discover
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
                Beauty Vibe<span className="text-pink-600">.</span>
              </h2>
            </div>
            {/* --- TOMBOL CLOSE --- */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-900 hover:bg-pink-50 hover:text-pink-600 transition-all active:scale-90"
              aria-label="Close Menu"
            >
              <span className="material-icons-round text-2xl">close</span>
            </button>

            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center justify-between p-4 rounded-2xl transition-all ${
                    pathname === link.href
                      ? "bg-pink-50 text-pink-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="material-icons-round opacity-70">
                      {link.icon}
                    </span>
                    <span className="text-lg font-bold">{link.name}</span>
                  </div>
                  <span className="material-icons-round text-sm">east</span>
                </Link>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[9px] font-black uppercase tracking-widest text-pink-400 mb-2">
                  Member Benefit
                </p>
                <p className="text-sm font-bold leading-snug">
                  Dapatkan diskon 20% untuk pembelian pertama Anda!
                </p>
              </div>
              <span className="material-icons-round absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12">
                local_activity
              </span>
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100">
              <div className="flex gap-4 mb-6">
                {["instagram", "tiktok", "youtube"].map((icon) => (
                  <div
                    key={icon}
                    className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${icon}/slate`}
                      className="w-4 h-4 opacity-60"
                      alt={icon}
                    />
                  </div>
                ))}
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                &copy; 2026 BeautyVibe Digital Catalog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
