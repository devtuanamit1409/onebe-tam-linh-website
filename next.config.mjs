/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    URL_API: process.env.URL_API,
    DEV_TOKEN: process.env.DEV_TOKEN,
  },
};

export default nextConfig;
