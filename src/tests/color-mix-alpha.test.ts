import { testTransform } from './utils';

const input = `
.demo {
  background: alpha(#f00, 0.5);
  border: rem(1px) solid alpha(var(--mantine-color-gray-4), 0.1);
}
`;

describe('color-mix-alpha', () => {
  it('correctly mixes colors', async () => {
    const res = await testTransform(input);
    expect(res.css).toMatchSnapshot();
  });
});
