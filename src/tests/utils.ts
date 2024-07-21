import postcss from 'postcss';
import type { Options } from '../preset';
const preset = require('../preset');

export function testTransform(input: string, options?: Options) {
  return postcss([preset(options)]).process(input, { from: undefined });
}
