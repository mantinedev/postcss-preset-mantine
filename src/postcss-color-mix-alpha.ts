import type { Root } from 'postcss';

const colorValueRegexp = new RegExp('\\b' + 'alpha' + '\\(([^()]+)\\)', 'g');
const varRegexp = new RegExp('\\b' + 'alpha' + '\\(([^()]*\\([^()]*\\)[^()]*)+\\)', 'g');

function getMixedColor(input: string, colorSpace = 'srgb') {
  if (typeof input !== 'string') {
    return input;
  }

  const lastCommaIndex = input.lastIndexOf(',');

  if (lastCommaIndex === -1) {
    return input;
  }

  const color = input.slice(0, lastCommaIndex).trim();
  const alpha = Number(input.slice(lastCommaIndex + 1));

  if (Number.isNaN(alpha)) {
    return input;
  }

  const clampedAlpha = Math.max(0, Math.min(1, alpha));

  if (clampedAlpha === 1) {
    return color;
  }

  if (clampedAlpha === 0) {
    return 'transparent';
  }

  const mixPercentage = (1 - clampedAlpha) * 100;

  return `color-mix(in ${colorSpace}, ${color}, transparent ${mixPercentage}%)`;
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-color-mix-alpha',

    Once(root: Root) {
      root.replaceValues(colorValueRegexp, { fast: `alpha(` }, (_, values: string) => {
        console.log('value', values);
        return getMixedColor(values);
      });
      root.replaceValues(varRegexp, { fast: `alpha(` }, (_, values: string) => {
        console.log('var', values);
        return getMixedColor(values);
      });
    },
  };
};

module.exports.postcss = true;
