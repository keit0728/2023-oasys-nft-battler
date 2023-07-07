/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21262d",
        primaryBorder: "#3a3f47",
        primaryHover: "#30363d",
        primaryHoverBorder: "#8b949e",
        secondary: "#238636",
        secondaryBorder: "#3a3f47",
        secondaryHover: "#2ea043",
        secondaryHoverBorder: "#3a3f47",
        error: "#B00020",
        headerColor: "#010409",
        bgColor: "#0D1117",
        txtWhite: "#E6EDF3",
      },
    },
  },
  plugins: [],
};
