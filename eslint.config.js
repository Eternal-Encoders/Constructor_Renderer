import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(

  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic/ts': stylisticTs,
      '@stylistic/jsx': stylisticJsx,
      '@stylistic/js': stylisticJs
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      '@stylistic/js/max-len': ["error", { "code": 120 }],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/jsx/jsx-indent': ['error', 2],
    },
  },
);
