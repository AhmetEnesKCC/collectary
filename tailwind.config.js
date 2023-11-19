/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "level-1": "#333639",
        "level-2": "#07040D",
        "level-3": "#3C3F41",
        "level-4": "#404346",
        "level-5": "#44474A",
        "level-6": "#494B4E",
        "level-7": "#4D4F52",
        "level-8": "#515456",
        "primary-1": "#53419B",
        "primary-2": "#5A499F",
        "primary-3": "#6151A3",
        "secondary-1": "#4C70B3",
        "secondary-2": "#5D7DBA",
        "secondary-3": "#718DC3",
        metamask: "#F5841F",
      },
    },
  },
  plugins: [],
};
