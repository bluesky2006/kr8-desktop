/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "rubik-80s": ['"Rubik 80s Fade"', "Inter"],
      },
    },
  },
  plugins: [],
};
