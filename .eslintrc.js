const path = require("path");
module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"standard",
		"plugin:react/recommended",
		"plugin:import/recommended",
		"plugin:prettier/recommended",
		"prettier/standard",
	],
	plugins: ["react", "@typescript-eslint"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		"jest": true
	},
	rules: {
		"no-console": "off",
		"react/display-name": "off",
		"react/jsx-boolean-value": "error",
		"react/no-redundant-should-component-update": "error",
		"react/no-typos": "error",
		"react/no-unused-state": "error",
		"react/no-unused-prop-types": "error",
		"react/no-deprecated": "error",
		"react/no-direct-mutation-state": "error",
		"react/no-string-refs": "warn",
		"prefer-default-export": "off",
		"import/default": "off",
		"import/namespace": "off",
		"import/named": "off",
		"import/no-duplicates": "error",
		// https://github.com/bradzacher/eslint-plugin-typescript/issues/2
		"no-unused-vars": "off",
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".ts", ".tsx"],
			},
		},
	},
};
