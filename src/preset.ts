const nested = require('postcss-nested');
const mixins = require('postcss-mixins');
const remEm = require('./postcss-rem-em');
const colorMixAlpha = require('./postcss-color-mix');
const lightDark = require('./postcss-light-dark');
const converters = require('./converters');
const theme = require('./postcss-mantine-theme');
const autorem = require('./auto-rem');

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

const hoverWhereMixin = {
  '@media (hover: hover)': {
    '&:where(:hover)': {
      '@mixin-content': {},
    },
  },
  '@media (hover: none)': {
    '&:where(:active)': {
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

const rtlWhereMixin = {
  ':where([dir="rtl"]) &': {
    '@mixin-content': {},
  },
};

const ltrWhereMixin = {
  ':where([dir="ltr"]) &': {
    '@mixin-content': {},
  },
};

const notRtlWhereMixin = {
  ':where([dir="ltr"]) &': {
    '@mixin-content': {},
  },
};

const notLtrWhereMixin = {
  ':where([dir="ltr"]) &': {
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

interface Options {
  autoRem?: boolean;
  mixins?: Record<string, any>;
}

module.exports = (options: Options = {}) => {
  const plugins = [];

  if (options.autoRem) {
    plugins.push(autorem());
  }

  return {
    postcssPlugin: 'postcss-preset-mantine',
    plugins: [
      lightDark(),
      theme(),
      nested(),
      colorMixAlpha(),
      remEm(),
      ...plugins,
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
          'where-hover': hoverWhereMixin,
          rtl: rtlMixin,
          ltr: ltrMixin,
          'not-rtl': notRtlMixin,
          'not-ltr': notLtrMixin,
          'where-rtl': rtlWhereMixin,
          'where-ltr': ltrWhereMixin,
          'where-not-rtl': notRtlWhereMixin,
          'where-not-ltr': notLtrWhereMixin,
          'smaller-than': smallerThanMixin,
          'larger-than': largerThanMixin,
          ...(options.mixins || {}),
        },
      }),
    ],
  };
};

module.exports.postcss = true;
