const { convert } = require('startijenn-rem');

const defaults = {
  name: 'em',
  fallback: false,
  convert: 'rem',
  baseline: 16,
  precision: 5,
};

module.exports = (options = {}) => {
  const { name, fallback, convert: to, ...convertOptions } = { ...defaults, ...options };
  const regexp = new RegExp('(?!\\W+)' + name + '\\(([^()]+)\\)', 'g');

  return {
    postcssPlugin: 'postcss-em',
    Once(root) {
      if (fallback && to !== 'px') {
        root.walkDecls((decl) => {
          if (decl.value && decl.value.includes(name + '(')) {
            let values = decl.value.replace(regexp, '$1');
            decl.cloneBefore({
              value: convert(values, 'px', convertOptions),
            });
            decl.value = convert(values, 'em', convertOptions);
          }
        });
      } else {
        root.replaceValues(regexp, { fast: name + '(' }, (_, values) =>
          convert(values, to, convertOptions)
        );
      }
    },
  };
};

module.exports.postcss = true;
