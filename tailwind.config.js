/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#070709",
          50: "#18181f",
          100: "#14141a",
          200: "#101015",
          300: "#0c0c10",
          400: "#09090c",
          500: "#070709",
          600: "#050507",
          700: "#030304",
          800: "#020203",
          900: "#000000",
        },
        surface: {
          DEFAULT: "#0f0f14",
          card: "#121218",
          hover: "#181822",
          border: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(255, 255, 255, 0.18)",
        },
        silver: {
          light: "#f1f5f9",
          DEFAULT: "#cbd5e1",
          dark: "#64748b",
        },
        accent: {
          electric: "#38bdf8",
          purple: "#818cf8",
          silver: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          "monospace",
        ],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
      },
      keyframes: {
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "pulse-slow": "pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
