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
        obsidian: "#070d14",
        slateSurface: "#0e1724",
        steelBorder: "#1b2a3d",
        emeraldAccent: {
          DEFAULT: "#00b231",
          hover: "#008f27",
          light: "#33cf5e",
        },
        indigoAccent: {
          DEFAULT: "#2fa4e3",
          hover: "#1e88c2",
        },
        snow: "#f7fafc",
        coolGray: "#94a6b8",
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(0, 178, 49, 0.15) 0%, rgba(47, 164, 227, 0.10) 40%, rgba(7, 13, 20, 0) 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
