import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Add a new configuration object to override rules
    // This targets files that ESLint would normally check
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"], // Apply to common code files
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // <-- Add this line to disable the rule
    },
  },
];

export default eslintConfig;