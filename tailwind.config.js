/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Add this line to be explicit
  ],
  theme: {
    extend: {
      fontFamily: {
        templateHeadings: ["AmoresaAged", "sans-serif"],
        templateBody: ["Alice", "serif"],
      },
      colors: {
        pricingColor: "#000080",
        primaryColor: "#563B0E",
      },
    },
  },
  plugins: [],
};
