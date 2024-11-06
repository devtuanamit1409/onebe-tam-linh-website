/** @type {import('next').NextConfig} */

import withNextIntl from "next-intl/plugin";

const nextIntlConfig = withNextIntl();
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    URL_API: process.env.URL_API,
    DEV_TOKEN: process.env.DEV_TOKEN,
  },
};

export default nextIntlConfig(nextConfig);
