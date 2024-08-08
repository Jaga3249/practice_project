/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["static.vecteezy.com", "cdn.dummyjson.com"], // Added the domain for external images
  },
};

export default nextConfig;
