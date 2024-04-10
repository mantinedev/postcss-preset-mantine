import postcss from 'postcss';
const preset = require('../preset');

export function testTransform(input: string, options?: Record<string, any>) {
  return postcss([preset(options)]).process(input, { from: undefined });
}
