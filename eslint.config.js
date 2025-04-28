import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.ts"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.ts"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
    }
  }
]);