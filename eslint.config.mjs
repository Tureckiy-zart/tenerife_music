import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "dist/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@next/next": next,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },
  ...tseslint.configs.recommended,
];
