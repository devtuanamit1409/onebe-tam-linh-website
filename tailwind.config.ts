import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: "360px",
      tablet: "744px",
      laptop: "1024px",
      desktop: "1440px",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      container: {
        center: true,
        padding: "2rem",
        screens: {
          sm: "360px",
          md: "744px",
          lg: "1024px",
          xl: "1440px",
        },
      },

      aspectRatio: {
        "4/3": "4 / 3",
        "1.55": "1.55",
        "6/5": "6 / 5",
      },
    },
  },
  plugins: [],
};
export default config;
