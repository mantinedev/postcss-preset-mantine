const { testTransform } = require('./utils');

const baseInput = `
.demo {
  @mixin hover {
    color: orange;
  }
}
`;

describe('mixin-hover', () => {
  it('should work', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });
});
