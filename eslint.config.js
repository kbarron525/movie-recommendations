import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      react,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React specific rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'react/jsx-closing-tag-location': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-curly-spacing': ['error', 'never'],
      'react/jsx-equals-spacing': ['error', 'never'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-key': 'error',
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-literals': 'off',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-sort-props': 'off',
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
      'react/jsx-wrap-multilines': 'error',
      
      // React component rules
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-sort-default-props': 'off',
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-multi-comp': 'off',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/prefer-es6-class': 'error',
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off', // Using TypeScript instead
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/require-default-props': 'off', // Using TypeScript instead
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'off',
      'react/sort-prop-types': 'off',
      'react/state-in-constructor': 'off',
      'react/static-property-placement': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',
      
      // JSX Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-tabindex': 'error',
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
      
      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
])
