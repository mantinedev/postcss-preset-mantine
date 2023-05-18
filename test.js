const postcss = require('postcss');
const preset = require('./preset');

const input = `
.button {
  border-radius: rem(16px);

  @media (min-width: em(500px)) {
    color: red
  }

  @media (min-width: rem(500px)) {
    color: red
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
