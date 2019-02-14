module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "import/prefer-default-export": "off",
    "indent": ["error", 4],
    "no-console": "off",
    "linebreak-style": ["error", "windows"],
    "no-underscore-dangle": ["error", { "allow": ["_id"]}]
}
};
