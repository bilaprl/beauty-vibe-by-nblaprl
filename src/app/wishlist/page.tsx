"use client";

import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);

  // Mencegah Hydration Error
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fffafa] py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header - Adjusted for Mobile Layout */}
        <header className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">
              Wish<span className="text-pink-600">list</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1 md:mt-2">
              {wishlist.length === 0 
                ? "Belum ada produk impian." 
                : `Simpanan produk pilihan Anda (${wishlist.length})`}
            </p>
          </div>
          <Link href="/catalog" className="inline-flex md:block text-[10px] md:text-xs font-black uppercase tracking-widest text-pink-600 hover:text-slate-900 transition-colors w-fit">
            {wishlist.length === 0 ? "Browse Catalog →" : "Continue Shopping →"}
          </Link>
        </header>

        {wishlist.length === 0 ? (
          /* Empty State - Adjusted padding for mobile screens */
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-center border border-pink-50 shadow-sm">
            <span className="material-icons-round text-5xl md:text-7xl text-pink-100 mb-4 md:mb-6">favorite_border</span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 md:mb-4">Wishlist Anda Kosong</h3>
            <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8 max-w-sm mx-auto px-4">Tampaknya Anda belum menemukan produk yang pas. Jelajahi koleksi kami sekarang!</p>
            <Link 
              href="/catalog" 
              className="inline-block bg-slate-900 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-pink-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              Lihat Katalog
            </Link>
          </div>
        ) : (
          /* Grid - Balanced for iPhone and Android views */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {wishlist.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2rem] md:rounded-[2.5rem] border border-pink-50 overflow-hidden hover:shadow-2xl hover:shadow-pink-100 transition-all duration-500">
                <div className="relative aspect-square bg-pink-50/30 overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-contain p-6 md:p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                  <button 
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 w-9 h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 shadow-sm hover:bg-pink-600 hover:text-white transition-all active:scale-90"
                    aria-label="Remove from wishlist"
                  >
                    <span className="material-icons-round text-sm">close</span>
                  </button>
                </div>
                
                <div className="p-5 md:p-6">
                  <h4 className="font-bold text-slate-800 mb-1 line-clamp-1 text-sm md:text-base">{item.title}</h4>
                  <p className="text-pink-600 font-black mb-4 text-sm md:text-base">${item.price}</p>
                  
                  <button 
                    onClick={() => {
                      addToCart(item);
                      toggleWishlist(item);
                    }}
                    className="w-full py-3 md:py-3.5 bg-slate-900 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span className="material-icons-round text-sm">add_shopping_cart</span>
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}