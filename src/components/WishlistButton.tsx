"use client";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton({ product }: { product: any }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  return (
    <button 
      onClick={() => toggleWishlist(product)}
      className={`px-8 py-5 rounded-[2rem] border transition-all flex items-center justify-center ${
        active 
        ? "bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-200" 
        : "border-pink-200 text-pink-600 hover:bg-pink-50"
      }`}
    >
      <span className="material-icons-round">
        {active ? "favorite" : "favorite_border"}
      </span>
    </button>
  );
}