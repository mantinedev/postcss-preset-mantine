import type { Root } from 'postcss';

const getValueRegexp = (name: string) => new RegExp('\\b' + name + '\\(([^()]+)\\)', 'g');
const getVarRegexp = (name: string) =>
  new RegExp('\\b' + name + '\\(([^()]*\\([^()]*\\)[^()]*)+\\)', 'g');

function replaceValues(root: Root, fn: string, replace: (values: string) => string) {
  root.replaceValues(getValueRegexp(fn), { fast: `${fn}(` }, (_, values: string) =>
    replace(values)
  );
  root.replaceValues(getVarRegexp(fn), { fast: `${fn}(` }, (_, values: string) => replace(values));
}

function getParsedColor(input: unknown) {
  if (typeof input !== 'string') {
    return null;
  }

  const color = input.trim();
  const lastCommaIndex = color.lastIndexOf(',');

  if (lastCommaIndex === -1) {
    return null;
  }

  const rawPayload = color.slice(lastCommaIndex + 1).trim();
  const payload = rawPayload.endsWith('%')
    ? Number(rawPayload.slice(0, -1)) / 100
    : Number(color.slice(lastCommaIndex + 1));

  if (Number.isNaN(payload)) {
    return null;
  }

  return {
    color: color.slice(0, lastCommaIndex).trim(),
    payload: Math.max(0, Math.min(1, payload)),
  };
}

function alpha(input: string) {
  const parsed = getParsedColor(input);

  if (!parsed) {
    return input;
  }

  if (parsed.payload === 1) {
    return parsed.color;
  }

  if (parsed.payload === 0) {
    return 'transparent';
  }

  const mixPercentage = (1 - parsed.payload) * 100;

  return `color-mix(in srgb, ${parsed.color}, transparent ${mixPercentage}%)`;
}

function lighten(input: string) {
  const parsed = getParsedColor(input);

  if (!parsed) {
    return input;
  }

  return `color-mix(in srgb, ${parsed.color}, white ${parsed.payload * 100}%)`;
}

function darken(input: string) {
  const parsed = getParsedColor(input);

  if (!parsed) {
    return input;
  }

  return `color-mix(in srgb, ${parsed.color}, black ${parsed.payload * 100}%)`;
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-mantine-color-mix',

    Once(root: Root) {
      replaceValues(root, 'alpha', alpha);
      replaceValues(root, 'lighten', lighten);
      replaceValues(root, 'darken', darken);
    },
  };
};

module.exports.postcss = true;
