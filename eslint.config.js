import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'always',
          js: 'always',
        }
      ],
      'import/no-unresolved': 'error'
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
]
