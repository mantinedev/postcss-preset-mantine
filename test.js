const postcss = require('postcss');
const preset = require('./preset');

const input = `
.button {
  &[data-disabled] {
    border-color: light-dark(red, blue);
  }
}
`;

async function test() {
  console.log(
    (
      await postcss([preset]).process(input, {
        from: undefined,
      })
    ).css
  );
}

test();
