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

## rem/em functions

`rem` and `em` functions can be used to convert pixels to rem/em units.
`16px = 1rem` and `16px = 1em`, `em` values are supposed to be used in media queries,
`rem` everywhere else. You can learn more about units conversions in [this guide](/styles/rem).

```scss
.demo {
  font-size: rem(16px);

  @media (min-width: em(320px)) {
    font-size: rem(32px);
  }
}
```

Will be transformed to:

```scss
.demo {
  font-size: calc(1rem * var(--mantine-scale));

  @media (min-width: 20em) {
    font-size: calc(2rem * var(--mantine-scale));
  }
}
```

## dark and light mixins

`dark` and `light` mixins can be used to create styles that will be applied only in dark or light color scheme.

```scss
.demo {
  @mixin light {
    color: red;
  }

  @mixin dark {
    color: blue;
  }
}
```

Will be transformed to:

```scss
[data-mantine-color-scheme='light'] .demo {
  color: red;
}

[data-mantine-color-scheme='dark'] .demo {
  color: blue;
}
```

Note that usually you do not need to use both `light` and `dark` mixins at the same time.
It is easier to define styles for light color scheme and then use `dark` mixin to override them in dark color scheme.

```scss
.demo {
  // Value for light color scheme
  color: red;

  @mixin dark {
    // Value for dark color scheme
    color: blue;
  }
}
```

To define values for light/dark color scheme on the `:root`/`html` element, use `light-root` and `dark-root` mixins instead:

```scss
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## smaller-than and larger-than mixins

`smaller-than` and `larger-than` mixins can be used to create styles that will be applied only when screen is smaller or larger than specified breakpoint.

```scss
.demo {
  @mixin smaller-than 320px {
    color: red;
  }

  @mixin larger-than 320px {
    color: blue;
  }
}
```

Will be transformed to:

```scss
// Breakpoint values are converted to em units
// In smaller-than mixin 0.1px is subtracted from breakpoint value
// to avoid intersection with larger-than mixin
@media (max-width: 19.99375em) {
  .demo {
    color: red;
  }
}

@media (min-width: 20em) {
  .demo {
    color: blue;
  }
}
```

You can also use `smaller-than` and `larger-than` mixins with [mantine breakpoints](/styles/responsive/#breakpoints-variables-in-css-modules):

```scss
.demo {
  @mixin smaller-than $mantine-breakpoint-sm {
    color: red;
  }

  @mixin larger-than $mantine-breakpoint-sm {
    color: blue;
  }
}
```

## light-dark function

`light-dark` function is an alternative to `light` and `dark` mixins. It accepts two arguments:
first argument is rule that will be applied in light color scheme, second argument is rule that will be applied in dark color scheme.

```css
.demo {
  color: light-dark(red, blue);
}
```

Will be transformed to:

```css
.demo {
  color: red;
}

[data-mantine-color-scheme='dark'] .demo {
  color: blue;
}
```

Note that `light-dark` function does not work on `:root`/`html` element. Use `light-root` and `dark-root` mixins instead:

```scss
// ❌ Does not work
:root {
  --color: light-dark(red, blue);
}

// ✅ Works
:root {
  @mixin light-root {
    --color: red;
  }

  @mixin dark-root {
    --color: blue;
  }
}
```

## alpha function

`alpha` function can be used to add alpha channel to color. Note that it uses [color-mix](https://caniuse.com/mdn-css_types_color_color-mix) which is not supported in some older browsers.

```scss
.demo {
  color: alpha(var(--mantine-color-red-4), 0.5);
  border: 1px solid alpha(#ffc, 0.2);
}
```

Will be transformed to:

```scss
.demo {
  color: color-mix(in srgb, var(--mantine-color-red-4), transparent 50%);
  border: 1px solid color-mix(in srgb, #ffc, transparent 80%);
}
```

## lighten and darken functions

`lighten` and `darken` functions work similar to `alpha` function, but instead of adding alpha channel they add white or black color to the color with [color-mix](https://caniuse.com/mdn-css_types_color_color-mix).

```scss
.demo {
  color: lighten(var(--mantine-color-red-4), 0.5);
  border: 1px solid darken(#ffc, 0.2);
}
```

Will be transformed to:

```scss
.demo {
  color: color-mix(in srgb, var(--mantine-color-red-4), white 50%);
  border: 1px solid color-mix(in srgb, #ffc, black 20%);
}
```

## hover mixin

`hover` mixin can be used to create styles that will be applied on hover.

```css
.demo {
  @mixin hover {
    color: orange;
  }
}
```

Will be transformed to:

```css
@media (hover: hover) {
  .demo:hover {
    color: orange;
  }
}

@media (hover: none) {
  .demo:active {
    color: orange;
  }
}
```

## rtl/ltr mixins

`rtl` mixin can be used to create styles that will be applied when `dir="rtl"` is set on parent element (usually `<html />`).

```scss
.demo {
  margin-left: 1rem;

  @mixin rtl {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
.demo {
  margin-left: 1rem;
}

[dir='rtl'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

`ltr` mixin works the same way, but for `dir="ltr"`:

```scss
.demo {
  margin-left: 1rem;

  @mixin ltr {
    margin-left: 0;
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
.demo {
  margin-left: 1rem;
}

[dir='ltr'] .demo {
  margin-left: 0;
  margin-right: 1rem;
}
```

## not-rtl/not-ltr mixins

`not-rtl`/`not-ltr` mixins can be used to create styles that will be applied when the direction is set to the opposite value or not set at all.
For example, `not-rtl` styles will be applied when `dir="ltr"` or when `dir` is not set at all.

```scss
.demo {
  @mixin not-rtl {
    margin-right: 1rem;
  }
}
```

Will be transformed to:

```css
:root:not([dir='rtl']) .demo {
  margin-right: 1rem;
}
```

## License

MIT License
