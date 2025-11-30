const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hero_bg: "#f4fee7",
        surface: "#e6fdca",
        surface_alt: "#cffb9b",
        gradient_max: "#aae660ff",
        muted: "#adf561",
        accent: "#80e718",
        primary: "#6ed012",
        primary_dark: "#53a60a",
        primary_darker: "#407e0d",
        text_primary: "#2e5413",
        focus: "#adf561",
        border_default: "#80e718",
        chartreuse: {
          50: '#f4fee7',
          100: '#e6fdca',
          200: '#cffb9b',
          300: '#adf561',
          400: '#80e718',
          500: '#6ed012',
          600: '#53a60a',
          700: '#407e0d',
          800: '#356410',
          900: '#2e5413',
          950: '#152f04',
        }
      },
    },
  },
  plugins: [nextui()],
};
