import postcss from 'postcss';
import { getLightValue, getDarkValue } from './get-value/get-value';

function lightDarkPlugin() {
  const plugin: postcss.Plugin = {
    postcssPlugin: 'postcss-light-dark',

    Once(root) {
      root.walkDecls((decl) => {
        const { value, prop } = decl;
        if (value.includes('light-dark')) {
          const lightVal = getLightValue(value);
          const darkVal = getDarkValue(value);

          const lightMixin = postcss.atRule({ name: 'mixin', params: 'light' });
          const darkMixin = postcss.atRule({ name: 'mixin', params: 'dark' });

          lightMixin.append(postcss.decl({ prop, value: lightVal }));
          darkMixin.append(postcss.decl({ prop, value: darkVal }));

          const parent = decl.parent as any;
          parent.insertAfter(decl, lightMixin);
          parent.insertAfter(decl, darkMixin);
          decl.remove();
        }
      });
    },
  };

  return plugin;
}

lightDarkPlugin.postcss = true;

export default lightDarkPlugin;
