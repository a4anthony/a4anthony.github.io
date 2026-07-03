import forms from "@tailwindcss/forms";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.jsx",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        ground: "#101A1E",
        panel: "#16242A",
        steam: "#E9E4D8",
        faded: "#90A5A6",
        amber: "#E3A857",
        live: "#5BC98C",
      },
      borderColor: {
        hairline: "rgba(233, 228, 216, 0.14)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [forms],
};
