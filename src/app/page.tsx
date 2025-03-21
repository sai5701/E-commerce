"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import React from "react";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}
export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products: Product[] = [
  {
    title: "Summer Collection",
    link: "https://yourfashionstore.com/summer-collection",
    thumbnail:
      "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg",
  },
  {
    title: "Casual T-Shirts",
    link: "https://yourfashionstore.com/t-shirts",
    thumbnail:
      "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg",
  },

  {
    title: "Men's Formal Shirts",
    link: "https://yourfashionstore.com/formal-shirts",
    thumbnail:
      "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
  },
  {
    title: "Women's Casual Dresses",
    link: "https://yourfashionstore.com/womens-dresses",
    thumbnail:
      "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
  },
  {
    title: "Denim Jackets",
    link: "https://yourfashionstore.com/denim-jackets",
    thumbnail:
      "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg",
  },
  {
    title: "Jeans Collection",
    link: "https://yourfashionstore.com/jeans",
    thumbnail:
      "https://images.pexels.com/photos/3755704/pexels-photo-3755704.jpeg",
  },
  {
    title: "Women's Ethnic Wear",
    link: "https://yourfashionstore.com/ethnic-wear",
    thumbnail:
      "https://images.pexels.com/photos/415689/pexels-photo-415689.jpeg",
  },
  {
    title: "Party Wear Dresses",
    link: "https://yourfashionstore.com/partywear",
    thumbnail:
      "https://images.pexels.com/photos/994522/pexels-photo-994522.jpeg",
  },

  {
    title: "Winter Coats",
    link: "https://yourfashionstore.com/winter-coats",
    thumbnail:
      "https://images.pexels.com/photos/1648373/pexels-photo-1648373.jpeg",
  },
  {
    title: "Men's Traditional Wear",
    link: "https://yourfashionstore.com/mens-traditional",
    thumbnail:
      "https://images.pexels.com/photos/3228213/pexels-photo-3228213.jpeg",
  },
  {
    title: "Stylish Blazers",
    link: "https://yourfashionstore.com/blazers",
    thumbnail:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
  },
  {
    title: "Gym & Activewear",
    link: "https://yourfashionstore.com/activewear",
    thumbnail:
      "https://images.pexels.com/photos/1368322/pexels-photo-1368322.jpeg",
  },
];
