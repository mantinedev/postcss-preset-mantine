import nested from 'postcss-nested';
import mixins from 'postcss-mixins';
import remEm from './postcss-rem-em';
import lightDark from './postcss-light-dark';
import { AcceptedPlugin, Plugin, Processor } from 'postcss';

function colorSchemeMixin(colorScheme: 'light' | 'dark') {
  return {
    [`[data-mantine-color-scheme='${colorScheme}'] &`]: {
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

const notRtlMixin = {
  ':root:not([dir="rtl"]) &': {
    '@mixin-content': {},
  },
};

const creator = () => {
  return {
    postcssPlugin: 'postcss-preset-mantine',
    plugins: [
      lightDark(),
      nested(),
      remEm(),
      mixins({
        mixins: {
          light: colorSchemeMixin('light'),
          dark: colorSchemeMixin('dark'),
          hover: hoverMixin,
          rtl: rtlMixin,
          'not-rtl': notRtlMixin,
        },
      }),
    ],
  };
};

creator.postcss = true as const;

export default creator;
