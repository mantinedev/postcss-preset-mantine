import postcss from 'postcss';
const preset = require('../preset');

export function testTransform(input: string) {
  return postcss([preset]).process(input, { from: undefined });
}
