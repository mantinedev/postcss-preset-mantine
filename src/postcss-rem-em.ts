import type { AtRule, Root } from 'postcss';
const converters = require('./converters');

const getRegExp = (units: 'rem' | 'em') => new RegExp('\\b' + units + '\\(([^()]+)\\)', 'g');
const emRegExp = getRegExp('em');
const remRegExp = getRegExp('rem');

module.exports = () => {
  return {
    postcssPlugin: 'postcss-rem-em',

    Once(root: Root) {
      root.replaceValues(remRegExp, { fast: `rem(` }, (_, values) => converters.rem(values));
      root.replaceValues(emRegExp, { fast: `em(` }, (_, values) => converters.em(values));
    },

    AtRule: {
      media: (atRule: AtRule) => {
        atRule.params = atRule.params
          .replace(remRegExp, (value) =>
            converters.remNoScale(value.replace(/rem\((.*?)\)/g, '$1'))
          )
          .replace(emRegExp, (value) => converters.em(value.replace(/em\((.*?)\)/g, '$1')));
      },
      container: (atRule: AtRule) => {
        atRule.params = atRule.params
          .replace(remRegExp, (value) =>
            converters.remNoScale(value.replace(/rem\((.*?)\)/g, '$1'))
          )
          .replace(emRegExp, (value) => converters.em(value.replace(/em\((.*?)\)/g, '$1')));
      },
    },
  };
};

module.exports.postcss = true;
