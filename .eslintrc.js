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
    'react/prop-types': 0,
    'react/prefer-stateless-function': 0,
    'react/state-in-constructor': 0,
    'react/require-default-props': 0,
    'react/no-unused-state': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-boolean-value': 0,
    'react/button-has-type': 0,
    'jsx-quotes': ['error', 'prefer-single'],
    'jsx-a11y/label-has-associated-control': [ 2, {'depth': 3,}],
    'arrow-parens': 0,
    'semi': 0,
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
