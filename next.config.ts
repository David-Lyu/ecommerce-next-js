import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: "custom",
    loaderFile: "./src/lib/loader/imageLoader.js",
  },
};

export default nextConfig;
