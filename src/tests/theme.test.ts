import { testTransform } from './utils';

const baseInput = `
.demo {
  background: theme(color-orange-4);
  border: rem(1px) solid theme(color-gray-filled);
  padding: theme(spacing-md) theme(spacing-sm);
}
`;

const lightDarkInput = `
.demo {
  background: light-dark(theme(color-red-5), theme(color-blue-5));
}
`;

describe('theme', () => {
  it('correctly replaces theme function', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('correctly replaces theme with light-dark function', async () => {
    const res = await testTransform(lightDarkInput);
    expect(res.css).toMatchSnapshot();
  });
});
