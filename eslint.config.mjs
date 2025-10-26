import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Use Next.js' core-web-vitals flat config then apply project overrides.
// Avoid using FlatCompat or any compat helpers — they create circular
// structures when combined with next's flat exports.
export default defineConfig([
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "no-unused-vars": "off",
    },
  },
]);
