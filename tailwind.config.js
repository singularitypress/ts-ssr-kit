module.exports = {
  purge: {
    enabled: true,
    content: ["./src/client/**/*.tsx"],
  },
  theme: {
    extend: {},
    screens: {
      sm: { min: "576px", max: "767.98px" },
      md: { min: "768px", max: "991.98px" },
      lg: { min: "992px", max: "1199.98px" },
      xl: { min: "1200px" },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
