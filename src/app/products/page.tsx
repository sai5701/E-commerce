"use client"

import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import CartIcon from "../CartIcon"
import { useCartStore } from "../store/page"

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const fetcher = (url: string): Promise<Product[]> => fetch(url).then((res) => res.json())

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { addToCart } = useCartStore()
  const { data: products, error, isLoading } = useSWR<Product[]>("https://fakestoreapi.com/products", fetcher)

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-red-500 text-lg font-semibold">Failed to load products</p>
      </div>
    )
  }

  const filteredProducts =
    products?.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())) || []

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md shadow-md z-50 px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl lg:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          ShopNow
        </h1>
        <div className="flex items-center gap-4 w-full max-w-md z-50">
          <div className="relative hidden lg:block md:block sm:block flex-1 lg:mr-5 sm:mr-5 md:mr-5 ">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for products..."
              className="pl-10 py-2 text-lg rounded-full border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition-all bg-gray-50 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="absolute right-10 top-4 color-white bg-white z-50">
            <CartIcon />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-24 pb-12 px-6">
        <div className="text-center mb-10">
          <h1 className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Explore Our Collection
          </h1>
          <p className="text-sm lg:text-lg text-gray-600 mt-2">
            Discover high-quality fashion products at unbeatable prices.
          </p>
        </div>

        {filteredProducts.length === 0 && !isLoading ? (
          <div className="text-center text-gray-500 text-xl font-semibold mt-10">No products available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {isLoading
              ?  
                Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                    <CardHeader className="relative w-full h-[220px]">
                      <Skeleton className="h-[220px] w-full rounded-t-2xl" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                      <Skeleton className="h-4 w-full mt-2" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </CardFooter>
                  </Card>
                ))
              :  
                filteredProducts.map((product) => (
                  <div key={product.id} className="w-full">
                    <Link href={`/products/${product.id}`} className="block">
                      <Card className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white transform transition-transform hover:shadow-2xl">
                        <CardHeader className="relative w-full h-[220px]">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-contain p-6"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                          />
                        </CardHeader>
                        <CardContent>
                          <CardTitle className="text-lg font-semibold truncate">{product.title}</CardTitle>
                          <p className="text-xl font-bold text-blue-600 mt-2">${product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                        </CardContent>
                        <CardFooter>
                        <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white text-sm font-medium cursor-pointer py-3 rounded-lg transition-all active:scale-95"
                        onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const button = e.currentTarget;
                        button.style.opacity = "0.5";

                        setTimeout(() => {
                          button.style.opacity = "1";
                        }, 200);

                        addToCart({
                          id: product.id.toString(),
                          title: product.title,
                          price: product.price,
                          image: product.image,
                        });
                        }}
                        >
                        <ShoppingCart className="h-4 w-4 cursor-pointer" /> Add to Cart
                        </Button>


                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                ))}
          </div>
        )}
      </div>
    </>
  )
}

