"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fffafa] py-10 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">
            Your <span className="text-pink-600">Bag</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
            {cart.length === 0
              ? "Tas belanja Anda kosong."
              : `Terdapat ${cart.length} jenis produk di tas Anda.`}
          </p>
        </header>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-12 md:p-20 text-center border border-pink-50 shadow-sm">
            <span className="material-icons-round text-6xl md:text-7xl text-pink-100 mb-6">
              shopping_basket
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              Tas Belanja Kosong
            </h3>
            <Link
              href="/catalog"
              className="inline-block bg-slate-900 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-pink-600 transition-all active:scale-95"
            >
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* List Item */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-pink-50 flex items-center gap-4 md:gap-6 shadow-sm"
                >
                  {/* Image - Scaled for mobile */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-50 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Info & Controls */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-pink-600 font-black text-sm md:text-base">
                      ${item.price}
                    </p>

                    <div className="flex items-center justify-between md:justify-start gap-4 mt-2">
                      <div className="flex items-center bg-slate-50 rounded-full px-1 py-1 border border-slate-100">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:text-pink-600 active:bg-white rounded-full transition-all"
                        >
                          <span className="material-icons-round text-xs md:text-sm">
                            remove
                          </span>
                        </button>
                        <span className="w-6 md:w-8 text-center text-[10px] md:text-xs font-black text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:text-pink-600 active:bg-white rounded-full transition-all"
                        >
                          <span className="material-icons-round text-xs md:text-sm">
                            add
                          </span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-red-500 active:scale-90 transition-all"
                      >
                        <span className="material-icons-round text-lg md:text-xl">
                          delete_outline
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Pesanan (Order Summary) */}
            <div className="lg:col-span-1 mt-4 lg:mt-0">
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] sticky top-24 md:top-32 shadow-2xl shadow-slate-200">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                  <span className="material-icons-round text-pink-500">
                    receipt_long
                  </span>
                  Summary
                </h3>
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex justify-between text-slate-400 text-xs md:text-sm">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-xs md:text-sm">
                    <span>Shipping</span>
                    <span className="font-bold text-green-400">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="font-bold text-sm md:text-base">
                      Total
                    </span>
                    <span className="text-xl md:text-2xl font-black text-pink-500 tracking-tight">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-pink-600 py-4 md:py-5 rounded-xl md:rounded-[2rem] font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-pink-600 transition-all active:scale-95 shadow-lg shadow-pink-900/20">
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
