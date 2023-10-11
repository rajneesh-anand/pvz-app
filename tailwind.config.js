/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: "#FFC000",
      },
      boxShadow: {
        bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
