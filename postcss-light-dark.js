const postcss = require('postcss');

const re = /light-dark\(([^,]+),([^)]+)\)/;

function getValue(index) {
  function extractValue(input) {
    const match = input.match(re);

    if (match) {
      const value = match[index];
      const replaced = input.replace(re, value.trim());
      return extractValue(replaced);
    }

    return input;
  }

  return extractValue;
}

const getLightValue = getValue(1);
const getDarkValue = getValue(2);

module.exports = () => {
  return {
    postcssPlugin: 'postcss-light-dark',

    Once(root) {
      root.walkDecls((decl) => {
        const { value, prop } = decl;

        if (value.includes('light-dark')) {
          const lightVal = getLightValue(value);
          const darkVal = getDarkValue(value);

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
