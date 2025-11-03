import js from '@eslint/js'
import globals from 'globals'
export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser },
      parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' }
    },
    rules: {
      ...js.configs.recommended.rules,
      'indent': ['error', 2], 'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'], 'semi': ['error', 'never'],
      'eqeqeq': 'error', 'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off'
    }
  }
]
