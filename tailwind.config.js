module.exports = {
  darkMode: "media",
  purge: {
    enabled: true,
    content: ["./src/**/*.tsx"],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Type-M"],
        bold: ["Type-DB"],
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
