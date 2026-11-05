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
        obsidian: "#090D16",
        slateSurface: "#111827",
        steelBorder: "#1F2937",
        emeraldAccent: {
          DEFAULT: "#10B981",
          hover: "#059669",
        },
        indigoAccent: "#6366F1",
        snow: "#F9FAFB",
        coolGray: "#9CA3AF",
      },
      fontFamily: {
        heading: ["var(--font-jakarta)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.14) 0%, rgba(99, 102, 241, 0.08) 40%, rgba(9, 13, 22, 0) 75%)",
      },
    },
  },
  plugins: [],
};

export default config;
