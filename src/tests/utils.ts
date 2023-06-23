const postcss = require('postcss');
const preset = require('../preset');

module.exports = {};

module.exports.testTransform = (input: string) => {
  return postcss([preset]).process(input, { from: undefined });
};
