"use client";

import { useRouter } from "next/navigation";  
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../store/page";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const router = useRouter();  

  const handleCheckout = () => {
    router.push("/order-placed");  
  };

  return (
    <div className=" px-6 pt-5 ">
      <span className="absolute">
        <Link href="/products">
          <button className="mb-3 border rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200">
            ← Back to Products
          </button>
        </Link>
      </span>

      <h1 className="text-xl lg:text-4xl mt-15 lg:mt-0 lg:mb-5 font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-center text-gray-800">  Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-500">Browse our products and add items to your cart.</p>
          <Link href="/products">
            <Button className="mt-6 px-6 py-3 text-lg cursor-pointer">Go to Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 overflow-y-auto h-[80vh] p-4">
            {items.map((item) => (
              <Card key={item.id} className="grid grid-cols-1 lg:grid-cols-3 items-center p-4 shadow-md rounded-lg border border-gray-200">
                <div className="relative w-24 h-24 items-center">
                  <Image src={item.image} alt={item.title} fill className="rounded-md" />
                </div>
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="px-3 py-1 cursor-pointer"
                    >
                      -
                    </Button>
                    <span className="text-lg font-bold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 cursor-pointer"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-6 h-6 text-white" />
                </Button>
              </Card>
            ))}
          </div>
 
          <Card className="p-6 shadow-lg border border-gray-200 rounded-lg h-fit">
            <h2 className="text-2xl font-bold   text-gray-800">Order Summary</h2>
            <div className="h-80 overflow-y-auto    px-4">
  {items.map((item) => (
    <p key={item.id} className="flex justify-between text-gray-700 text-lg">
      {item.title} (x{item.quantity}) <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
    </p>
  ))}
</div>

 
            <p className="text-xl flex justify-end font-semibold text-gray-900   border-t pt-2">
              Total: <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
            </p>
 
            <Button onClick={()=> router.push("/order-placed")} className="w-full   px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white cursor-pointer">
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
