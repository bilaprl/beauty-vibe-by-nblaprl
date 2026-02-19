"use client";
import { useWishlist } from "@/context/WishlistContext";
import { useEffect, useState } from "react";

export default function WishlistBadge() {
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || wishlist.length === 0) return null;

  return (
    <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full border border-white"></span>
  );
}