import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C99A45",
          light: "#E2B85B",
          dark: "#B48738",
        },
        blue: {
          light: "#8FAFC1",
          deep: "#304B5A",
        },
        night: "#171717",
        ivory: "#F4F0E7",
        stone: {
          DEFAULT: "#D6D0C4",
          dark: "#8A857C",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        'clay': '8px 8px 16px rgba(23, 23, 23, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.8)',
        'clay-hover': '12px 12px 24px rgba(23, 23, 23, 0.12), -6px -6px 16px rgba(255, 255, 255, 0.9)',
        'clay-dark': '8px 8px 16px rgba(0, 0, 0, 0.35), -4px -4px 12px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
