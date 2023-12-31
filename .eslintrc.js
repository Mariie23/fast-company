module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    "multiline-ternary": ["off"],
    indent: "off",
  },
}
