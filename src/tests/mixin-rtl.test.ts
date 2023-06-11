const { testTransform } = require('./utils');

const baseInput = `
.demo {
  @mixin rtl {
    margin-right: 1rem;
  }

  @mixin not-rtl {
    margin-left: 1rem;
  }
}
`;

describe('mixin-rtl', () => {
  it('should work', async () => {
    const res = await testTransform(baseInput);
    expect(res.css).toMatchSnapshot();
  });
});
