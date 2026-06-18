import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: { import: importPlugin },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'] },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    },
    rules: {
      'import/no-unresolved': ['error', { caseSensitive: true, caseSensitiveStrict: true }],
      'no-var': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-multiple-empty-lines': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
]);
