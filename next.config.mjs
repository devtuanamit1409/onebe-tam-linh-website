/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
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
