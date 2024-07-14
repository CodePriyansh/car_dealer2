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
        primaryLight:"rgba(239, 110, 11, 0.2)",
        secondary:"#0059A3",
        border_light:"rgba(0, 0, 0, 0.1)",
        greyy:'rgba(0, 0, 0, 0.3)',
        line:'rgba(0, 0, 0, 0.2)',
        para:'rgba(0, 0, 0, 1)',
        subHeading:'rgba(0, 0, 0, 0.5)',
        'border-primary':'#0000001A',
        'f7f7f7':'#F7F7F7',
        'lightpara':'rgba(0, 0, 0, 0.6)',
        availGreen: "#0D9212",
        soldRed: "#FA2D2D",
        sectionLine: "#C4C4C4"
      },
      fontSize: {
        48:"48",
        18:'18',
        20:"20",
        24:'24',
        14:'14',
        12:'12',
      },
      screens: {
        md1: "930px",
        "3xl": "1660px",
        "4xl": "1850px",
        "last-screen": "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
