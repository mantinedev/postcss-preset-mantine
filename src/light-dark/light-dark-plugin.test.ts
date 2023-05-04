import postcss from 'postcss';
import lightDarkPlugin from './light-dark-plugin';

describe('light-dark-plugin', () => {
  it('transforms input with single light-dark function', async () => {
    const input = 'a { color: light-dark(red, blue); }';
    const output = `@media (prefers-color-scheme: dark) {a {color: blue; } } @media (prefers-color-scheme: light) {a {color: red; } }[data-mantine-color-scheme='light'] a {color: red; }[data-mantine-color-scheme='dark'] a {color: blue; }`;
    const result = await postcss([require('../../preset'), lightDarkPlugin()]).process(input, {
      from: undefined,
    });

    expect(result.css).toBe('');
  });

  it('transforms input with multiple light-dark functions', async () => {
    const input = 'a { color: light-dark(red, blue); background: light-dark(blue, red); }';
    const output = `@media (prefers-color-scheme: dark) {a {color: blue; } } @media (prefers-color-scheme: light) {a {color: red; } } @media (prefers-color-scheme: dark) {a {background: red; } } @media (prefers-color-scheme: light) {a {background: blue; } }[data-mantine-color-scheme='light'] a {color: red; }[data-mantine-color-scheme='dark'] a {color: blue; }[data-mantine-color-scheme='light'] a {background: blue; }[data-mantine-color-scheme='dark'] a {background: red; }`;
    const result = await postcss([require('../../preset'), lightDarkPlugin()]).process(input, {
      from: undefined,
    });

    expect(result.css).toBe('');
  });

  it('transforms input with multiple light-dark functions at the same property', async () => {
    const input = 'a { border-color: light-dark(red, blue) light-dark(blue, red); }';
    const output = ``;
    const result = await postcss([require('../../preset'), lightDarkPlugin()]).process(input, {
      from: undefined,
    });

    expect(result.css).toBe(output);
  });
});
