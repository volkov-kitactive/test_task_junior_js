/* eslint-disable no-undef */
/** Eslint шёл вместе с Vite, а я и не против) */
module.exports = {
  env: { browser: true, es2020: true },
  extends: [],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // 'react-refresh/only-export-components': 'warn',
  },
}
