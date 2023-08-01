module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 2021
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      'warn',
      {
        endOfLine: 'auto',
        useTabs: false,
        trailingComma: 'none',
        semi: true,
        tabWidth: 2,
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true
      }
    ]
  }
};
