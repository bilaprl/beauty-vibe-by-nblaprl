"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-slate-200 flex items-center justify-center group ${
        isAdded
          ? "bg-green-500 text-white scale-95"
          : "bg-slate-900 text-white hover:bg-pink-600"
      }`}
    >
      {isAdded ? "Added to Bag!" : "Add to Cart"}
      <span className="material-icons-round ml-2 group-hover:rotate-12">
        {isAdded ? "check" : "local_mall"}
      </span>
    </button>
  );
}
