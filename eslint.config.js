const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2021,
      },
    },
  },
  {
    files: ["tests/**"],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
  },
];
