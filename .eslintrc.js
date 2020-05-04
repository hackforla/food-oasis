module.exports = {
  globals: {
    __PATH_PREFIX__: true,
    gtag: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'prettier/react',
    'standard-react',
    'react-app',
    'plugin:eslint-plugin-import/warnings',
    'plugin:eslint-plugin-import/errors',
  ],
  plugins: ['react'],
  env: {
    mocha: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  rules: {
    'prettier/prettier': ['error', {
      semi: false,
      singleQuote: true,
      jsxBracketSameLine: false,
      bracketSpacing: true,
      trailingComma: "all",
      printWidth: 80,

    }, {
      usePrettierrc: false
    }],
    radix: 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'never'],
    'import/no-webpack-loader-syntax': 0,
    'no-case-declarations': 0,
    'no-throw-literal': 0,
    'array-bracket-spacing': 0,
    'no-console': 0,
    'no-redeclare': 1,
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'comma-spacing': 2,
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'key-spacing': [2, { beforeColon: false }],
    'object-curly-spacing': ['error', 'always'],
    'import/no-unresolved': 0,
    'import/no-named-as-default-member': 0,
    'react/jsx-indent': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-no-bind': 0,
    'react/self-closing-comp': 0,
    'import/named': 0,
    'default-case': 0,
    'react/prop-types': 1,
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    quotes: [2, 'single', { avoidEscape: true }],
  },
}
