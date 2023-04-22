const { convert } = require('startijenn-rem');

const getRegExp = (units) => new RegExp('(?!\\W+)' + units + '\\(([^()]+)\\)', 'g');
const emRegExp = getRegExp('em');
const remRegExp = getRegExp('rem');

module.exports = () => {
  return {
    postcssPlugin: 'postcss-rem-em',

    Once(root) {
      root.replaceValues(remRegExp, { fast: `rem(` }, (_, values) =>
        convert(values, 'rem', { convert: 'rem' })
      );
      root.replaceValues(emRegExp, { fast: `em(` }, (_, values) =>
        convert(values, 'em', { convert: 'em' })
      );
    },

    AtRule: {
      media: (atRule) => {
        atRule.params = atRule.params
          .replace(remRegExp, (value) => convert(value, 'rem', { convert: 'rem' }))
          .replace(/rem\((.*?)\)/g, '$1')
          .replace(emRegExp, (value) => convert(value, 'em', { convert: 'em' }))
          .replace(/em\((.*?)\)/g, '$1');
      },
    },
  };
};

module.exports.postcss = true;
