import { testTransform } from './utils';

const rem = `
.card {
  padding: rem(32px);
}
`;

const lightDark = `
.card {
  color: light-dark(#000, #fff);
}
`;

describe('disabled-features', () => {
  it('does not transform rem if rem function is disabled', async () => {
    const res = await testTransform(rem, {
      features: { remEmFunctions: false },
    });
    expect(res.css).toMatchSnapshot();
  });

  it('does not transform light/dark if lightDarkFunction is disabled', async () => {
    const res = await testTransform(lightDark, {
      features: { lightDarkFunction: false },
    });
    expect(res.css).toMatchSnapshot();
  });
});
