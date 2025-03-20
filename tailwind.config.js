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
        templateHeading: ["Lobster", "sans-serif"],
      },
    },
  },
  plugins: [],
};
