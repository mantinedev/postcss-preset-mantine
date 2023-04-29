const postcss = require('postcss');
const nested = require('postcss-nested');
const lightDark = require('./postcss-light-dark');

const plugin = () => {
  return (root) => {
    root.walkDecls((decl) => {
      const { value, prop } = decl;

      if (value.includes('light-dark')) {
        const [lightVal, darkVal] = value
          .slice(value.indexOf('(') + 1, -1)
          .split(',')
          .map((val) => val.trim());

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
  };
};

plugin.postcss = true;

async function test() {
  console.log(
    (
      await postcss([nested, lightDark]).process(
        'a { color: light-dark(red, blue); background: light-dark(orange, pink) }',
        {
          from: undefined,
        }
      )
    ).css
  );
}

test();
