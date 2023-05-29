# postcss-preset-mantine

[Documentation](http://mantine.dev/styles/postcss-preset)

## Installation

```sh
yarn add --dev postcss postcss-preset-mantine postcss-simple-vars
```

## Usage

Add `postcss-preset-mantine` to your `postcss.config.js` config:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## License

MIT License
