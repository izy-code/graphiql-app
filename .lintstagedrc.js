import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const lintStagedConfig = {
  '*.{html}': 'prettier --check',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{scss,css}': 'stylelint --quiet-deprecation-warnings',
};

export default lintStagedConfig;
