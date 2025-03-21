"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "./store/page";
 

export default function AddToCartButton({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Button size="lg" className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white text-sm" onClick={() => addToCart(product)}>
      Add to Cart
    </Button>
  );
}
