import forms from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.jsx",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Source Code Pro", "sans-serif"],
      },
    },
  },
  plugins: [forms],
};
