/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f43f5e",
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
        },
        surface: "#ffffff",
        background: "#fdf2f8",
        "text-primary": "#1e1b2e",
        "text-secondary": "#6b7280",
        "text-muted": "#9ca3af",
        "ai-purple": "#8b5cf6",
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f97316",
      },
      fontFamily: {
        sans: ["System"],
      },
      borderRadius: {
        card: "20px",
        button: "14px",
        input: "14px",
      },
    },
  },
  plugins: [],
};
