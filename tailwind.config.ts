import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens (map to chartreuse palette)
        // Examples of usage (Tailwind classes):
        // - Page hero background: `bg-hero_bg`
        // - Card surface: `bg-surface`
        // - Alternate surface: `bg-surface_alt`
        // - Muted accents / small badges: `text-muted` or `bg-muted/10`
        // - Accent (hover / highlight): `bg-accent` or `text-accent`
        // - Primary (buttons, CTAs): `bg-primary text-white`
        // - Primary hover: `hover:bg-accent`
        // - Primary active: `active:bg-primary_dark`
        // - Darker primary (strong accents): `bg-primary_darker`
        // - Main content text on light surfaces: `text-text_primary`
        // - Focus ring on inputs/buttons: `focus:ring-focus`
        // - Default borders: `border-border_default`
        // Also available directly as `chartreuse-500` (or other shades) when needed.

        hero_bg: "#f4fee7",
        // Main surface color for cards / panels
        surface: "#e6fdca",
        // Alternate surface (slightly stronger)
        surface_alt: "#cffb9b",
        // Muted / subtle accent
        muted: "#adf561",
        // Accent color for hover states or highlights
        accent: "#80e718",
        // Primary brand color (use for primary buttons)
        primary: "#6ed012",
        // Darker variants for active states
        primary_dark: "#53a60a",
        primary_darker: "#407e0d",
        // Primary text color (dark tone)
        text_primary: "#2e5413",
        // Focus / ring color
        focus: "#adf561",
        // Default border color
        border_default: "#80e718",

        // Expose the full chartreuse palette for direct usage when you need a specific shade
        // Example: `bg-chartreuse-300`, `text-chartreuse-900`, `border-chartreuse-400`
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
export default config;
