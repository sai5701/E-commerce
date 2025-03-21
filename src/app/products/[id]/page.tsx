import { getProduct, getProducts } from '@/lib/api';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/app/AddToCartButton';
import CartIcon from '@/app/CartIcon';
 

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return {
    title: `${product.title} | Modern E-commerce`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="mx-4 min-h-screen py-5 relative">
      <div className="absolute top-5 right-10 ">
        <Link href="/cart" className='bg-black'>
        <CartIcon />
        </Link>
      </div>

      <Link href="/products">
        <button className="mb-3 border  rounded-lg px-2 py-1 cursor-pointer hover:bg-gray-200">← Back to Products</button>
      </Link>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative flex justify-center items-center">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="object-contain rounded-lg"
                priority
              />
            </div>
 
            <div className="space-y-6">
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold">{product.title}</h1>

              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>

              <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>

              <div>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

             
              <AddToCartButton product={product} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
