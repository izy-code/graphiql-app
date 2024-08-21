module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'react',
    'react-refresh',
    'react-hooks',
    'react-compiler',
    'prettier',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/jsx-runtime',
    'next/core-web-vitals',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.cjs', 'vitest.config.ts', 'lint-staged.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'react-compiler/react-compiler': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-void': ['error', { allowAsStatement: true }],
    'react-refresh/only-export-components': ['off'],
    'no-param-reassign': ['error', { props: false }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'import/no-absolute-path': 'off',
    'import/extensions': 'off',
    'react/require-default-props': 'off',
    'react/prefer-stateless-function': 'off',
    'react/button-has-type': 'off',
    curly: ['error', 'all'],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          constructors: 'off',
        },
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowedNames: ['makeStore'],
      },
    ],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          returns: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['./**/*.+(cjs|js|mjs)'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
    {
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['', './public'],
          ['@', './src'],
        ],
        extensions: ['.js', '.tsx', '.ts', '.json'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  noInlineConfig: true,
};
