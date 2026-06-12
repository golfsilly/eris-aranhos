import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  output: "standalone",
  compress: true,
  poweredByHeader: false,

  devIndicators: {},

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "192.168.4.30",
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
    ],
  },

  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.4.30"],
};

export default nextConfig;
