import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";
import pluginImport from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      import: pluginImport,
    },
    rules: {
      "import/extensions": [
        "error",
        "ignorePackages",
        { ts: "never", js: "never" },
      ],
      "import/no-unresolved": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".ts", ".js"],
        },
      },
    },
  },
];
