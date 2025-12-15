import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Bunlar yüzlerce kural getiriyor...
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    rules: {
      // --- TEMEL ESLINT (js.configs.recommended) KURALLARINI KAPAT ---
      "no-alert": "off",
      "no-console": "off",
      "no-debugger": "off",
      "no-unused-vars": "off", // Kullanılmayan değişkenler
      "prefer-const": "off", // 'let' yerine 'const' uyarısı (sizin örneğinizdeki 'user' hatasını çözer)
      "eqeqeq": "off", // Üçlü eşitlik (===) zorunluluğunu kapatır
      "semi": "off", // Noktalı virgül zorunluluğunu kapatır
      "no-mixed-spaces-and-tabs": "off",
      "no-useless-escape": "off",
      // Tüm kural setini listelemek imkansız olduğundan, en sık karşılaşılanları kapattık.
      
      // --- TYPESCRIPT ESLINT KURALLARINI KAPAT ---
      "@typescript-eslint/no-explicit-any": "off", // Zaten kapalıydı
      "@typescript-eslint/no-unused-vars": "off", // Zaten kapalıydı
      "@typescript-eslint/ban-ts-comment": "off", // @ts-ignore vb. kullanımını serbest bırakır
      "@typescript-eslint/no-non-null-assertion": "off", // Non-null assertion (!) kullanımını serbest bırakır
      "@typescript-eslint/explicit-module-boundary-types": "off", // Export edilen fonksiyonlarda tip zorunluluğunu kaldırır
      
      // --- REACT/REACT HOOKS KURALLARINI KAPAT ---
      // reactHooks.configs["recommended-latest"]'den gelen kurallar:
      "react-hooks/rules-of-hooks": "off", // Hooks kurallarını kapatır
      "react-hooks/exhaustive-deps": "off", // useEffect bağımlılık kontrolünü kapatır
      // reactRefresh.configs.vite'den gelen kurallar:
      "react-refresh/only-export-components": "off", // Fast Refresh ile ilgili uyarıları kapatır

      // TypeScript'in strict mode'unun getirdiği kurallardan biri olan:
      "@typescript-eslint/strict-boolean-expressions": "off" 
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);