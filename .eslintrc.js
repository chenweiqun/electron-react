module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
  },
  plugins: [
    "react"
  ],
  'rules': {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
