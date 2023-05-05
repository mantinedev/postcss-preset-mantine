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

          const lightRule = postcss.rule({
            selector: `[data-mantine-color-scheme='light'] ${decl.parent.selector}`,
          });
          const lightDecl = postcss.decl({ prop, value: lightVal });
          lightRule.append(lightDecl);
          root.append(lightRule);

          const darkRule = postcss.rule({
            selector: `[data-mantine-color-scheme='dark'] ${decl.parent.selector}`,
          });
          const darkDecl = postcss.decl({ prop, value: darkVal });
          darkRule.append(darkDecl);
          root.append(darkRule);

          const lightMediaQuery = postcss.atRule({
            name: 'media',
            params: '(prefers-color-scheme: light)',
          });
          const lightMediaDecl = postcss.decl({ prop, value: lightVal });
          lightMediaQuery.append(lightMediaDecl);
          decl.parent.insertAfter(decl, lightMediaQuery);

          const darkMediaQuery = postcss.atRule({
            name: 'media',
            params: '(prefers-color-scheme: dark)',
          });
          const darkMediaDecl = postcss.decl({ prop, value: darkVal });
          darkMediaQuery.append(darkMediaDecl);
          decl.parent.insertAfter(decl, darkMediaQuery);

          decl.remove();
        }
      });
    },
  };
};

module.exports.postcss = true;
