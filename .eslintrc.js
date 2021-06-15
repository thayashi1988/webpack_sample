module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    // "plugin:prettier/recommended"
  ],
  globals: {},
  rules: {
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-var': 1, // varでの宣言をNG
    eqeqeq: 2, // 等価演算子を厳密等価演算子のみを許可
    'no-undef': 2,
    'no-console': [
      // console.logのみ許可
      'warn',
      {
        allow: ['log'],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
    quotes: [
      //シングルクォーテーションのみを許可
      'warn',
      'single',
      {
        avoidEscape: true, //シングルクォーテーション内のエスケープを許可
        allowTemplateLiterals: true, //テンプレートリテラル内のエスケープを許可
      },
    ],
  },
};
