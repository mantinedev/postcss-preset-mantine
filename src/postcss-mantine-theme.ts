import type { Root } from 'postcss';
const getVariable = require('./css-variables');

const regexp = new RegExp('\\b' + 'theme' + '\\(([^()]+)\\)', 'g');

module.exports = () => {
  return {
    postcssPlugin: 'postcss-mantine-theme',

    Once(root: Root) {
      root.replaceValues(regexp, { fast: `theme(` }, (_, values) => getVariable(values));
    },
  };
};

module.exports.postcss = true;
