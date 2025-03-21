/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",  
      "yourfashionstore.com",  
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

module.exports = nextConfig;
