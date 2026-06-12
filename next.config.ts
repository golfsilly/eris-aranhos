import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,

  devIndicators: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "192.168.4.30",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.res.cloudinary.com",
      },
    ],
  },

  env: {
    NEXT_PUBLIC_APP_VERSION: "0.1.0",
  },

  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.1.116",
    "172.16.40.147",
    "10.212.134.10",
  ],
};

export default nextConfig;
