import { testTransform } from './utils';

const baseInput = `
.demo {
  @mixin hover {
    color: orange;
  }
}
`;

const whereInput = `
.demo {
  @mixin where-hover {
    color: orange;
  }
}
`;

describe('mixin-hover', () => {
  it('transforms hover mixin correctly', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });

  it('transforms where-hover mixin correctly', async () => {
    const res = await testTransform(whereInput);
    expect(res.css).toMatchSnapshot();
  });
});
