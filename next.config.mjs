/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
