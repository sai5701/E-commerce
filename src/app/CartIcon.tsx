"use client";

import { ShoppingCart } from "lucide-react";
 
import Link from "next/link";
import { useCartStore } from "./store/page";

export default function CartIcon() {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="absolute    ">
      <Link href="/cart" className="relative">
        <ShoppingCart className="w-6 h-6 " />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1 py-0 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
