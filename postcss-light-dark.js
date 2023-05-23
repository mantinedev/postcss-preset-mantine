const postcss = require('postcss');

const FUNCTION = 'light-dark(';

function splitStringAtCharacter(character, search) {
  let characterIndex = 0;
  let openedParentheses = 0;

  while (
    characterIndex < search.length &&
    (search[characterIndex] !== character || openedParentheses)
  ) {
    if (search[characterIndex] === '(') {
      openedParentheses += 1;
    }
    if (search[characterIndex] === ')') {
      openedParentheses -= 1;
    }
    characterIndex += 1;
  }

  return [search.slice(0, characterIndex), search.slice(characterIndex + 1)];
}

function getLightDarkValue(value) {
  const [prefix, ...search] = value.split(FUNCTION);

  if (!search.length) {
    return { light: value, dark: value };
  }

  const [macro, suffix] = splitStringAtCharacter(')', search.join(FUNCTION));
  const [light, dark] = splitStringAtCharacter(',', macro);

  const parsedSuffix = getLightDarkValue(suffix);
  return {
    light: prefix + getLightDarkValue(light.trim()).light + parsedSuffix.light,
    dark: prefix + getLightDarkValue(dark.trim()).dark + parsedSuffix.dark,
  };
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-light-dark',

    Once(root) {
      root.walkDecls((decl) => {
        const { value, prop } = decl;

        if (value.includes('light-dark')) {
          const { light: lightVal, dark: darkVal } = getLightDarkValue(value);
          const darkMixin = postcss.atRule({ name: 'mixin', params: 'dark' });
          darkMixin.append(postcss.decl({ prop, value: darkVal }));
          decl.parent.insertAfter(decl, darkMixin);
          decl.parent.insertAfter(decl, postcss.decl({ prop, value: lightVal }));

          decl.remove();
        }
      });
    },
  };
};

module.exports.postcss = true;
