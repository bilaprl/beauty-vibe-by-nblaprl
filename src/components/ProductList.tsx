"use client";

import { useState, useMemo, useEffect, useDeferredValue } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
}

export default function ProductList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activePriceRange, setActivePriceRange] = useState("all");
  const [activeType, setActiveType] = useState("all");

  //  Loading State khusus untuk area Grid
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  //  Optimasi Performa - Menunda update list sampai user selesai mengetik sedikit
  const deferredSearch = useDeferredValue(search);

  // Trigger loading saat filter atau search berubah
  useEffect(() => {
    setIsLocalLoading(true);
    const timer = setTimeout(() => setIsLocalLoading(false), 600);
    return () => clearTimeout(timer);
  }, [deferredSearch, activePriceRange, activeType, sortBy]);

  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Budget (<$10)", value: "budget" },
    { label: "Mid-Range ($10-$20)", value: "mid" },
    { label: "Luxury (>$20)", value: "luxury" },
  ];

  const productTypes = useMemo(() => {
    const types = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.title.toLowerCase().includes("mascara")) types.add("Mascara");
      else if (p.title.toLowerCase().includes("eyeshadow"))
        types.add("Eyeshadow");
      else if (
        p.title.toLowerCase().includes("lipstick") ||
        p.title.toLowerCase().includes("lip")
      )
        types.add("Lipstick");
      else if (p.title.toLowerCase().includes("powder")) types.add("Powder");
      else types.add("Others");
    });
    return ["all", ...Array.from(types)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        const matchesSearch = p.title
          .toLowerCase()
          .includes(deferredSearch.toLowerCase());
        const matchesType =
          activeType === "all" ||
          (activeType === "Others"
            ? true
            : p.title.toLowerCase().includes(activeType.toLowerCase()));
        let matchesPrice = true;
        if (activePriceRange === "budget") matchesPrice = p.price < 10;
        else if (activePriceRange === "mid")
          matchesPrice = p.price >= 10 && p.price <= 20;
        else if (activePriceRange === "luxury") matchesPrice = p.price > 20;
        return matchesSearch && matchesType && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        return 0;
      });
  }, [deferredSearch, sortBy, activePriceRange, activeType, initialProducts]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
      {/* --- MOBILE CONTROL BAR --- */}
      <div className="lg:hidden flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search beauty..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-pink-100 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-slate-900 text-white w-[52px] h-[52px] rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <span className="material-icons-round">tune</span>
        </button>
      </div>

      {/* --- SIDEBAR / DRAWER --- */}
      <aside
        className={`fixed inset-0 z-[200] lg:relative lg:z-0 lg:inset-auto transition-all duration-500 ease-in-out ${isFilterOpen ? "visible" : "invisible lg:visible"} w-full lg:w-72 space-y-6 lg:space-y-10`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${isFilterOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsFilterOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[80%] bg-[#fffafa] p-8 overflow-y-auto lg:overflow-visible lg:relative lg:right-auto lg:top-auto lg:h-auto lg:w-full lg:bg-transparent lg:p-0 transition-transform duration-500 shadow-2xl lg:shadow-none ${isFilterOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"} rounded-l-[3rem] lg:rounded-none`}
        >
          <div className="flex lg:hidden justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-slate-400"
            >
              <span className="material-icons-round">close</span>
            </button>
          </div>

          <div className="space-y-8">
            <div className="hidden lg:block bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Quick Search
              </h3>
              <div className="relative">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 text-sm">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Cari produk..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-pink-50/50 border-none focus:ring-2 focus:ring-pink-400 outline-none text-sm"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Price Level
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setActivePriceRange(range.value)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all text-left flex justify-between items-center ${activePriceRange === range.value ? "bg-pink-600 text-white shadow-md shadow-pink-200" : "text-slate-500 hover:bg-pink-50"}`}
                  >
                    {range.label}
                    {activePriceRange === range.value && (
                      <span className="material-icons-round text-xs">
                        check_circle
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Makeup Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${activeType === type ? "bg-slate-900 text-white shadow-lg" : "bg-pink-50 text-pink-600 hover:bg-pink-100"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- GRID PRODUK DENGAN LOADING INDICATOR --- */}
      <div className="flex-1 relative">
        {/* Loading Overlay (Hanya di area Card) */}
        {isLocalLoading && (
          <div className="absolute inset-0 z-10 bg-[#fffafa]/60 backdrop-blur-[2px] flex flex-col items-center justify-start pt-32 transition-all duration-300">
            <div className="flex flex-col items-center gap-4">
              {/* Logo Memantul (Ganti /logo.png dengan path logo Anda) */}
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <img src="/logo.png.png"></img>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-slate-900 font-black uppercase tracking-[0.3em] text-xs">
                  Loading
                </span>
                <div className="flex gap-1 mt-1">
                  <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-pink-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 transition-opacity duration-300 ${isLocalLoading ? "opacity-30" : "opacity-100"}`}
        >
          {filteredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="bg-white rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden border border-pink-50 transition-all duration-500 hover:shadow-xl">
                <div className="relative aspect-square bg-pink-50/30 overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy" //Lazy loading native
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                  />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/80 backdrop-blur-md px-2 md:px-3 py-1 rounded-full flex items-center shadow-sm">
                    <span className="material-icons-round text-yellow-500 text-[10px] md:text-sm mr-1">
                      star
                    </span>
                    <span className="text-[9px] md:text-[10px] font-black text-slate-800">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h4 className="font-bold text-slate-800 text-xs md:text-base mb-1 md:mb-2 truncate group-hover:text-pink-600 transition-colors">
                    {product.title}
                  </h4>
                  <div className="flex justify-between items-center">
                    <p className="text-sm md:text-xl font-black text-pink-600">
                      ${product.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="bg-slate-900 text-white p-1.5 md:p-2 rounded-lg md:rounded-xl hover:bg-pink-600 transition-colors active:scale-95"
                    >
                      <span className="material-icons-round text-[16px] md:text-sm">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!isLocalLoading && filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-pink-200 mb-4 italic font-black text-4xl md:text-6xl opacity-20 uppercase">
              No Match
            </div>
            <p className="text-slate-400 text-sm">
              Tidak ada produk yang sesuai.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
