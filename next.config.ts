import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    STEAM_API_KEY: process.env.STEAM_API_KEY,
  },
};

module.exports = nextConfig;

export default nextConfig;
