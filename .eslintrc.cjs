module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    "@vue/eslint-config-prettier"
  ],
  plugins: ['only-error'],
  rules: {
    curly: ['error', 'all'],
    'require-await': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'prettier/prettier': 'error',
    'vue/no-v-html': 'off',
    'vue/valid-define-props': 'error',
    'vue/valid-define-emits': 'error',
    'vue/no-export-in-script-setup': 'error',
    'vue/script-setup-uses-vars': 'warn',
    'vue/valid-v-memo': 'error',
    'vue/require-default-prop': 'off',
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/block-tag-newline': 'error',
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/no-empty-component-block': 'error',
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: true,
      },
    ],
    'vue/no-bare-strings-in-template': [
      'error',
      {
        attributes: {
          '/.+/': [
            'title',
            'aria-label',
            'aria-placeholder',
            'aria-roledescription',
            'aria-valuetext',
          ],
          input: ['placeholder'],
        },
        directives: ['v-text'],
      },
    ],
  }
}
