import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  
  devIndicators: {},

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
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
    "172.16.40.234",
  ],
};

export default nextConfig;
