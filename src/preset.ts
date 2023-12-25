const nested = require('postcss-nested');
const mixins = require('postcss-mixins');
const remEm = require('./postcss-rem-em');
const colorMixAlpha = require('./postcss-color-mix');
const lightDark = require('./postcss-light-dark');
const converters = require('./converters');
const theme = require('./postcss-mantine-theme');

function colorSchemeMixin(colorScheme: 'light' | 'dark', type: 'where' | 'default' = 'default') {
  if (type === 'where') {
    return {
      [`:where([data-mantine-color-scheme='${colorScheme}']) &`]: {
        '@mixin-content': {},
      },
    };
  }

  return {
    [`[data-mantine-color-scheme='${colorScheme}'] &`]: {
      '@mixin-content': {},
    },
  };
}

function rootColorSchemeMixin(
  colorScheme: 'light' | 'dark',
  type: 'where' | 'default' = 'default'
) {
  if (type === 'where') {
    return {
      [`&:where(:root[data-mantine-color-scheme='${colorScheme}'])`]: {
        '@mixin-content': {},
      },
    };
  }

  return {
    [`&[data-mantine-color-scheme='${colorScheme}']`]: {
      '@mixin-content': {},
    },
  };
}

const hoverMixin = {
  '@media (hover: hover)': {
    '&:hover': {
      '@mixin-content': {},
    },
  },
  '@media (hover: none)': {
    '&:active': {
      '@mixin-content': {},
    },
  },
};

const rtlMixin = {
  '[dir="rtl"] &': {
    '@mixin-content': {},
  },
};

const ltrMixin = {
  '[dir="ltr"] &': {
    '@mixin-content': {},
  },
};

const notRtlMixin = {
  ':root:not([dir="rtl"]) &': {
    '@mixin-content': {},
  },
};

const notLtrMixin = {
  ':root:not([dir="ltr"]) &': {
    '@mixin-content': {},
  },
};

const smallerThanMixin = (_mixin: string, breakpoint: string) => ({
  [`@media (max-width: ${converters.em(converters.px(breakpoint) - 0.1)})`]: {
    '@mixin-content': {},
  },
});

const largerThanMixin = (_mixin: string, breakpoint: string) => ({
  [`@media (min-width: ${converters.em(breakpoint)})`]: {
    '@mixin-content': {},
  },
});

module.exports = () => {
  return {
    postcssPlugin: 'postcss-preset-mantine',
    plugins: [
      lightDark(),
      theme(),
      nested(),
      colorMixAlpha(),
      remEm(),
      mixins({
        mixins: {
          light: colorSchemeMixin('light'),
          dark: colorSchemeMixin('dark'),
          'light-root': rootColorSchemeMixin('light'),
          'dark-root': rootColorSchemeMixin('dark'),
          'where-light': colorSchemeMixin('light', 'where'),
          'where-dark': colorSchemeMixin('dark', 'where'),
          'where-light-root': rootColorSchemeMixin('light', 'where'),
          'where-dark-root': rootColorSchemeMixin('dark', 'where'),
          hover: hoverMixin,
          rtl: rtlMixin,
          ltr: ltrMixin,
          'not-rtl': notRtlMixin,
          'not-ltr': notLtrMixin,
          'smaller-than': smallerThanMixin,
          'larger-than': largerThanMixin,
        },
      }),
    ],
  };
};

module.exports.postcss = true;
