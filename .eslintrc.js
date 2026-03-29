module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.js', 'node_modules', 'build'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    'no-unused-vars': 'warn',
  },
};
