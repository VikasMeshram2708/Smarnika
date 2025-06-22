import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  // External packages for server components
  serverExternalPackages: ["@prisma/client"],

  // Webpack optimization for large strings
  webpack: (config, { dev, isServer }) => {
    // Optimize caching for large strings
    if (!dev) {
      config.cache = {
        ...config.cache,
        type: "filesystem",
        compression: "gzip",
        maxAge: 172800000, // 2 days
      };
    }

    // Optimize module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

export default nextConfig;
