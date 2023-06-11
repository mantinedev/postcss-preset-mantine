import type { AtRule, Root } from 'postcss';

function scaleRem(remValue: string) {
  return `calc(${remValue} * var(--mantine-scale))`;
}

function createConverter(units: 'rem' | 'em', { shouldScale = false } = {}) {
  return (value: string | number) => {
    if (typeof value === 'number') {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }

    if (typeof value === 'string') {
      if (value.includes(units)) {
        return shouldScale ? scaleRem(value) : value;
      }

      const replaced = value.replace('px', '');
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }

    return value;
  };
}

const rem = createConverter('rem', { shouldScale: true });
const remNoScale = createConverter('rem');
const em = createConverter('em');

const getRegExp = (units: 'rem' | 'em') => new RegExp('\\b' + units + '\\(([^()]+)\\)', 'g');
const emRegExp = getRegExp('em');
const remRegExp = getRegExp('rem');

module.exports = () => {
  return {
    postcssPlugin: 'postcss-rem-em',

    Once(root: Root) {
      root.replaceValues(remRegExp, { fast: `rem(` }, (_, values) => rem(values));
      root.replaceValues(emRegExp, { fast: `em(` }, (_, values) => em(values));
    },

    AtRule: {
      media: (atRule: AtRule) => {
        atRule.params = atRule.params
          .replace(remRegExp, (value) => remNoScale(value.replace(/rem\((.*?)\)/g, '$1')))
          .replace(emRegExp, (value) => em(value.replace(/em\((.*?)\)/g, '$1')));
      },
    },
  };
};

module.exports.postcss = true;
