module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    React: 'writable',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prop-types': [0],
    'jsx-quotes': ['error', 'prefer-single'],
    'semi': 0,
    'jsx-a11y/label-has-associated-control': [ 2, {'depth': 3,}],
  },
  settings: {
    'import/resolver': {
      'node': {
        'paths': ['./']
      }
    },
    react: {
      'pragma': 'React',
      'version': '16.9.0'
    }
  },
  parser: 'babel-eslint',
};
