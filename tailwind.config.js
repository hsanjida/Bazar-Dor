/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bazar: {
          bg: "#f0f5f0",
          card: "#fafcfa",
          primary: "#05893e",
          "primary-hover": "#047f39",
          "primary-light": "#f3fbf4",
          text: "#1d271f",
          muted: "#526255",
          border: "#e1e9e2",
          up: "#d03739",
          "up-bg": "#fef2f2",
          down: "#1a9951",
          "down-bg": "#f0fdf4",
        },
      },
      fontFamily: {
        bengali: ["'Hind Siliguri'", "sans-serif"],
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
