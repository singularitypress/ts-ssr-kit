module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-undef": 0,
    "no-unused-vars": 0,
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "arrow-parens": ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "always",
        asyncArrow: "always",
      },
    ],
    "@typescript-eslint/explicit-member-accessibility": 2,
    "no-use-before-define": [0],
    "@typescript-eslint/no-use-before-define": [1],
  },
};
