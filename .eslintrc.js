module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
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
    "space-before-function-paren": ["error", {
      anonymous: "always",
      named: "always",
      asyncArrow: "always",
    }],
    "@typescript-eslint/explicit-member-accessibility": 2,
    "no-use-before-define": [0],
    "@typescript-eslint/no-use-before-define": [1],
  },
};
