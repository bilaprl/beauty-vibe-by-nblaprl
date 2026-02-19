"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function CartBadge() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-pink-500 text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-bounce-short">
      {totalItems}
    </span>
  );
}