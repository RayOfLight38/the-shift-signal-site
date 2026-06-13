/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1F1D1B",
        cream: "#EDE3D2",
        amber: "#D88B3A",
        burgundy: "#8B2D3A",
        teal: "#3F5E5E",
        pulse: "#3DD9FF",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "system-ui", "sans-serif"],
        editorial: ['"Newsreader"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
