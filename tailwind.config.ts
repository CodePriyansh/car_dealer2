import { Rajdhani } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors:{
        primary:"#EF6E0B",
        secondary:"#0059A3",
        greyy:'rgba(0, 0, 0, 0.3)',
        para:'rgba(0, 0, 0, 1)'
      },
      fontSize: {
        48:"48"
      },
    },
  },
  plugins: [],
};
export default config;
