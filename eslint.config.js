import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["**/*.ts"],
    rules: {
      "prettier/prettier": "error",
    },
  },
];
