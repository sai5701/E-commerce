"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import { useCartStore } from "../store/page";

export default function OrderPlaced() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const { clearCart } = useCartStore();
  const [confettiKey, setConfettiKey] = useState(0);  

  useEffect(() => {
    setConfettiKey((prev) => prev + 1);  

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDone = () => {
    clearCart();
    router.push("/products");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      
  
      <Confetti key={confettiKey} numberOfPieces={100} recycle={false} />

      <Card className="p-8 text-center lg:px-30 shadow-xl border border-gray-200 rounded-2xl bg-white relative">
        
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 h-20 animate-bounce drop-shadow-lg" />
        </div>

        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mt-2 text-sm">Thank you for shopping with us!</p>

        <div className="mt-6 flex gap-4 justify-center">
          <Button onClick={handleDone} className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold rounded-lg">
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
}
