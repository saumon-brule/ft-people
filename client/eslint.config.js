import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: [".svelte"],
				ecmaVersion: "latest",
				sourceType: "module",
				tsconfigRootDir: process.cwd()
			}
		},
		plugins: {
			svelte
		},
		rules: {
			...svelte.configs.recommended.rules
		}
	},
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				sourceType: "module"
			},
			globals: globals.browser
		}
	},
	{
		ignores: ["dist/**", "node_modules/**"],
		rules: {
			indent: ["error", "tab"],
			semi: ["error", "always"],
			"no-trailing-spaces": "error",
			"eol-last": ["error", "always"],
			quotes: ["error", "double"],
			"brace-style": ["error", "1tbs"],
			"comma-dangle": ["error", "never"],
			"object-curly-spacing": ["error", "always"],
			"comma-spacing": ["error", { before: false, after: true }],
			"key-spacing": ["error", { beforeColon: false, afterColon: true }]
		}
	}
]);
