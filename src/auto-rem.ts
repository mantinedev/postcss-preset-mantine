import { Declaration } from 'postcss';
const unitsConverters = require('./converters');

const rem = unitsConverters.remStrict;

module.exports = () => {
  return {
    postcssPlugin: 'postcss-auto-rem',
    Declaration: (decl: Declaration) => {
      if (!decl.value.includes('px')) {
        return;
      }

      decl.value = rem(decl.value);
    },
  };
};

module.exports.postcss = true;
