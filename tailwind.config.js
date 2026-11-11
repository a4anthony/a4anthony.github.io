import forms from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,vue}"],
  theme: {
    extend: {
      colors: {
        ground: "#14112A",
        panel: "#1E1A3A",
        raised: "#29244F",
        chalk: "#F1EEFC",
        mist: "#A8A2C8",
        elite: "#7CF29A",
        good: "#F4D35E",
        fair: "#C2BDDC",
        loss: "#FF8A7A",
        line: "rgba(241, 238, 252, 0.1)",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "Arial Narrow", "Arial", "sans-serif"],
        sans: ['"Barlow"', "system-ui", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [forms],
};
