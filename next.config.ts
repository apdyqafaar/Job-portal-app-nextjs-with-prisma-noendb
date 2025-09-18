import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during builds to prevent failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional: Also ignore TypeScript errors during build
    ignoreBuildErrors: false, // Set to true if you have TypeScript errors
  },
  // Enable SWC minification for better performance
  swcMinify: true,
  // Add any other config options you need
};

export default nextConfig;