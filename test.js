const postcss = require('postcss');
const preset = require('./preset');

async function test() {
  console.log(
    (
      await postcss([preset]).process('a { border: 1rem solid light-dark(red, var(--blue)); }', {
        from: undefined,
      })
    ).css
  );
}

test();
