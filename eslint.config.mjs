import globals from "globals";
import pluginJs from "@eslint/js";
import TSeslint from "typescript-eslint";


export default [
    {
        languageOptions: {
            globals: globals.browser,
        },
    },
    pluginJs.configs.recommended,
    ...TSeslint.configs.recommended,
];
