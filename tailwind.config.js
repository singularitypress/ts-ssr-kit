module.exports = {
  darkMode: "media",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "theme-brand": "#efa118",
        "theme-base": "#3f3d3d",
        "theme-accent": "#faf9f5",
      },
    },
    screens: {
      sm: { min: "576px", max: "767.98px" },
      md: { min: "768px", max: "991.98px" },
      lg: { min: "992px", max: "1199.98px" },
      xl: { min: "1200px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
