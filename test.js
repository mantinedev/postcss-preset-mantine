const postcss = require('postcss');
const nested = require('postcss-nested');
// const lightDark = require('./postcss-light-dark');

const plugin = () => {
  return {
    postcssPlugin: 'postcss-rem-em',

    Once(root) {
      root.walkDecls((decl) => {
        const value = decl.value;
        console.log(value);
        if (value.includes('light-dark')) {
          const [color1, color2] = value
            .replace(/light-dark\(/, '')
            .replace(/\)/, '')
            .split(',')
            .map((s) => s.trim());
          console.log({ color1, color2 });

          // const lightRule = postcss.rule({ selector: '@mixin light' });
          // lightRule.append(postcss.decl({ prop: 'color', value: color1 }));
          // const darkRule = postcss.rule({ selector: '@mixin dark' });
          // darkRule.append(postcss.decl({ prop: 'color', value: color2 }));
          // const rule = postcss.rule();
          // rule.append(lightRule);
          // rule.append(darkRule);
          // decl.parent.append(rule);
          // decl.remove();
        }
      });
    },

    AtRule: {
      mixin: (atRule) => {
        // console.log(atRule);
      },
    },
  };
};

plugin.postcss = true;

async function test() {
  console.log(
    (
      await postcss([nested, plugin]).process('a { color: light-dark(red, blue) }', {
        from: undefined,
      })
    ).css
  );
}

test();
